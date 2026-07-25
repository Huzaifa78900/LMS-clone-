import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Search,
  Trash2,
  Edit2,
  GraduationCap,
  X,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { StudentProfile } from '../../types';

interface StudentManagementProps {
  students: StudentProfile[];
  onAddStudent: (student: Omit<StudentProfile, 'id'>) => Promise<void>;
  onUpdateStudent: (id: string, data: Partial<StudentProfile>) => Promise<void>;
}

export function StudentManagement({
  students,
  onAddStudent,
  onUpdateStudent
}: StudentManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Computer Science');
  const [degree, setDegree] = useState('BS Computer Science');
  const [semester, setSemester] = useState('Semester 5');
  const [cgpa, setCgpa] = useState(3.5);
  const [attendanceRate, setAttendanceRate] = useState(90);
  const [saving, setSaving] = useState(false);

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onAddStudent({
        user_id: `user_${Date.now()}`,
        name,
        studentId: studentId || `UG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        email,
        degree,
        department,
        semester,
        cgpa,
        attendanceRate,
        enrollmentYear: 2026,
        phone: '+1 (555) 019-2831',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
      });

      setIsModalOpen(false);
      setName('');
      setEmail('');
      alert('New student enrolled successfully in Firebase Registry.');
    } catch (err) {
      console.error('Error adding student:', err);
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
            <Users className="w-3.5 h-3.5" />
            <span>Institutional Student Registry</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">Student Directory & Admissions</h2>
          <p className="text-xs text-slate-300">
            Manage student enrollments, academic standing, degree programs, and profile credentials.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="relative z-10 sleek-button-primary px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg"
        >
          <UserPlus className="w-4 h-4" />
          <span>Enroll New Student</span>
        </button>
      </div>

      {/* Search Toolbar */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by student name, ID, or email..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <span className="text-xs font-bold text-slate-500">Showing {filteredStudents.length} Students</span>
      </div>

      {/* Table */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-600 font-extrabold uppercase text-[10px]">
              <tr>
                <th className="px-5 py-3.5">Student Details</th>
                <th className="px-5 py-3.5">Degree & Dept</th>
                <th className="px-5 py-3.5">CGPA</th>
                <th className="px-5 py-3.5">Attendance</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredStudents.map((s) => (
                <tr key={s.id || s.studentId} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          s.avatarUrl ||
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
                        }
                        alt={s.name}
                        className="w-10 h-10 rounded-2xl object-cover border border-slate-200"
                      />
                      <div>
                        <h4 className="font-extrabold text-slate-900">{s.name}</h4>
                        <span className="text-[11px] text-indigo-600 font-bold">{s.studentId}</span>
                        <p className="text-[10px] text-slate-400">{s.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="font-extrabold text-slate-800 block">{s.degree}</span>
                    <span className="text-[10px] text-slate-500">
                      {s.department} • {s.semester}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 bg-indigo-100 text-indigo-800 rounded-lg font-black text-xs">
                      {s.cgpa} / 4.0
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="font-black text-emerald-600">{s.attendanceRate}%</span>
                  </td>

                  <td className="px-5 py-4 text-right space-x-2">
                    <button
                      onClick={() => alert(`Editing profile for ${s.name}`)}
                      className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enroll Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-900">Enroll New University Student</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Student Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Amna Ahmed"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Institutional Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="amna.ahmed@nexus.edu"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Degree Program</label>
                  <select
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="BS Computer Science">BS Computer Science</option>
                    <option value="BS Software Engineering">BS Software Engineering</option>
                    <option value="BS Data Science">BS Data Science</option>
                    <option value="BS Artificial Intelligence">BS Artificial Intelligence</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Semester</label>
                  <input
                    type="text"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    placeholder="Semester 1"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="sleek-button-primary px-5 py-2 rounded-xl text-xs font-bold text-white"
                >
                  {saving ? 'Enrolling...' : 'Confirm Enrollment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
