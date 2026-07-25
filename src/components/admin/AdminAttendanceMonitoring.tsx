import React, { useState } from 'react';
import { CheckCircle2, Users, GraduationCap, Sparkles, Filter, Search } from 'lucide-react';
import { StudentProfile, TeacherAttendance } from '../../types';

interface AdminAttendanceMonitoringProps {
  students: StudentProfile[];
  teacherAttendance: TeacherAttendance[];
}

export function AdminAttendanceMonitoring({
  students,
  teacherAttendance
}: AdminAttendanceMonitoringProps) {
  const [activeTab, setActiveTab] = useState<'students' | 'faculty'>('students');

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="relative z-10 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-bold border border-amber-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Campus Attendance Control & Audit</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">University-Wide Attendance Audit</h2>
          <p className="text-xs text-slate-300">
            Monitor real-time student attendance standing and faculty punch-in logs across departments.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="relative z-10 flex items-center gap-2 bg-slate-800 p-1.5 rounded-2xl border border-slate-700">
          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'students'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Student Attendance ({students.length})
          </button>
          <button
            onClick={() => setActiveTab('faculty')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'faculty'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Faculty Biometrics ({teacherAttendance.length})
          </button>
        </div>
      </div>

      {activeTab === 'students' ? (
        <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden p-6 space-y-4">
          <h3 className="font-extrabold text-base text-slate-900">Student Attendance Percentage Summary</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-600 font-extrabold uppercase text-[10px]">
                <tr>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Semester</th>
                  <th className="px-4 py-3">Standing</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {students.map((s) => (
                  <tr key={s.studentId} className="hover:bg-slate-50/80">
                    <td className="px-4 py-3">
                      <span className="font-extrabold text-slate-900 block">{s.name}</span>
                      <span className="text-[10px] text-indigo-600 font-bold">{s.studentId}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{s.department}</td>
                    <td className="px-4 py-3 text-slate-600">{s.semester}</td>
                    <td className="px-4 py-3 font-black text-slate-900">{s.attendanceRate}%</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-md font-black text-[10px] ${
                          s.attendanceRate >= 80
                            ? 'bg-emerald-100 text-emerald-800'
                            : s.attendanceRate >= 75
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {s.attendanceRate >= 75 ? 'Satisfactory' : 'At Risk (<75%)'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden p-6 space-y-4">
          <h3 className="font-extrabold text-base text-slate-900">Faculty Biometric Punch-In Log</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-600 font-extrabold uppercase text-[10px]">
                <tr>
                  <th className="px-4 py-3">Faculty Member</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Punch In</th>
                  <th className="px-4 py-3">Punch Out</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {teacherAttendance.map((ta) => (
                  <tr key={ta.date} className="hover:bg-slate-50/80">
                    <td className="px-4 py-3 font-extrabold text-slate-900">{ta.teacherName}</td>
                    <td className="px-4 py-3 text-slate-600">{ta.date}</td>
                    <td className="px-4 py-3 text-slate-600">{ta.punchIn || '--:--'}</td>
                    <td className="px-4 py-3 text-slate-600">{ta.punchOut || '--:--'}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-md font-black text-[10px] ${
                          ta.status === 'Present'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {ta.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
