import React from 'react';
import { AcademicRecord } from '../types';
import { BookOpen, User, Award, FileText } from 'lucide-react';

interface CoursesModeProps {
  records: AcademicRecord[];
}

export const CoursesMode: React.FC<CoursesModeProps> = ({ records }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Enrolled Courses</h2>
        <p className="text-xs text-slate-500 font-medium">Spring Semester 2024 Active Syllabus & Coursework</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {records.map((c) => (
          <div key={c.code} className="sleek-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200/60 rounded-lg text-xs font-extrabold">
                {c.code}
              </span>
              <span className="text-xs text-slate-500 font-extrabold">{c.credits || 4} Credits</span>
            </div>

            <h3 className="text-lg font-extrabold text-slate-900 mb-2">{c.title}</h3>

            <div className="space-y-2 py-3 border-y border-slate-100 text-xs text-slate-600 font-medium my-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-semibold">Mid-Term Weight:</span>
                <span className="font-extrabold text-slate-800">{c.weight}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-semibold">Current Grade:</span>
                <span className="font-extrabold text-indigo-600">{c.grade} ({c.marks} Marks)</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => alert(`Opening Syllabus PDF for ${c.code}`)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                <span>Syllabus</span>
              </button>
              <button
                onClick={() => alert(`Emailing course professor for ${c.code}`)}
                className="flex-1 py-2.5 rounded-xl sleek-button-primary text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>Contact Professor</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
