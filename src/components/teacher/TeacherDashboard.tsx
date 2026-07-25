import React from 'react';
import {
  BookOpen,
  Users,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  Award,
  TrendingUp,
  FileText,
  Bell,
  ArrowRight,
  ShieldCheck,
  Building2,
  Plus
} from 'lucide-react';
import { TeacherProfile, Course, AttendanceRecord, AssignmentSubmission, StudentProfile } from '../../types';

interface TeacherDashboardProps {
  teacher: TeacherProfile;
  courses: Course[];
  submissions: AssignmentSubmission[];
  students?: StudentProfile[];
  onNavigate: (view: string) => void;
}

export function TeacherDashboard({
  teacher,
  courses,
  submissions,
  onNavigate
}: TeacherDashboardProps) {
  const pendingGradingCount = submissions.filter((s) => s.status === 'Submitted').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Faculty Welcome Hero */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold border border-indigo-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Faculty Management Console</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black tracking-tight">
            Welcome back, {teacher.name}!
          </h1>
          <p className="text-xs lg:text-sm text-slate-300 leading-relaxed">
            {teacher.designation} • {teacher.department} Department • Employee ID: {teacher.employeeId}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('teacher_attendance')}
              className="sleek-button-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Mark Today's Class Attendance</span>
            </button>

            <button
              onClick={() => onNavigate('teacher_marks')}
              className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-xs font-bold border border-slate-700 transition-colors flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-indigo-400" />
              <span>Enter Student Marks</span>
            </button>
          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div className="relative z-10 grid grid-cols-2 gap-3 w-full lg:w-auto">
          <div className="bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl border border-slate-700 text-center min-w-[140px]">
            <span className="text-2xl font-black text-indigo-400">{(teacher.assignedCourses || teacher.assignedClasses || []).length}</span>
            <p className="text-[11px] font-bold text-slate-300 mt-0.5">Assigned Courses</p>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl border border-slate-700 text-center min-w-[140px]">
            <span className="text-2xl font-black text-amber-400">{pendingGradingCount}</span>
            <p className="text-[11px] font-bold text-slate-300 mt-0.5">Pending Submissions</p>
          </div>
        </div>
      </div>

      {/* Courses Assigned & Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: My Assigned Classes & Quick Actions */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Active Teaching Roster</h3>
                <p className="text-xs text-slate-500">Courses and classes under your supervision</p>
              </div>

              <button
                onClick={() => onNavigate('teacher_classes')}
                className="text-xs font-extrabold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                <span>View All Roster</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map((course) => (
                <div
                  key={course.id || course.code}
                  className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-3 hover:border-indigo-300 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-indigo-100 text-indigo-800 rounded-lg text-xs font-extrabold">
                      {course.code}
                    </span>
                    <span className="text-xs font-bold text-slate-500">{course.enrolledCount} Enrolled</span>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">{course.title}</h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{course.scheduleTime}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold">
                    <button
                      onClick={() => onNavigate('teacher_attendance')}
                      className="text-indigo-600 hover:underline"
                    >
                      Attendance
                    </button>
                    <button
                      onClick={() => onNavigate('teacher_marks')}
                      className="text-indigo-600 hover:underline"
                    >
                      Marks & Grades
                    </button>
                    <button
                      onClick={() => onNavigate('teacher_notes')}
                      className="text-indigo-600 hover:underline"
                    >
                      Notes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Faculty Tool Shortcuts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => onNavigate('teacher_assignments')}
              className="p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 text-left hover:border-indigo-400 transition-all shadow-2xs space-y-2"
            >
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl w-fit">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-xs text-slate-900">Assignments</h4>
              <p className="text-[10px] text-slate-500">Create & Grade</p>
            </button>

            <button
              onClick={() => onNavigate('teacher_announcements')}
              className="p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 text-left hover:border-indigo-400 transition-all shadow-2xs space-y-2"
            >
              <div className="p-2 bg-sky-50 text-sky-600 rounded-xl w-fit">
                <Bell className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-xs text-slate-900">Announcements</h4>
              <p className="text-[10px] text-slate-500">Post Class Bulletin</p>
            </button>

            <button
              onClick={() => onNavigate('teacher_analytics')}
              className="p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 text-left hover:border-indigo-400 transition-all shadow-2xs space-y-2"
            >
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl w-fit">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-xs text-slate-900">Student Analytics</h4>
              <p className="text-[10px] text-slate-500">Attendance & Marks Risk</p>
            </button>

            <button
              onClick={() => onNavigate('teacher_personal_attendance')}
              className="p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 text-left hover:border-indigo-400 transition-all shadow-2xs space-y-2"
            >
              <div className="p-2 bg-amber-50 text-amber-600 rounded-xl w-fit">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-xs text-slate-900">My Attendance</h4>
              <p className="text-[10px] text-slate-500">Leave & Log History</p>
            </button>
          </div>
        </div>

        {/* Right 4 Cols: Today's Schedule & Notifications */}
        <div className="lg:col-span-4 space-y-6">
          {/* Today's Lectures Card */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <span>Today's Class Schedule</span>
              </h3>
              <span className="text-[11px] font-bold text-slate-400">Mon, Oct 24</span>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-indigo-50/80 rounded-2xl border border-indigo-100/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-indigo-900">CS-402 Advanced Algorithms</span>
                  <span className="text-[10px] font-bold bg-indigo-200 text-indigo-800 px-2 py-0.5 rounded-md">
                    Lab 2
                  </span>
                </div>
                <p className="text-xs text-indigo-700 font-medium">09:00 AM - 10:30 AM</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-800">DS-201 Database Systems</span>
                  <span className="text-[10px] font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md">
                    Hall B
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium">11:00 AM - 12:30 PM</p>
              </div>
            </div>
          </div>

          {/* Pending Submissions Alert */}
          <div className="bg-amber-50/90 border border-amber-200 rounded-3xl p-5 space-y-3 shadow-2xs">
            <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Pending Submissions to Grade</span>
            </div>
            <p className="text-xs text-slate-700 font-medium">
              You have {pendingGradingCount} un-graded student submissions waiting in your inbox.
            </p>
            <button
              onClick={() => onNavigate('teacher_assignments')}
              className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs"
            >
              Open Evaluation Desk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
