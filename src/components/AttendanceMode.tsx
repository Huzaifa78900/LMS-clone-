import React from 'react';
import { AttendanceRecord } from '../types';
import { CheckSquare, AlertTriangle, CheckCircle, Calculator } from 'lucide-react';

interface AttendanceModeProps {
  records: AttendanceRecord[];
}

export const AttendanceMode: React.FC<AttendanceModeProps> = ({ records }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Course Attendance</h2>
        <p className="text-xs text-slate-500 font-medium">Track eligibility and class attendance thresholds (75% Minimum Required)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {records.map((rec) => {
          const pct = Math.round((rec.attendedClasses / rec.totalClasses) * 100);
          const isWarning = pct < 75;
          const margin = Math.floor((rec.attendedClasses - 0.75 * rec.totalClasses) / 0.75);

          return (
            <div
              key={rec.code}
              className={`sleek-card rounded-2xl p-6 ${
                isWarning ? 'border-amber-300/80' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200/60 rounded-lg text-xs font-extrabold">
                    {rec.code}
                  </span>
                  <h4 className="text-base font-extrabold text-slate-900 mt-2">{rec.title}</h4>
                </div>
                <div className="text-right">
                  <span
                    className={`text-2xl font-black ${
                      isWarning ? 'text-amber-600' : 'text-emerald-600'
                    }`}
                  >
                    {pct}%
                  </span>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Overall</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100/80 h-2.5 rounded-full overflow-hidden mb-4">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isWarning ? 'bg-amber-500' : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600 font-medium pt-3 border-t border-slate-100">
                <span>
                  Attended: <strong className="text-slate-900 font-bold">{rec.attendedClasses}</strong> / {rec.totalClasses} classes
                </span>
                {margin >= 0 ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Can miss {margin} upcoming
                  </span>
                ) : (
                  <span className="text-amber-700 font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Need {Math.abs(margin)} more classes
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
