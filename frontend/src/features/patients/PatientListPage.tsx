import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { patientApi } from '../../lib/api';

export default function PatientListPage() {
  const location = useLocation();
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [newPatient, setNewPatient] = useState({
    firstName: '', lastName: '', email: '', contactNumber: '', dateOfBirth: '', gender: ''
  });

  const loadData = () => {
    patientApi.getAll()
      .then(data => { setPatients(data); setLoading(false); })
      .catch(() => { setError('Failed to load patients.'); setLoading(false); });
  };

  useEffect(() => { loadData(); }, []);

  useEffect(() => {
    if (location.state?.openRegisterModal) {
      setShowRegisterModal(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleRegister = async () => {
    if (!newPatient.firstName || !newPatient.lastName) {
      alert("First name and last name are required");
      return;
    }
    if (!newPatient.dateOfBirth || !newPatient.gender) {
      alert("Date of Birth and Gender are required");
      return;
    }
    
    // Clean up empty fields to prevent backend parsing errors (500)
    const payload: any = { ...newPatient };
    if (!payload.dateOfBirth) payload.dateOfBirth = null;
    if (!payload.gender) payload.gender = null;
    if (!payload.contactNumber) payload.contactNumber = null;
    if (!payload.email) payload.email = null;

    try {
      await patientApi.create(payload);
      setShowRegisterModal(false);
      setNewPatient({ firstName: '', lastName: '', email: '', contactNumber: '', dateOfBirth: '', gender: '' });
      loadData();
    } catch (e) {
      alert("Failed to register patient. Check logs.");
    }
  };

  const filtered = patients.filter(p => {
    const q = search.toLowerCase();
    return (
      `${p.firstName} ${p.lastName}`.toLowerCase().includes(q) ||
      (p.mrn || '').toLowerCase().includes(q) ||
      (p.email || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-1.5 text-xs text-on-surface-variant mb-1">
            <span>Portal</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-primary font-semibold">Patient Directory</span>
          </nav>
          <h2 className="text-xl font-bold text-on-surface">Patient Management</h2>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => window.print()} className="flex items-center gap-2 px-3 py-2 border border-outline-variant rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-white transition-all shadow-sm">
            <span className="material-symbols-outlined text-[16px]">file_download</span>
            Export
          </button>
          <button
            onClick={() => setShowRegisterModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold shadow-md shadow-primary/20 hover:opacity-90 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">person_add</span>
            Register Patient
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-xl border border-outline-variant p-4 flex flex-wrap items-center gap-4 shadow-sm">
        <div className="relative flex-1 min-w-[220px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
          <input
            className="w-full pl-9 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-xs focus:ring-2 focus:ring-primary/20 outline-none"
            placeholder="Search by name, MRN, email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="text-xs bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 focus:ring-1 focus:ring-primary outline-none">
          <option>All Genders</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs text-on-surface-variant">
            <strong className="text-on-surface">{filtered.length}</strong> records
          </span>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-outline-variant overflow-hidden shadow-sm">
        {error ? (
          <div className="p-8 text-center">
            <span className="material-symbols-outlined text-error text-4xl mb-2 block">cloud_off</span>
            <p className="text-sm text-error font-semibold">{error}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead className="bg-surface-container-low">
                <tr>
                  <th className="px-4 py-3 border-b border-outline-variant text-[10px] font-bold text-outline uppercase tracking-wider">MRN</th>
                  <th className="px-4 py-3 border-b border-outline-variant text-[10px] font-bold text-outline uppercase tracking-wider">Patient Name</th>
                  <th className="px-4 py-3 border-b border-outline-variant text-[10px] font-bold text-outline uppercase tracking-wider">DOB</th>
                  <th className="px-4 py-3 border-b border-outline-variant text-[10px] font-bold text-outline uppercase tracking-wider">Gender</th>
                  <th className="px-4 py-3 border-b border-outline-variant text-[10px] font-bold text-outline uppercase tracking-wider">Contact</th>
                  <th className="px-4 py-3 border-b border-outline-variant text-[10px] font-bold text-outline uppercase tracking-wider">Blood</th>
                  <th className="px-4 py-3 border-b border-outline-variant text-[10px] font-bold text-outline uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={7} className="px-4 py-3 border-b border-outline-variant">
                        <div className="h-4 bg-surface-container-high rounded w-full" />
                      </td>
                    </tr>
                  ))
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-on-surface-variant">
                      <span className="material-symbols-outlined text-4xl block mb-2">person_search</span>
                      {search ? 'No patients match your search.' : 'No patients registered yet.'}
                    </td>
                  </tr>
                ) : (
                  filtered.map(patient => (
                    <tr key={patient.id} className="hover:bg-surface-container-lowest transition-colors group">
                      <td className="px-4 py-3 border-b border-outline-variant">
                        <span className="text-xs font-mono font-medium text-on-surface-variant">{patient.mrn || '—'}</span>
                      </td>
                      <td className="px-4 py-3 border-b border-outline-variant">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs flex-shrink-0">
                            {(patient.firstName || '?').charAt(0)}{(patient.lastName || '').charAt(0)}
                          </div>
                          <Link
                            to={`/patients/${patient.id}`}
                            className="text-sm font-bold text-on-surface hover:text-primary transition-colors"
                          >
                            {patient.firstName || '—'} {patient.lastName || ''}
                          </Link>
                        </div>
                      </td>
                      <td className="px-4 py-3 border-b border-outline-variant text-xs text-on-surface-variant">{patient.dateOfBirth || '—'}</td>
                      <td className="px-4 py-3 border-b border-outline-variant text-xs text-on-surface-variant">{patient.gender || '—'}</td>
                      <td className="px-4 py-3 border-b border-outline-variant">
                        <div className="text-xs text-on-surface">{patient.contactNumber || '—'}</div>
                        <div className="text-[10px] text-on-surface-variant truncate max-w-[140px]">{patient.email || ''}</div>
                      </td>
                      <td className="px-4 py-3 border-b border-outline-variant">
                        {patient.bloodGroup ? (
                          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-error/10 text-error">{patient.bloodGroup}</span>
                        ) : <span className="text-xs text-on-surface-variant">—</span>}
                      </td>
                      <td className="px-4 py-3 border-b border-outline-variant text-right">
                        <Link
                          to={`/patients/${patient.id}`}
                          className="inline-flex p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between shrink-0">
              <h3 className="font-bold text-on-surface">Register New Patient</h3>
              <button onClick={() => setShowRegisterModal(false)} className="p-1.5 hover:bg-surface-container rounded-lg transition-colors">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto min-h-0">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-on-surface-variant uppercase mb-1 block">First Name *</label>
                  <input
                    type="text"
                    className="w-full border border-outline rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                    value={newPatient.firstName}
                    onChange={e => setNewPatient({ ...newPatient, firstName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-on-surface-variant uppercase mb-1 block">Last Name *</label>
                  <input
                    type="text"
                    className="w-full border border-outline rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                    value={newPatient.lastName}
                    onChange={e => setNewPatient({ ...newPatient, lastName: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-on-surface-variant uppercase mb-1 block">Email</label>
                  <input
                    type="email"
                    className="w-full border border-outline rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                    value={newPatient.email}
                    onChange={e => setNewPatient({ ...newPatient, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-on-surface-variant uppercase mb-1 block">Contact Number</label>
                  <input
                    type="text"
                    className="w-full border border-outline rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                    value={newPatient.contactNumber}
                    onChange={e => setNewPatient({ ...newPatient, contactNumber: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-on-surface-variant uppercase mb-1 block">Date of Birth</label>
                  <input
                    type="date"
                    className="w-full border border-outline rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                    value={newPatient.dateOfBirth}
                    onChange={e => setNewPatient({ ...newPatient, dateOfBirth: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-on-surface-variant uppercase mb-1 block">Gender</label>
                  <select
                    className="w-full border border-outline rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                    value={newPatient.gender}
                    onChange={e => setNewPatient({ ...newPatient, gender: e.target.value })}
                  >
                    <option value="">Select...</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-surface-container-low flex justify-end gap-3 border-t border-outline-variant shrink-0">
              <button
                onClick={() => setShowRegisterModal(false)}
                className="px-4 py-2 border border-outline text-on-surface-variant rounded-xl text-sm font-semibold hover:bg-surface-container-high transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRegister}
                className="px-6 py-2 bg-primary text-white rounded-xl text-sm font-semibold shadow-md shadow-primary/20 hover:opacity-90 transition-all"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
