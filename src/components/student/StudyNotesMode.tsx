import React, { useState } from 'react';
import {
  FileText,
  Download,
  BookOpen,
  Sparkles,
  Search,
  Filter,
  ExternalLink,
  Tag,
  Clock
} from 'lucide-react';
import { StudyNote } from '../../types';

interface StudyNotesModeProps {
  notes: StudyNote[];
}

export function StudyNotesMode({ notes }: StudyNotesModeProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === 'All' || note.courseCode === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="relative z-10 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Course Resource Directory</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">Lecture Notes & Handouts</h2>
          <p className="text-xs text-slate-300">
            Access slides, lab references, and course reading materials shared by your professors.
          </p>
        </div>

        {/* Search & Course Filters */}
        <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search notes or topics..."
              className="bg-slate-800 border border-slate-700 text-white rounded-xl pl-9 pr-3.5 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-48"
            />
          </div>

          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Courses</option>
            <option value="CS-402">CS-402 Advanced Algorithms</option>
            <option value="DS-201">DS-201 Database Management</option>
            <option value="AI-305">AI-305 Neural Networks</option>
          </select>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredNotes.map((note) => (
          <div
            key={note.id || note.title}
            className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[11px] font-extrabold border border-indigo-100">
                  {note.courseCode}
                </span>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  {note.fileSize}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-sm text-slate-900 line-clamp-1">{note.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">{note.description}</p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>Instructor: {note.uploadedBy}</span>
                <span className="flex items-center gap-1 text-slate-400">
                  <Clock className="w-3 h-3" />
                  {note.uploadedAt}
                </span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-600 font-bold">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>PDF Document</span>
              </div>

              <a
                href={note.fileUrl || '#download'}
                download={note.title}
                onClick={(e) => {
                  if (!note.fileUrl || note.fileUrl === '#') {
                    e.preventDefault();
                    alert(`Downloading study note: ${note.title}`);
                  }
                }}
                className="sleek-button-primary px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
