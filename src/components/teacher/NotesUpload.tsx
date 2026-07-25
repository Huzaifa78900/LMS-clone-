import React, { useState } from 'react';
import {
  Upload,
  FileText,
  Save,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Trash2,
  Clock
} from 'lucide-react';
import { Course, StudyNote } from '../../types';

interface NotesUploadProps {
  courses: Course[];
  notes: StudyNote[];
  onAddNote: (noteData: Omit<StudyNote, 'id'>) => Promise<void>;
}

export function NotesUpload({ courses, notes, onAddNote }: NotesUploadProps) {
  const [title, setTitle] = useState('');
  const [courseCode, setCourseCode] = useState(courses[0]?.code || 'CS-402');
  const [description, setDescription] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [fileSize, setFileSize] = useState('2.4 MB');
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setSuccess(false);
    try {
      await onAddNote({
        title,
        courseCode,
        uploadedBy: 'Dr. Huzaifa',
        uploadedAt: 'Oct 24, 2026',
        fileSize: fileSize || '2.5 MB',
        fileUrl: fileUrl || '#',
        description
      });
      setSuccess(true);
      setTitle('');
      setDescription('');
      setFileUrl('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error adding study note:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="relative z-10 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold border border-indigo-500/30">
            <Upload className="w-3.5 h-3.5" />
            <span>Course Study Materials Hub</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">Upload Lecture Notes & Slides</h2>
          <p className="text-xs text-slate-300">
            Publish lecture slides, lab manuals, and syllabus guidelines for enrolled students.
          </p>
        </div>
      </div>

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Study note published successfully! Students can now download it from their portal.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Upload New Note */}
        <div className="lg:col-span-5 bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="font-extrabold text-base text-slate-900">Upload New Resource Document</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Course Section</label>
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
              <label className="block text-xs font-bold text-slate-700 mb-1">Note Title / Document Name</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Chapter 4: Dynamic Programming Slides"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Description / Key Topics</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Covers Memoization vs Tabulation, Rod Cutting Problem, and Matrix Chain Multiplication..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Document Link / URL</label>
                <input
                  type="text"
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  placeholder="https://nexus.edu/notes/dp.pdf"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">File Size</label>
                <input
                  type="text"
                  value={fileSize}
                  onChange={(e) => setFileSize(e.target.value)}
                  placeholder="e.g. 3.2 MB"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full sleek-button-primary py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              <span>{uploading ? 'Publishing...' : 'Publish Material to Students'}</span>
            </button>
          </form>
        </div>

        {/* Right List: Already Uploaded Notes */}
        <div className="lg:col-span-7 bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="font-extrabold text-base text-slate-900">Published Course Repository</h3>

          <div className="space-y-3">
            {notes.map((note) => (
              <div
                key={note.id || note.title}
                className="p-4 bg-slate-50/80 border border-slate-200/80 rounded-2xl flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-md font-black text-[10px]">
                      {note.courseCode}
                    </span>
                    <h4 className="font-extrabold text-xs text-slate-900">{note.title}</h4>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{note.description}</p>
                  <p className="text-[10px] text-slate-400">
                    Uploaded on {note.uploadedAt} • Size: {note.fileSize}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={note.fileUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold"
                  >
                    View File
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
