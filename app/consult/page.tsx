'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from '@/components/ThemeProvider';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const PRESET_QUESTIONS = [
  '什么是紫微斗数？它有什么用？',
  '14主星里哪颗星最好？',
  '化忌一定是坏事吗？',
  '命宫空宫是不是不好？',
  '倪海夏的紫微斗数有什么特点？',
  '紫微斗数能帮我看职业方向吗？',
  '紫微斗数和八字哪个准？',
  '命盘能改吗？怎么改？',
];

export default function ConsultPage() {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = [...messages, userMsg].map(m => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok) throw new Error('请求失败');
      if (!res.body) throw new Error('无响应流');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = '';

      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') break;
            try {
              const parsed = JSON.parse(data);
              const delta = parsed.choices?.[0]?.delta?.content ?? '';
              assistantText += delta;
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: 'assistant', content: assistantText };
                return updated;
              });
            } catch { /* skip */ }
          }
        }
      }
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '抱歉，回答暂时不可用。建议你先浏览科普中心的文章，或起盘获取更精准的命盘解读。',
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: isDark ? '#020810' : '#fbf6e8',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* 顶栏 */}
      <div className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}` }}>
        <Link href="/learn" style={{ fontSize: '12px', color: '#d4a843', letterSpacing: '0.3em', textDecoration: 'none' }}>
          ← 科普中心
        </Link>
        <div style={{ fontSize: '12px', color: isDark ? '#9db0d0' : '#4a4a45', letterSpacing: '0.2em' }}>
          AI 命理问答
        </div>
        <Link href="/chart" style={{ fontSize: '12px', color: '#d4a843', letterSpacing: '0.2em', textDecoration: 'none' }}>
          起盘解读 →
        </Link>
      </div>

      {/* 聊天区域 */}
      <div className="flex-1 flex flex-col" style={{ maxWidth: '720px', margin: '0 auto', width: '100%' }}>
        {/* 消息列表 */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>💬</div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: isDark ? '#e8eef6' : '#1a1a18', marginBottom: '8px' }}>
                紫微斗数 AI 问答
              </div>
              <p style={{ fontSize: '13px', color: isDark ? '#9db0d0' : '#4a4a45', maxWidth: '400px', margin: '0 auto', lineHeight: 1.7 }}>
                欢迎提问！你可以问任何关于紫微斗数的问题——基础概念、星曜含义、命盘解读方法。
                <br /><br />
                <strong style={{ color: '#d4a843' }}>提示：</strong>如果想获得针对你个人的精准分析，
                <Link href="/chart" style={{ color: '#d4a843' }}>先起盘</Link>后提问效果更好。
              </p>
              <div style={{ marginTop: '16px', display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/learn" style={{ fontSize: '11px', color: '#d4a843', textDecoration: 'none', padding: '4px 12px', borderRadius: '999px', border: '1px solid rgba(212,168,67,0.3)' }}>
                  📖 科普知识
                </Link>
                <Link href="/blog" style={{ fontSize: '11px', color: '#d4a843', textDecoration: 'none', padding: '4px 12px', borderRadius: '999px', border: '1px solid rgba(212,168,67,0.3)' }}>
                  📝 科普文章
                </Link>
                <Link href="/chart" style={{ fontSize: '11px', color: '#d4a843', textDecoration: 'none', padding: '4px 12px', borderRadius: '999px', border: '1px solid rgba(212,168,67,0.3)' }}>
                  🔮 起盘解读
                </Link>
              </div>
            </motion.div>
          )}

          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className="max-w-[88%] rounded-xl px-4 py-3 text-sm leading-relaxed"
                  style={msg.role === 'user' ? {
                    background: 'rgba(212,168,67,0.1)',
                    border: '1px solid rgba(212,168,67,0.2)',
                    color: isDark ? '#d4a843' : '#8a6a20',
                  } : {
                    background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.8)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`,
                    color: isDark ? '#e8eef6' : '#1a1a18',
                  }}
                >
                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-2 mb-2">
                      <span style={{ fontSize: '16px' }}>🔮</span>
                      <span style={{ fontSize: '10px', color: isDark ? '#9db0d0' : '#4a4a45', letterSpacing: '0.1em' }}>
                        紫微命理师
                      </span>
                    </div>
                  )}
                  <div className="whitespace-pre-wrap text-xs sm:text-sm leading-relaxed">
                    {msg.content}
                    {loading && i === messages.length - 1 && msg.role === 'assistant' && (
                      <span className="inline-block w-1.5 h-3 ml-0.5 animate-pulse" style={{ background: '#d4a843', opacity: 0.6 }} />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 预设问题 */}
        {messages.length === 0 && (
          <div className="px-4 pb-2">
            <div className="grid grid-cols-2 gap-1.5">
              {PRESET_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  disabled={loading}
                  className="text-left text-[10px] rounded-lg px-2.5 py-2 transition-all line-clamp-2"
                  style={{
                    color: isDark ? '#9db0d0' : '#4a4a45',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`,
                    background: 'transparent',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.5 : 1,
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 输入框 */}
        <div className="px-4 pb-4 pt-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
              placeholder="输入你的紫微斗数问题..."
              disabled={loading}
              className="flex-1 rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors"
              style={{
                background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.8)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                color: isDark ? '#e8eef6' : '#1a1a18',
              }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              className="px-5 py-3 rounded-lg text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: 'rgba(212,168,67,0.15)',
                border: '1px solid rgba(212,168,67,0.25)',
                color: '#d4a843',
              }}
            >
              {loading ? '…' : '提问'}
            </button>
          </div>
          <div style={{ fontSize: '10px', color: isDark ? '#6a7a96' : '#8a8a82', textAlign: 'center', marginTop: '8px' }}>
            AI 回复仅供参考，不能替代专业的命理咨询。了解更多请
            <Link href="/learn" style={{ color: '#d4a843', textDecoration: 'underline' }}>阅读科普知识</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
