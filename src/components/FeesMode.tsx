import React, { useState } from 'react';
import { FeeStatement } from '../types';
import { CreditCard, Download, CheckCircle, Clock, ShieldCheck } from 'lucide-react';

interface FeesModeProps {
  statements: FeeStatement[];
  onPayFee: (invoiceRef: string) => void;
}

export const FeesMode: React.FC<FeesModeProps> = ({ statements, onPayFee }) => {
  const [processing, setProcessing] = useState<string | null>(null);

  const handlePay = (invoiceRef: string) => {
    setProcessing(invoiceRef);
    setTimeout(() => {
      onPayFee(invoiceRef);
      setProcessing(null);
    }, 1200);
  };

  const totalPaid = statements.filter(s => s.status === 'Paid').reduce((acc, curr) => acc + curr.amount, 0);
  const totalPending = statements.filter(s => s.status !== 'Paid').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Tuition & Financial Account</h2>
        <p className="text-xs text-slate-500 font-medium">Fee Statements & Payment Portal</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="sleek-card rounded-2xl p-6">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Settled Fees</p>
          <p className="text-3xl font-extrabold text-emerald-600 mt-1">${totalPaid.toLocaleString()}</p>
        </div>
        <div className="sleek-card rounded-2xl p-6">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Outstanding Due</p>
          <p className="text-3xl font-extrabold text-amber-600 mt-1">${totalPending.toLocaleString()}</p>
        </div>
      </div>

      {/* Statements Table */}
      <div className="sleek-card rounded-2xl p-6">
        <h3 className="text-base font-extrabold text-slate-900 mb-4">Fee Statements History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200/80 text-slate-500 uppercase font-extrabold">
                <th className="py-3.5 px-4">Invoice #</th>
                <th className="py-3.5 px-4">Term</th>
                <th className="py-3.5 px-4">Description</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Due Date</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {statements.map((stmt) => (
                <tr key={stmt.invoiceRef} className="hover:bg-indigo-50/20 transition-colors">
                  <td className="py-4 px-4 font-extrabold text-slate-900">{stmt.invoiceRef}</td>
                  <td className="py-4 px-4 text-slate-600 font-medium">{stmt.term}</td>
                  <td className="py-4 px-4 font-semibold text-slate-800">{stmt.description}</td>
                  <td className="py-4 px-4 font-extrabold text-slate-900">${stmt.amount.toLocaleString()}</td>
                  <td className="py-4 px-4 text-slate-500 font-medium">{stmt.dueDate}</td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold inline-block shadow-2xs ${
                        stmt.status === 'Paid'
                          ? 'bg-emerald-100/80 text-emerald-800 border border-emerald-200/50'
                          : 'bg-amber-100/80 text-amber-800 border border-amber-200/50'
                      }`}
                    >
                      {stmt.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    {stmt.status === 'Paid' ? (
                      <button
                        onClick={() => alert(`Downloading Receipt for ${stmt.invoiceRef}`)}
                        className="p-2 text-slate-500 hover:text-indigo-600 transition-colors rounded-lg hover:bg-slate-100"
                        title="Download Receipt PDF"
                      >
                        <Download className="w-4 h-4 inline" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePay(stmt.invoiceRef)}
                        disabled={processing === stmt.invoiceRef}
                        className="px-3.5 py-1.5 sleek-button-primary rounded-lg font-bold transition-all text-xs"
                      >
                        {processing === stmt.invoiceRef ? 'Processing...' : 'Pay Online'}
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
  );
};
