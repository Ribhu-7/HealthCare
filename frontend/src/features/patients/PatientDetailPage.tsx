import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { patientApi, prescriptionApi, billingApi } from '../../lib/api';

export default function PatientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<any>(null);
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [bills, setBills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([
      patientApi.getById(id),
      prescriptionApi.getByPatient(id).catch(() => []),
      billingApi.getByPatient(id).catch(() => []),
    ])
      .then(([p, rx, b]) => {
        setPatient(p);
        setPrescriptions(rx);
        setBills(b);
        setLoading(false);
      })
      .catch(() => { setError('Failed to load patient data.'); setLoading(false); });
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-32 bg-surface-container-high rounded-xl" />
        <div className="h-64 bg-surface-container-high rounded-xl" />
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="text-center py-20">
        <span className="material-symbols-outlined text-error text-5xl block mb-3">person_off</span>
        <p className="text-error font-semibold">{error || 'Patient not found.'}</p>
        <Link to="/patients" className="mt-4 inline-block text-primary hover:underline text-sm">← Back to Directory</Link>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'person' },
    { id: 'prescriptions', label: `Prescriptions (${prescriptions.length})`, icon: 'pill' },
    { id: 'billing', label: `Billing (${bills.length})`, icon: 'payments' },
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-on-surface-variant">
        <Link to="/patients" className="hover:text-primary transition-colors">Patient Directory</Link>
        <span className="material-symbols-outlined text-[12px]">chevron_right</span>
        <span className="text-primary font-semibold">{patient.firstName} {patient.lastName}</span>
      </nav>

      {/* Profile Header */}
      <div className="bg-white border border-outline-variant rounded-xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-sm">
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-3xl font-bold border-4 border-surface shadow-md">
            {(patient.firstName || '?').charAt(0)}{(patient.lastName || '').charAt(0)}
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
            <h2 className="text-xl font-bold text-on-surface">{patient.firstName} {patient.lastName}</h2>
            <span className="text-xs font-mono bg-surface-container text-on-surface-variant px-3 py-1 rounded-full border border-outline-variant">
              {patient.mrn || 'MRN Pending'}
            </span>
          </div>
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-on-surface-variant">
            {patient.dateOfBirth && (
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-primary text-[16px]">cake</span>
                {patient.dateOfBirth}
              </span>
            )}
            {patient.gender && (
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-primary text-[16px]">wc</span>
                {patient.gender}
              </span>
            )}
            {patient.contactNumber && (
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-primary text-[16px]">phone</span>
                {patient.contactNumber}
              </span>
            )}
            {patient.email && (
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-primary text-[16px]">email</span>
                {patient.email}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-xs font-semibold shadow-md shadow-primary/20 hover:opacity-90 transition-all">
            <span className="material-symbols-outlined text-[16px]">edit</span>
            Edit Profile
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-outline-variant">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-all border-b-2 -mb-px ${
              activeTab === t.id
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Demographics */}
          <div className="bg-white border border-outline-variant rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">contact_page</span>
              Demographics
            </h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-on-surface-variant">Gender</dt>
                <dd className="font-semibold">{patient.gender || '—'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-on-surface-variant">Date of Birth</dt>
                <dd className="font-semibold">{patient.dateOfBirth || '—'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-on-surface-variant">Blood Group</dt>
                <dd className="font-semibold">{patient.bloodGroup || '—'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-on-surface-variant">Email</dt>
                <dd className="font-semibold truncate max-w-[180px]">{patient.email || '—'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-on-surface-variant">Phone</dt>
                <dd className="font-semibold">{patient.contactNumber || '—'}</dd>
              </div>
            </dl>
          </div>

          {/* Allergies */}
          <div className="bg-white border border-outline-variant rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-error text-[18px]">warning</span>
              Allergies
            </h3>
            {patient.allergies ? (
              <div className="p-3 bg-error-container/20 border border-error/20 rounded-lg">
                <p className="text-sm text-on-error-container font-medium">
                  {typeof patient.allergies === 'string'
                    ? patient.allergies
                    : Array.isArray(patient.allergies)
                      ? patient.allergies.join(', ')
                      : JSON.stringify(patient.allergies)}
                </p>
              </div>
            ) : (
              <p className="text-sm text-on-surface-variant">No known allergies.</p>
            )}
          </div>

          {/* Insurance */}
          <div className="bg-white border border-outline-variant rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
              Insurance
            </h3>
            {patient.insurance ? (
              <dl className="space-y-2 text-sm">
                {typeof patient.insurance === 'object' ? (
                  Object.entries(patient.insurance as Record<string, string>).map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <dt className="text-on-surface-variant capitalize">{k}</dt>
                      <dd className="font-semibold">{v}</dd>
                    </div>
                  ))
                ) : (
                  <p className="font-semibold">{String(patient.insurance)}</p>
                )}
              </dl>
            ) : (
              <p className="text-sm text-on-surface-variant">No insurance on record.</p>
            )}
          </div>
        </div>
      )}

      {activeTab === 'prescriptions' && (
        <div className="bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm">
          {prescriptions.length === 0 ? (
            <div className="p-12 text-center">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant block mb-2">pill</span>
              <p className="text-sm text-on-surface-variant">No prescriptions found for this patient.</p>
              <Link
                to="/prescriptions/create"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-xs font-semibold"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                Create Prescription
              </Link>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container-low">
                <tr>
                  <th className="px-4 py-3 text-[10px] font-bold text-outline uppercase">Status</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-outline uppercase">Interaction</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-outline uppercase">Date</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map(rx => (
                  <tr key={rx.id} className="border-t border-outline-variant hover:bg-surface-container-lowest">
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        rx.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-surface-container text-on-surface-variant'
                      }`}>{rx.status}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-on-surface-variant">{rx.interactionStatus || 'CLEAR'}</td>
                    <td className="px-4 py-3 text-xs text-on-surface-variant">{rx.createdAt?.split('T')[0] || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === 'billing' && (
        <div className="bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm">
          {bills.length === 0 ? (
            <div className="p-12 text-center">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant block mb-2">payments</span>
              <p className="text-sm text-on-surface-variant">No billing records for this patient.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container-low">
                <tr>
                  <th className="px-4 py-3 text-[10px] font-bold text-outline uppercase">Amount</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-outline uppercase">Status</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-outline uppercase">Method</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-outline uppercase">Date</th>
                </tr>
              </thead>
              <tbody>
                {bills.map(b => (
                  <tr key={b.id} className="border-t border-outline-variant hover:bg-surface-container-lowest">
                    <td className="px-4 py-3 font-semibold text-sm">${b.totalDue}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        b.status === 'PAID' ? 'bg-green-100 text-green-700' :
                        b.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-error-container text-error'
                      }`}>{b.status}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-on-surface-variant">{b.paymentMethod || '—'}</td>
                    <td className="px-4 py-3 text-xs text-on-surface-variant">{b.createdAt?.split('T')[0] || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
