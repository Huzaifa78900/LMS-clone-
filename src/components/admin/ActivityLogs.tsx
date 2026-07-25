import React, { useState } from 'react';
import { Activity, ShieldCheck, Search, Filter, Clock } from 'lucide-react';
import { ActivityLog } from '../../types';

interface ActivityLogsProps {
  activityLogs: ActivityLog[];
}

export function ActivityLogs({ activityLogs }: ActivityLogsProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = activityLogs.filter(
    (l) =>
      l.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.ipAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="relative z-10 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-bold border border-amber-500/30">
            <Activity className="w-3.5 h-3.5" />
            <span>System Audit & Security Monitor</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">University Security Audit Trail</h2>
          <p className="text-xs text-slate-300">
            Real-time tracking of grade modifications, authentication events, and administrative actions.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search log user, action, or IP address..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <span className="text-xs font-bold text-slate-500">Log Entries: {filteredLogs.length}</span>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden p-6 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-600 font-extrabold uppercase text-[10px]">
              <tr>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">User & Identity</th>
                <th className="px-4 py-3">Action Description</th>
                <th className="px-4 py-3">IP Address</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredLogs.map((l) => (
                <tr key={l.id || l.timestamp} className="hover:bg-slate-50/80">
                  <td className="px-4 py-3 text-slate-500 font-bold">{l.timestamp}</td>
                  <td className="px-4 py-3 font-extrabold text-slate-900">{l.user}</td>
                  <td className="px-4 py-3 text-slate-700">{l.action}</td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-[11px]">{l.ipAddress}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md font-black text-[10px]">
                      Verified
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
