import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  Save,
  Users,
  Sparkles,
  Search,
  Filter
} from 'lucide-react';
import { Course, StudentProfile, AttendanceRecord } from '../../types';

interface AttendanceManagementProps {
  courses: Course[];
  students: StudentProfile[];
  attendanceRecords: AttendanceRecord[];
  onSaveAttendance: (courseCode: string, records: { studentId: string; status: 'Present' | 'Absent' | 'Late' }[]) => Promise<void>;
}

export function AttendanceManagement({
  courses,
  students,
  attendanceRecords,
  onSaveAttendance
}: AttendanceManagementProps) {
  const [selectedCourse, setSelectedCourse] = useState(courses[0]?.code || 'CS-402');
  const [attendanceDate, setAttendanceDate] = useState('2026-10-24');
  const [attendanceState, setAttendanceState] = useState<Record<string, 'Present' | 'Absent' | 'Late'>>({
    'UG-2024-8842': 'Present',
    'UG-2024-8843': 'Present',
    'UG-2024-8844': 'Present',
    'UG-2024-8845': 'Absent'
  });
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleStatusChange = (studentId: string, status: 'Present' | 'Absent' | 'Late') => {
    setAttendanceState((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleMarkAll = (status: 'Present' | 'Absent' | 'Late') => {
    const updated: Record<string, 'Present' | 'Absent' | 'Late'> = {};
    students.forEach((s) => {
      updated[s.studentId] = status;
    });
    setAttendanceState(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);
    try {
      const recordsToSave = Object.entries(attendanceState).map(([studentId, status]) => ({
        studentId,
        status: status as 'Present' | 'Absent' | 'Late'
      }));
      await onSaveAttendance(selectedCourse, recordsToSave);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving attendance:', err);
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
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Class Attendance Register</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">Mark Daily Student Attendance</h2>
          <p className="text-xs text-slate-300">
            Log real-time class attendance. Updates student percentages and fires alerts for low standing.
          </p>
        </div>

        {/* Quick Save Action */}
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="relative z-10 sleek-button-primary px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving Records...' : 'Save & Sync Attendance'}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center justify-between">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Attendance record successfully saved to Firebase Firestore!
          </span>
        </div>
      )}

      {/* Selector Toolbar */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Select Course</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {courses.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} - {c.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Session Date</label>
            <input
              type="date"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Bulk Mark Shortcuts */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Bulk Shortcuts:</span>
          <button
            type="button"
            onClick={() => handleMarkAll('Present')}
            className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs rounded-xl border border-emerald-200"
          >
            Mark All Present
          </button>
          <button
            type="button"
            onClick={() => handleMarkAll('Absent')}
            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200"
          >
            Mark All Absent
          </button>
        </div>
      </div>

      {/* Student Attendance Grid Table */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-600 font-extrabold uppercase text-[11px]">
              <tr>
                <th className="px-5 py-3.5">Student ID & Name</th>
                <th className="px-5 py-3.5">Current Standing</th>
                <th className="px-5 py-3.5 text-center">Attendance Selection</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {students.map((student) => {
                const currentStatus = attendanceState[student.studentId] || 'Present';

                return (
                  <tr key={student.studentId} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            student.avatarUrl ||
                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
                          }
                          alt={student.name}
                          className="w-9 h-9 rounded-xl object-cover border border-slate-200"
                        />
                        <div>
                          <h4 className="font-extrabold text-slate-900">{student.name}</h4>
                          <span className="text-[11px] text-slate-500">{student.studentId}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900">{student.attendanceRate}%</span>
                        {student.attendanceRate < 75 && (
                          <span className="px-2 py-0.5 bg-rose-100 text-rose-700 font-extrabold text-[10px] rounded-md">
                            At Risk
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-center">
                      <div className="inline-flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                        <button
                          type="button"
                          onClick={() => handleStatusChange(student.studentId, 'Present')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all flex items-center gap-1 ${
                            currentStatus === 'Present'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Present</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleStatusChange(student.studentId, 'Absent')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all flex items-center gap-1 ${
                            currentStatus === 'Absent'
                              ? 'bg-rose-600 text-white shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Absent</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleStatusChange(student.studentId, 'Late')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all flex items-center gap-1 ${
                            currentStatus === 'Late'
                              ? 'bg-amber-600 text-white shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>Late</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
