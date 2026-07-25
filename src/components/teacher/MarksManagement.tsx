import React, { useState } from 'react';
import {
  Award,
  Save,
  Plus,
  BookOpen,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import { Course, StudentProfile, AcademicRecord } from '../../types';

interface MarksManagementProps {
  courses: Course[];
  students: StudentProfile[];
  academicRecords: AcademicRecord[];
  onSaveMarks: (record: Omit<AcademicRecord, 'id'>) => Promise<void>;
}

export function MarksManagement({
  courses,
  students,
  academicRecords,
  onSaveMarks
}: MarksManagementProps) {
  const [selectedCourse, setSelectedCourse] = useState(courses[0]?.code || 'CS-402');
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.studentId || 'UG-2024-8842');
  const [marksType, setMarksType] = useState<'Midterm' | 'Final Exam' | 'Quiz' | 'Assignment'>('Midterm');
  const [score, setScore] = useState<number>(88);
  const [totalPossible, setTotalPossible] = useState<number>(100);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const currentStudent = students.find((s) => s.studentId === selectedStudentId) || students[0];
  const activeCourseObj = courses.find((c) => c.code === selectedCourse) || courses[0];

  const handleCalculateGrade = (pct: number) => {
    if (pct >= 90) return { letter: 'A', gpa: 4.0 };
    if (pct >= 85) return { letter: 'A-', gpa: 3.7 };
    if (pct >= 80) return { letter: 'B+', gpa: 3.3 };
    if (pct >= 75) return { letter: 'B', gpa: 3.0 };
    if (pct >= 70) return { letter: 'C+', gpa: 2.7 };
    if (pct >= 60) return { letter: 'C', gpa: 2.0 };
    return { letter: 'F', gpa: 0.0 };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');
    try {
      const pct = (score / totalPossible) * 100;
      const { letter, gpa } = handleCalculateGrade(pct);

      const record: Omit<AcademicRecord, 'id'> = {
        user_id: currentStudent?.user_id || 'default_student_001',
        code: selectedCourse,
        title: activeCourseObj?.title || 'Advanced Algorithms',
        courseCode: selectedCourse,
        courseTitle: activeCourseObj?.title || 'Advanced Algorithms',
        grade: letter,
        gradeLetter: letter,
        gradePoint: gpa,
        semester: 'Fall 2026',
        marks: score,
        marksObtained: score,
        totalMarks: totalPossible,
        credits: activeCourseObj?.credits || 4
      };

      await onSaveMarks(record);
      setSuccessMsg(`Marks record successfully uploaded for ${currentStudent.name}!`);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      console.error('Error saving marks:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="relative z-10 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold border border-indigo-500/30">
            <Award className="w-3.5 h-3.5" />
            <span>Academic Marks & Evaluation System</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">Gradebook & Examination Entry</h2>
          <p className="text-xs text-slate-300">
            Publish midterm, final exam, quiz, and project marks directly to student academic records.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {successMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form (5 cols) */}
        <div className="lg:col-span-5 bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
          <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
            <Plus className="w-4 h-4 text-indigo-600" />
            <span>Record New Examination Grade</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Select Course</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {courses.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} - {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Select Student</label>
              <select
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {students.map((s) => (
                  <option key={s.studentId} value={s.studentId}>
                    {s.name} ({s.studentId})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Assessment Category</label>
              <select
                value={marksType}
                onChange={(e) => setMarksType(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Midterm">Midterm Examination</option>
                <option value="Final Exam">Final Examination</option>
                <option value="Quiz">Quiz Assessment</option>
                <option value="Assignment">Course Assignment</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Score Obtained</label>
                <input
                  type="number"
                  value={score}
                  onChange={(e) => setScore(Number(e.target.value))}
                  required
                  min={0}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Total Marks</label>
                <input
                  type="number"
                  value={totalPossible}
                  onChange={(e) => setTotalPossible(Number(e.target.value))}
                  required
                  min={1}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Calculated Letter Grade Preview */}
            <div className="p-3 bg-indigo-50/80 border border-indigo-100 rounded-2xl flex items-center justify-between text-xs">
              <span className="font-bold text-indigo-900">Auto Grade Preview:</span>
              <span className="font-black text-indigo-700 text-sm">
                {handleCalculateGrade((score / totalPossible) * 100).letter} (
                {handleCalculateGrade((score / totalPossible) * 100).gpa} GPA)
              </span>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full sleek-button-primary py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Publishing Grade...' : 'Publish Academic Grade'}</span>
            </button>
          </form>
        </div>

        {/* Right Table (7 cols): Existing Published Grades */}
        <div className="lg:col-span-7 bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-indigo-600" />
              <span>Recent Class Marks & Transcripts</span>
            </h3>
            <span className="text-xs font-bold text-slate-400">Total Entries: {academicRecords.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-600 font-extrabold uppercase text-[10px]">
                <tr>
                  <th className="px-4 py-3">Course</th>
                  <th className="px-4 py-3">Score</th>
                  <th className="px-4 py-3">Grade Point</th>
                  <th className="px-4 py-3">Semester</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {academicRecords.map((rec, idx) => (
                  <tr key={rec.id || rec.courseCode || rec.code || idx} className="hover:bg-slate-50/80">
                    <td className="px-4 py-3">
                      <span className="font-extrabold text-slate-900 block">{rec.courseCode || rec.code}</span>
                      <span className="text-[10px] text-slate-500">{rec.courseTitle || rec.title}</span>
                    </td>
                    <td className="px-4 py-3 font-extrabold text-slate-800">
                      {rec.marksObtained !== undefined
                        ? `${rec.marksObtained} / ${rec.totalMarks || 100}`
                        : rec.marks !== undefined
                        ? `${rec.marks} / 100`
                        : 'N/A'}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-md font-black">
                        {rec.gradeLetter || rec.grade} {rec.gradePoint ? `(${rec.gradePoint})` : ''}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{rec.semester}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
