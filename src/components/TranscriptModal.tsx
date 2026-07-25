import React from 'react';
import { StudentProfile, AcademicRecord } from '../types';
import { X, Printer, Download, Award, CheckCircle2 } from 'lucide-react';

interface TranscriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
  records: AcademicRecord[];
}

export const TranscriptModal: React.FC<TranscriptModalProps> = ({
  isOpen,
  onClose,
  student,
  records
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert('Generating official signed PDF transcript download...');
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200/80">
        {/* Header toolbar */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200/80 bg-slate-50/90 sticky top-0 z-10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 text-indigo-700 border border-indigo-200/60 rounded-xl shadow-2xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">Official Academic Transcript</h3>
              <p className="text-xs text-slate-500 font-medium">Document ID: TR-2024-884920</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 border border-slate-300/80 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all flex items-center gap-1.5 shadow-2xs"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3.5 py-2 sleek-button-primary rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-xl transition-colors ml-1 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Official Paper Layout */}
        <div className="p-8 space-y-6 text-slate-800" id="transcript-paper">
          {/* Header Seal */}
          <div className="text-center pb-6 border-b border-slate-200">
            <h1 className="text-2xl font-serif font-extrabold text-slate-900 tracking-tight">ACADEMIC NEXUS UNIVERSITY</h1>
            <p className="text-xs font-bold tracking-widest text-slate-500 uppercase mt-1">
              Office of the University Registrar • Verified Official Record
            </p>
          </div>

          {/* Student Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50/80 p-4 rounded-2xl text-xs border border-slate-200/80 shadow-2xs">
            <div>
              <p className="text-slate-400 font-semibold">Student Name</p>
              <p className="font-extrabold text-slate-900 mt-0.5">{student.name}</p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">Student ID</p>
              <p className="font-extrabold text-slate-900 mt-0.5">{student.studentId}</p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">Degree Program</p>
              <p className="font-extrabold text-slate-900 mt-0.5">{student.program}</p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">Cumulative GPA</p>
              <p className="font-extrabold text-indigo-600 mt-0.5">{student.cgpa.toFixed(2)} / 4.00</p>
            </div>
          </div>

          {/* Course Grades Table */}
          <div>
            <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-3">
              Semester 4 (Spring 2024) Course Work
            </h4>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-300 text-xs text-slate-500 uppercase font-extrabold">
                  <th className="py-2.5 px-3">Code</th>
                  <th className="py-2.5 px-3">Course Title</th>
                  <th className="py-2.5 px-3 text-center">Credits</th>
                  <th className="py-2.5 px-3 text-center">Marks</th>
                  <th className="py-2.5 px-3 text-right">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80">
                {records.map((rec, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-extrabold text-slate-900">{rec.code}</td>
                    <td className="py-3 px-3 font-medium text-slate-800">{rec.title}</td>
                    <td className="py-3 px-3 text-center font-semibold">{rec.credits || 4}</td>
                    <td className="py-3 px-3 text-center font-extrabold">{rec.marks}/100</td>
                    <td className="py-3 px-3 text-right font-black text-slate-900">{rec.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Verification stamp footer */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-2 text-emerald-600 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Digitally Authenticated by Registry System</span>
            </div>
            <p>Issued: July 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
};
