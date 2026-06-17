import React, { useEffect, useState } from 'react';
import { doctorApi } from '../../lib/api';

export default function DoctorListPage() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    doctorApi.getAll()
      .then(data => { setDoctors(data); setLoading(false); })
      .catch(() => { setError('Failed to load doctors. Ensure the backend is running.'); setLoading(false); });
  }, []);

  const filtered = doctors.filter(d => {
    const q = search.toLowerCase();
    return (
      `${d.firstName} ${d.lastName}`.toLowerCase().includes(q) ||
      (d.specialty || '').toLowerCase().includes(q) ||
      (d.department?.name || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-on-surface">Doctor & Staff Directory</h2>
          <p className="text-sm text-on-surface-variant mt-1">Manage clinical personnel across all departments.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="px-4 py-2 border border-outline text-primary text-sm font-semibold rounded-xl hover:bg-surface-container-high transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">download</span> Export CSV
          </button>
          <button className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:opacity-90 shadow-sm transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">add</span> Add Provider
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-outline-variant rounded-xl p-4 flex flex-wrap items-center gap-4 shadow-sm">
        <div className="relative flex-1 min-w-[220px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
          <input
            className="w-full pl-9 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-xs focus:ring-2 focus:ring-primary/20 outline-none"
            placeholder="Search by name, specialty..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="text-xs bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 focus:ring-1 focus:ring-primary outline-none">
          <option>All Departments</option>
          <option>Cardiology</option>
          <option>Neurology</option>
          <option>Oncology</option>
          <option>Pediatrics</option>
        </select>
        <div className="ml-auto text-xs text-on-surface-variant">
          <strong className="text-on-surface">{filtered.length}</strong> providers
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        {error ? (
          <div className="p-8 text-center">
            <span className="material-symbols-outlined text-error text-4xl mb-2 block">cloud_off</span>
            <p className="text-sm text-error font-semibold">{error}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant">
                  <th className="px-4 py-3 text-[10px] font-bold text-outline uppercase tracking-wider">Provider Name</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-outline uppercase tracking-wider">Specialty</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-outline uppercase tracking-wider">Department</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-outline uppercase tracking-wider">License</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-outline uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-outline uppercase tracking-wider">Fee</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-outline uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {loading ? (
                  [...Array(4)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={7} className="px-4 py-4">
                        <div className="h-4 bg-surface-container-high rounded w-full" />
                      </td>
                    </tr>
                  ))
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-on-surface-variant">
                      <span className="material-symbols-outlined text-4xl block mb-2">medical_services</span>
                      {search ? 'No providers match your search.' : 'No doctors registered yet.'}
                    </td>
                  </tr>
                ) : (
                  filtered.map(doctor => (
                    <tr key={doctor.id} className="hover:bg-surface-container-lowest transition-colors group">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm flex-shrink-0">
                            {(doctor.firstName || 'D').charAt(0)}{(doctor.lastName || '').charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-on-surface leading-none">
                              Dr. {doctor.firstName || ''} {doctor.lastName || '—'}
                            </p>
                            <p className="text-[10px] text-on-surface-variant mt-0.5">{doctor.email || doctor.licenseNumber}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-on-surface">{doctor.specialty || '—'}</td>
                      <td className="px-4 py-3 text-sm text-on-surface-variant">{doctor.department?.name || '—'}</td>
                      <td className="px-4 py-3 text-xs font-mono text-on-surface-variant">{doctor.licenseNumber || '—'}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          doctor.status === 'ACTIVE'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-surface-container text-on-surface-variant'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${doctor.status === 'ACTIVE' ? 'bg-green-500' : 'bg-outline'}`} />
                          {doctor.status || 'UNKNOWN'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-on-surface">${doctor.consultationFee || '—'}</td>
                      <td className="px-4 py-3 text-right">
                        <button className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                          <span className="material-symbols-outlined text-[18px]">more_vert</span>
                        </button>
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
