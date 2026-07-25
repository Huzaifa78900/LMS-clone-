import React, { useState } from 'react';
import { Clock, Calendar, CheckCircle2, FileText, Send, AlertCircle } from 'lucide-react';
import { TeacherAttendance } from '../../types';

interface TeacherPersonalAttendanceProps {
  teacherAttendance: TeacherAttendance[];
}

export function TeacherPersonalAttendance({ teacherAttendance }: TeacherPersonalAttendanceProps) {
  const [leaveReason, setLeaveReason] = useState('');
  const [fromDate, setFromDate] = useState('2026-11-01');
  const [toDate, setToDate] = useState('2026-11-02');
  const [submitted, setSubmitted] = useState(false);

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setLeaveReason('');
      alert('Leave application submitted to Dean & University Admin for approval.');
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="relative z-10 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold border border-indigo-500/30">
            <Clock className="w-3.5 h-3.5" />
            <span>Faculty Attendance & Service Log</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">Personal Attendance & Leave Desk</h2>
          <p className="text-xs text-slate-300">
            Track biometric punch-ins, monthly attendance percentages, and submit official leave requests.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Apply Leave */}
        <div className="lg:col-span-5 bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
            <Send className="w-4 h-4 text-indigo-600" />
            <span>Submit Academic Leave Application</span>
          </h3>

          <form onSubmit={handleApplyLeave} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Reason for Absence</label>
              <textarea
                rows={4}
                value={leaveReason}
                onChange={(e) => setLeaveReason(e.target.value)}
                placeholder="Specify conference attendance, medical leave, or university duty..."
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="w-full sleek-button-primary py-3 rounded-xl text-xs font-bold shadow-md disabled:opacity-50"
            >
              {submitted ? 'Transmitting Request...' : 'Submit Leave Application'}
            </button>
          </form>
        </div>

        {/* Right Table: Attendance Log */}
        <div className="lg:col-span-7 bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="font-extrabold text-base text-slate-900">Monthly Attendance History</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-600 font-extrabold uppercase text-[10px]">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Punch In</th>
                  <th className="px-4 py-3">Punch Out</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {teacherAttendance.map((ta, idx) => (
                  <tr key={ta.date || ta.id || idx} className="hover:bg-slate-50/80">
                    <td className="px-4 py-3 font-extrabold text-slate-900">{ta.date || ta.month || 'Current Term'}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-md font-black text-[10px] ${
                          ta.status === 'Present'
                            ? 'bg-emerald-100 text-emerald-800'
                            : ta.status === 'Leave'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {ta.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{ta.punchIn || '--:--'}</td>
                    <td className="px-4 py-3 text-slate-600">{ta.punchOut || '--:--'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
