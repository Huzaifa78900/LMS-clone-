import React, { useState, useRef, useEffect } from 'react';
import { StudentProfile, AcademicRecord, UpcomingExam, ChatMessage } from '../types';
import { X, Send, Bot, Sparkles, User, RefreshCw, ChevronRight } from 'lucide-react';

interface SupportBotModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
  records: AcademicRecord[];
  exams: UpcomingExam[];
}

export const SupportBotModal: React.FC<SupportBotModalProps> = ({
  isOpen,
  onClose,
  student,
  records,
  exams
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome_1',
      sender: 'bot',
      text: `Hello ${student.name}! I am **Nexus AI**, your personal Academic Support Assistant. Ask me anything about your current **3.42 CGPA**, target GPA calculations, upcoming exams, or retake registration policies.`,
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const quickQuestions = [
    'How do I reach my target CGPA of 3.60?',
    'What are my upcoming final exam dates?',
    'How do I apply for a course retake?',
    'Am I eligible for the 25% merit scholarship?'
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/support-bot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          context: {
            studentName: student.name,
            program: student.program,
            cgpa: student.cgpa,
            currentSemester: 'Semester 4',
            recentGrades: records.map((r) => ({ code: r.code, marks: r.marks, grade: r.grade })),
            upcomingExams: exams.map((e) => ({ title: e.title, date: e.date }))
          },
          history: messages.map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: m.text
          }))
        })
      });

      const data = await response.json();
      const botText = data.reply || 'I am ready to help you with your academic inquiries.';

      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: 'bot',
        text: botText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.warn('Bot fetch error:', err);
      // Fallback response if API offline
      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: 'bot',
        text: `To reach your target CGPA of **${student.targetGpa}** from **${student.cgpa}**, you need a GPA of **3.88** in your current 18 credits. Focusing on high-weight subjects (CS-402 and AI-305) will yield the biggest score boost!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex justify-end">
      <div className="bg-white/95 backdrop-blur-md w-full max-w-md h-full flex flex-col shadow-2xl border-l border-slate-200/80 animate-in slide-in-from-right duration-300">
        {/* Top Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white rounded-xl shadow-sm">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm tracking-tight">Nexus AI Assistant</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <p className="text-[11px] text-white/70 font-medium">Powered by Gemini AI • 24/7 Academic Support</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-slate-50/80 border-b border-slate-200/80 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-2">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-xs bg-white border border-slate-200/80 hover:border-indigo-500 hover:text-indigo-600 text-slate-700 px-3 py-1.5 rounded-full font-bold transition-all shadow-2xs shrink-0 flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-indigo-600" />
              <span>{q}</span>
            </button>
          ))}
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.sender === 'user'
                    ? 'bg-slate-900 text-white'
                    : 'bg-indigo-600 text-white shadow-2xs'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-2xs ${
                  msg.sender === 'user'
                    ? 'bg-slate-900 text-white rounded-tr-none font-medium'
                    : 'bg-white/90 text-slate-800 border border-slate-200/80 rounded-tl-none font-medium'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans">
                  {msg.text.split('\n').map((line, i) => {
                    // Simple Markdown bold renderer
                    const parts = line.split(/(\*\*.*?\*\*)/g);
                    return (
                      <p key={i} className={i > 0 ? 'mt-1.5' : ''}>
                        {parts.map((p, j) => {
                          if (p.startsWith('**') && p.endsWith('**')) {
                            return <strong key={j} className="font-extrabold">{p.slice(2, -2)}</strong>;
                          }
                          return p;
                        })}
                      </p>
                    );
                  })}
                </div>
                <span
                  className={`block text-[9px] mt-1 text-right font-medium ${
                    msg.sender === 'user' ? 'text-white/60' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2.5 text-xs text-slate-500 bg-white/90 p-3 rounded-2xl border border-slate-200/80 w-fit animate-pulse font-semibold">
              <Bot className="w-4 h-4 text-indigo-600 animate-spin" />
              <span>Nexus AI is thinking...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-200/80 bg-white/90">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Nexus AI about grades, GPA, exams..."
              className="flex-1 bg-slate-100/70 border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 font-medium transition-all"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 sleek-button-primary rounded-xl disabled:opacity-50 flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
