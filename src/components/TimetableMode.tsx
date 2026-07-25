import React, { useState } from 'react';
import { TimetableEntry } from '../types';
import { Clock, MapPin, User, Calendar, Plus } from 'lucide-react';

interface TimetableModeProps {
  entries: TimetableEntry[];
}

export const TimetableMode: React.FC<TimetableModeProps> = ({ entries }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const [activeDay, setActiveDay] = useState('Monday');

  const filtered = entries.filter((e) => e.day === activeDay);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Class Timetable</h2>
          <p className="text-xs text-slate-500 font-medium">Spring Semester 2024 Schedule</p>
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-200/80">
        {days.map((d) => (
          <button
            key={d}
            onClick={() => setActiveDay(d)}
            className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all ${
              activeDay === d
                ? 'sleek-button-primary'
                : 'bg-white/80 text-slate-600 hover:bg-slate-100 border border-slate-200/80 shadow-2xs'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Timetable List for Day */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full p-12 text-center sleek-card rounded-2xl text-slate-500 text-xs font-semibold">
            No scheduled classes for {activeDay}. Enjoy your study period!
          </div>
        ) : (
          filtered.map((item, i) => (
            <div
              key={i}
              className="sleek-card rounded-2xl p-5 group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200/60 rounded-lg text-xs font-extrabold">
                  {item.code}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold">
                  <Clock className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{item.time}</span>
                </div>
              </div>

              <h4 className="text-sm font-extrabold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                {item.title}
              </h4>

              <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{item.room}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>{item.instructor}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
