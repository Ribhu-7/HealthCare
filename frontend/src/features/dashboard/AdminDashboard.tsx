import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { patientApi, appointmentApi, doctorApi, billingApi } from '../../lib/api';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ patients: 0, appointments: 0, doctors: 0, revenue: 0, pending: 0 });

  useEffect(() => {
    Promise.all([
      patientApi.getAll().catch(() => []),
      appointmentApi.getAll().catch(() => []),
      doctorApi.getAll().catch(() => []),
      billingApi.getAll().catch(() => []),
    ]).then(([patients, appointments, doctors, bills]) => {
      const revenue = bills.filter((b: any) => b.status === 'PAID').reduce((s: number, b: any) => s + Number(b.totalDue || 0), 0);
      const pending = appointments.filter((a: any) => a.status === 'SCHEDULED').length;
      setStats({ patients: patients.length, appointments: appointments.length, doctors: doctors.length, revenue, pending });
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-on-surface tracking-tight">Executive Dashboard</h2>
          <p className="text-sm text-outline mt-0.5">Real-time operational overview for today, October 24, 2023.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="px-4 py-2 bg-white border border-outline-variant rounded-xl text-xs font-semibold flex items-center gap-2 hover:bg-surface-container transition-colors shadow-level-1">
            <span className="material-symbols-outlined text-[16px]">file_download</span>
            Export PDF
          </button>
          <button
            onClick={() => navigate('/appointments', { state: { openBookModal: true } })}
            className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-md shadow-primary/20 hover:shadow-lg transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            New Appointment
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="bg-white border border-outline-variant rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="p-2 bg-primary/10 text-primary rounded-lg">
              <span className="material-symbols-outlined text-[20px]">group</span>
            </span>
            <span className="text-[11px] font-bold text-green-600 flex items-center">
              +12% <span className="material-symbols-outlined text-[14px]">trending_up</span>
            </span>
          </div>
          <div className="mt-3">
            <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Total Patients</p>
            <p className="text-xl font-bold text-on-surface">{stats.patients.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white border border-outline-variant rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="p-2 bg-secondary/10 text-secondary rounded-lg">
              <span className="material-symbols-outlined text-[20px]">event_available</span>
            </span>
            <span className="text-[11px] font-bold text-outline">Today</span>
          </div>
          <div className="mt-3">
            <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Total Appointments</p>
            <p className="text-xl font-bold text-on-surface">{stats.appointments.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white border border-outline-variant rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="p-2 bg-tertiary/10 text-tertiary rounded-lg">
              <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
            </span>
            <span className="text-[11px] font-bold text-green-600">+$2.4k</span>
          </div>
          <div className="mt-3">
            <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Revenue</p>
            <p className="text-xl font-bold text-on-surface">${stats.revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>

        <div className="bg-white border border-outline-variant rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="p-2 bg-surface-variant text-on-surface-variant rounded-lg">
              <span className="material-symbols-outlined text-[20px]">medical_information</span>
            </span>
            <span className="text-[11px] font-bold text-outline">Active</span>
          </div>
          <div className="mt-3">
            <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Active Doctors</p>
            <p className="text-xl font-bold text-on-surface">{stats.doctors.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-error-container/20 border border-error/20 rounded-xl p-4 flex flex-col justify-between ring-1 ring-error/10">
          <div className="flex items-start justify-between">
            <span className="p-2 bg-error text-white rounded-lg">
              <span className="material-symbols-outlined text-[20px]">person_off</span>
            </span>
            <span className="text-[11px] font-bold text-error flex items-center">
              +4.2% <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
            </span>
          </div>
          <div className="mt-3">
            <p className="text-[10px] font-bold text-error uppercase tracking-wider">No-Show Rate</p>
            <p className="text-xl font-bold text-on-surface">14.8%</p>
          </div>
        </div>

        <div className="bg-white border border-outline-variant rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="p-2 bg-primary text-white rounded-lg">
              <span className="material-symbols-outlined text-[20px]">speed</span>
            </span>
            <span className="text-[11px] font-bold text-outline">Optimum</span>
          </div>
          <div className="mt-3">
            <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Utilization</p>
            <p className="text-xl font-bold text-on-surface">92.4%</p>
          </div>
        </div>
      </div>

      {/* Revenue Chart + AI Insights */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white border border-outline-variant rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-on-surface">Revenue Trends</h3>
              <p className="text-xs text-outline mt-0.5">Monthly billable services vs insurance claims</p>
            </div>
            <select className="text-xs bg-surface-container border-0 rounded-lg px-3 py-1.5 font-medium text-on-surface-variant focus:ring-1 focus:ring-primary outline-none">
              <option>Last 6 Months</option>
              <option>Last 12 Months</option>
              <option>Current Year</option>
            </select>
          </div>
          <div className="h-52 relative">
            <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="line-grad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#0052cc" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#0052cc" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line stroke="#E2E8F0" strokeDasharray="4" x1="0" x2="800" y1="50" y2="50" />
              <line stroke="#E2E8F0" strokeDasharray="4" x1="0" x2="800" y1="100" y2="100" />
              <line stroke="#E2E8F0" strokeDasharray="4" x1="0" x2="800" y1="150" y2="150" />
              <path d="M0,150 Q100,120 200,140 T400,80 T600,100 T800,40" fill="transparent" stroke="#0052cc" strokeWidth="2.5" />
              <path d="M0,150 Q100,120 200,140 T400,80 T600,100 T800,40 V200 H0 Z" fill="url(#line-grad)" />
            </svg>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-[10px] font-bold text-outline uppercase tracking-wider mt-2">
              <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-outline-variant rounded-xl p-6 shadow-level-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-secondary text-white rounded-lg">
              <span className="material-symbols-outlined text-[20px]">smart_toy</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-on-surface">AI Insights</h3>
              <p className="text-[10px] text-outline uppercase font-bold tracking-widest">Powered by HAPMS-Core</p>
            </div>
          </div>
          <div className="bg-surface-container-low rounded-xl p-4 mb-4 border border-outline-variant/30">
            <p className="text-xs text-on-surface mb-2 font-medium">"What was our no-show rate last month?"</p>
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-secondary text-[16px] mt-0.5">auto_awesome</span>
              <p className="text-xs text-on-surface-variant leading-relaxed">Last month's no-show rate was <span className="text-error font-bold">10.6%</span>, a 2% decrease from August. Recommendation: Send SMS reminders 48h prior.</p>
            </div>
          </div>
          <div className="relative">
            <input className="w-full bg-white border border-outline-variant rounded-xl pl-3 pr-10 py-2.5 text-xs focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all" placeholder="Ask AI about clinic operations..." type="text" />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-secondary">
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </div>
          <div className="mt-5">
            <p className="text-[10px] font-bold text-outline uppercase mb-3 tracking-wider">Today's Suggestions</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-3 text-xs p-2 hover:bg-surface-container-low rounded-lg cursor-pointer transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0"></span>
                Dr. Smith's 2 PM is likely to cancel based on history.
              </li>
              <li className="flex items-center gap-3 text-xs p-2 hover:bg-surface-container-low rounded-lg cursor-pointer transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0"></span>
                Suggest opening 2 emergency slots for Friday.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom row: Appt Volume + Alerts + Next Up */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointment Volume */}
        <div className="bg-white border border-outline-variant rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-on-surface">Appt Volume</h3>
            <div className="flex gap-3">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span className="text-[10px] text-outline font-bold">IN-PERSON</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-secondary rounded-full"></span>
                <span className="text-[10px] text-outline font-bold">TELE</span>
              </div>
            </div>
          </div>
          <div className="flex items-end justify-between h-40 gap-3 px-2">
            {['MON', 'TUE', 'WED', 'THU', 'FRI'].map((day, i) => {
              const heights = [[40, 60], [30, 50], [35, 55], [45, 65], [25, 45]];
              return (
                <div key={day} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <div className="w-full bg-secondary rounded-t" style={{ height: `${heights[i][0]}%` }}></div>
                  <div className="w-full bg-primary rounded-t" style={{ height: `${heights[i][1]}%` }}></div>
                  <span className={`text-[10px] font-bold mt-2 ${day === 'THU' ? 'text-primary' : 'text-outline'}`}>{day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white border border-outline-variant rounded-xl overflow-hidden flex flex-col">
          <div className="flex border-b border-outline-variant">
            <button className="flex-1 px-4 py-3 text-xs font-bold border-b-2 border-primary text-primary">System Alerts</button>
            <button className="flex-1 px-4 py-3 text-xs font-bold text-outline hover:bg-surface-container transition-colors">Recent Activities</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-error-container/10 border border-error/10">
              <span className="material-symbols-outlined text-error text-[20px]">warning</span>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-xs font-bold text-on-surface">Unassigned Lab Results</p>
                  <span className="text-[10px] text-outline font-bold flex-shrink-0 ml-2">2 MIN AGO</span>
                </div>
                <p className="text-xs text-on-surface-variant">12 critical lab results for Clinic B have not been assigned to a practitioner.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant/30">
              <span className="material-symbols-outlined text-primary text-[20px]">info</span>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-xs font-bold text-on-surface">Data Sync Successful</p>
                  <span className="text-[10px] text-outline font-bold flex-shrink-0 ml-2">45 MIN AGO</span>
                </div>
                <p className="text-xs text-on-surface-variant">Global patient records synced with Regional Hub 04.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-tertiary/5 border border-tertiary/10">
              <span className="material-symbols-outlined text-tertiary text-[20px]">payments</span>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-xs font-bold text-tertiary">Billing Delay Detected</p>
                  <span className="text-[10px] text-outline font-bold flex-shrink-0 ml-2">2 HR AGO</span>
                </div>
                <p className="text-xs text-on-surface-variant">Insurance verification is taking longer than average for Anthem providers.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Up */}
        <div className="bg-white border border-outline-variant rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-on-surface">Next Up</h3>
            <button className="text-[11px] font-bold text-primary hover:underline">View All</button>
          </div>
          <div className="space-y-1">
            {[
              { name: 'Sarah Jenkins', type: 'Follow-up', time: '10:30 AM', icon: 'videocam', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHhZ8ST5yTOWOLQBQxNWFtGKF-VDI3c5RVprreOl9v2EW78NpbQMhRR8wT3yu-ZugZ2iifBNGfidZ1NE4kKAilUM6gdnmnqOf0LJcczyWFdcVqR-Qdpjxl069AIMel-Lx-Plm8WyHK4xZXWhiSc4EeDJR0ggBfUsjK7j0kVvXap_oC3JFG95ij5jOiCs1kW-TAPFCr-wpOdDM4LVoTomUP8BQUq-qcADgf4jQAFfJzrldTC8a5q5s3uyCCjQBqHE6YjLGUQ2sCyOhY' },
              { name: 'Robert Chen', type: 'Physical', time: '11:00 AM', icon: 'meeting_room', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNNBeTgSS7ypuH794zV5B-Cpcwc0kG0Pcv7mVuwU7g4XMHlpD3ZsR5RcCkaLCNZcScu9lIWcqlutgmnwJYOE4jz76TpvxuTDqwkjmnoVYZ-ugKrofUraKcPsVIhPXitqmGKngLvGEHRjD7VkNbJS8N0WDF_wOBg3RnnCQYF8MWsRD-17wtIKGKWvVoZvGoPhGVcGK9Cy7h_rfUI3rTcosFZ4SqEG9ZG_CwiKHektIjzMNbkJyOVHU4vrt8iK4tzXqDUgiiJLITXbQM' },
              { name: 'Elena Rodriguez', type: 'Cardiology', time: '11:45 AM', icon: 'meeting_room', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyiu9hiulFqEOHuGvg-8Ffv0AS5ImVLf8uhEJi7QTHkav_jbAtXZHercu5P-H-uRHqRzPjr1nYqL0EDLfDL1KYP5PINq6vXg_DweL2Jqq8imkXULw0bsAQbulNL9Va35eqc2ZlEo-RyjiqyPJZf_fEJn3y-KpNej2qtyCt9yathBtUeJpQPl5mrIk1w13bjw_mRZGEna-6HYyaXDKJS4kHmhutvyPH_6TDS6y1Mn0FrUvdZ7epjehJD70RXbdj12uczyLNyVW939Yv' },
            ].map((patient, i) => (
              <div key={i} className={`flex items-center gap-3 p-2 ${i < 2 ? 'border-b border-outline-variant/50 pb-3' : ''}`}>
                <img alt={patient.name} className="w-9 h-9 rounded-full object-cover grayscale" src={patient.img} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold leading-tight truncate">{patient.name}</p>
                  <p className="text-[11px] text-outline leading-tight">{patient.type} • {patient.time}</p>
                </div>
                <span className="p-1.5 bg-surface-variant rounded-lg flex-shrink-0">
                  <span className="material-symbols-outlined text-[16px]">{patient.icon}</span>
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-primary/5 border border-primary/10 rounded-xl text-center">
            <p className="text-[10px] font-bold text-primary mb-1.5 uppercase tracking-wider">Clinic Capacity</p>
            <div className="w-full bg-outline-variant/30 h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[85%] rounded-full transition-all"></div>
            </div>
            <p className="text-[10px] text-outline mt-1 font-medium">85% booked for the day</p>
          </div>
        </div>
      </div>
    </div>
  );
}
