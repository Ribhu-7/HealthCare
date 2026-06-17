import React, { useState } from 'react';

export default function NotificationListPage() {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'CRITICAL', title: 'Stat Lab Result: Patient #8821', time: '08:42 AM', text: 'Potassium levels detected at 6.2 mEq/L. Physician review required immediately.' },
    { id: 2, type: 'SYSTEM', title: 'Appointment Reschedule', time: '09:15 AM', text: "Sarah Jenkins (ID: 9021) has requested a move for tomorrow's MRI to 2:00 PM." },
    { id: 3, type: 'SYSTEM', title: 'Monthly Billing Finalized', time: 'Yesterday', text: 'Billing report generated successfully.' }
  ]);

  const clearAll = () => setNotifications([]);

  return (
    <div className="page-with-panel">
      <div className="page-main flex flex-col p-6 gap-6 overflow-hidden">

<div className="flex items-end justify-between border-b border-outline-variant">
<div className="flex items-center gap-8">
<button className="pb-3 px-1 border-b-2 border-primary text-primary font-semibold flex items-center gap-2 transition-all" id="tab-inbox">
<span className="material-symbols-outlined text-[20px]">inbox</span>
<span className="font-title-md">Inbox</span>
<span className="px-2 py-0.5 bg-primary text-white text-[10px] rounded-full">14</span>
</button>
<button className="pb-3 px-1 border-b-2 border-transparent text-on-surface-variant hover:text-on-surface font-semibold flex items-center gap-2 transition-all" id="tab-settings">
<span className="material-symbols-outlined text-[20px]">settings</span>
<span className="font-title-md">Settings</span>
</button>
</div>
<div className="pb-3 flex gap-2">
<button onClick={clearAll} className="px-4 py-1.5 border border-outline-variant rounded-full font-label-md text-on-surface-variant hover:bg-surface-container transition-colors">Mark all as read</button>
<button className="px-4 py-1.5 bg-primary text-white rounded-full font-label-md hover:shadow-lg hover:bg-primary/90 transition-all flex items-center gap-2">
<span className="material-symbols-outlined text-sm">filter_list</span>
                        Filter View
                    </button>
</div>
</div>

<div className="flex-1 grid grid-cols-12 gap-6 overflow-hidden" id="content-inbox">

<div className="col-span-8 flex flex-col gap-4 overflow-hidden">
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl flex-1 flex flex-col overflow-hidden">
<div className="p-4 border-b border-outline-variant bg-surface-container-low/50 flex items-center justify-between">
<h3 className="font-title-md text-on-surface font-bold">Activity Feed</h3>
<div className="flex gap-2">
<span className="px-2 py-0.5 bg-error-container text-on-error-container text-[11px] font-bold rounded">3 CRITICAL</span>
<span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container text-[11px] font-bold rounded">11 SYSTEM</span>
</div>
</div>
<div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
<div className="space-y-4">
{notifications.length === 0 ? (
  <p className="text-center text-on-surface-variant py-8">No new notifications.</p>
) : (
  notifications.map(n => (
    <div key={n.id} className="p-4 bg-white border border-outline-variant/50 rounded-xl hover:shadow-sm transition-shadow mb-3">
      <div className="flex gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${n.type === 'CRITICAL' ? 'bg-error-container text-error' : 'bg-secondary-container/30 text-secondary'}`}>
          <span className="material-symbols-outlined">{n.type === 'CRITICAL' ? 'priority_high' : 'notifications'}</span>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h4 className="font-body-lg font-semibold text-on-surface">{n.title}</h4>
            <span className="text-xs text-on-surface-variant">{n.time}</span>
          </div>
          <p className="text-body-md text-on-surface-variant mt-1">{n.text}</p>
        </div>
      </div>
    </div>
  ))
)}
</div>
</div>
</div>
</div>

<div className="col-span-4 flex flex-col gap-6 overflow-hidden">

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl flex-[0.5] flex flex-col overflow-hidden">
<div className="p-4 border-b border-outline-variant flex items-center justify-between">
<h3 className="font-title-md font-bold text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-primary">mail</span> Email Outbox
                            </h3>
<span className="text-[10px] text-primary font-bold">LIVE SYNC</span>
</div>
<div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
<div className="flex items-center gap-3 py-2 border-b border-outline-variant/30 last:border-0">
<div className="w-8 h-8 bg-surface-container rounded flex items-center justify-center">
<span className="material-symbols-outlined text-sm">outgoing_mail</span>
</div>
<div className="flex-1 overflow-hidden">
<p className="text-body-sm font-semibold truncate text-on-surface">Patient Portal Invite</p>
<p className="text-[11px] text-on-surface-variant truncate">To: m.roberts@gmail.com</p>
</div>
<div className="text-[10px] bg-secondary/10 text-secondary px-1.5 rounded">SENT</div>
</div>
<div className="flex items-center gap-3 py-2 border-b border-outline-variant/30 last:border-0">
<div className="w-8 h-8 bg-surface-container rounded flex items-center justify-center">
<span className="material-symbols-outlined text-sm">outgoing_mail</span>
</div>
<div className="flex-1 overflow-hidden">
<p className="text-body-sm font-semibold truncate text-on-surface">Prescription Refill Auth</p>
<p className="text-[11px] text-on-surface-variant truncate">To: pharmacy_77@walmart.com</p>
</div>
<div className="text-[10px] bg-secondary/10 text-secondary px-1.5 rounded">SENT</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl flex-[0.5] flex flex-col overflow-hidden">
<div className="p-4 border-b border-outline-variant flex items-center justify-between">
<h3 className="font-title-md font-bold text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-secondary">sms</span> SMS Logs
                            </h3>
</div>
<div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
<div className="p-3 bg-surface rounded-lg border border-outline-variant/30">
<div className="flex justify-between items-center mb-1">
<span className="text-[11px] font-bold text-on-surface-variant">+1 (555) 012-9923</span>
<span className="text-[10px] text-on-surface-variant">2m ago</span>
</div>
<p className="text-body-sm italic text-on-surface-variant">"Your appointment with Dr. Thorne is confirmed for 9AM tomorrow."</p>
<div className="mt-2 flex items-center gap-1">
<span className="material-symbols-outlined text-[12px] text-secondary">done_all</span>
<span className="text-[10px] text-secondary">Delivered</span>
</div>
</div>
<div className="p-3 bg-surface rounded-lg border border-outline-variant/30">
<div className="flex justify-between items-center mb-1">
<span className="text-[11px] font-bold text-on-surface-variant">+1 (555) 019-3382</span>
<span className="text-[10px] text-on-surface-variant">1h ago</span>
</div>
<p className="text-body-sm italic text-on-surface-variant">"HAPMS: Your test results for Lab-22 are ready in the portal."</p>
<div className="mt-2 flex items-center gap-1">
<span className="material-symbols-outlined text-[12px] text-secondary">done_all</span>
<span className="text-[10px] text-secondary">Delivered</span>
</div>
</div>
</div>
</div>
</div>
</div>

<div className="hidden flex-1 grid grid-cols-12 gap-6" id="content-settings">
<div className="col-span-8 space-y-6">
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
<h3 className="font-headline-md font-bold text-on-surface mb-6">Notification Preferences</h3>
<div className="space-y-8">

<section>
<div className="flex items-center gap-2 mb-4">
<span className="material-symbols-outlined text-primary">medical_services</span>
<h4 className="font-title-md font-bold text-on-surface">Clinical Alerts</h4>
</div>
<div className="space-y-4">
<div className="flex items-center justify-between p-4 bg-surface rounded-xl border border-outline-variant/30">
<div>
<p className="font-body-lg font-semibold">Lab Results</p>
<p className="text-body-sm text-on-surface-variant">Instant alerts when lab pathology or imaging results are uploaded.</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input defaultChecked className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<div className="flex items-center justify-between p-4 bg-surface rounded-xl border border-outline-variant/30">
<div>
<p className="font-body-lg font-semibold">Appointment Reminders</p>
<p className="text-body-sm text-on-surface-variant">Notifications for upcoming patient visits and schedule changes.</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input defaultChecked className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
</div>
</section>

<section>
<div className="flex items-center gap-2 mb-4">
<span className="material-symbols-outlined text-secondary">admin_panel_settings</span>
<h4 className="font-title-md font-bold text-on-surface">Billing &amp; Admin</h4>
</div>
<div className="space-y-4">
<div className="flex items-center justify-between p-4 bg-surface rounded-xl border border-outline-variant/30">
<div>
<p className="font-body-lg font-semibold">Billing Alerts</p>
<p className="text-body-sm text-on-surface-variant">Monthly summaries and failed payment notifications.</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
</div>
</section>
</div>
<div className="mt-8 pt-6 border-t border-outline-variant flex justify-end gap-3">
<button className="px-6 py-2 border border-outline-variant text-on-surface rounded-lg font-semibold hover:bg-surface-container transition-colors">Discard Changes</button>
<button className="px-6 py-2 bg-primary text-white rounded-lg font-semibold shadow-md hover:bg-primary/90 transition-all">Save Preferences</button>
</div>
</div>
</div>
<div className="col-span-4 space-y-6">
<div className="bg-primary-container/20 border border-primary/20 rounded-xl p-6">
<div className="flex items-center gap-3 mb-4">
<div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
<span className="material-symbols-outlined" >info</span>
</div>
<h4 className="font-title-md font-bold text-primary">Global Mute</h4>
</div>
<p className="text-body-md text-on-surface-variant mb-4">Temporarily silence all non-critical clinical notifications during surgical procedures or focused sessions.</p>
<button className="w-full py-2.5 bg-white border border-primary/30 text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors">Enable Focused Mode</button>
</div>
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
<h4 className="font-title-md font-bold mb-4">Notification Channels</h4>
<div className="space-y-4">
<div className="flex items-center gap-3 opacity-50 grayscale">
<span className="material-symbols-outlined text-secondary">browser_updated</span>
<div className="flex-1">
<p className="text-body-md font-semibold">Web Push</p>
<p className="text-[11px]">Unsupported on current browser</p>
</div>
</div>
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary">smartphone</span>
<div className="flex-1">
<p className="text-body-md font-semibold">Mobile App</p>
<p className="text-[11px] text-secondary">Active on 2 devices</p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
      <div className="page-panel space-y-4" id="ai-drawer">
<div className="flex items-center justify-between">
<div>
<h3 className="text-sm font-bold text-secondary">AI Clinical Assistant</h3>
<p className="text-[10px] text-on-surface-variant opacity-70 uppercase tracking-wider">Operational Support</p>
</div>
<button className="p-1 hover:bg-surface-container rounded-full"><span className="material-symbols-outlined text-[16px]">close</span></button>
</div>
<div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-3">
<div className="bg-secondary/5 border border-secondary/10 p-3 rounded-xl">
<p className="text-xs text-on-surface-variant leading-relaxed">
  {"I've analyzed the recent Potassium stat alert. This is the 3rd instance for this patient this week. Recommend immediate cardiology consult referral."}
</p>
</div>
<div className="border-t border-outline-variant pt-3 mt-auto">
<div className="flex gap-1 mb-2">
<button className="flex-1 py-1 bg-secondary text-white text-[10px] font-bold rounded shadow-level-1">Clinical Chat</button>
<button className="flex-1 py-1 bg-surface-container text-on-surface-variant text-[10px] font-bold rounded hover:bg-surface-container-high transition-colors">System Insights</button>
</div>
<div className="h-24 bg-surface-container-low rounded-lg p-2 text-[10px] text-on-surface-variant italic border border-outline-variant/50">
                        Type a query to run system-wide diagnostics...
                    </div>
</div>
</div>
<button className="w-full py-2.5 bg-secondary text-white text-xs font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-[16px]">terminal</span> Run Diagnostics
</button>
</div>
    </div>
  );
}
