import React from 'react';

export default function DoctorDashboard() {
  return (
    <div className="page-with-panel">
      <div className="page-main space-y-6">

<div className="grid grid-cols-12 gap-6 mb-6">
<div className="col-span-8">
<h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Welcome back, Dr. Thorne</h2>
<p className="text-on-surface-variant font-body-lg">You have 12 appointments today. 3 patients are currently waiting in the queue.</p>
</div>
<div className="col-span-4 flex justify-end items-start gap-3">
<div className="bg-error-container text-on-error-container px-4 py-3 rounded-xl border border-error/10 flex items-center gap-3 animate-pulse">
<span className="material-symbols-outlined" >warning</span>
<div>
<p className="font-label-md">2 Critical Lab Results</p>
<p className="text-[11px] opacity-80">Action required immediately</p>
</div>
</div>
</div>
</div>

<div className="grid grid-cols-12 gap-6">

<section className="col-span-4 glass-card rounded-xl p-stack-lg shadow-sm">
<div className="flex items-center justify-between mb-6">
<h3 className="font-title-md text-title-md flex items-center gap-2">
<span className="material-symbols-outlined text-primary">schedule</span>
                            Today's Schedule
                        </h3>
<button className="text-primary font-label-md hover:underline">View Calendar</button>
</div>
<div className="space-y-4 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant/30">

<div className="relative pl-8 group">
<div className="absolute left-0 top-1 w-6 h-6 bg-primary rounded-full border-4 border-white shadow-sm z-10"></div>
<div className="p-3 bg-primary-container/10 border border-primary/20 rounded-lg group-hover:bg-primary-container/20 transition-colors">
<span className="font-label-md text-primary">09:00 AM - 09:30 AM</span>
<h4 className="font-body-md font-bold text-on-surface mt-1">Arthur Morgan</h4>
<p className="text-body-sm text-on-surface-variant">Post-op follow-up (Knee)</p>
</div>
</div>
<div className="relative pl-8 group">
<div className="absolute left-0 top-1 w-6 h-6 bg-surface-container-highest rounded-full border-4 border-white shadow-sm z-10"></div>
<div className="p-3 bg-white border border-outline-variant rounded-lg hover:border-primary transition-colors">
<span className="font-label-md text-outline">10:00 AM - 10:45 AM</span>
<h4 className="font-body-md font-bold text-on-surface mt-1">Sadie Adler</h4>
<p className="text-body-sm text-on-surface-variant">Annual physical examination</p>
</div>
</div>
<div className="relative pl-8 group opacity-50">
<div className="absolute left-0 top-1 w-6 h-6 bg-surface-container-highest rounded-full border-4 border-white shadow-sm z-10"></div>
<div className="p-3 bg-white border border-outline-variant rounded-lg">
<span className="font-label-md text-outline">11:15 AM - 11:30 AM</span>
<h4 className="font-body-md font-bold text-on-surface mt-1">Dutch van der Linde</h4>
<p className="text-body-sm text-on-surface-variant">Consultation: Hypertension</p>
</div>
</div>
<div className="relative pl-8 group">
<div className="absolute left-0 top-1 w-6 h-6 bg-surface-container-highest rounded-full border-4 border-white shadow-sm z-10"></div>
<div className="p-3 bg-white border border-outline-variant rounded-lg hover:border-primary transition-colors">
<span className="font-label-md text-outline">12:00 PM - 12:30 PM</span>
<h4 className="font-body-md font-bold text-on-surface mt-1">John Marston</h4>
<p className="text-body-sm text-on-surface-variant">Emergency: Chest pain</p>
</div>
</div>
</div>
</section>

<section className="col-span-8 space-y-6">
<div className="glass-card rounded-xl shadow-sm overflow-hidden">
<div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
<h3 className="font-title-md text-title-md flex items-center gap-2">
<span className="material-symbols-outlined text-secondary">groups</span>
                                Patient Queue
                            </h3>
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded-full bg-error animate-pulse"></span>
<span className="text-body-sm font-semibold">3 Patients waiting</span>
</div>
</div>
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-slate-50 text-[11px] uppercase tracking-wider text-outline font-bold border-b border-outline-variant">
<th className="px-6 py-3">Patient</th>
<th className="px-6 py-3">Wait Time</th>
<th className="px-6 py-3">Priority</th>
<th className="px-6 py-3">Status</th>
<th className="px-6 py-3 text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">
<tr className="hover:bg-primary/5 transition-colors group">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-primary">AM</div>
<div>
<p className="font-body-md font-bold text-on-surface">Arthur Morgan</p>
<p className="text-[11px] text-on-surface-variant">#PT-8821 • 36y Male</p>
</div>
</div>
</td>
<td className="px-6 py-4 font-body-sm text-on-surface">12 mins</td>
<td className="px-6 py-4">
<span className="px-2 py-1 bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold rounded">HIGH</span>
</td>
<td className="px-6 py-4">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-primary"></span>
<span className="text-body-sm">In Lobby</span>
</div>
</td>
<td className="px-6 py-4 text-right">
<button className="bg-primary text-white px-4 py-1.5 rounded-lg text-body-sm font-semibold hover:bg-primary/90">Call Patient</button>
</td>
</tr>
<tr className="hover:bg-primary/5 transition-colors group">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-secondary">SA</div>
<div>
<p className="font-body-md font-bold text-on-surface">Sadie Adler</p>
<p className="text-[11px] text-on-surface-variant">#PT-1044 • 29y Female</p>
</div>
</div>
</td>
<td className="px-6 py-4 font-body-sm text-on-surface">24 mins</td>
<td className="px-6 py-4">
<span className="px-2 py-1 bg-surface-container-highest text-on-surface-variant text-[10px] font-bold rounded">NORMAL</span>
</td>
<td className="px-6 py-4">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="text-body-sm">Vitals Taken</span>
</div>
</td>
<td className="px-6 py-4 text-right">
<button className="border border-outline-variant text-on-surface px-4 py-1.5 rounded-lg text-body-sm font-semibold hover:bg-surface-container-low transition-colors">Call Patient</button>
</td>
</tr>
<tr className="hover:bg-primary/5 transition-colors group">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-primary">JM</div>
<div>
<p className="font-body-md font-bold text-on-surface">John Marston</p>
<p className="text-[11px] text-on-surface-variant">#PT-5529 • 42y Male</p>
</div>
</div>
</td>
<td className="px-6 py-4 font-body-sm text-on-surface">5 mins</td>
<td className="px-6 py-4">
<span className="px-2 py-1 bg-error-container text-on-error-container text-[10px] font-bold rounded">URGENT</span>
</td>
<td className="px-6 py-4">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-error"></span>
<span className="text-body-sm">Triage Room</span>
</div>
</td>
<td className="px-6 py-4 text-right">
<button className="bg-primary text-white px-4 py-1.5 rounded-lg text-body-sm font-semibold hover:bg-primary/90">Call Patient</button>
</td>
</tr>
</tbody>
</table>
</div>

<div className="grid grid-cols-2 gap-6">
<div className="glass-card rounded-xl p-stack-md border-l-4 border-l-error">
<div className="flex items-start justify-between">
<div>
<h4 className="font-title-md text-title-md text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-error">pill</span>
                                        Drug Interaction Warning
                                    </h4>
<p className="text-body-sm text-on-surface-variant mt-2">Patient <strong>Arthur Morgan</strong> has conflicting prescriptions: Warfarin + Ibuprofen.</p>
</div>
<span className="material-symbols-outlined text-error-container">priority_high</span>
</div>
<div className="mt-4 flex gap-3">
<button className="text-error font-bold text-[11px] uppercase tracking-wide px-3 py-1 bg-error-container rounded hover:bg-error-container/80">Review Interaction</button>
<button className="text-outline font-bold text-[11px] uppercase tracking-wide px-3 py-1 hover:bg-surface-container transition-colors rounded">Dismiss</button>
</div>
</div>
<div className="glass-card rounded-xl p-stack-md border-l-4 border-l-tertiary-container">
<div className="flex items-start justify-between">
<div>
<h4 className="font-title-md text-title-md text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-tertiary-container">history_edu</span>
                                        Prescription Alert
                                    </h4>
<p className="text-body-sm text-on-surface-variant mt-2">Refill request for <strong>Sadie Adler</strong> (Lisinopril 10mg) requires signature.</p>
</div>
<span className="material-symbols-outlined text-tertiary-fixed-dim">draw</span>
</div>
<div className="mt-4 flex gap-3">
<button className="text-white font-bold text-[11px] uppercase tracking-wide px-3 py-1 bg-tertiary-container rounded hover:bg-tertiary-container/80">E-Sign Now</button>
<button className="text-outline font-bold text-[11px] uppercase tracking-wide px-3 py-1 hover:bg-surface-container transition-colors rounded">View History</button>
</div>
</div>
</div>
</section>
</div>

<section className="mt-8 glass-card rounded-xl p-stack-lg shadow-sm">
<div className="flex items-center justify-between mb-8">
<h3 className="font-title-md text-title-md">Upcoming Consultations (Next 48h)</h3>
<div className="flex items-center gap-2">
<button className="p-1.5 hover:bg-surface-container rounded transition-colors"><span className="material-symbols-outlined">chevron_left</span></button>
<span className="font-label-md">Oct 24 - Oct 26</span>
<button className="p-1.5 hover:bg-surface-container rounded transition-colors"><span className="material-symbols-outlined">chevron_right</span></button>
</div>
</div>
<div className="grid grid-cols-4 gap-6">

<div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30">
<p className="font-label-md text-primary mb-3">TUE, OCT 24</p>
<div className="space-y-3">
<div className="bg-white p-3 rounded-lg border border-outline-variant shadow-sm text-body-sm">
<p className="font-bold">08:00 - Dental Review</p>
<p className="text-on-surface-variant">Jack Marston</p>
</div>
<div className="bg-white p-3 rounded-lg border border-outline-variant shadow-sm text-body-sm">
<p className="font-bold">14:00 - Neurology</p>
<p className="text-on-surface-variant">Mary Gillis</p>
</div>
</div>
</div>
<div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30">
<p className="font-label-md text-primary mb-3">WED, OCT 25</p>
<div className="space-y-3 text-center py-6 text-on-surface-variant opacity-60">
<span className="material-symbols-outlined text-4xl block mb-2">event_busy</span>
<p className="text-body-sm">No bookings yet</p>
</div>
</div>

<div className="col-span-2 relative h-40 overflow-hidden rounded-xl border border-outline-variant/50">
<div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
<div className="relative z-10 p-6 flex flex-col justify-center h-full">
<p className="text-headline-md font-black text-primary/20 absolute -right-4 -bottom-2 rotate-12 select-none">HAPMS</p>
<h4 className="font-title-md mb-2">Week at a glance</h4>
<p className="text-body-sm text-on-surface-variant max-w-[200px]">Your efficiency has increased by 14% compared to last month. Keep it up!</p>
</div>
</div>
</div>
</section>
</div>

<aside className="page-panel space-y-4">
<div className="flex items-center justify-between">
<div>
<h2 className="text-sm font-bold text-secondary">AI Clinical Assistant</h2>
<p className="text-xs text-on-surface-variant">Operational Support</p>
</div>
<div className="w-9 h-9 bg-secondary/10 rounded-full flex items-center justify-center">
<span className="material-symbols-outlined text-secondary text-[18px]">smart_toy</span>
</div>
</div>
<nav className="flex gap-1 p-1 bg-surface-container-low rounded-lg">
<button className="flex-1 py-1.5 font-bold text-secondary border-l-4 border-secondary bg-white text-xs rounded-r-md shadow-level-1">Clinical Chat</button>
<button className="flex-1 py-1.5 text-xs text-outline hover:text-on-surface transition-colors">Insights</button>
</nav>
<div className="space-y-3">
<div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/50">
<p className="text-[10px] font-bold text-secondary mb-2 uppercase tracking-wider">Active Patient Context</p>
<div className="flex items-center gap-2 mb-2">
<div className="w-7 h-7 rounded bg-secondary text-white flex items-center justify-center font-bold text-[10px]">AM</div>
<div>
<p className="text-xs font-bold">Arthur Morgan</p>
<p className="text-[10px] text-on-surface-variant">Last visit: 12 days ago</p>
</div>
</div>
<div className="space-y-1.5">
<div className="flex items-start gap-2 bg-white/50 p-2 rounded-lg text-[11px]">
<span className="material-symbols-outlined text-[14px] mt-0.5 text-secondary">info</span>
<p>Patient shows consistent history of high blood pressure (145/90 avg).</p>
</div>
<div className="flex items-start gap-2 bg-error/5 p-2 rounded-lg text-[11px]">
<span className="material-symbols-outlined text-[14px] mt-0.5 text-error">report</span>
<p><strong>Warning:</strong> Recent lab tests show elevated Creatinine levels.</p>
</div>
</div>
</div>
<div className="flex flex-col gap-2">
<div className="self-start bg-surface-container p-2.5 rounded-xl text-xs max-w-[90%]">How can I assist you with today's queue, Dr. Thorne?</div>
<div className="self-end bg-primary text-white p-2.5 rounded-xl text-xs max-w-[90%] shadow-level-1">Check interaction for Warfarin and Ibuprofen for Arthur Morgan.</div>
<div className="self-start bg-secondary/5 border border-secondary/10 p-2.5 rounded-xl text-xs max-w-[90%]">
<p className="font-bold text-secondary mb-1">Interaction found:</p>
<p className="mb-2 text-on-surface-variant">Concurrent use of NSAIDs like Ibuprofen with Warfarin increases bleeding risk by approximately 2.5x.</p>
<button className="bg-white px-2 py-1 rounded-lg text-[10px] font-bold border border-secondary/20 text-secondary">Alternative meds?</button>
</div>
</div>
</div>
<div className="mt-auto space-y-3 pt-3">
<div className="relative">
<input className="w-full bg-white border border-outline-variant rounded-xl py-2 px-3 pr-10 text-xs focus:outline-none focus:ring-1 focus:ring-secondary" placeholder="Ask assistant..." type="text" />
<button className="absolute right-2 top-1/2 -translate-y-1/2 text-secondary"><span className="material-symbols-outlined text-[16px]">send</span></button>
</div>
<button className="w-full bg-secondary text-white py-2.5 rounded-xl text-xs font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-[16px]">terminal</span>Run Diagnostics
</button>
</div>
</aside>
</div>
  );
}
