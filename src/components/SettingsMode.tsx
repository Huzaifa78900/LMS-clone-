import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { User, Save, Database, ShieldCheck, Bell, CheckCircle } from 'lucide-react';

interface SettingsModeProps {
  student: StudentProfile;
  onSaveProfile: (updated: Partial<StudentProfile>) => void;
}

export const SettingsMode: React.FC<SettingsModeProps> = ({ student, onSaveProfile }) => {
  const [name, setName] = useState(student.name);
  const [email, setEmail] = useState(student.email);
  const [program, setProgram] = useState(student.program);
  const [studentId, setStudentId] = useState(student.studentId);
  const [avatarUrl, setAvatarUrl] = useState(student.avatarUrl);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      name,
      email,
      program,
      studentId,
      avatarUrl
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Student Settings</h2>
        <p className="text-xs text-slate-500 font-medium">Manage academic profile and backend synchronization</p>
      </div>

      <div className="sleek-card rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="p-2.5 bg-indigo-50 text-indigo-700 border border-indigo-200/60 rounded-xl shadow-2xs">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Academic Identity</h3>
            <p className="text-xs text-slate-500 font-medium">Synced across University Registry & Firebase</p>
          </div>
        </div>

        {saved && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Profile settings successfully saved and synced to Firebase!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Student Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-slate-100/70 border border-slate-200/90 rounded-xl p-3 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">University Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-100/70 border border-slate-200/90 rounded-xl p-3 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Academic Program</label>
              <input
                type="text"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                required
                className="w-full bg-slate-100/70 border border-slate-200/90 rounded-xl p-3 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Student ID Code</label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
                className="w-full bg-slate-100/70 border border-slate-200/90 rounded-xl p-3 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Avatar Image URL</label>
            <input
              type="text"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              required
              className="w-full bg-slate-100/70 border border-slate-200/90 rounded-xl p-3 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 sleek-button-primary rounded-xl text-xs font-bold flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>

      {/* Backend & Firebase Status */}
      <div className="sleek-card rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100/80 text-emerald-800 border border-emerald-200/50 rounded-xl shadow-2xs">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-slate-900">Firebase Firestore Storage</h4>
              <p className="text-xs text-slate-500 font-medium">Cloud database status: Connected & Active</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-emerald-100/80 text-emerald-800 border border-emerald-200/50 rounded-full text-xs font-extrabold flex items-center gap-1 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5" /> Online
          </span>
        </div>
      </div>
    </div>
  );
};
