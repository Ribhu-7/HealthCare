import React, { useState } from 'react';

export default function SystemSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  
  const handleSave = () => alert('Preferences saved successfully!');
  const handleDiscard = () => alert('Changes discarded.');
  const handleEnableFocused = () => alert('Focused Mode enabled!');
  const handleArchive = () => alert('Archive process initiated.');
  
  const tabClass = (tab: string) => activeTab === tab 
    ? "tab-btn flex items-center gap-3 px-4 py-3 rounded-lg text-primary bg-primary/5 font-semibold text-left transition-all border-l-4 border-primary"
    : "tab-btn flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high font-medium text-left transition-all border-l-4 border-transparent";
    
  return (
    <div className="page-with-panel">
      <div className="page-main space-y-6">
<div className="max-w-6xl mx-auto">
<div className="flex flex-col gap-2 mb-8">
<h2 className="font-headline-lg text-headline-lg text-on-background">System Settings</h2>
<p className="font-body-md text-on-surface-variant">Manage your clinical practice profile, staff permissions, and security protocols.</p>
</div>

<div className="grid grid-cols-12 gap-8">

<div className="col-span-3">
<div className="flex flex-col gap-1 sticky top-24">
<button onClick={() => setActiveTab('profile')} className={tabClass('profile')} id="btn-profile">
<span className="material-symbols-outlined">person_outline</span>
                            Profile Settings
                        </button>
<button onClick={() => setActiveTab('clinic')} className={tabClass('clinic')} id="btn-clinic">
<span className="material-symbols-outlined">medical_services</span>
                            Clinic Information
                        </button>
<button onClick={() => setActiveTab('users')} className={tabClass('users')} id="btn-users">
<span className="material-symbols-outlined">group</span>
                            User Management
                        </button>
<button onClick={() => setActiveTab('security')} className={tabClass('security')} id="btn-security">
<span className="material-symbols-outlined">security</span>
                            System Security
                        </button>
</div>
</div>

<div className="col-span-9 flex flex-col gap-6">

<section className={`settings-pane ${activeTab === 'profile' ? 'block' : 'hidden'}`} id="pane-profile">
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 flex flex-col gap-8 shadow-sm">
<div className="flex items-center gap-6 pb-6 border-b border-outline-variant">
<div className="relative group">
<img alt="User avatar" className="w-24 h-24 rounded-2xl object-cover ring-4 ring-primary-container/30" data-alt="A professional medical headshot of a female doctor with dark hair, looking confident and smiling warmly. The photo is high-resolution with soft studio lighting and a clean, neutral background. The aesthetic is professional yet approachable, consistent with a premium clinical portal design." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0BEK_3k-xQcOGLqsijdHRUFD4asTPIwtq82jtjitfXPLikTMCD9lD92xqBUnqct-pSafwvPeMJIKoyBJ3pMkbNTBuPAiG1ZKkhTo1dt-GA4c65Ddk1f5S-CeESEUOzT3K6P3SuwuMxI9B39Szsl0oTAM1m7PewCz-7xORe5d0FW0ujq8MPK7pA-b5rnBeieuDX2KA4odhXH3I_rJX1yeI_lFnw87D98GNukUsaYJuBR_aH5KbnKvCAy2hTiyZM3mSCWyOWfktT2D8"/>
<button className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-sm">edit</span>
</button>
</div>
<div>
<h3 className="font-title-md text-title-md text-on-surface">Personal Information</h3>
<p className="font-body-sm text-on-surface-variant">Update your photo and personal details.</p>
</div>
</div>
<form className="grid grid-cols-2 gap-x-6 gap-y-4">
<div className="flex flex-col gap-2">
<label className="font-label-md text-on-surface-variant">Full Name</label>
<input className="px-4 py-2 border border-outline rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" type="text" defaultValue="Dr. Sarah Chen"/>
</div>
<div className="flex flex-col gap-2">
<label className="font-label-md text-on-surface-variant">Professional Title</label>
<input className="px-4 py-2 border border-outline rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" type="text" defaultValue="Senior Clinical Administrator"/>
</div>
<div className="flex flex-col gap-2">
<label className="font-label-md text-on-surface-variant">Email Address</label>
<input className="px-4 py-2 border border-outline rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" type="email" defaultValue="s.chen@hapms-health.com"/>
</div>
<div className="flex flex-col gap-2">
<label className="font-label-md text-on-surface-variant">Phone Number</label>
<input className="px-4 py-2 border border-outline rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" type="tel" defaultValue="+1 (555) 012-3456"/>
</div>
<div className="col-span-2 flex justify-end mt-4 pt-4 border-t border-outline-variant gap-3">
<button onClick={handleDiscard} className="px-6 py-2 border border-outline-variant text-on-surface rounded-lg font-semibold hover:bg-surface-container transition-colors">Discard Changes</button>
<button onClick={handleSave} className="px-6 py-2 bg-primary text-white rounded-lg font-semibold shadow-md hover:bg-primary/90 transition-all">Save Changes</button>
</div>
</form>
</div>
</section>

<section className={`settings-pane ${activeTab === 'clinic' ? 'block' : 'hidden'}`} id="pane-clinic">
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 flex flex-col gap-8 shadow-sm">
<div>
<h3 className="font-title-md text-title-md text-on-surface">Clinic Details</h3>
<p className="font-body-sm text-on-surface-variant">Manage organization information and branding.</p>
</div>
<form className="grid grid-cols-2 gap-x-6 gap-y-4">
<div className="col-span-2 flex flex-col gap-2">
<label className="font-label-md text-on-surface-variant">Practice Name</label>
<input className="px-4 py-2 border border-outline rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" type="text" defaultValue="Evergreen Medical Center"/>
</div>
<div className="flex flex-col gap-2">
<label className="font-label-md text-on-surface-variant">NPI / License Number</label>
<input className="px-4 py-2 border border-outline rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" type="text" defaultValue="1234567890"/>
</div>
<div className="flex flex-col gap-2">
<label className="font-label-md text-on-surface-variant">Clinic Type</label>
<select className="px-4 py-2 border border-outline rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all">
<option>General Practice</option>
<option>Specialist Center</option>
<option>Urgent Care</option>
<option>Hospital Department</option>
</select>
</div>
<div className="col-span-2 flex flex-col gap-2">
<label className="font-label-md text-on-surface-variant">Street Address</label>
<input className="px-4 py-2 border border-outline rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" type="text" defaultValue="1200 Healthcare Way, Suite 400"/>
</div>
<div className="flex flex-col gap-2">
<label className="font-label-md text-on-surface-variant">City</label>
<input className="px-4 py-2 border border-outline rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" type="text" defaultValue="Seattle"/>
</div>
<div className="flex flex-col gap-2">
<label className="font-label-md text-on-surface-variant">Timezone</label>
<select className="px-4 py-2 border border-outline rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all">
<option>Pacific Time (PT)</option>
<option>Mountain Time (MT)</option>
<option>Central Time (CT)</option>
<option>Eastern Time (ET)</option>
</select>
</div>
<div className="col-span-2 flex justify-end mt-4 pt-4 border-t border-outline-variant gap-3">
<button className="px-6 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-opacity" type="submit">Update Clinic Profile</button>
</div>
</form>
</div>
</section>

<section className={`settings-pane ${activeTab === 'users' ? 'block' : 'hidden'}`} id="pane-users">
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
<div className="p-6 border-b border-outline-variant flex items-center justify-between">
<div>
<h3 className="font-title-md text-title-md text-on-surface">Authorized Users</h3>
<p className="font-body-sm text-on-surface-variant">Manage staff access and assign roles.</p>
</div>
<button className="flex items-center gap-2 px-4 py-2 bg-secondary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity">
<span className="material-symbols-outlined text-sm">person_add</span>
                                    Add New User
                                </button>
</div>
<table className="w-full text-left">
<thead className="bg-surface-container-low">
<tr>
<th className="px-6 py-4 font-label-md text-outline uppercase tracking-wider">User</th>
<th className="px-6 py-4 font-label-md text-outline uppercase tracking-wider">Role</th>
<th className="px-6 py-4 font-label-md text-outline uppercase tracking-wider">Status</th>
<th className="px-6 py-4 font-label-md text-outline uppercase tracking-wider text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">
<tr className="hover:bg-primary/5 transition-colors">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">SC</div>
<div>
<p className="font-body-md font-semibold">Sarah Chen</p>
<p className="text-[11px] text-on-surface-variant">s.chen@hapms.com</p>
</div>
</div>
</td>
<td className="px-6 py-4">
<span className="px-2 py-1 rounded bg-purple-100 text-purple-700 text-[11px] font-bold uppercase">Admin</span>
</td>
<td className="px-6 py-4">
<div className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-emerald-500"></span>
<span className="text-body-sm">Active</span>
</div>
</td>
<td className="px-6 py-4 text-right">
<button className="text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined">more_vert</span></button>
</td>
</tr>
<tr className="hover:bg-primary/5 transition-colors">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-xs">MW</div>
<div>
<p className="font-body-md font-semibold">Marcus Wright</p>
<p className="text-[11px] text-on-surface-variant">m.wright@hapms.com</p>
</div>
</div>
</td>
<td className="px-6 py-4">
<span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-[11px] font-bold uppercase">Doctor</span>
</td>
<td className="px-6 py-4">
<div className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-emerald-500"></span>
<span className="text-body-sm">Active</span>
</div>
</td>
<td className="px-6 py-4 text-right">
<button className="text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined">more_vert</span></button>
</td>
</tr>
<tr className="hover:bg-primary/5 transition-colors">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs">EL</div>
<div>
<p className="font-body-md font-semibold">Elena Lopez</p>
<p className="text-[11px] text-on-surface-variant">e.lopez@hapms.com</p>
</div>
</div>
</td>
<td className="px-6 py-4">
<span className="px-2 py-1 rounded bg-slate-100 text-slate-600 text-[11px] font-bold uppercase">Staff</span>
</td>
<td className="px-6 py-4">
<div className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-slate-300"></span>
<span className="text-body-sm">Away</span>
</div>
</td>
<td className="px-6 py-4 text-right">
<button className="text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined">more_vert</span></button>
</td>
</tr>
</tbody>
</table>
</div>
</section>

<section className={`settings-pane ${activeTab === 'security' ? 'block' : 'hidden'}`} id="pane-security">
<div className="flex flex-col gap-6">
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 flex flex-col gap-6 shadow-sm">
<div>
<h3 className="font-title-md text-title-md text-on-surface">Security Protocols</h3>
<p className="font-body-sm text-on-surface-variant">Protect your patient data and clinical records.</p>
</div>
<div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-primary text-3xl" >shield</span>
<div>
<p className="font-body-md font-bold">Two-Factor Authentication (2FA)</p>
<p className="text-body-sm text-on-surface-variant">Strongly recommended for all Admin accounts.</p>
</div>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input defaultChecked className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-outline-variant peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<div className="grid grid-cols-1 gap-4">
<div className="flex items-center justify-between py-4 border-b border-outline-variant">
<div>
<p className="font-body-md font-semibold">Session Timeout</p>
<p className="text-body-sm text-on-surface-variant">Automatically log out inactive users.</p>
</div>
<select className="px-3 py-1.5 border border-outline rounded-lg text-body-sm">
<option>15 Minutes</option>
<option>30 Minutes</option>
<option>1 Hour</option>
</select>
</div>
<div className="flex items-center justify-between py-4 border-b border-outline-variant">
<div>
<p className="font-body-md font-semibold">IP Whitelisting</p>
<p className="text-body-sm text-on-surface-variant">Restrict access to specific network locations.</p>
</div>
<button className="text-primary font-bold text-body-sm">Configure</button>
</div>
<div className="flex items-center justify-between py-4">
<div>
<p className="font-body-md font-semibold">Encryption Keys</p>
<p className="text-body-sm text-on-surface-variant">Manage database and document encryption.</p>
</div>
<button className="text-primary font-bold text-body-sm">Rotate Keys</button>
</div>
</div>
</div>
<div className="bg-error-container/20 border border-error/20 rounded-xl p-8 flex flex-col gap-4">
<h3 className="font-title-md text-title-md text-on-error-container">Critical Zone</h3>
<p className="font-body-sm text-on-surface-variant">Actions here are permanent and affect the entire organization.</p>
<div className="flex gap-4">
<button onClick={handleEnableFocused} className="px-6 py-2 border border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors">Enable Focused Mode</button>
<button onClick={handleArchive} className="px-6 py-2 bg-error text-white font-bold rounded-lg shadow-md hover:opacity-90 transition-opacity">Archive Practice</button>
</div>
</div>
</div>
</section>
</div>
</div>
</div>
</div>
<aside className="page-panel space-y-4">
<div className="flex items-center justify-between">
<h3 className="text-sm font-bold text-secondary">AI Clinical Assistant</h3>
</div>
<div className="flex gap-1 p-1 bg-surface-container-low rounded-lg">
<button className="flex-1 py-1.5 font-bold text-secondary border-l-4 border-secondary bg-white text-xs rounded-r-md shadow-level-1">Clinical Chat</button>
<button className="flex-1 py-1.5 text-xs text-outline hover:text-on-surface transition-colors">Insights</button>
</div>
<div className="mt-4 flex flex-col gap-2">
<div className="p-3 bg-secondary/5 border border-secondary/10 rounded-xl">
<div className="flex items-center gap-2 text-secondary mb-2">
<span className="material-symbols-outlined text-[16px]">info</span>
<span className="text-xs font-bold uppercase tracking-wider">Optimization Tip</span>
</div>
<p className="text-xs text-on-surface-variant leading-relaxed">
                    Based on your session data, enabling **IP Whitelisting** would improve your security score by 15%.
                </p>
</div>
</div>
<div className="mt-auto pt-4 space-y-3">
<button onClick={handleArchive} className="w-full py-2.5 bg-error-container text-on-error-container font-bold rounded-lg hover:bg-error-container/80 transition-colors border border-error/20 flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-[16px]">terminal</span> Run Diagnostics
</button>
</div>
</aside>
    </div>
  );
}
