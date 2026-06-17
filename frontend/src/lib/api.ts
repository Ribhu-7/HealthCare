import axios from 'axios';

// Base API pointing to core-business-service directly (bypass gateway for now)
export const api = axios.create({
  baseURL: 'http://localhost:8082/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// AI API pointing to ai-service directly
export const aiApi = axios.create({
  baseURL: 'http://localhost:8085/api/v1/ai',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Patient API ───────────────────────────────────────────────
export const patientApi = {
  getAll: () => api.get('/patients').then(r => r.data),
  getById: (id: string) => api.get(`/patients/${id}`).then(r => r.data),
  create: (data: PatientCreateDTO) => api.post('/patients', data).then(r => r.data),
  update: (id: string, data: Partial<PatientCreateDTO>) => api.put(`/patients/${id}`, data).then(r => r.data),
};

// ─── Doctor API ────────────────────────────────────────────────
export const doctorApi = {
  getAll: () => api.get('/doctors').then(r => r.data),
  getById: (id: string) => api.get(`/doctors/${id}`).then(r => r.data),
};

// ─── Appointment API ───────────────────────────────────────────
export const appointmentApi = {
  getAll: () => api.get('/appointments').then(r => r.data),
  getById: (id: string) => api.get(`/appointments/${id}`).then(r => r.data),
  book: (data: AppointmentBookDTO) => api.post('/appointments', data).then(r => r.data),
  checkIn: (id: string) => api.put(`/appointments/${id}/check-in`).then(r => r.data),
  start: (id: string) => api.put(`/appointments/${id}/start`).then(r => r.data),
  complete: (id: string, notes: string) => api.put(`/appointments/${id}/complete`, { notes }).then(r => r.data),
  cancel: (id: string, reason: string) => api.put(`/appointments/${id}/cancel`, { reason }).then(r => r.data),
};

// ─── Billing API ───────────────────────────────────────────────
export const billingApi = {
  getAll: () => api.get('/billing').then(r => r.data),
  getById: (id: string) => api.get(`/billing/${id}`).then(r => r.data),
  getByPatient: (patientId: string) => api.get(`/billing/patient/${patientId}`).then(r => r.data),
  create: (data: BillingCreateDTO) => api.post('/billing', data).then(r => r.data),
  recordPayment: (id: string, paymentMethod: string) =>
    api.put(`/billing/${id}/pay`, { paymentMethod }).then(r => r.data),
};

// ─── Prescription API ──────────────────────────────────────────
export const prescriptionApi = {
  getByPatient: (patientId: string) => api.get(`/prescriptions/patient/${patientId}`).then(r => r.data),
  getById: (id: string) => api.get(`/prescriptions/${id}`).then(r => r.data),
  create: (data: PrescriptionCreateDTO) => api.post('/prescriptions', data).then(r => r.data),
};

// ─── Types ─────────────────────────────────────────────────────
export interface PatientCreateDTO {
  firstName: string;
  lastName: string;
  email?: string;
  contactNumber?: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup?: string;
  allergies?: string;
  insurance?: string;
  emergencyContact?: string;
  userId?: string;
  mrn?: string;
}

export interface AppointmentBookDTO {
  patientId: string;
  doctorId: string;
  appointmentDate: string;
  startTime: string;
  type: string;
  reason?: string;
}

export interface BillingCreateDTO {
  appointmentId: string;
  lineItems: string;
  subtotal: number;
  insuranceAdj?: number;
  discount?: number;
}

export interface PrescriptionCreateDTO {
  appointmentId: string;
  diagnosis: string;
  medications: string;
  overrideReason?: string;
}

// Legacy export for backward compatibility
export const coreApi = {
  getPatients: patientApi.getAll,
  getPatientById: patientApi.getById,
  createPatient: patientApi.create,
  getDoctors: doctorApi.getAll,
  getAppointments: appointmentApi.getAll,
  bookAppointment: appointmentApi.book,
};
