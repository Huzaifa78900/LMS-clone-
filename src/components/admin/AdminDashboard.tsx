import React from 'react';
import {
  Building2,
  Users,
  GraduationCap,
  DollarSign,
  BookOpen,
  Calendar,
  ShieldCheck,
  TrendingUp,
  Activity,
  ArrowRight,
  Plus
} from 'lucide-react';
import { StudentProfile, TeacherProfile, Course, FeeStatement, ActivityLog } from '../../types';

interface AdminDashboardProps {
  students: StudentProfile[];
  teachers: TeacherProfile[];
  courses: Course[];
  feeStatements: FeeStatement[];
  activityLogs: ActivityLog[];
  onNavigate: (view: string) => void;
}

export function AdminDashboard({
  students,
  teachers,
  courses,
  feeStatements,
  activityLogs,
  onNavigate
}: AdminDashboardProps) {
  const totalFeesCollected = feeStatements
    .filter((f) => f.status === 'Paid')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const pendingFees = feeStatements
    .filter((f) => f.status === 'Pending' || f.status === 'Overdue')
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Admin Hero Header */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-bold border border-amber-500/30">
            <Building2 className="w-3.5 h-3.5" />
            <span>University Administration Control Center</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black tracking-tight">
            Academic Nexus Governance Portal
          </h1>
          <p className="text-xs lg:text-sm text-slate-300 leading-relaxed">
            Centralized ERP control for Student Admissions, Faculty Operations, Financial Accounts, and System Audits.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('admin_students')}
              className="sleek-button-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md"
            >
              <Users className="w-4 h-4" />
              <span>Enroll New Student</span>
            </button>

            <button
              onClick={() => onNavigate('admin_teachers')}
              className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-xs font-bold border border-slate-700 transition-colors flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Register Faculty Member</span>
            </button>
          </div>
        </div>

        {/* Financial Overview Cards */}
        <div className="relative z-10 grid grid-cols-2 gap-3 w-full lg:w-auto">
          <div className="bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl border border-slate-700 text-center min-w-[150px]">
            <span className="text-2xl font-black text-emerald-400">${totalFeesCollected.toLocaleString()}</span>
            <p className="text-[11px] font-bold text-slate-300 mt-0.5">Fees Collected</p>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl border border-slate-700 text-center min-w-[150px]">
            <span className="text-2xl font-black text-amber-400">${pendingFees.toLocaleString()}</span>
            <p className="text-[11px] font-bold text-slate-300 mt-0.5">Pending Dues</p>
          </div>
        </div>
      </div>

      {/* Primary KPI Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigate('admin_students')}
          className="p-5 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-400 transition-all cursor-pointer space-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Students</span>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-slate-900">{students.length}</span>
          <p className="text-[10px] text-slate-400 font-medium">Active Enrolled</p>
        </div>

        <div
          onClick={() => onNavigate('admin_teachers')}
          className="p-5 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-400 transition-all cursor-pointer space-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Faculty</span>
            <div className="p-2 bg-sky-50 text-sky-600 rounded-xl">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-slate-900">{teachers.length}</span>
          <p className="text-[10px] text-slate-400 font-medium">Professors & TAs</p>
        </div>

        <div
          onClick={() => onNavigate('admin_courses')}
          className="p-5 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-400 transition-all cursor-pointer space-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Courses</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-slate-900">{courses.length}</span>
          <p className="text-[10px] text-slate-400 font-medium">Offered Sections</p>
        </div>

        <div
          onClick={() => onNavigate('admin_fees')}
          className="p-5 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-400 transition-all cursor-pointer space-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Invoices</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-slate-900">{feeStatements.length}</span>
          <p className="text-[10px] text-slate-400 font-medium">Tuition Vouchers</p>
        </div>
      </div>

      {/* Administration Quick Tools Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Operational Modules */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="font-extrabold text-base text-slate-900">Administrative Operations Desk</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <button
                onClick={() => onNavigate('admin_attendance')}
                className="p-4 bg-slate-50/80 hover:bg-indigo-50 border border-slate-200/80 rounded-2xl text-left transition-all space-y-2 group"
              >
                <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl w-fit group-hover:scale-105 transition-transform">
                  <Activity className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-xs text-slate-900">Attendance Monitoring</h4>
                <p className="text-[10px] text-slate-500">Student & Faculty Audit</p>
              </button>

              <button
                onClick={() => onNavigate('admin_calendar')}
                className="p-4 bg-slate-50/80 hover:bg-indigo-50 border border-slate-200/80 rounded-2xl text-left transition-all space-y-2 group"
              >
                <div className="p-2 bg-sky-100 text-sky-700 rounded-xl w-fit group-hover:scale-105 transition-transform">
                  <Calendar className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-xs text-slate-900">Campus Calendar</h4>
                <p className="text-[10px] text-slate-500">Exams, Events & Holidays</p>
              </button>

              <button
                onClick={() => onNavigate('admin_roles')}
                className="p-4 bg-slate-50/80 hover:bg-indigo-50 border border-slate-200/80 rounded-2xl text-left transition-all space-y-2 group"
              >
                <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl w-fit group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-xs text-slate-900">Roles & Security</h4>
                <p className="text-[10px] text-slate-500">Permissions Control Matrix</p>
              </button>

              <button
                onClick={() => onNavigate('admin_activity')}
                className="p-4 bg-slate-50/80 hover:bg-indigo-50 border border-slate-200/80 rounded-2xl text-left transition-all space-y-2 group"
              >
                <div className="p-2 bg-amber-100 text-amber-700 rounded-xl w-fit group-hover:scale-105 transition-transform">
                  <Activity className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-xs text-slate-900">System Activity Logs</h4>
                <p className="text-[10px] text-slate-500">Real-Time Audit Trail</p>
              </button>

              <button
                onClick={() => onNavigate('admin_reports')}
                className="p-4 bg-slate-50/80 hover:bg-indigo-50 border border-slate-200/80 rounded-2xl text-left transition-all space-y-2 group"
              >
                <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl w-fit group-hover:scale-105 transition-transform">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-xs text-slate-900">Report Generator</h4>
                <p className="text-[10px] text-slate-500">Export Transcripts & CSVs</p>
              </button>

              <button
                onClick={() => onNavigate('admin_fees')}
                className="p-4 bg-slate-50/80 hover:bg-indigo-50 border border-slate-200/80 rounded-2xl text-left transition-all space-y-2 group"
              >
                <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl w-fit group-hover:scale-105 transition-transform">
                  <DollarSign className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-xs text-slate-900">Fee Accounts</h4>
                <p className="text-[10px] text-slate-500">Manage Tuition Invoices</p>
              </button>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Real-Time Audit Feed */}
        <div className="lg:col-span-4 bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-600" />
              <span>Real-Time Activity Audit</span>
            </h3>

            <button
              onClick={() => onNavigate('admin_activity')}
              className="text-[11px] font-bold text-indigo-600 hover:underline"
            >
              Full Log
            </button>
          </div>

          <div className="space-y-3">
            {activityLogs.slice(0, 5).map((log) => (
              <div key={log.id || log.timestamp} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-800">{log.user}</span>
                  <span className="text-[10px] font-bold text-slate-400">{log.timestamp}</span>
                </div>
                <p className="text-slate-600 font-medium text-[11px]">{log.action}</p>
                <p className="text-[10px] text-slate-400">IP: {log.ipAddress}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
