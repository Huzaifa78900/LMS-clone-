import React from 'react';
import { ShieldCheck, Lock, CheckCircle2, XCircle } from 'lucide-react';

export function RolePermissions() {
  const permissions = [
    { feature: 'View Personal Grades & Transcripts', student: true, teacher: true, admin: true },
    { feature: 'Submit Course Assignments & Homework', student: true, teacher: false, admin: false },
    { feature: 'Mark Daily Student Class Attendance', student: false, teacher: true, admin: true },
    { feature: 'Grade Assignments & Publish Marks', student: false, teacher: true, admin: true },
    { feature: 'Upload Lecture Slides & Course Notes', student: false, teacher: true, admin: true },
    { feature: 'Enroll & Register New Students', student: false, teacher: false, admin: true },
    { feature: 'Register Faculty & Assign Workloads', student: false, teacher: false, admin: true },
    { feature: 'Issue Tuition Fee Challans & Clearance', student: false, teacher: false, admin: true },
    { feature: 'Modify Campus Master Calendar', student: false, teacher: false, admin: true },
    { feature: 'Audit System Logs & Security Records', student: false, teacher: false, admin: true }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="relative z-10 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Role-Based Access Control (RBAC)</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">Security Matrix & Access Rights</h2>
          <p className="text-xs text-slate-300">
            Enforced by Firebase Security Rules (`firestore.rules`) and authentication tokens.
          </p>
        </div>
      </div>

      {/* Matrix Table */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden p-6 space-y-4">
        <h3 className="font-extrabold text-base text-slate-900">System Role Permission Matrix</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-600 font-extrabold uppercase text-[10px]">
              <tr>
                <th className="px-5 py-3.5">System Module / Feature</th>
                <th className="px-5 py-3.5 text-center">Student Role</th>
                <th className="px-5 py-3.5 text-center">Teacher Role</th>
                <th className="px-5 py-3.5 text-center">Admin Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {permissions.map((p) => (
                <tr key={p.feature} className="hover:bg-slate-50/80">
                  <td className="px-5 py-3.5 font-extrabold text-slate-900">{p.feature}</td>
                  <td className="px-5 py-3.5 text-center">
                    {p.student ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                        <CheckCircle2 className="w-4 h-4" /> Allowed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-slate-400 font-bold">
                        <XCircle className="w-4 h-4 text-slate-300" /> Restricted
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-3.5 text-center">
                    {p.teacher ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                        <CheckCircle2 className="w-4 h-4" /> Allowed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-slate-400 font-bold">
                        <XCircle className="w-4 h-4 text-slate-300" /> Restricted
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-3.5 text-center">
                    {p.admin ? (
                      <span className="inline-flex items-center gap-1 text-indigo-600 font-black">
                        <CheckCircle2 className="w-4 h-4" /> Full Control
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-slate-400 font-bold">
                        <XCircle className="w-4 h-4" /> Restricted
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
