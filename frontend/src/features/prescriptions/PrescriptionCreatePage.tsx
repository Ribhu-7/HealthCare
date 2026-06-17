import React, { useEffect, useState } from 'react';
import { prescriptionApi, patientApi, appointmentApi } from '../../lib/api';

export default function PrescriptionCreatePage() {
  const [patients, setPatients] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [form, setForm] = useState({
    appointmentId: '',
    diagnosis: '',
    medications: '',
    overrideReason: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      patientApi.getAll().catch(() => []),
      appointmentApi.getAll().catch(() => []),
    ]).then(([pts, apts]) => {
      setPatients(pts);
      // Only show completed appointments that can have prescriptions
      setAppointments(apts.filter((a: any) => ['IN_PROGRESS', 'COMPLETED'].includes(a.status)));
    });
  }, []);

  const handleAppointmentSelect = (aptId: string) => {
    const apt = appointments.find(a => a.id === aptId);
    setForm(f => ({ ...f, appointmentId: aptId }));
    if (apt?.patient) setSelectedPatient(apt.patient);
    else setSelectedPatient(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.appointmentId || !form.diagnosis || !form.medications) {
      setError('Appointment, Diagnosis, and Medications are required.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const rx = await prescriptionApi.create({
        appointmentId: form.appointmentId,
        diagnosis: form.diagnosis,
        medications: form.medications,
        overrideReason: form.overrideReason || undefined,
      });
      setSuccess(`Prescription created successfully! ID: ${rx.id}`);
      setForm({ appointmentId: '', diagnosis: '', medications: '', overrideReason: '' });
      setSelectedPatient(null);
    } catch (e: any) {
      setError(e.response?.data?.message || e.message || 'Failed to create prescription.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <nav className="flex items-center gap-1.5 text-xs text-on-surface-variant mb-1">
          <span>Portal</span>
          <span className="material-symbols-outlined text-[12px]">chevron_right</span>
          <span className="text-primary font-semibold">New Prescription</span>
        </nav>
        <h2 className="text-xl font-bold text-on-surface">Create Prescription</h2>
        <p className="text-sm text-on-surface-variant mt-0.5">Issue a new prescription linked to an appointment.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar: Patient Info */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white border border-outline-variant rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">person</span>
              Patient Profile
            </h3>
            {selectedPatient ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary text-lg font-bold flex items-center justify-center">
                    {(selectedPatient.firstName || '?').charAt(0)}{(selectedPatient.lastName || '').charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-on-surface">{selectedPatient.firstName} {selectedPatient.lastName}</p>
                    <p className="text-xs text-on-surface-variant">{selectedPatient.mrn} · {selectedPatient.gender}</p>
                  </div>
                </div>
                {selectedPatient.allergies && (
                  <div className="p-3 bg-error-container/20 border border-error/20 rounded-lg">
                    <p className="text-xs font-bold text-error uppercase mb-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">warning</span>
                      Allergies
                    </p>
                    <p className="text-xs text-on-error-container">
                      {typeof selectedPatient.allergies === 'string'
                        ? selectedPatient.allergies
                        : Array.isArray(selectedPatient.allergies)
                          ? selectedPatient.allergies.join(', ')
                          : JSON.stringify(selectedPatient.allergies)}
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-surface-container rounded text-xs">
                    <p className="text-outline">Blood</p>
                    <p className="font-bold">{selectedPatient.bloodGroup || '—'}</p>
                  </div>
                  <div className="p-2 bg-surface-container rounded text-xs">
                    <p className="text-outline">DOB</p>
                    <p className="font-bold">{selectedPatient.dateOfBirth || '—'}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-on-surface-variant">
                <span className="material-symbols-outlined text-3xl block mb-2">person_search</span>
                <p className="text-xs">Select an appointment to view patient info.</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-on-surface">New Prescription</h3>
              <p className="text-xs text-on-surface-variant">Date: {new Date().toLocaleDateString()}</p>
            </div>

            {success && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
                <span className="material-symbols-outlined text-green-600 text-[20px]">check_circle</span>
                <div>
                  <p className="text-sm font-semibold text-green-800">Prescription Created!</p>
                  <p className="text-xs text-green-700 mt-0.5">{success}</p>
                </div>
              </div>
            )}

            {error && (
              <div className="p-4 bg-error-container/20 border border-error/20 rounded-xl flex items-start gap-3">
                <span className="material-symbols-outlined text-error text-[20px]">error</span>
                <p className="text-sm text-error font-semibold">{error}</p>
              </div>
            )}

            {/* Appointment Selection */}
            <div>
              <label className="text-xs font-bold text-on-surface-variant uppercase mb-2 block">
                Linked Appointment *
              </label>
              <select
                className="w-full border border-outline rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                value={form.appointmentId}
                onChange={e => handleAppointmentSelect(e.target.value)}
                required
              >
                <option value="">Select an appointment...</option>
                {appointments.map(a => (
                  <option key={a.id} value={a.id}>
                    {a.patient?.firstName} {a.patient?.lastName} · {a.appointmentDate} · {a.type} ({a.status})
                  </option>
                ))}
              </select>
              {appointments.length === 0 && (
                <p className="text-xs text-on-surface-variant mt-1">
                  No IN_PROGRESS or COMPLETED appointments found. Check-in and start an appointment first.
                </p>
              )}
            </div>

            {/* Diagnosis */}
            <div>
              <label className="text-xs font-bold text-on-surface-variant uppercase mb-2 block">
                Diagnosis *
              </label>
              <textarea
                className="w-full border border-outline rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                rows={3}
                placeholder="e.g., Type 2 Diabetes Mellitus (E11)"
                value={form.diagnosis}
                onChange={e => setForm(f => ({ ...f, diagnosis: e.target.value }))}
                required
              />
            </div>

            {/* Medications */}
            <div>
              <label className="text-xs font-bold text-on-surface-variant uppercase mb-2 block">
                Medications *
              </label>
              <textarea
                className="w-full border border-outline rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                rows={4}
                placeholder="e.g., Metformin 500mg twice daily&#10;Lisinopril 10mg once daily"
                value={form.medications}
                onChange={e => setForm(f => ({ ...f, medications: e.target.value }))}
                required
              />
              <p className="text-[10px] text-on-surface-variant mt-1">
                Drug interaction check runs automatically. Note: Ibuprofen + Aspirin combination will require override.
              </p>
            </div>

            {/* Override Reason */}
            <div>
              <label className="text-xs font-bold text-on-surface-variant uppercase mb-2 block">
                Override Reason <span className="text-outline font-normal">(if drug interaction detected)</span>
              </label>
              <input
                type="text"
                className="w-full border border-outline rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                placeholder="Clinical justification for override..."
                value={form.overrideReason}
                onChange={e => setForm(f => ({ ...f, overrideReason: e.target.value }))}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => { setForm({ appointmentId: '', diagnosis: '', medications: '', overrideReason: '' }); setSelectedPatient(null); setSuccess(null); setError(null); }}
                className="px-5 py-2.5 border border-outline text-on-surface-variant rounded-xl text-sm font-semibold hover:bg-surface-container-high transition-colors"
              >
                Clear
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-md shadow-primary/20 disabled:opacity-50"
              >
                {submitting ? 'Creating...' : 'Create Prescription'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
