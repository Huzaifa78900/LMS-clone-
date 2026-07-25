import React from 'react';
import { ViewMode, UserRole } from '../types';
import {
  LayoutDashboard,
  Calendar,
  CheckSquare,
  GraduationCap,
  CreditCard,
  Settings,
  HelpCircle,
  Bot,
  Users,
  FileText,
  Upload,
  Bell,
  TrendingUp,
  Building2,
  DollarSign,
  Activity,
  ShieldCheck,
  FileSpreadsheet,
  Award,
  BookOpen
} from 'lucide-react';

interface SidebarProps {
  userRole: UserRole;
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  onOpenBot: () => void;
  onOpenHelp: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  userRole,
  currentView,
  onSelectView,
  onOpenBot,
  onOpenHelp
}) => {
  // Define nav items for each role
  const getNavItems = () => {
    if (userRole === 'teacher') {
      return [
        { id: 'teacher_dashboard' as ViewMode, label: 'Overview', icon: LayoutDashboard },
        { id: 'teacher_classes' as ViewMode, label: 'Class Roster', icon: Users },
        { id: 'teacher_attendance' as ViewMode, label: 'Mark Attendance', icon: CheckSquare },
        { id: 'teacher_marks' as ViewMode, label: 'Marks & Grading', icon: Award },
        { id: 'teacher_assignments' as ViewMode, label: 'Assignments', icon: FileText },
        { id: 'teacher_notes' as ViewMode, label: 'Upload Materials', icon: Upload },
        { id: 'teacher_announcements' as ViewMode, label: 'Announcements', icon: Bell },
        { id: 'teacher_timetable' as ViewMode, label: 'Teaching Schedule', icon: Calendar },
        { id: 'teacher_personal_attendance' as ViewMode, label: 'My Attendance', icon: CheckSquare },
        { id: 'teacher_analytics' as ViewMode, label: 'Student Analytics', icon: TrendingUp }
      ];
    }

    if (userRole === 'admin') {
      return [
        { id: 'admin_dashboard' as ViewMode, label: 'Governance Overview', icon: Building2 },
        { id: 'admin_students' as ViewMode, label: 'Student Registry', icon: Users },
        { id: 'admin_teachers' as ViewMode, label: 'Faculty Directory', icon: GraduationCap },
        { id: 'admin_fees' as ViewMode, label: 'Tuition Accounts', icon: DollarSign },
        { id: 'admin_attendance' as ViewMode, label: 'Attendance Monitoring', icon: CheckSquare },
        { id: 'admin_courses' as ViewMode, label: 'Course Directory', icon: BookOpen },
        { id: 'admin_calendar' as ViewMode, label: 'Master Calendar', icon: Calendar },
        { id: 'admin_roles' as ViewMode, label: 'Roles & Security', icon: ShieldCheck },
        { id: 'admin_activity' as ViewMode, label: 'System Audit Logs', icon: Activity },
        { id: 'admin_reports' as ViewMode, label: 'Report Exporter', icon: FileSpreadsheet }
      ];
    }

    // Default: Student Menu
    return [
      { id: 'dashboard' as ViewMode, label: 'Dashboard', icon: LayoutDashboard },
      { id: 'timetable' as ViewMode, label: 'Timetable', icon: Calendar },
      { id: 'attendance' as ViewMode, label: 'Attendance', icon: CheckSquare },
      { id: 'courses' as ViewMode, label: 'Courses', icon: GraduationCap },
      { id: 'assignments' as ViewMode, label: 'Assignments', icon: FileText },
      { id: 'study_notes' as ViewMode, label: 'Study Materials', icon: Upload },
      { id: 'notifications' as ViewMode, label: 'Notice Board', icon: Bell },
      { id: 'fees' as ViewMode, label: 'Fee Statements', icon: CreditCard },
      { id: 'settings' as ViewMode, label: 'Settings', icon: Settings }
    ];
  };

  const navItems = getNavItems();

  return (
    <aside className="fixed h-full w-[260px] left-0 top-0 bg-[#0f172a] text-slate-400 shadow-2xl z-50 flex flex-col py-6 border-r border-slate-800/80 backdrop-blur-xl overflow-y-auto">
      {/* Brand Header */}
      <div className="px-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 text-white flex items-center justify-center font-extrabold text-base shadow-lg shadow-indigo-500/30 ring-1 ring-white/20">
            AN
          </div>
          <div>
            <h1 className="font-extrabold text-base text-white tracking-tight leading-tight">Academic Nexus</h1>
            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {userRole} Portal
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow space-y-1 px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectView(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 text-xs font-medium relative ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-5 bg-white rounded-r-full shadow-xs" />
              )}
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* AI Bot Quick Launcher */}
      <div className="px-3 my-3">
        <button
          onClick={onOpenBot}
          className="w-full py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-indigo-500/30 hover:border-indigo-500/60 text-white font-medium transition-all flex items-center justify-between group shadow-lg shadow-indigo-500/10"
        >
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-lg text-white shadow-sm">
              <Bot className="w-3.5 h-3.5 animate-pulse" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">Nexus AI Bot</p>
              <p className="text-[10px] text-slate-400">Support Assistant</p>
            </div>
          </div>
          <span className="text-[9px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-1.5 py-0.5 rounded-full font-extrabold">24/7</span>
        </button>
      </div>

      {/* Footer / Help Center */}
      <div className="mt-auto px-3">
        <button
          onClick={onOpenHelp}
          className="w-full py-2.5 px-3 rounded-xl bg-slate-800/60 text-slate-300 font-medium hover:bg-slate-800 hover:text-white border border-slate-700/60 transition-all flex items-center justify-center gap-2 text-xs"
        >
          <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
          <span>Help Center</span>
        </button>
      </div>
    </aside>
  );
};
