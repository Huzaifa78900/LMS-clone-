import React from 'react';
import { StudentProfile, AppUser } from '../types';
import { Search, Bell, HelpCircle, Bot, LogOut } from 'lucide-react';

interface HeaderProps {
  user?: AppUser;
  student: StudentProfile;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenBot: () => void;
  onOpenHelp: () => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  student,
  searchQuery,
  onSearchChange,
  onOpenBot,
  onOpenHelp,
  onLogout
}) => {
  const displayName = user?.displayName || student.name;
  const userRole = user?.role || 'student';

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-260px)] h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 z-40 flex items-center justify-between px-8 shadow-xs">
      {/* Search Input */}
      <div className="flex items-center gap-4 flex-grow max-w-xl">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search academic records, exams, courses..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200/90 bg-slate-100/60 text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500/80 focus:border-indigo-500 outline-none text-xs font-medium transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Right User Bar */}
      <div className="flex items-center gap-5">
        <button
          onClick={onOpenBot}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200/60 hover:bg-indigo-100/80 font-bold text-xs transition-all shadow-2xs group"
          title="Open AI Support Assistant"
        >
          <Bot className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">Ask AI Support</span>
        </button>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => alert('Notifications: 2 new academic announcements available.')}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
          </button>

          <button
            onClick={onOpenHelp}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
            title="Help Center"
          >
            <HelpCircle className="w-4.5 h-4.5" />
          </button>
        </div>

        <div className="h-6 w-[1px] bg-slate-200 mx-1" />

        {/* User Profile Tag */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-900 leading-tight">{displayName}</p>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold tracking-wider uppercase border ${
                userRole === 'admin'
                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                  : userRole === 'teacher'
                  ? 'bg-sky-100 text-sky-800 border-sky-300'
                  : 'bg-indigo-100/80 text-indigo-700 border-indigo-200/50'
              }`}
            >
              {userRole} Role
            </span>
          </div>

          <div className="w-9 h-9 rounded-full border-2 border-indigo-500 bg-slate-200 overflow-hidden shadow-xs ring-2 ring-indigo-500/20">
            <img
              src={student.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
              alt={displayName}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250';
              }}
            />
          </div>

          {onLogout && (
            <button
              onClick={onLogout}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors ml-1"
              title="Sign Out / Switch Role"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
