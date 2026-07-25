import React, { useState } from 'react';
import { AcademicRecord } from '../types';
import { X, CalendarPlus, AlertCircle, CheckCircle } from 'lucide-react';

interface RetakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  records: AcademicRecord[];
  onRegisterSuccess: (courseCode: string) => void;
}

export const RetakeModal: React.FC<RetakeModalProps> = ({
  isOpen,
  onClose,
  records,
  onRegisterSuccess
}) => {
  const [selectedCode, setSelectedCode] = useState<string>(records[3]?.code || 'MA-410');
  const [reason, setReason] = useState('Grade Improvement');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onRegisterSuccess(selectedCode);
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200/80 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 bg-indigo-50 text-indigo-700 border border-indigo-200/60 rounded-xl shadow-2xs">
            <CalendarPlus className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">Register for Retake Examination</h3>
            <p className="text-xs text-slate-500 font-medium">Academic Improvement & Appeal Portal</p>
          </div>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="text-base font-extrabold text-slate-900">Registration Submitted!</h4>
            <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto">
              Your retake application for course <strong>{selectedCode}</strong> has been logged in Registry. Confirmation email sent.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Select Course to Retake</label>
              <select
                value={selectedCode}
                onChange={(e) => setSelectedCode(e.target.value)}
                className="w-full bg-slate-100/70 border border-slate-200/90 rounded-xl p-3 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              >
                {records.map((r) => (
                  <option key={r.code} value={r.code}>
                    {r.code} - {r.title} (Current: {r.grade}, {r.marks} marks)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Reason for Retake Request</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full bg-slate-100/70 border border-slate-200/90 rounded-xl p-3 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              >
                <option value="Grade Improvement">Grade Improvement (Cumulative GPA Target)</option>
                <option value="Medical Certificate">Medical Absence During Mid-Term</option>
                <option value="Prerequisite Requirement">Prerequisite Requirement Grade Raising</option>
              </select>
            </div>

            <div className="p-3 bg-amber-50/90 rounded-xl border border-amber-200/60 text-amber-800 text-xs font-medium flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                Retake exams are scheduled for <strong>Summer Term (June 2026)</strong>. The higher grade between original and retake will be calculated into CGPA.
              </span>
            </div>

            <div className="pt-3 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 border border-slate-300/80 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all shadow-2xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 sleek-button-primary rounded-xl text-xs font-bold"
              >
                Submit Application
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
