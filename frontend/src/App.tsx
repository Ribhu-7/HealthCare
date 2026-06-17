import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Features (Raw Pages from Stitch)
import LoginPage from './features/auth/LoginPage';
import AdminDashboard from './features/dashboard/AdminDashboard';
import DoctorDashboard from './features/dashboard/DoctorDashboard';
import AppointmentListPage from './features/appointments/AppointmentListPage';
import PatientListPage from './features/patients/PatientListPage';
import PatientDetailPage from './features/patients/PatientDetailPage';
import DoctorListPage from './features/doctors/DoctorListPage';
import PrescriptionCreatePage from './features/prescriptions/PrescriptionCreatePage';
import BillingListPage from './features/billing/BillingListPage';
import NotificationListPage from './features/notifications/NotificationListPage';
import ReportPage from './features/reports/ReportPage';
import ClinicalAssistantPage from './features/ai/ClinicalAssistantPage';
import SystemSettingsPage from './features/settings/SystemSettingsPage';
import MainLayout from './components/layout/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard/admin" replace />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
          <Route path="/appointments" element={<AppointmentListPage />} />
          <Route path="/patients" element={<PatientListPage />} />
          <Route path="/patients/:id" element={<PatientDetailPage />} />
          <Route path="/doctors" element={<DoctorListPage />} />
          <Route path="/prescriptions/create" element={<PrescriptionCreatePage />} />
          <Route path="/billing" element={<BillingListPage />} />
          <Route path="/notifications" element={<NotificationListPage />} />
          <Route path="/reports" element={<ReportPage />} />
          <Route path="/ai-assistant" element={<ClinicalAssistantPage />} />
          <Route path="/settings" element={<SystemSettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
