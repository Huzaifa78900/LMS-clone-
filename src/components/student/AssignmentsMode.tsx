import React, { useState } from 'react';
import {
  FileText,
  Calendar,
  Clock,
  CheckCircle2,
  Upload,
  AlertCircle,
  Award,
  Sparkles,
  Search,
  Filter,
  Check
} from 'lucide-react';
import { Assignment, AssignmentSubmission } from '../../types';

interface AssignmentsModeProps {
  assignments: Assignment[];
  submissions: AssignmentSubmission[];
  onSubmitAssignment: (assignmentId: string, fileName: string, content: string) => Promise<void>;
}

export function AssignmentsMode({ assignments, submissions, onSubmitAssignment }: AssignmentsModeProps) {
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [submissionText, setSubmissionText] = useState('');
  const [fileName, setFileName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [filterCourse, setFilterCourse] = useState('All');

  const getSubmissionStatus = (assignmentId: string) => {
    return submissions.find((s) => s.assignmentId === assignmentId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssignment) return;
    setSubmitting(true);
    try {
      await onSubmitAssignment(
        selectedAssignment.id || 'asg-1',
        fileName || `${selectedAssignment.courseCode}_Submission.pdf`,
        submissionText
      );
      setSelectedAssignment(null);
      setSubmissionText('');
      setFileName('');
    } catch (err) {
      console.error('Error submitting assignment:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredAssignments =
    filterCourse === 'All'
      ? assignments
      : assignments.filter((a) => a.courseCode === filterCourse);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="relative z-10 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academic Coursework Portal</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">Assignment Submissions & Grades</h2>
          <p className="text-xs text-slate-300">
            Submit coursework, track deadline timers, and review teacher feedback.
          </p>
        </div>

        {/* Filter by course dropdown */}
        <div className="relative z-10 flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400">Course Filter:</span>
          <select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Enrolled Courses</option>
            <option value="CS-402">CS-402 Advanced Algorithms</option>
            <option value="DS-201">DS-201 Database Management</option>
            <option value="AI-305">AI-305 Neural Networks</option>
          </select>
        </div>
      </div>

      {/* Assignment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAssignments.map((asg) => {
          const submission = getSubmissionStatus(asg.id || '');
          const isSubmitted = !!submission;
          const isGraded = submission?.status === 'Graded';

          return (
            <div
              key={asg.id || asg.title}
              className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[11px] font-extrabold border border-indigo-100">
                    {asg.courseCode}
                  </span>
                  <span className="text-xs font-extrabold text-slate-700">
                    {asg.totalPoints} Marks
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 line-clamp-1">{asg.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">{asg.description}</p>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium pt-1">
                  <span className="flex items-center gap-1 text-slate-600">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                    Due: {asg.dueDate}
                  </span>
                </div>
              </div>

              {/* Status & Submission Action Footer */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                {isGraded ? (
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-extrabold text-emerald-700">
                        {submission.score} / {asg.totalPoints} Marks
                      </span>
                      <p className="text-[10px] text-slate-500">Graded by Professor</p>
                    </div>
                  </div>
                ) : isSubmitted ? (
                  <div className="flex items-center gap-2 text-emerald-600">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-xs font-bold">Submitted</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-amber-600">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-xs font-bold">Pending Submission</span>
                  </div>
                )}

                {!isGraded && (
                  <button
                    onClick={() => setSelectedAssignment(asg)}
                    className="sleek-button-primary px-3 py-1.5 rounded-xl text-xs font-bold"
                  >
                    {isSubmitted ? 'Resubmit' : 'Submit File'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Modal */}
      {selectedAssignment && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase">{selectedAssignment.courseCode}</span>
                <h3 className="font-extrabold text-base text-slate-900">{selectedAssignment.title}</h3>
              </div>
              <button
                onClick={() => setSelectedAssignment(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  File Name / Attachment Reference
                </label>
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="e.g. Amna_Ahmed_Algorithm_Doc.pdf"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Submission Comments / Explanation
                </label>
                <textarea
                  rows={4}
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  placeholder="Provide a brief summary of your algorithm solutions or git repository link..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedAssignment(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="sleek-button-primary px-5 py-2 rounded-xl text-xs font-bold text-white"
                >
                  {submitting ? 'Uploading...' : 'Confirm Submission'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
