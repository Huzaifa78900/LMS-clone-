import React, { useState } from 'react';
import { AcademicRecord } from '../types';
import { X, Plus, Edit2 } from 'lucide-react';

interface AddGradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGrade: (record: Omit<AcademicRecord, 'id' | 'user_id'>) => void;
}

export const AddGradeModal: React.FC<AddGradeModalProps> = ({
  isOpen,
  onClose,
  onAddGrade
}) => {
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [weight, setWeight] = useState(30);
  const [marks, setMarks] = useState(85);
  const [credits, setCredits] = useState(4);
  const [semester, setSemester] = useState('Semester 4 (Current)');

  if (!isOpen) return null;

  const calculateGrade = (m: number): string => {
    if (m >= 90) return 'A+';
    if (m >= 85) return 'A';
    if (m >= 80) return 'A-';
    if (m >= 75) return 'B+';
    if (m >= 70) return 'B';
    if (m >= 65) return 'C+';
    if (m >= 60) return 'C';
    return 'F';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !title) return;

    onAddGrade({
      semester,
      code: code.toUpperCase().trim(),
      title: title.trim(),
      weight: Number(weight),
      marks: Number(marks),
      grade: calculateGrade(Number(marks)),
      credits: Number(credits)
    });

    setCode('');
    setTitle('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200/80 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 bg-indigo-50 text-indigo-700 border border-indigo-200/60 rounded-xl shadow-2xs">
            <Plus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">Add Subject Grade</h3>
            <p className="text-xs text-slate-500 font-medium">Record mid-term evaluation result</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Subject Code</label>
              <input
                type="text"
                placeholder="e.g. CS-501"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-slate-100/70 border border-slate-200/90 rounded-xl p-3 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Semester</label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full bg-slate-100/70 border border-slate-200/90 rounded-xl p-3 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              >
                <option value="Semester 4 (Current)">Semester 4 (Current)</option>
                <option value="Semester 3">Semester 3</option>
                <option value="Semester 2">Semester 2</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Course Title</label>
            <input
              type="text"
              placeholder="e.g. Software Architecture"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-100/70 border border-slate-200/90 rounded-xl p-3 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Weight (%)</label>
              <input
                type="number"
                min="10"
                max="100"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full bg-slate-100/70 border border-slate-200/90 rounded-xl p-3 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Marks (100)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={marks}
                onChange={(e) => setMarks(Number(e.target.value))}
                className="w-full bg-slate-100/70 border border-slate-200/90 rounded-xl p-3 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Credits</label>
              <input
                type="number"
                min="1"
                max="6"
                value={credits}
                onChange={(e) => setCredits(Number(e.target.value))}
                className="w-full bg-slate-100/70 border border-slate-200/90 rounded-xl p-3 text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="p-3.5 bg-indigo-50/80 border border-indigo-100 rounded-xl flex items-center justify-between text-xs text-slate-700 font-semibold">
            <span>Calculated Letter Grade:</span>
            <span className="font-extrabold text-indigo-700 text-lg">{calculateGrade(marks)}</span>
          </div>

          <div className="pt-2 flex gap-3">
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
              Save Result
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
