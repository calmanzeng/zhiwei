/**
 * /api/consult — 紫微斗数知识问答 API
 * 基于 DeepSeek + 知识库上下文，无需命盘即可回复
 */
import { NextRequest } from 'next/server';
import { WHAT_IS_ZWDS, HOW_TO_READ_CHART, SIHUA_BASICS, TIME_BASICS } from '@/lib/knowledge/basics';
import { FAQ_LIST } from '@/lib/knowledge/faq';
import { STAR_INTROS } from '@/lib/knowledge/basics';

// ─── 构建系统提示 ─────────────────────
function buildSystemPrompt(): string {
  const starSummaries = STAR_INTROS.map(s =>
    `【${s.name}(${s.nickname})】${s.quickSummary}`
  ).join('\n');

  const faqKnowledge = FAQ_LIST.map(f =>
    `Q: ${f.question}\nA: ${f.answer.substring(0, 200)}`
  ).join('\n\n');

  return `你是一位资深紫微斗数命理咨询师，精通倪海夏老师《天纪》体系。你用温和、易懂的语言为用户解答紫微斗数相关问题。

核心原则：
1. 用比喻和白话解释，少用专业术语，如果用到一定要解释
2. 回答要实用、接地气，给出具体建议
3. 不确定的地方要诚实说明，不编造
4. 鼓励用户进一步探索自己的命盘

参考知识库（主星速查）：
${starSummaries}

参考常见问题解答：
${faqKnowledge}

如需更精确的分析，建议用户使用排盘工具生成命盘后提问。回答风格要保持亲和力，像一位耐心的老师。`;
}

// ─── 构建聊天消息 ─────────────────────
function buildMessages(messages: { role: string; content: string }[]) {
  const systemMsg = { role: 'system', content: buildSystemPrompt() };

  // 取最后 10 条对话作为上下文
  const recentMessages = messages.slice(-10).map(m => ({
    role: m.role === 'assistant' ? 'assistant' : 'user',
    content: m.content,
  }));

  return [systemMsg, ...recentMessages];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: '请提供消息内容' }, { status: 400 });
    }

    // DeepSeek API 调用
    const apiMessages = buildMessages(messages);
    const deepseekKey = process.env.DEEPSEEK_API_KEY || '';

    if (!deepseekKey) {
      // 无 API Key 时返回知识库冷启动回答
      const lastMsg = messages[messages.length - 1]?.content || '';
      const faqHit = FAQ_LIST.find(f =>
        lastMsg.includes(f.question.substring(0, 6))
      );
      if (faqHit) {
        return Response.json({
          choices: [{
            delta: { text: faqHit.answer },
            finish_reason: 'stop',
          }],
        });
      }
      return Response.json({
        choices: [{
          delta: { text: '感谢你的提问！关于紫微斗数，建议你先看看科普中心的基础知识（/learn），或直接起盘生成你的命盘后提问（/chart），这样可以给你更精准的分析。' },
          finish_reason: 'stop',
        }],
      });
    }

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${deepseekKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: apiMessages,
        stream: true,
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('DeepSeek API error:', response.status, errText);
      return Response.json({ error: 'AI 服务暂时不可用' }, { status: 502 });
    }

    // 流式返回
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        const decoder = new TextDecoder();
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n').filter(line => line.trim());

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') {
                  controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                  break;
                }
                controller.enqueue(encoder.encode(`data: ${data}\n\n`));
              }
            }
          }
        } catch (e) {
          console.error('Stream error:', e);
        } finally {
          reader.releaseLock();
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (err) {
    console.error('Consult API error:', err);
    return Response.json({ error: '服务器内部错误' }, { status: 500 });
  }
}
