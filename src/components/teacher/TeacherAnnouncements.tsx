import React, { useState } from 'react';
import { Bell, Send, CheckCircle2, Info, Users, Sparkles } from 'lucide-react';
import { Course, Announcement } from '../../types';

interface TeacherAnnouncementsProps {
  courses: Course[];
  announcements: Announcement[];
  onAddAnnouncement: (annData: Omit<Announcement, 'id'>) => Promise<void>;
}

export function TeacherAnnouncements({
  courses,
  announcements,
  onAddAnnouncement
}: TeacherAnnouncementsProps) {
  const [title, setTitle] = useState('');
  const [targetClass, setTargetClass] = useState('CS-402');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSuccess(false);
    try {
      await onAddAnnouncement({
        title,
        message,
        author: 'Dr. Huzaifa',
        targetClass,
        createdAt: 'Oct 24, 2026'
      });
      setSuccess(true);
      setTitle('');
      setMessage('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error adding announcement:', err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="relative z-10 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold border border-indigo-500/30">
            <Bell className="w-3.5 h-3.5" />
            <span>Class Broadcast Bulletin System</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">Post Class Announcements</h2>
          <p className="text-xs text-slate-300">
            Broadcast urgent schedule updates, exam details, and reading notices to enrolled student dashboards.
          </p>
        </div>
      </div>

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Announcement broadcasted! All students in {targetClass} have been notified.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form */}
        <div className="lg:col-span-5 bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
            <Send className="w-4 h-4 text-indigo-600" />
            <span>Publish New Announcement</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Class / Section</label>
              <select
                value={targetClass}
                onChange={(e) => setTargetClass(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="All Enrolled Classes">All Enrolled Classes</option>
                {courses.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} - {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Subject / Headline</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Midterm Examination Location Change"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Message Body</label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please note that tomorrow's lecture will take place in Auditorium C..."
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full sleek-button-primary py-3 rounded-xl text-xs font-bold shadow-md disabled:opacity-50"
            >
              {sending ? 'Broadcasting...' : 'Broadcast Announcement'}
            </button>
          </form>
        </div>

        {/* Right List */}
        <div className="lg:col-span-7 bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="font-extrabold text-base text-slate-900">Broadcast History</h3>

          <div className="space-y-3">
            {announcements.map((ann) => (
              <div
                key={ann.id || ann.title}
                className="p-4 bg-slate-50/80 border border-slate-200/80 rounded-2xl space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-slate-900">{ann.title}</span>
                  <span className="text-[10px] font-bold text-indigo-700 px-2 py-0.5 bg-indigo-100 rounded-md">
                    {ann.targetClass}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">{ann.message}</p>
                <p className="text-[10px] text-slate-400 border-t border-slate-200/50 pt-1.5">
                  Broadcasted by {ann.author} on {ann.createdAt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
