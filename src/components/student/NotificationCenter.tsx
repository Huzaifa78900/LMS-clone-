import React, { useState } from 'react';
import {
  Bell,
  Calendar,
  AlertTriangle,
  FileText,
  CheckCircle2,
  X,
  Sparkles,
  Info,
  DollarSign,
  Clock
} from 'lucide-react';
import { Announcement, FeeStatement, UpcomingExam } from '../../types';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  announcements: Announcement[];
  fees?: FeeStatement[];
  feeStatements?: FeeStatement[];
  exams?: UpcomingExam[];
}

export function NotificationCenter({
  isOpen,
  onClose,
  announcements,
  fees = [],
  feeStatements = [],
  exams = []
}: NotificationCenterProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'announcements' | 'fees' | 'exams'>('all');

  if (!isOpen) return null;

  const allFees = fees.length > 0 ? fees : feeStatements;
  const pendingFees = allFees.filter((f) => f.status === 'Pending' || f.status === 'Overdue');

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex justify-end animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl border-l border-slate-200/80 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-xs">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm tracking-tight">University Notification Hub</h3>
              <p className="text-[11px] text-white/70 font-medium">Real-Time Academic & Fee Bulletins</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Chips */}
        <div className="p-3 bg-slate-50 border-b border-slate-200/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
              activeFilter === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-indigo-400'
            }`}
          >
            All Updates
          </button>
          <button
            onClick={() => setActiveFilter('announcements')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
              activeFilter === 'announcements'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-indigo-400'
            }`}
          >
            Announcements ({announcements.length})
          </button>
          <button
            onClick={() => setActiveFilter('fees')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
              activeFilter === 'fees'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-indigo-400'
            }`}
          >
            Fees ({pendingFees.length})
          </button>
          <button
            onClick={() => setActiveFilter('exams')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
              activeFilter === 'exams'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-indigo-400'
            }`}
          >
            Exams ({exams.length})
          </button>
        </div>

        {/* Notifications Scroll List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {/* Fee Notifications */}
          {(activeFilter === 'all' || activeFilter === 'fees') &&
            pendingFees.map((fee) => (
              <div
                key={fee.invoiceRef}
                className="p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-2xl space-y-2 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-800 font-extrabold text-xs">
                    <DollarSign className="w-4 h-4 text-amber-600" />
                    <span>Fee Due Alert: ${fee.amount}</span>
                  </div>
                  <span className="text-[10px] font-bold text-amber-700 px-2 py-0.5 bg-amber-200/60 rounded-md">
                    Due: {fee.dueDate}
                  </span>
                </div>
                <p className="text-xs text-slate-700 font-medium">{fee.description}</p>
                <div className="text-[10px] text-slate-500 flex justify-between pt-1 border-t border-amber-200/50">
                  <span>Invoice: {fee.invoiceRef}</span>
                  <span className="font-bold text-indigo-600">Action Required</span>
                </div>
              </div>
            ))}

          {/* Exam Schedule Alerts */}
          {(activeFilter === 'all' || activeFilter === 'exams') &&
            exams.map((exam) => (
              <div
                key={exam.title}
                className="p-3.5 bg-indigo-50/80 border border-indigo-200/80 rounded-2xl space-y-2 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-indigo-900 font-extrabold text-xs">
                    <Calendar className="w-4 h-4 text-indigo-600" />
                    <span>{exam.title}</span>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md">
                    {exam.month} {exam.dayNumber}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  {exam.location} • {exam.time}
                </p>
              </div>
            ))}

          {/* General Announcements */}
          {(activeFilter === 'all' || activeFilter === 'announcements') &&
            announcements.map((ann) => (
              <div
                key={ann.id || ann.title}
                className="p-3.5 bg-white border border-slate-200/80 rounded-2xl space-y-2 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xs">
                    <Info className="w-4 h-4 text-sky-500" />
                    <span>{ann.title}</span>
                  </div>
                  <span className="text-[10px] font-medium text-slate-400">{ann.createdAt}</span>
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">{ann.message}</p>
                <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-100 flex items-center justify-between">
                  <span>Author: {ann.author}</span>
                  <span className="font-bold text-slate-500">Class: {ann.targetClass}</span>
                </div>
              </div>
            ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200/80 bg-slate-50 text-center text-xs font-semibold text-slate-500">
          All notifications synced with Firebase Firestore
        </div>
      </div>
    </div>
  );
}
