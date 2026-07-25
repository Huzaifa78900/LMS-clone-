import React, { useState } from 'react';
import { StudentProfile, AcademicRecord, UpcomingExam } from '../types';
import {
  Download,
  CalendarCheck,
  FileText,
  Calculator,
  Info,
  Star,
  ChevronRight,
  Plus
} from 'lucide-react';

interface DashboardViewProps {
  student: StudentProfile;
  records: AcademicRecord[];
  exams: UpcomingExam[];
  onOpenTranscript: () => void;
  onOpenRetake: () => void;
  onOpenAddGrade: () => void;
  onOpenExamsModal: () => void;
  onUpdateStudentTarget: (current: number, credits: number, target: number) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  student,
  records,
  exams,
  onOpenTranscript,
  onOpenRetake,
  onOpenAddGrade,
  onOpenExamsModal,
  onUpdateStudentTarget
}) => {
  const [selectedSemester, setSelectedSemester] = useState('Semester 4 (Current)');
  const [currentCgpaInput, setCurrentCgpaInput] = useState<number>(student.cgpa);
  const [expectedCreditsInput, setExpectedCreditsInput] = useState<number>(student.expectedCredits);
  const [targetGpaInput, setTargetGpaInput] = useState<number>(student.targetGpa);
  const [recalculating, setRecalculating] = useState(false);

  // Dynamic Calculation formula for required semester GPA
  // Total Earned Credits prior to this semester = 54 credits
  const earnedCredits = student.earnedCredits || 54;
  const currentTotalGradePoints = currentCgpaInput * earnedCredits;
  const desiredTotalGradePoints = targetGpaInput * (earnedCredits + expectedCreditsInput);
  const requiredSemesterGradePoints = desiredTotalGradePoints - currentTotalGradePoints;
  const calculatedSemesterGpaNeeded = expectedCreditsInput > 0
    ? (requiredSemesterGradePoints / expectedCreditsInput)
    : 0;

  // Clamp display between 0.00 and 4.00
  const semesterGpaDisplay = Math.min(Math.max(calculatedSemesterGpaNeeded, 0), 4.0).toFixed(2);

  const handleRecalculate = () => {
    setRecalculating(true);
    setTimeout(() => {
      onUpdateStudentTarget(currentCgpaInput, expectedCreditsInput, targetGpaInput);
      setRecalculating(false);
    }, 400);
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'bg-emerald-100 text-emerald-800';
      case 'B+':
      case 'B':
        return 'bg-blue-100 text-blue-800';
      case 'C+':
      case 'C':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span>Academic Portal</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-indigo-600 font-bold">Exams & Results</span>
          </nav>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Academic Performance Dashboard
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenTranscript}
            className="px-4 py-2 border border-indigo-200 bg-white/90 text-indigo-600 hover:bg-indigo-50 rounded-xl font-bold text-xs transition-all shadow-xs flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Transcript PDF</span>
          </button>
          <button
            onClick={onOpenRetake}
            className="px-4 py-2 sleek-button-primary rounded-xl font-bold text-xs flex items-center gap-2"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Register for Retake</span>
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column (Span 8 on desktop) */}
        <section className="col-span-12 lg:col-span-8 space-y-6">
          {/* Mid-Term Results Table Card */}
          <div className="sleek-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-xl shadow-2xs">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">Mid-Term Results</h3>
                  <p className="text-xs text-slate-500 font-medium">Spring Semester 2024</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  className="bg-slate-100/80 border border-slate-200/80 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                >
                  <option value="Semester 4 (Current)">Semester 4 (Current)</option>
                  <option value="Semester 3">Semester 3</option>
                  <option value="Semester 2">Semester 2</option>
                </select>

                <button
                  onClick={onOpenAddGrade}
                  className="p-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-xl text-xs font-bold flex items-center gap-1 transition-all border border-indigo-200/50"
                  title="Add Grade"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Results Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/90 border-b border-slate-200/80 text-[11px] text-slate-500 uppercase tracking-wider font-extrabold">
                    <th className="py-3.5 px-4">Subject Code</th>
                    <th className="py-3.5 px-4">Course Title</th>
                    <th className="py-3.5 px-4 text-center">Weight</th>
                    <th className="py-3.5 px-4 text-center">Marks (100)</th>
                    <th className="py-3.5 px-4 text-right">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {records.map((row) => (
                    <tr key={row.code} className="hover:bg-indigo-50/20 transition-colors">
                      <td className="py-4 px-4 text-xs font-extrabold text-slate-900">{row.code}</td>
                      <td className="py-4 px-4 text-xs font-semibold text-slate-700">{row.title}</td>
                      <td className="py-4 px-4 text-center text-xs text-slate-500 font-medium">{row.weight}%</td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-xs font-extrabold text-slate-900">{row.marks}</span>
                          <div className="w-16 h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
                              style={{ width: `${Math.min(row.marks, 100)}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold inline-block shadow-2xs ${getGradeColor(row.grade)}`}>
                          {row.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sub-grid: Final Results & Total Grade */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Final Results Contribution Card */}
            <div className="sleek-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
              <h4 className="text-xs font-bold text-slate-500 mb-4 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                Final Results Contribution
              </h4>
              <div className="flex items-center gap-6">
                <div className="relative w-22 h-22 shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#E2E8F0"
                      strokeWidth="3.2"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#6366f1"
                      strokeDasharray="72, 100"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-base font-extrabold text-slate-900">72%</span>
                  </div>
                </div>
                <div>
                  <p className="text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
                    {student.cgpa.toFixed(2)}
                  </p>
                  <p className="text-[10px] text-indigo-600 font-extrabold uppercase tracking-wider mt-2">
                    Projected GPA Contribution
                  </p>
                </div>
              </div>
            </div>

            {/* Total Combined Grade Card */}
            <div className="rounded-2xl p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white shadow-xl flex flex-col justify-center items-center text-center border border-slate-700/50 relative overflow-hidden">
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
              <p className="text-slate-300 text-xs font-semibold mb-2">Total Combined Grade</p>
              <div className="flex items-baseline gap-1">
                <h3 className="text-5xl font-black leading-none tracking-tight text-white">B+</h3>
                <span className="text-slate-400 text-lg font-bold">/A+</span>
              </div>
              <p className="mt-4 text-xs bg-white/10 px-4 py-1.5 rounded-full border border-white/20 font-semibold backdrop-blur-md">
                Top 15% of the Cohort
              </p>
            </div>
          </div>

          {/* Performance Chart Card */}
          <div className="sleek-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-base font-extrabold text-slate-900">GPA Trend Analysis</h4>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                  <span className="text-slate-600 font-bold">GPA</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                  <span className="text-slate-600 font-bold">Target</span>
                </div>
              </div>
            </div>

            {/* Interactive Trend Chart */}
            <div className="h-56 w-full relative flex items-end justify-between px-6 pb-6 pt-4 border-b border-l border-slate-200">
              {/* Y Axis Labels */}
              <div className="absolute inset-y-0 -left-7 flex flex-col justify-between py-2 text-[10px] text-slate-400 font-bold">
                <span>4.0</span>
                <span>3.5</span>
                <span>3.0</span>
                <span>2.5</span>
                <span>2.0</span>
              </div>

              {/* Data points */}
              <div className="relative flex flex-col items-center w-1/4 group">
                <div className="w-3.5 h-3.5 rounded-full bg-indigo-600 border-2 border-white shadow-md z-10 hover:scale-125 transition-transform" style={{ marginBottom: '64px' }} />
                <span className="absolute top-full mt-2 text-xs text-slate-500 font-semibold">Sem 1</span>
              </div>
              <div className="relative flex flex-col items-center w-1/4 group">
                <div className="w-3.5 h-3.5 rounded-full bg-indigo-600 border-2 border-white shadow-md z-10 hover:scale-125 transition-transform" style={{ marginBottom: '76px' }} />
                <span className="absolute top-full mt-2 text-xs text-slate-500 font-semibold">Sem 2</span>
              </div>
              <div className="relative flex flex-col items-center w-1/4 group">
                <div className="w-3.5 h-3.5 rounded-full bg-indigo-600 border-2 border-white shadow-md z-10 hover:scale-125 transition-transform" style={{ marginBottom: '88px' }} />
                <span className="absolute top-full mt-2 text-xs text-slate-500 font-semibold">Sem 3</span>
              </div>
              <div className="relative flex flex-col items-center w-1/4 group">
                <div className="w-4 h-4 rounded-full bg-indigo-600 border-2 border-white shadow-lg shadow-indigo-500/40 z-10 animate-bounce" style={{ marginBottom: '104px' }} />
                <span className="absolute top-full mt-2 text-xs text-indigo-600 font-extrabold">Sem 4</span>
              </div>

              {/* SVG Trend Line Overlay */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 400 200">
                {/* Real GPA Line */}
                <path
                  d="M50 140 L150 128 L250 115 L350 98"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {/* Target Line */}
                <path
                  d="M50 115 L350 115"
                  fill="none"
                  stroke="#94a3b8"
                  strokeDasharray="4 4"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
        </section>

        {/* Right Sidebar Widgets (Span 4) */}
        <aside className="col-span-12 lg:col-span-4 space-y-6">
          {/* CGPA Calculator Widget */}
          <div className="sleek-card rounded-2xl p-6 border-2 border-indigo-500/30">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 bg-gradient-to-tr from-indigo-600 to-violet-600 text-white rounded-xl shadow-md shadow-indigo-500/20">
                <Calculator className="w-5 h-5" />
              </div>
              <h4 className="text-base font-extrabold text-slate-900">CGPA Calculator</h4>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Current CGPA</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4.0"
                  value={currentCgpaInput}
                  onChange={(e) => setCurrentCgpaInput(Number(e.target.value))}
                  className="w-full bg-slate-100/70 border border-slate-200/90 rounded-xl p-3 text-lg font-extrabold text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Expected Credits This Sem</label>
                <input
                  type="number"
                  value={expectedCreditsInput}
                  onChange={(e) => setExpectedCreditsInput(Number(e.target.value))}
                  className="w-full bg-slate-100/70 border border-slate-200/90 rounded-xl p-3 text-sm font-extrabold text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-700">Desired Target GPA</label>
                  <span className="text-xs font-extrabold text-indigo-600">{targetGpaInput.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="2.0"
                  max="4.0"
                  step="0.05"
                  value={targetGpaInput}
                  onChange={(e) => setTargetGpaInput(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  To reach your target, you need a semester GPA of{' '}
                  <span className="text-indigo-600 font-extrabold text-sm">{semesterGpaDisplay}</span>.
                </p>
                <button
                  onClick={handleRecalculate}
                  disabled={recalculating}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-slate-900/10"
                >
                  {recalculating ? 'Recalculating...' : 'Recalculate Projection'}
                </button>
              </div>
            </div>
          </div>

          {/* Upcoming Exams Card */}
          <div className="sleek-card rounded-2xl p-6">
            <h4 className="text-base font-extrabold text-slate-900 mb-5">Upcoming Exams</h4>
            <div className="space-y-3.5">
              {exams.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-indigo-50/40 transition-all group border border-slate-100/80"
                >
                  <div
                    className={`flex flex-col items-center justify-center min-w-[52px] h-[52px] rounded-xl font-bold ${
                      idx === 0
                        ? 'bg-rose-100 text-rose-800 border border-rose-200/60'
                        : 'bg-indigo-50 text-indigo-900 border border-indigo-100/60'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-black tracking-wider">{item.month}</span>
                    <span className="text-base font-black leading-none">{item.dayNumber}</span>
                  </div>
                  <div className="flex-grow min-w-0">
                    <h5 className="text-xs font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                      {item.title}
                    </h5>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5 font-medium">
                      {item.location} • {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={onOpenExamsModal}
              className="w-full mt-5 text-xs text-indigo-600 font-extrabold hover:underline text-center block"
            >
              View Full Examination Schedule
            </button>
          </div>

          {/* Academic Alert: Scholarship Status */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-5 border border-indigo-100 relative overflow-hidden shadow-2xs">
            <div className="flex items-start gap-3.5 relative z-10">
              <div className="p-2 bg-gradient-to-tr from-indigo-600 to-violet-600 text-white rounded-xl shadow-xs">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 mb-1">Scholarship Status</h4>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  Maintain a CGPA above 3.5 to keep your 25% merit-based tuition waiver active for the next academic year.
                </p>
              </div>
            </div>
            {/* Watermark decorative icon */}
            <Star className="absolute -bottom-3 -right-3 w-20 h-20 text-indigo-500/10 pointer-events-none" fill="currentColor" />
          </div>
        </aside>
      </div>

      {/* Footer Info */}
      <footer className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p className="font-medium">Academic Nexus Management System © 2024 • Verified by Registry</p>
        <div className="flex items-center gap-5 font-semibold">
          <button onClick={() => alert('Grade Policy: Standard 4.0 grading scale applied.')} className="hover:text-indigo-600 transition-colors">
            Grade Policy
          </button>
          <button onClick={onOpenRetake} className="hover:text-indigo-600 transition-colors">
            Appeal Result
          </button>
          <button onClick={() => alert('Contact University Support: support@university.edu')} className="hover:text-indigo-600 transition-colors">
            Support
          </button>
        </div>
      </footer>
    </div>
  );
};
