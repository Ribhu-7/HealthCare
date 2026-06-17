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
  
  // 1. Strip script tags completely
  content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // 2. Fix inline styles
  content = content.replace(/style="([^"]+)"/g, (match, styleStr) => {
    if (styleStr.includes('width:')) {
      const w = styleStr.replace('width:', '').replace(';', '').trim();
      return `style={{ width: '${w}' }}`;
    }
    return '';
  });
  
  // 3. Fix unclosed SVG or HTML properties
  content = content.replace(/xmlns:xlink/g, 'xmlnsXlink');
  content = content.replace(/xml:space/g, 'xmlSpace');
  content = content.replace(/tabindex=/g, 'tabIndex=');
  content = content.replace(/xlink:href/g, 'xlinkHref');
  
  // Replace missing camelCase for SVG
  const svgProps = ['stroke-width', 'stroke-linecap', 'stroke-linejoin', 'fill-rule', 'clip-rule', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-miterlimit', 'fill-opacity'];
  svgProps.forEach(prop => {
    const camel = prop.split('-').map((p, i) => i === 0 ? p : p[0].toUpperCase() + p.slice(1)).join('');
    const regex = new RegExp(prop + '=', 'g');
    content = content.replace(regex, camel + '=');
  });

  fs.writeFileSync(file, content);
  console.log('Fixed', file);
});
