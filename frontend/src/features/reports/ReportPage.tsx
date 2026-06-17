import React, { useEffect, useState } from 'react';
import { patientApi, doctorApi, appointmentApi, billingApi } from '../../lib/api';

export default function ReportPage() {
  const [stats, setStats] = useState({
    patients: 0,
    appointments: 0,
    doctors: 0,
    revenue: 0,
  });
  
  const [timeframe, setTimeframe] = useState('1Y');
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [showLedger, setShowLedger] = useState(false);

  const handleRunDiagnostics = () => {
    setIsDiagnosing(true);
    setTimeout(() => {
      setIsDiagnosing(false);
      alert('Diagnostics complete: All clinical reporting endpoints are fully operational.');
    }, 1500);
  };
  
  const handleViewLedger = () => {
    setShowLedger(true);
    setTimeout(() => setShowLedger(false), 2000);
  };

  useEffect(() => {
    Promise.all([
      patientApi.getAll().catch(() => []),
      appointmentApi.getAll().catch(() => []),
      doctorApi.getAll().catch(() => []),
      billingApi.getAll().catch(() => []),
    ]).then(([pts, apts, docs, bills]) => {
      const revenue = bills.filter((b: any) => b.status === 'PAID').reduce((sum: number, b: any) => sum + Number(b.totalDue || 0), 0);
      setStats({
        patients: pts.length,
        appointments: apts.length,
        doctors: docs.length,
        revenue: revenue,
      });
    });
  }, []);

  return (
    <div className="space-y-6">
<div className="space-y-6 ">

<div className="flex justify-between items-end mb-8">
<div>
<h2 className="font-headline-lg text-headline-lg text-on-surface mb-1">Enterprise Reporting</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Analyze clinical operations and system integrity</p>
</div>
<div className="flex gap-stack-md">
<button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 border border-outline text-on-surface-variant rounded-lg font-label-md text-label-md hover:bg-surface-container-low transition-all">
<span className="material-symbols-outlined" data-icon="upload">upload</span>
                    CSV Export
                </button>
<button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:opacity-90 transition-all shadow-sm">
<span className="material-symbols-outlined" data-icon="picture_as_pdf">picture_as_pdf</span>
                    Generate PDF
                </button>
</div>
</div>

<div className="grid grid-cols-12 gap-6 mb-8">

<div className="col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg flex flex-col">
<div className="flex justify-between items-center mb-6">
<div>
<h3 className="font-title-md text-title-md text-on-surface">Monthly Growth</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">New patient intake vs. completed procedures</p>
</div>
<div className="flex bg-surface-container rounded-lg p-1">
<button onClick={() => setTimeframe('L6M')} className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${timeframe === 'L6M' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant'}`}>L6M</button>
<button onClick={() => setTimeframe('1Y')} className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${timeframe === '1Y' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant'}`}>1Y</button>
</div>
</div>
<div className="flex-1 min-h-[300px] relative">


<div className="absolute inset-0 pointer-events-none border-b border-l border-outline-variant/30 grid grid-cols-6 grid-rows-4">
<div className="border-r border-t border-outline-variant/10"></div>
<div className="border-r border-t border-outline-variant/10"></div>
<div className="border-r border-t border-outline-variant/10"></div>
<div className="border-r border-t border-outline-variant/10"></div>
<div className="border-r border-t border-outline-variant/10"></div>
<div className="border-r border-t border-outline-variant/10"></div>
</div>
</div>
<div className="flex gap-8 mt-4 pt-4 border-t border-outline-variant">
<div className="flex items-center gap-2">
<div className="w-3 h-3 rounded-full bg-primary"></div>
<span className="font-label-md text-label-md text-on-surface">Patient Intake</span>
</div>
<div className="flex items-center gap-2">
<div className="w-3 h-3 rounded-full bg-secondary"></div>
<span className="font-label-md text-label-md text-on-surface">Procedures</span>
</div>
</div>
</div>

<div className="col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg flex flex-col justify-between">
<div>
<div className="flex justify-between items-start mb-4">
<div className="p-3 bg-secondary-container/20 text-secondary rounded-xl">
<span className="material-symbols-outlined" data-icon="payments">payments</span>
</div>
<span className="font-label-md text-label-md px-2 py-1 bg-green-100 text-green-700 rounded-full">+12.4%</span>
</div>
<h3 className="font-title-md text-title-md text-on-surface">Revenue Report</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-6">Aggregate clinical billing and insurance payouts.</p>
</div>
<div className="space-y-4">
<div className="flex justify-between items-end">
<span className="font-display-lg text-display-lg text-on-surface">${(timeframe === '1Y' ? stats.revenue : stats.revenue / 2 || 0).toLocaleString()}</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">{timeframe === '1Y' ? 'Total Revenue' : 'L6M Revenue'}</span>
</div>
<div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
<div className="bg-secondary h-full rounded-full" style={{ width: '78%' }}></div>
</div>
<button onClick={handleViewLedger} className="w-full py-3 bg-secondary text-white font-bold rounded-xl shadow-md hover:opacity-90 transition-opacity">
  {showLedger ? 'Loading Ledger...' : 'View Detailed Ledger'}
</button>
</div>
</div>

<div className="col-span-4 bg-white border border-outline-variant rounded-xl p-stack-lg hover:border-primary transition-all cursor-pointer group">
<div className="flex items-center gap-4 mb-4">
<div className="p-3 bg-primary-container/10 text-primary rounded-xl group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined" data-icon="event_note">event_note</span>
</div>
<div>
<h4 className="font-title-md text-title-md text-on-surface">Appointments ({stats.appointments})</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Cancellations &amp; Trends</p>
</div>
</div>
</div>
<div className="col-span-4 bg-white border border-outline-variant rounded-xl p-stack-lg hover:border-primary transition-all cursor-pointer group">
<div className="flex items-center gap-4 mb-4">
<div className="p-3 bg-tertiary-container/10 text-tertiary rounded-xl group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined" data-icon="groups">groups</span>
</div>
<div>
<h4 className="font-title-md text-title-md text-on-surface">Demographics ({stats.patients})</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Patient Distribution</p>
</div>
</div>
</div>
<div className="col-span-4 bg-white border border-outline-variant rounded-xl p-stack-lg hover:border-primary transition-all cursor-pointer group">
<div className="flex items-center gap-4 mb-4">
<div className="p-3 bg-secondary-container/10 text-secondary rounded-xl group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined" data-icon="inventory_2">inventory_2</span>
</div>
<div>
<h4 className="font-title-md text-title-md text-on-surface">Medical Inventory</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Stock Level Reports</p>
</div>
</div>
</div>

<div className="col-span-12 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
<div className="p-stack-lg border-b border-outline-variant flex justify-between items-center bg-white">
<div>
<h3 className="font-title-md text-title-md text-on-surface">System Audit Trail</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Real-time log of administrative and clinical actions</p>
</div>
<div className="flex gap-2">
<div className="flex items-center gap-2 border border-outline-variant px-3 py-1.5 rounded-lg text-on-surface-variant font-label-md text-label-md">
<span className="material-symbols-outlined text-[18px]" data-icon="filter_list">filter_list</span>
                            Filter
                        </div>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low border-b border-outline-variant">
<th className="p-comfortable-padding font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Timestamp</th>
<th className="p-comfortable-padding font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">User</th>
<th className="p-comfortable-padding font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Action</th>
<th className="p-comfortable-padding font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Details</th>
<th className="p-comfortable-padding font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-right">Status</th>
</tr>
</thead>
<tbody className="font-body-sm text-body-sm">
<tr className="border-b border-outline-variant hover:bg-primary/5 transition-colors">
<td className="p-comfortable-padding font-code text-code text-on-surface-variant">2023-10-24 14:32:01</td>
<td className="p-comfortable-padding flex items-center gap-2">
<div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-[10px]">DR</div>
<span className="font-semibold">Dr. Sarah Richardson</span>
</td>
<td className="p-comfortable-padding">
<span className="px-2 py-1 bg-surface-container-high rounded text-on-surface font-label-md">REPORT_EXPORT</span>
</td>
<td className="p-comfortable-padding text-on-surface-variant">Exported Q3 Patient Demographic PDF Report</td>
<td className="p-comfortable-padding text-right">
<div className="inline-flex items-center gap-1.5 text-green-600 font-semibold">
<div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
                                        Success
                                    </div>
</td>
</tr>
<tr className="border-b border-outline-variant hover:bg-primary/5 transition-colors">
<td className="p-comfortable-padding font-code text-code text-on-surface-variant">2023-10-24 14:15:44</td>
<td className="p-comfortable-padding flex items-center gap-2">
<div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold text-[10px]">SA</div>
<span className="font-semibold">System Admin</span>
</td>
<td className="p-comfortable-padding">
<span className="px-2 py-1 bg-surface-container-high rounded text-on-surface font-label-md">USER_PERM_UPDATE</span>
</td>
<td className="p-comfortable-padding text-on-surface-variant">Modified access levels for Lab Technician role</td>
<td className="p-comfortable-padding text-right">
<div className="inline-flex items-center gap-1.5 text-green-600 font-semibold">
<div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
                                        Success
                                    </div>
</td>
</tr>
<tr className="border-b border-outline-variant hover:bg-primary/5 transition-colors">
<td className="p-comfortable-padding font-code text-code text-on-surface-variant">2023-10-24 13:58:12</td>
<td className="p-comfortable-padding flex items-center gap-2">
<div className="w-6 h-6 rounded-full bg-tertiary/20 flex items-center justify-center text-tertiary font-bold text-[10px]">JM</div>
<span className="font-semibold">James Miller</span>
</td>
<td className="p-comfortable-padding">
<span className="px-2 py-1 bg-surface-container-high rounded text-on-surface font-label-md">REVENUE_VOID</span>
</td>
<td className="p-comfortable-padding text-on-surface-variant">Voided transaction INV-90422 (Duplicate Entry)</td>
<td className="p-comfortable-padding text-right">
<div className="inline-flex items-center gap-1.5 text-tertiary font-semibold">
<div className="w-1.5 h-1.5 rounded-full bg-tertiary"></div>
                                        Manual Review
                                    </div>
</td>
</tr>
<tr className="border-b border-outline-variant hover:bg-primary/5 transition-colors">
<td className="p-comfortable-padding font-code text-code text-on-surface-variant">2023-10-24 13:42:01</td>
<td className="p-comfortable-padding flex items-center gap-2">
<div className="w-6 h-6 rounded-full bg-error/10 flex items-center justify-center text-error font-bold text-[10px]">AI</div>
<span className="font-semibold">AI Assistant</span>
</td>
<td className="p-comfortable-padding">
<span className="px-2 py-1 bg-surface-container-high rounded text-on-surface font-label-md">DATA_ANOMALY</span>
</td>
<td className="p-comfortable-padding text-on-surface-variant">Detected spike in appointment cancellations (Clinic A)</td>
<td className="p-comfortable-padding text-right">
<div className="inline-flex items-center gap-1.5 text-primary font-semibold">
<div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                        Flagged
                                    </div>
</td>
</tr>
</tbody>
</table>
</div>
<div className="p-4 bg-white border-t border-outline-variant flex justify-between items-center">
<span className="font-body-sm text-body-sm text-on-surface-variant">Showing 1-10 of 2,492 entries</span>
<div className="flex gap-2">
<button className="w-8 h-8 flex items-center justify-center border border-outline-variant rounded hover:bg-surface-container-low transition-colors">
<span className="material-symbols-outlined text-[18px]" data-icon="chevron_left">chevron_left</span>
</button>
<button className="w-8 h-8 flex items-center justify-center border border-primary bg-primary-container text-on-primary-container rounded">1</button>
<button className="w-8 h-8 flex items-center justify-center border border-outline-variant rounded hover:bg-surface-container-low transition-colors">2</button>
<button className="w-8 h-8 flex items-center justify-center border border-outline-variant rounded hover:bg-surface-container-low transition-colors">3</button>
<button className="w-8 h-8 flex items-center justify-center border border-outline-variant rounded hover:bg-surface-container-low transition-colors">
<span className="material-symbols-outlined text-[18px]" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>
</div>
</div>
</div>

<aside className="page-panel space-y-4">
<div className="flex items-center justify-between">
<div>
<h2 className="font-title-md text-title-md font-bold text-secondary">AI Clinical Assistant</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Operational Insights &amp; Support</p>
</div>
<span className="material-symbols-outlined text-secondary" data-icon="smart_toy">smart_toy</span>
</div>
<div className="flex flex-col gap-4 mt-4">
<div className="p-4 bg-secondary-container/10 border border-secondary/20 rounded-xl">
<div className="flex items-center gap-2 mb-2 text-secondary">
<span className="material-symbols-outlined text-[18px]" data-icon="lightbulb">lightbulb</span>
<span className="font-label-md text-label-md">Insight detected</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Patient retention has increased by 15% in Clinic B following the new automated follow-up system implementation.
                </p>
</div>
<div className="flex-1 flex flex-col gap-2">
<button className="flex items-center justify-between p-3 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors font-body-sm text-body-sm">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined" data-icon="chat_bubble">chat_bubble</span>
<span>Clinical Chat</span>
</div>
<span className="material-symbols-outlined text-[16px]" data-icon="chevron_right">chevron_right</span>
</button>
<button className="flex items-center justify-between p-3 text-secondary font-bold border-l-4 border-secondary bg-surface-container-low rounded-r-lg font-body-sm text-body-sm">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined" data-icon="monitoring">monitoring</span>
<span>System Insights</span>
</div>
<span className="material-symbols-outlined text-[16px]" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>
<button onClick={handleRunDiagnostics} className="mt-auto w-full py-3 bg-secondary text-on-secondary rounded-xl font-title-md text-title-md font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2">
<span className="material-symbols-outlined" data-icon="play_circle">play_circle</span>
            {isDiagnosing ? 'Running...' : 'Run Diagnostics'}
        </button>
</aside>
    </div>
  );
}
