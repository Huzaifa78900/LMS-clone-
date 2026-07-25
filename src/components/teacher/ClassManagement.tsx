import React, { useState } from 'react';
import {
  Users,
  Search,
  BookOpen,
  Mail,
  GraduationCap,
  Award,
  CheckCircle2,
  X,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Course, StudentProfile } from '../../types';

interface ClassManagementProps {
  courses: Course[];
  students: StudentProfile[];
}

export function ClassManagement({ courses, students }: ClassManagementProps) {
  const [selectedCourseCode, setSelectedCourseCode] = useState(courses[0]?.code || 'CS-402');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);

  const activeCourse = courses.find((c) => c.code === selectedCourseCode) || courses[0];

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="relative z-10 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold border border-indigo-500/30">
            <Users className="w-3.5 h-3.5" />
            <span>Class Roster & Student Directory</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">Class Management Desk</h2>
          <p className="text-xs text-slate-300">
            Select a class section to inspect student profiles, academic progress, and attendance standing.
          </p>
        </div>

        {/* Course Select Dropdown */}
        <div className="relative z-10 flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400">Class Section:</span>
          <select
            value={selectedCourseCode}
            onChange={(e) => setSelectedCourseCode(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {courses.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} - {c.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Course Summary Banner */}
      {activeCourse && (
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 rounded-md text-xs font-extrabold">
              {activeCourse.code}
            </span>
            <h3 className="text-lg font-black text-slate-900">{activeCourse.title}</h3>
            <p className="text-xs text-slate-500 font-medium">
              Credit Hours: {activeCourse.creditHours} • Semester: {activeCourse.semester} • Room: {activeCourse.roomNumber}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search student ID or name..."
                className="bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Student Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredStudents.map((student) => (
          <div
            key={student.id || student.studentId}
            className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={
                    student.avatarUrl ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
                  }
                  alt={student.name}
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                />
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">{student.name}</h4>
                  <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                    {student.studentId}
                  </span>
                </div>
              </div>

              <div className="space-y-1 text-xs text-slate-600">
                <p className="flex items-center gap-1.5 font-medium">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{student.email}</span>
                </p>
                <p className="flex items-center gap-1.5 font-medium">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    {student.degree} ({student.semester})
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 text-center text-xs">
                <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase">Current GPA</span>
                  <p className="font-black text-slate-900">{student.cgpa}</p>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase">Attendance</span>
                  <p className="font-black text-emerald-600">{student.attendanceRate}%</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedStudent(student)}
              className="w-full py-2 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 font-bold text-xs rounded-xl transition-colors mt-2"
            >
              View Academic Profile
            </button>
          </div>
        ))}
      </div>

      {/* Student Profile Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={
                    selectedStudent.avatarUrl ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
                  }
                  alt={selectedStudent.name}
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                />
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">{selectedStudent.name}</h3>
                  <p className="text-xs text-indigo-600 font-bold">{selectedStudent.studentId}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Degree & Department</span>
                <p className="font-extrabold text-slate-800">
                  {selectedStudent.degree} • {selectedStudent.department}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-indigo-50/80 rounded-2xl border border-indigo-100">
                  <span className="text-[10px] font-bold text-indigo-500 uppercase">Cumulative GPA</span>
                  <p className="text-xl font-black text-indigo-900">{selectedStudent.cgpa} / 4.0</p>
                </div>

                <div className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-100">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase">Class Attendance</span>
                  <p className="text-xl font-black text-emerald-900">{selectedStudent.attendanceRate}%</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Contact Information</span>
                <p className="font-medium text-slate-700">Email: {selectedStudent.email}</p>
                <p className="font-medium text-slate-700">Phone: {selectedStudent.phone}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedStudent(null)}
              className="w-full py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs"
            >
              Close Record
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
