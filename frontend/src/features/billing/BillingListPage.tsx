import React, { useEffect, useState } from 'react';
import { billingApi } from '../../lib/api';

export default function BillingListPage() {
  const [bills, setBills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [payingId, setPayingId] = useState<string | null>(null);

  const loadBills = () => {
    setLoading(true);
    billingApi.getAll()
      .then(data => { setBills(data); setLoading(false); })
      .catch(() => { setError('Failed to load billing data. Ensure backend is running.'); setLoading(false); });
  };

  useEffect(() => { loadBills(); }, []);

  const handlePay = async (id: string) => {
    setPayingId(id);
    try {
      await billingApi.recordPayment(id, 'CASH');
      loadBills();
    } catch (e: any) {
      alert('Payment failed: ' + (e.response?.data?.message || e.message));
    } finally {
      setPayingId(null);
    }
  };

  const totalRevenue = bills.filter(b => b.status === 'PAID').reduce((sum, b) => sum + Number(b.totalDue || 0), 0);
  const outstanding = bills.filter(b => b.status === 'PENDING').reduce((sum, b) => sum + Number(b.totalDue || 0), 0);
  const pendingCount = bills.filter(b => b.status === 'PENDING').length;
  const paidCount = bills.filter(b => b.status === 'PAID').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold text-on-surface">Billing Overview</h2>
          <p className="text-sm text-on-surface-variant">Real-time financial status — HAPMS Clinical Portal</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-xl text-sm hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Export Reports
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-outline-variant p-5 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <span className="text-xs font-bold text-green-600">Paid</span>
          </div>
          <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Total Revenue</p>
          <h3 className="text-xl font-bold text-primary mt-1">${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
        </div>

        <div className="bg-white border border-outline-variant p-5 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-error/10 rounded-xl flex items-center justify-center text-error">
              <span className="material-symbols-outlined">pending_actions</span>
            </div>
            <span className="text-xs font-bold text-error">{pendingCount} bills</span>
          </div>
          <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Outstanding</p>
          <h3 className="text-xl font-bold text-on-surface mt-1">${outstanding.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
        </div>

        <div className="bg-white border border-outline-variant p-5 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined">receipt_long</span>
            </div>
            <span className="text-xs text-on-surface-variant font-bold">Total</span>
          </div>
          <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Total Bills</p>
          <h3 className="text-xl font-bold text-on-surface mt-1">{bills.length}</h3>
        </div>

        <div className="bg-white border border-outline-variant p-5 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-tertiary/10 rounded-xl flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined">trending_up</span>
            </div>
            <span className="text-xs text-primary font-bold">Rate</span>
          </div>
          <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Collection Rate</p>
          <h3 className="text-xl font-bold text-on-surface mt-1">
            {bills.length ? Math.round((paidCount / bills.length) * 100) : 0}%
          </h3>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
          <h3 className="font-semibold text-on-surface">Recent Invoices</h3>
          <span className="text-xs text-on-surface-variant">{bills.length} total</span>
        </div>

        {error ? (
          <div className="p-8 text-center">
            <span className="material-symbols-outlined text-error text-4xl block mb-2">cloud_off</span>
            <p className="text-sm text-error">{error}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-surface-container-lowest text-[10px] uppercase tracking-wider text-on-surface-variant border-b border-outline-variant">
                  <th className="px-6 py-4">Patient</th>
                  <th className="px-6 py-4">Total Due</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Method</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {loading ? (
                  [...Array(4)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={6} className="px-6 py-4">
                        <div className="h-4 bg-surface-container-high rounded w-full" />
                      </td>
                    </tr>
                  ))
                ) : bills.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-on-surface-variant">
                      <span className="material-symbols-outlined text-4xl block mb-2">receipt_long</span>
                      No bills generated yet.
                    </td>
                  </tr>
                ) : (
                  bills.map(bill => (
                    <tr key={bill.id} className="hover:bg-primary/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                            {(bill.patient?.firstName || '?').charAt(0)}{(bill.patient?.lastName || '').charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-on-surface">{bill.patient?.firstName} {bill.patient?.lastName}</p>
                            <p className="text-[10px] text-on-surface-variant">{bill.patient?.mrn}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-sm">${Number(bill.totalDue).toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          bill.status === 'PAID' ? 'bg-green-100 text-green-700' :
                          bill.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-error-container text-error'
                        }`}>{bill.status}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-on-surface-variant">{bill.paymentMethod || '—'}</td>
                      <td className="px-6 py-4 text-sm text-on-surface-variant">{bill.createdAt?.split('T')[0] || '—'}</td>
                      <td className="px-6 py-4 text-right">
                        {bill.status === 'PENDING' && (
                          <button
                            onClick={() => handlePay(bill.id)}
                            disabled={payingId === bill.id}
                            className="px-3 py-1 text-xs font-bold bg-primary text-white rounded-lg hover:opacity-90 transition-colors disabled:opacity-50"
                          >
                            {payingId === bill.id ? 'Processing...' : 'Record Payment'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
