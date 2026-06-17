import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { appointmentApi, patientApi, doctorApi } from '../../lib/api';

const STATUS_COLORS: Record<string, string> = {
  SCHEDULED: 'bg-surface-container border-outline-variant',
  CHECKED_IN: 'bg-blue-50 border-blue-400',
  IN_PROGRESS: 'bg-secondary/5 border-secondary',
  COMPLETED: 'bg-green-50 border-green-500',
  CANCELLED: 'bg-error-container/30 border-error',
  NO_SHOW: 'bg-error-container/20 border-error/50',
};

const STATUS_TEXT: Record<string, string> = {
  SCHEDULED: 'text-on-surface-variant',
  CHECKED_IN: 'text-blue-700',
  IN_PROGRESS: 'text-secondary',
  COMPLETED: 'text-green-800',
  CANCELLED: 'text-error',
  NO_SHOW: 'text-error',
};

export default function AppointmentListPage() {
  const location = useLocation();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBookModal, setShowBookModal] = useState(false);
  const [booking, setBooking] = useState({
    patientId: '',
    doctorId: '',
    appointmentDate: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    type: 'CONSULTATION',
    reason: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const loadData = () => {
    setLoading(true);
    Promise.all([
      appointmentApi.getAll().catch(() => []),
      patientApi.getAll().catch(() => []),
      doctorApi.getAll().catch(() => []),
    ]).then(([apts, pts, drs]) => {
      setAppointments(apts);
      setPatients(pts);
      setDoctors(drs);
      setLoading(false);
    }).catch(() => {
      setError('Failed to load appointment data.');
      setLoading(false);
    });
  };

  useEffect(() => { loadData(); }, []);

  useEffect(() => {
    if (location.state?.openBookModal) {
      setShowBookModal(true);
      window.history.replaceState({}, document.title); // clear state
    }
  }, [location.state]);

  const handleBook = async () => {
    if (!booking.patientId || !booking.doctorId) {
      alert('Please select both a patient and a doctor.');
      return;
    }
    if (!booking.appointmentDate || !booking.startTime) {
      alert('Please select a date and start time.');
      return;
    }
    setSubmitting(true);
    try {
      const selectedDoc = doctors.find(d => d.id === booking.doctorId);
      
      const payload: any = {
        patientId: booking.patientId,
        doctorId: booking.doctorId,
        departmentId: selectedDoc?.departmentId || null,
        appointmentDate: booking.appointmentDate,
        startTime: booking.startTime,
        type: booking.type || 'CONSULTATION',
      };
      
      if (booking.reason) payload.reason = booking.reason;
      
      await appointmentApi.book(payload);
      setShowBookModal(false);
      setBooking({ patientId: '', doctorId: '', appointmentDate: '', startTime: '', type: 'CONSULTATION', reason: '' });
      loadData();
    } catch (e: any) {
      alert('Failed to book appointment: ' + (e.response?.data?.message || e.message));
    } finally {
      setSubmitting(false);
    }
  };

  const handleAction = async (id: string, action: 'check-in' | 'start' | 'cancel') => {
    try {
      if (action === 'check-in') await appointmentApi.checkIn(id);
      else if (action === 'start') await appointmentApi.start(id);
      else if (action === 'cancel') await appointmentApi.cancel(id, 'Cancelled by admin');
      loadData();
    } catch (e: any) {
      alert('Action failed: ' + (e.response?.data?.message || e.message));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-1.5 text-xs text-on-surface-variant mb-1">
            <span>Portal</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-primary font-semibold">Appointments</span>
          </nav>
          <h2 className="text-xl font-bold text-on-surface">Appointment Schedule</h2>
        </div>
        <button
          onClick={() => setShowBookModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold shadow-md shadow-primary/20 hover:opacity-90 transition-all"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          Book Appointment
        </button>
      </div>

      {/* Table */}
      {error ? (
        <div className="p-8 text-center bg-white rounded-xl border border-outline-variant">
          <span className="material-symbols-outlined text-error text-4xl block mb-2">cloud_off</span>
          <p className="text-sm text-error">{error}</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-outline-variant overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead className="bg-surface-container-low">
                <tr>
                  <th className="px-4 py-3 text-[10px] font-bold text-outline uppercase">Patient</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-outline uppercase">Doctor</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-outline uppercase">Date & Time</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-outline uppercase">Type</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-outline uppercase">Status</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-outline uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse border-b border-outline-variant">
                      <td colSpan={6} className="px-4 py-4">
                        <div className="h-4 bg-surface-container-high rounded w-full" />
                      </td>
                    </tr>
                  ))
                ) : appointments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-on-surface-variant">
                      <span className="material-symbols-outlined text-4xl block mb-2">event_busy</span>
                      No appointments scheduled. Book one to get started.
                    </td>
                  </tr>
                ) : (
                  appointments.map(apt => (
                    <tr key={apt.id} className="border-b border-outline-variant hover:bg-surface-container-lowest transition-colors group">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                            {(apt.patient?.firstName || '?').charAt(0)}{(apt.patient?.lastName || '').charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-on-surface">{apt.patient?.firstName} {apt.patient?.lastName}</p>
                            <p className="text-[10px] text-on-surface-variant">{apt.patient?.mrn}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-on-surface">Dr. {apt.doctor?.firstName} {apt.doctor?.lastName}</p>
                        <p className="text-[10px] text-on-surface-variant">{apt.doctor?.specialty}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-semibold text-on-surface">{apt.appointmentDate}</p>
                        <p className="text-[10px] text-on-surface-variant">{apt.startTime} – {apt.endTime}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-on-surface-variant">{apt.type}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                          apt.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                          apt.status === 'SCHEDULED' ? 'bg-blue-50 text-blue-700' :
                          apt.status === 'IN_PROGRESS' ? 'bg-secondary/10 text-secondary' :
                          apt.status === 'CANCELLED' ? 'bg-error-container text-error' :
                          'bg-surface-container text-on-surface-variant'
                        }`}>{apt.status}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-1">
                          {apt.status === 'SCHEDULED' && (
                            <button
                              onClick={() => handleAction(apt.id, 'check-in')}
                              className="px-2 py-1 text-[10px] font-bold bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors"
                            >
                              Check In
                            </button>
                          )}
                          {apt.status === 'CHECKED_IN' && (
                            <button
                              onClick={() => handleAction(apt.id, 'start')}
                              className="px-2 py-1 text-[10px] font-bold bg-secondary/10 text-secondary rounded hover:bg-secondary/20 transition-colors"
                            >
                              Start
                            </button>
                          )}
                          {['SCHEDULED', 'CHECKED_IN'].includes(apt.status) && (
                            <button
                              onClick={() => handleAction(apt.id, 'cancel')}
                              className="px-2 py-1 text-[10px] font-bold bg-error-container text-error rounded hover:opacity-80 transition-colors"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Book Appointment Modal */}
      {showBookModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between">
              <h3 className="font-bold text-on-surface">Book New Appointment</h3>
              <button onClick={() => setShowBookModal(false)} className="p-1.5 hover:bg-surface-container rounded-lg transition-colors">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-on-surface-variant uppercase mb-1 block">Patient *</label>
                <select
                  className="w-full border border-outline rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                  value={booking.patientId}
                  onChange={e => setBooking(b => ({ ...b, patientId: e.target.value }))}
                >
                  <option value="">Select a patient...</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.firstName} {p.lastName} ({p.mrn})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-on-surface-variant uppercase mb-1 block">Doctor *</label>
                <select
                  className="w-full border border-outline rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                  value={booking.doctorId}
                  onChange={e => setBooking(b => ({ ...b, doctorId: e.target.value }))}
                >
                  <option value="">Select a doctor...</option>
                  {doctors.map(d => (
                    <option key={d.id} value={d.id}>Dr. {d.firstName} {d.lastName} - {d.specialty}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-on-surface-variant uppercase mb-1 block">Date *</label>
                  <input
                    type="date"
                    className="w-full border border-outline rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                    value={booking.appointmentDate}
                    onChange={e => setBooking(b => ({ ...b, appointmentDate: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-on-surface-variant uppercase mb-1 block">Start Time *</label>
                  <input
                    type="time"
                    className="w-full border border-outline rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                    value={booking.startTime}
                    onChange={e => setBooking(b => ({ ...b, startTime: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-on-surface-variant uppercase mb-1 block">Type</label>
                <select
                  className="w-full border border-outline rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                  value={booking.type}
                  onChange={e => setBooking(b => ({ ...b, type: e.target.value }))}
                >
                  <option value="CONSULTATION">Consultation</option>
                  <option value="FOLLOW_UP">Follow-up</option>
                  <option value="PROCEDURE">Procedure</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-on-surface-variant uppercase mb-1 block">Reason</label>
                <textarea
                  className="w-full border border-outline rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                  rows={3}
                  placeholder="Reason for appointment..."
                  value={booking.reason}
                  onChange={e => setBooking(b => ({ ...b, reason: e.target.value }))}
                />
              </div>
            </div>
            <div className="px-6 py-4 bg-surface-container-low flex justify-end gap-3 border-t border-outline-variant">
              <button
                onClick={() => setShowBookModal(false)}
                className="px-4 py-2 border border-outline text-on-surface-variant rounded-xl text-sm font-semibold hover:bg-surface-container-high transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleBook}
                disabled={submitting}
                className="px-6 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50"
              >
                {submitting ? 'Booking...' : 'Book Appointment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
