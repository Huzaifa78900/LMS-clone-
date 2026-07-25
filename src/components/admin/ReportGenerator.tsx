import React, { useState } from 'react';
import { Download, FileSpreadsheet, FileText, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { StudentProfile, TeacherProfile, FeeStatement } from '../../types';

interface ReportGeneratorProps {
  students: StudentProfile[];
  teachers: TeacherProfile[];
  feeStatements: FeeStatement[];
}

export function ReportGenerator({ students, teachers, feeStatements }: ReportGeneratorProps) {
  const [reportType, setReportType] = useState('student_summary');
  const [format, setFormat] = useState('CSV');
  const [generating, setGenerating] = useState(false);

  const handleExport = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      alert(`Report generated and downloaded: ${reportType}_report.${format.toLowerCase()}`);
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="relative z-10 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-bold border border-amber-500/30">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Institutional Data Export Console</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">University Report Generator</h2>
          <p className="text-xs text-slate-300">
            Generate and export official transcripts, fee collection audits, and faculty performance reports.
          </p>
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-200/80 shadow-xs max-w-2xl mx-auto space-y-5">
        <h3 className="font-extrabold text-base text-slate-900">Configure Report Parameters</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Select Report Category</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="student_summary">Student Enrollment & GPA Summary ({students.length} records)</option>
              <option value="faculty_workload">Faculty Workload & Department Report ({teachers.length} records)</option>
              <option value="fee_collection">Fee Collection & Revenue Audit ({feeStatements.length} vouchers)</option>
              <option value="attendance_audit">University Attendance Standing Report</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Export Format</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormat('CSV')}
                className={`py-3 rounded-xl text-xs font-extrabold border transition-all ${
                  format === 'CSV'
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                CSV Data Sheet (.csv)
              </button>

              <button
                type="button"
                onClick={() => setFormat('PDF')}
                className={`py-3 rounded-xl text-xs font-extrabold border transition-all ${
                  format === 'PDF'
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                PDF Executive Brief (.pdf)
              </button>
            </div>
          </div>

          <button
            onClick={handleExport}
            disabled={generating}
            className="w-full sleek-button-primary py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{generating ? 'Compiling Report...' : `Generate & Download ${format}`}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
