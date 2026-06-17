import fs from 'fs';
import path from 'path';

const files = [
  'src/features/dashboard/AdminDashboard.tsx',
  'src/features/ai/ClinicalAssistantPage.tsx',
  'src/features/dashboard/DoctorDashboard.tsx',
  'src/features/reports/ReportPage.tsx',
  'src/features/auth/LoginPage.tsx',
  'src/features/settings/SystemSettingsPage.tsx',
  'src/features/notifications/NotificationListPage.tsx',
  'src/features/appointments/AppointmentListPage.tsx',
  'src/features/billing/BillingListPage.tsx',
  'src/features/doctors/DoctorListPage.tsx',
  'src/features/patients/PatientDetailPage.tsx',
  'src/features/prescriptions/PrescriptionCreatePage.tsx',
  'src/features/patients/PatientListPage.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  
  // Fix the double slash issue caused by previous script
  content = content.replace(/\/\s*\/>/g, '/>');
  
  // Also check for <hr/ /> or <br/ />
  content = content.replace(/<hr\s*\/\s*\/>/g, '<hr />');
  content = content.replace(/<br\s*\/\s*\/>/g, '<br />');

  // Fix any floating scripts that weren't fully removed
  content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  fs.writeFileSync(file, content);
  console.log('Fixed double slashes in', file);
});
