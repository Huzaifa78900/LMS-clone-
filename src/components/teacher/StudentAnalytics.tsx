import React from 'react';
import { TrendingUp, AlertTriangle, Award, Users, Sparkles, ArrowUpRight } from 'lucide-react';
import { StudentProfile } from '../../types';

interface StudentAnalyticsProps {
  students: StudentProfile[];
}

export function StudentAnalytics({ students }: StudentAnalyticsProps) {
  const atRiskAttendance = students.filter((s) => s.attendanceRate < 75);
  const highPerformers = students.filter((s) => s.cgpa >= 3.6);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="relative z-10 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold border border-indigo-500/30">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Faculty Academic Analytics Desk</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">Class Standing & Risk Intelligence</h2>
          <p className="text-xs text-slate-300">
            Monitor students with low attendance or falling CGPA to trigger early academic counseling.
          </p>
        </div>
      </div>

      {/* Analytics Summary Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-indigo-100 text-indigo-700 rounded-2xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900">{students.length}</span>
            <p className="text-xs font-bold text-slate-500">Total Enrolled Students</p>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-rose-100 text-rose-700 rounded-2xl">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-rose-700">{atRiskAttendance.length}</span>
            <p className="text-xs font-bold text-slate-500">Attendance Risk (&lt;75%)</p>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-emerald-700">{highPerformers.length}</span>
            <p className="text-xs font-bold text-slate-500">Dean's Honor List (&ge;3.6 GPA)</p>
          </div>
        </div>
      </div>

      {/* Risk Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* At-Risk Students */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>At-Risk Students (Action Required)</span>
            </h3>
            <span className="px-2.5 py-0.5 bg-rose-100 text-rose-800 text-xs font-bold rounded-md">
              {atRiskAttendance.length} Critical
            </span>
          </div>

          <div className="space-y-3">
            {atRiskAttendance.length > 0 ? (
              atRiskAttendance.map((s) => (
                <div
                  key={s.studentId}
                  className="p-4 bg-rose-50/60 border border-rose-200/80 rounded-2xl flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <h4 className="font-extrabold text-xs text-slate-900">{s.name}</h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {s.studentId} • {s.department}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="font-black text-rose-700 text-sm">{s.attendanceRate}% Attendance</span>
                    <p className="text-[10px] text-slate-500">GPA: {s.cgpa}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic text-center py-6">All students have healthy attendance standing!</p>
            )}
          </div>
        </div>

        {/* High Performers */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Dean's List High Performers</span>
            </h3>
            <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-md">
              {highPerformers.length} Honors
            </span>
          </div>

          <div className="space-y-3">
            {highPerformers.map((s) => (
              <div
                key={s.studentId}
                className="p-4 bg-emerald-50/60 border border-emerald-200/80 rounded-2xl flex items-center justify-between"
              >
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-xs text-slate-900">{s.name}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {s.studentId} • {s.degree || s.program}
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-black text-emerald-700 text-sm">{s.cgpa} CGPA</span>
                  <p className="text-[10px] text-slate-500">{s.attendanceRate || 88}% Attendance</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
