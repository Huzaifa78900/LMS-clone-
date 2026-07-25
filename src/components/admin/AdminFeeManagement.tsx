import React, { useState } from 'react';
import { DollarSign, Plus, CheckCircle2, AlertCircle, Search, Filter, Save } from 'lucide-react';
import { FeeStatement, StudentProfile } from '../../types';

interface AdminFeeManagementProps {
  students: StudentProfile[];
  feeStatements: FeeStatement[];
  onAddFeeStatement: (fee: Omit<FeeStatement, 'id'>) => Promise<void>;
  onUpdateFeeStatus: (invoiceRef: string, status: 'Paid' | 'Pending' | 'Overdue') => Promise<void>;
}

export function AdminFeeManagement({
  students,
  feeStatements,
  onAddFeeStatement,
  onUpdateFeeStatus
}: AdminFeeManagementProps) {
  const [selectedStudent, setSelectedStudent] = useState(students[0]?.studentId || 'UG-2024-8842');
  const [amount, setAmount] = useState(2850);
  const [description, setDescription] = useState('Fall 2026 Tuition Fee & Campus Amenities');
  const [dueDate, setDueDate] = useState('2026-11-15');
  const [issuing, setIssuing] = useState(false);

  const handleIssueFee = async (e: React.FormEvent) => {
    e.preventDefault();
    setIssuing(true);
    try {
      const invRef = `NEX-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      await onAddFeeStatement({
        user_id: 'default_student_001',
        invoiceRef: invRef,
        description,
        amount,
        dueDate,
        status: 'Pending',
        semester: 'Fall 2026'
      });
      alert(`Fee voucher ${invRef} issued successfully to student.`);
    } catch (err) {
      console.error('Error issuing fee statement:', err);
    } finally {
      setIssuing(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="relative z-10 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-bold border border-amber-500/30">
            <DollarSign className="w-3.5 h-3.5" />
            <span>University Finance & Tuition Accounts</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">Tuition Fee Ledger & Invoicing</h2>
          <p className="text-xs text-slate-300">
            Generate tuition fee challans, audit student payment receipts, and update clearance statuses.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Issue Voucher Form */}
        <div className="lg:col-span-5 bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
            <Plus className="w-4 h-4 text-indigo-600" />
            <span>Issue New Tuition Voucher</span>
          </h3>

          <form onSubmit={handleIssueFee} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Student</label>
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {students.map((s) => (
                  <option key={s.studentId} value={s.studentId}>
                    {s.name} ({s.studentId})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Description / Breakdown</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Fee Amount ($)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  required
                  min={100}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Payment Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={issuing}
              className="w-full sleek-button-primary py-3 rounded-xl text-xs font-bold shadow-md disabled:opacity-50"
            >
              {issuing ? 'Issuing Voucher...' : 'Issue Fee Challan'}
            </button>
          </form>
        </div>

        {/* Financial Voucher Audit List */}
        <div className="lg:col-span-7 bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="font-extrabold text-base text-slate-900">Tuition Accounts Audit Log</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-600 font-extrabold uppercase text-[10px]">
                <tr>
                  <th className="px-4 py-3">Invoice Ref</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Due Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {feeStatements.map((fee) => (
                  <tr key={fee.id || fee.invoiceRef} className="hover:bg-slate-50/80">
                    <td className="px-4 py-3">
                      <span className="font-extrabold text-slate-900 block">{fee.invoiceRef}</span>
                      <span className="text-[10px] text-slate-500">{fee.description}</span>
                    </td>
                    <td className="px-4 py-3 font-black text-slate-900">${fee.amount}</td>
                    <td className="px-4 py-3 text-slate-500">{fee.dueDate}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-md font-black text-[10px] ${
                          fee.status === 'Paid'
                            ? 'bg-emerald-100 text-emerald-800'
                            : fee.status === 'Overdue'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {fee.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {fee.status !== 'Paid' && (
                        <button
                          onClick={() => onUpdateFeeStatus(fee.invoiceRef, 'Paid')}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-lg shadow-2xs"
                        >
                          Mark Paid
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
