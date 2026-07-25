import React from 'react';
import { Calendar, Clock, MapPin, Sparkles, BookOpen } from 'lucide-react';
import { TimetableEntry } from '../../types';

interface TeacherTimetableProps {
  timetable: TimetableEntry[];
}

export function TeacherTimetable({ timetable }: TeacherTimetableProps) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="relative z-10 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold border border-indigo-500/30">
            <Calendar className="w-3.5 h-3.5" />
            <span>Weekly Faculty Teaching Schedule</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">Lectures & Lab Schedule</h2>
          <p className="text-xs text-slate-300">
            Official university timetable including assigned lecture halls, lab sessions, and office hours.
          </p>
        </div>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {days.map((day) => {
          const dayEntries = timetable.filter((t) => t.day === day);

          return (
            <div
              key={day}
              className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3"
            >
              <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-extrabold text-xs text-indigo-700 uppercase tracking-wider">{day}</h3>
                <span className="text-[10px] font-bold text-slate-400">{dayEntries.length} Sessions</span>
              </div>

              <div className="space-y-2.5">
                {dayEntries.length > 0 ? (
                  dayEntries.map((entry) => (
                    <div
                      key={entry.id || entry.time}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1"
                    >
                      <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-md text-[10px] font-black">
                        {entry.courseCode || entry.code}
                      </span>
                      <h4 className="font-extrabold text-xs text-slate-900 mt-1">{entry.courseTitle || entry.title}</h4>
                      <p className="text-[10px] font-semibold text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-indigo-500" />
                        {entry.time}
                      </p>
                      <p className="text-[10px] font-semibold text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        Room: {entry.roomNumber || entry.room}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic py-4 text-center">No scheduled lectures</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
