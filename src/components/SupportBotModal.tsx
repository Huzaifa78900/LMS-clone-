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

  const generateSmartReply = (
    query: string,
    studentProfile: StudentProfile,
    academicRecords: AcademicRecord[],
    upcomingExamsList: UpcomingExam[]
  ): string => {
    const lower = query.toLowerCase();

    if (
      lower.includes('exam') ||
      lower.includes('date') ||
      lower.includes('schedule') ||
      lower.includes('test') ||
      lower.includes('final')
    ) {
      if (upcomingExamsList.length > 0) {
        const examItems = upcomingExamsList
          .map(
            (e, i) =>
              `  ${i + 1}. **${e.title}** — ${e.date} (${e.month || ''} ${e.dayNumber || ''}) at ${e.time || '09:00 AM'} [${e.location || 'Main Campus'}]`
          )
          .join('\n');
        return `Here are your upcoming scheduled exams, **${studentProfile.name}**:\n\n${examItems}\n\nPlease remember to bring your University ID (**${studentProfile.studentId}**) and arrive 15 minutes before exam start time.`;
      }
      return `Here are your upcoming final exam dates:\n1. **Final Capstone Presentation** — May 12 @ 09:00 AM (L-302 Auditorium)\n2. **OS Architecture Final** — May 15 @ 02:00 PM (Virtual Hall B)\n3. **Data Ethics Colloquium** — May 18 @ 11:30 AM (Room 405)`;
    }

    if (
      lower.includes('cgpa') ||
      lower.includes('gpa') ||
      lower.includes('target') ||
      lower.includes('calculate') ||
      lower.includes('score')
    ) {
      const requiredGpa = Math.min(4.0, Number((studentProfile.targetGpa * 4 - studentProfile.cgpa * 3).toFixed(2)));
      return `**Academic GPA Analysis for ${studentProfile.name}**:\n• **Current CGPA**: ${studentProfile.cgpa}\n• **Target CGPA**: ${studentProfile.targetGpa}\n• **Required Semester GPA**: **${requiredGpa}** across your current ${studentProfile.expectedCredits || 18} credits.\n\n**Recommendation**: Prioritize core courses like CS-402 (Advanced Algorithms) and AI-305 (Machine Learning) to hit your target GPA.`;
    }

    if (
      lower.includes('retake') ||
      lower.includes('register') ||
      lower.includes('repeat') ||
      lower.includes('appeal')
    ) {
      return `**Course Retake Policy**:\n• Courses with grades lower than B (3.0) are eligible for retakes.\n• For **Discrete Mathematics II** (MA-410, C+), registration is open until **May 20th**.\n• Submit your retake application directly through the Student Portal navigation bar.`;
    }

    if (
      lower.includes('scholarship') ||
      lower.includes('fee') ||
      lower.includes('waiver') ||
      lower.includes('tuition')
    ) {
      return `**Scholarship & Fee Information**:\n• **Merit Scholarship**: Maintaining a CGPA of **3.50+** unlocks a 25% tuition fee waiver.\n• **Your Status**: Current CGPA is **${studentProfile.cgpa}**. Achieving your target CGPA of **${studentProfile.targetGpa}** will qualify you!\n• **Tuition Dues**: Your Spring semester tuition fees are completely paid.`;
    }

    if (
      lower.includes('timetable') ||
      lower.includes('class') ||
      lower.includes('room') ||
      lower.includes('time')
    ) {
      return `**Class Timetable Overview**:\n• **CS-402**: Mon/Wed 09:00 AM – 10:30 AM (Room L-302)\n• **AI-305**: Tue/Thu 11:00 AM – 12:30 PM (Lab 4)\n• **SE-301**: Fri 02:00 PM – 05:00 PM (Auditorium B)`;
    }

    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
      return `Hello **${studentProfile.name}**! How can I assist you today? Feel free to ask about:\n• Upcoming final exam dates & venues\n• CGPA targets & performance analysis\n• Course retake registration\n• Scholarship requirements`;
    }

    return `I am here to help, **${studentProfile.name}**! Regarding "${query}":\n\nYour current academic record in **${studentProfile.program || 'Computer Science'}** shows a CGPA of **${studentProfile.cgpa}**. Ask me specifically about exam dates, target GPAs, retakes, or course schedules!`;
  };

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
            recentGrades: records.map((r) => ({ code: r.code || r.courseCode, marks: r.marks || r.marksObtained, grade: r.grade || r.gradeLetter })),
            upcomingExams: exams.map((e) => ({ title: e.title, date: e.date }))
          },
          history: messages.map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: m.text
          }))
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const botText = data.reply || generateSmartReply(textToSend, student, records, exams);

      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: 'bot',
        text: botText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.warn('Bot fetch error, using smart response generator:', err);
      const botText = generateSmartReply(textToSend, student, records, exams);
      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: 'bot',
        text: botText,
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
