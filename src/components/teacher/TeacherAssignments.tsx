import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Award,
  CheckCircle2,
  Calendar,
  Sparkles,
  Search,
  Check,
  X
} from 'lucide-react';
import { Course, Assignment, AssignmentSubmission } from '../../types';

interface TeacherAssignmentsProps {
  courses: Course[];
  assignments: Assignment[];
  submissions: AssignmentSubmission[];
  onCreateAssignment: (assignmentData: Omit<Assignment, 'id'>) => Promise<void>;
  onGradeSubmission: (submissionId: string, score: number, feedback: string) => Promise<void>;
}

export function TeacherAssignments({
  courses,
  assignments,
  submissions,
  onCreateAssignment,
  onGradeSubmission
}: TeacherAssignmentsProps) {
  const [activeTab, setActiveTab] = useState<'create' | 'submissions'>('submissions');
  const [title, setTitle] = useState('');
  const [courseCode, setCourseCode] = useState(courses[0]?.code || 'CS-402');
  const [dueDate, setDueDate] = useState('2026-11-15');
  const [totalPoints, setTotalPoints] = useState(100);
  const [description, setDescription] = useState('');
  const [creating, setCreating] = useState(false);

  // Evaluation modal
  const [evalSub, setEvalSub] = useState<AssignmentSubmission | null>(null);
  const [gradeScore, setGradeScore] = useState<number>(85);
  const [feedback, setFeedback] = useState('');
  const [grading, setGrading] = useState(false);

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    const selectedCourse = courses.find(c => c.code === courseCode);
    try {
      await onCreateAssignment({
        title,
        courseCode,
        courseTitle: selectedCourse?.title || courseCode,
        dueDate,
        totalPoints,
        description,
        createdByTeacherId: selectedCourse?.teacherId || 'teacher_001',
        createdAt: new Date().toISOString().split('T')[0]
      });
      setTitle('');
      setDescription('');
      setActiveTab('submissions');
      alert('Assignment created successfully and notified to class students.');
    } catch (err) {
      console.error('Error creating assignment:', err);
    } finally {
      setCreating(false);
    }
  };

  const handleGradingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!evalSub) return;
    setGrading(true);
    try {
      await onGradeSubmission(evalSub.id || 'sub-1', gradeScore, feedback);
      setEvalSub(null);
      setFeedback('');
    } catch (err) {
      console.error('Error grading submission:', err);
    } finally {
      setGrading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="relative z-10 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold border border-indigo-500/30">
            <FileText className="w-3.5 h-3.5" />
            <span>Coursework & Submission Evaluation Desk</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">Assignment Management & Grading</h2>
          <p className="text-xs text-slate-300">
            Design new assignments, set submission deadlines, and evaluate student papers.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="relative z-10 flex items-center gap-2 bg-slate-800 p-1.5 rounded-2xl border border-slate-700">
          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'submissions'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Submissions ({submissions.length})
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'create'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            + Create Assignment
          </button>
        </div>
      </div>

      {activeTab === 'create' ? (
        /* Create Assignment Form */
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-200/80 shadow-xs max-w-2xl mx-auto space-y-5">
          <h3 className="font-extrabold text-base text-slate-900">Create New Course Assignment</h3>

          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Course</label>
              <select
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
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
              <label className="block text-xs font-bold text-slate-700 mb-1">Assignment Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Project 1: Graph Theory Algorithm Implementation"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Total Points</label>
                <input
                  type="number"
                  value={totalPoints}
                  onChange={(e) => setTotalPoints(Number(e.target.value))}
                  required
                  min={10}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Problem Statement & Instructions</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Implement Dijkstra's and A* pathfinding algorithms in C++ or Python with benchmark comparisons..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={creating}
              className="w-full sleek-button-primary py-3 rounded-xl text-xs font-bold shadow-md disabled:opacity-50"
            >
              {creating ? 'Publishing...' : 'Publish Assignment'}
            </button>
          </form>
        </div>
      ) : (
        /* Submissions Inbox List */
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="font-extrabold text-base text-slate-900">Student Submission Inbox</h3>

          <div className="space-y-3">
            {submissions.map((sub) => (
              <div
                key={sub.id || sub.studentName}
                className="p-4 bg-slate-50/80 border border-slate-200/80 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-xs text-slate-900">{sub.studentName}</span>
                    <span className="text-[10px] text-slate-500">({sub.studentId})</span>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                        sub.status === 'Graded'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {sub.status}
                    </span>
                  </div>
                  <p className="text-xs text-indigo-700 font-bold">{sub.fileName}</p>
                  <p className="text-[10px] text-slate-400">Submitted on {sub.submittedAt}</p>
                </div>

                <div className="flex items-center gap-3">
                  {sub.status === 'Graded' ? (
                    <div className="text-right">
                      <span className="text-sm font-black text-emerald-700">Score: {sub.score} Marks</span>
                      <p className="text-[10px] text-slate-500 italic">"{sub.feedback}"</p>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEvalSub(sub);
                        setGradeScore(88);
                      }}
                      className="sleek-button-primary px-4 py-2 rounded-xl text-xs font-bold"
                    >
                      Evaluate & Grade
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Evaluation Modal */}
      {evalSub && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-indigo-600">{evalSub.studentName}</span>
                <h3 className="font-extrabold text-base text-slate-900">{evalSub.fileName}</h3>
              </div>
              <button onClick={() => setEvalSub(null)} className="p-1.5 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleGradingSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Score Assigned (out of 100)</label>
                <input
                  type="number"
                  value={gradeScore}
                  onChange={(e) => setGradeScore(Number(e.target.value))}
                  required
                  min={0}
                  max={100}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Teacher Feedback & Comments</label>
                <textarea
                  rows={3}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Great algorithmic logic. Optimize memory complexity in test case 4..."
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEvalSub(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={grading}
                  className="sleek-button-primary px-5 py-2 rounded-xl text-xs font-bold text-white"
                >
                  {grading ? 'Submitting...' : 'Save Grade & Feedback'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
