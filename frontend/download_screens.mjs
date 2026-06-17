import fs from 'fs';
import https from 'https';
import path from 'path';

const screens = [
  { url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2U2ZjgwOTdlMjYyMjQ5Nzk4ODY3NzQwNjFlYWU3NDU5EgsSBxDJlOXz2QcYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjM0MTQzMjIxNzQxNzk5OTM5MQ&filename=&opi=89354086', file: 'src/features/dashboard/AdminDashboard.tsx', name: 'AdminDashboard' },
  { url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzRkZTIyY2FjMTgxODRlYzhhODQ0YThhNGE2M2RmNjkyEgsSBxDJlOXz2QcYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjM0MTQzMjIxNzQxNzk5OTM5MQ&filename=&opi=89354086', file: 'src/features/ai/ClinicalAssistantPage.tsx', name: 'ClinicalAssistantPage' },
  { url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2I0ZjY4ZWIxM2UwYzQyODQ4YzNlMTgwNTE2OWEwMWQwEgsSBxDJlOXz2QcYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjM0MTQzMjIxNzQxNzk5OTM5MQ&filename=&opi=89354086', file: 'src/features/dashboard/DoctorDashboard.tsx', name: 'DoctorDashboard' },
  { url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2VkMzBiNjgzNzczNTQzM2Y5NGU4NGU3OTYyOTVhZGM3EgsSBxDJlOXz2QcYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjM0MTQzMjIxNzQxNzk5OTM5MQ&filename=&opi=89354086', file: 'src/features/reports/ReportPage.tsx', name: 'ReportPage' },
  { url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzg2NmE1NTMxYzYyZjRjYjhhNjJkMGJiMDE0ZWJkMmNjEgsSBxDJlOXz2QcYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjM0MTQzMjIxNzQxNzk5OTM5MQ&filename=&opi=89354086', file: 'src/features/auth/LoginPage.tsx', name: 'LoginPage' },
  { url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzZkYTNiYjlmNjEwMDQ5N2ZiMWI3ODdlMjNlYjUzNTIyEgsSBxDJlOXz2QcYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjM0MTQzMjIxNzQxNzk5OTM5MQ&filename=&opi=89354086', file: 'src/features/settings/SystemSettingsPage.tsx', name: 'SystemSettingsPage' },
  { url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2Y2YmRhNDdhODk0NTQzYzliZTBlY2Y2Nzg3ZGM0NTQzEgsSBxDJlOXz2QcYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjM0MTQzMjIxNzQxNzk5OTM5MQ&filename=&opi=89354086', file: 'src/features/notifications/NotificationListPage.tsx', name: 'NotificationListPage' },
  { url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzU4MjlmNzA5YTNkODRhN2RhODdhODg4NDczY2VmMDYwEgsSBxDJlOXz2QcYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjM0MTQzMjIxNzQxNzk5OTM5MQ&filename=&opi=89354086', file: 'src/features/appointments/AppointmentListPage.tsx', name: 'AppointmentListPage' },
  { url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzMwZmJkMzFhOWQ5NjQyMzI4M2ZlYjI0MzEwMmFhMTc0EgsSBxDJlOXz2QcYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjM0MTQzMjIxNzQxNzk5OTM5MQ&filename=&opi=89354086', file: 'src/features/billing/BillingListPage.tsx', name: 'BillingListPage' },
  { url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2Q0ZDFmMzE4NzdiYzRhNDRhNDljZmQ5NjUyMWQwNjQ4EgsSBxDJlOXz2QcYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjM0MTQzMjIxNzQxNzk5OTM5MQ&filename=&opi=89354086', file: 'src/features/doctors/DoctorListPage.tsx', name: 'DoctorListPage' },
  { url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzhkNmM5YTAzYTlmMjRhOTNiMzY3Nzg4NTAzMjRmNTU0EgsSBxDJlOXz2QcYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjM0MTQzMjIxNzQxNzk5OTM5MQ&filename=&opi=89354086', file: 'src/features/patients/PatientDetailPage.tsx', name: 'PatientDetailPage' },
  { url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2NlM2JhZDVjZjEzNTQyOWY4MDRkYmFjOTI2ZDUwYTEyEgsSBxDJlOXz2QcYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjM0MTQzMjIxNzQxNzk5OTM5MQ&filename=&opi=89354086', file: 'src/features/prescriptions/PrescriptionCreatePage.tsx', name: 'PrescriptionCreatePage' },
  { url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzdiNDJiOWJmYmFhNTQyOGNhNDA4Yjc4YmE0ZGI1N2I3EgsSBxDJlOXz2QcYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjM0MTQzMjIxNzQxNzk5OTM5MQ&filename=&opi=89354086', file: 'src/features/patients/PatientListPage.tsx', name: 'PatientListPage' }
];

function downloadHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', err => reject(err));
  });
}

function htmlToJsx(html) {
  return html
    .replace(/class=/g, 'className=')
    .replace(/for=/g, 'htmlFor=')
    .replace(/<br>/g, '<br />')
    .replace(/<hr>/g, '<hr />')
    .replace(/<input([^>]+?)>/g, '<input$1 />')
    .replace(/<img([^>]+?)>/g, '<img$1 />')
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/stroke-linecap=/g, 'strokeLinecap=')
    .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/stroke-miterlimit=/g, 'strokeMiterlimit=')
    .replace(/<!--[\s\S]*?-->/g, '');
}

async function processScreens() {
  for (const screen of screens) {
    try {
      console.log(`Downloading ${screen.name}...`);
      const rawHtml = await downloadHtml(screen.url);
      
      // Extract body content if present
      let bodyMatch = rawHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      let content = bodyMatch ? bodyMatch[1] : rawHtml;
      
      // Attempt to strip out <script> or other unnecessary tags, and extract just the main container
      const jsxContent = htmlToJsx(content);
      
      const componentCode = `import React from 'react';\n\nexport default function ${screen.name}() {\n  return (\n    <>\n      ${jsxContent}\n    </>\n  );\n}\n`;
      
      fs.writeFileSync(path.resolve(screen.file), componentCode);
      console.log(`Saved ${screen.name} to ${screen.file}`);
    } catch (err) {
      console.error(`Error processing ${screen.name}:`, err);
    }
  }
}

processScreens().then(() => console.log('Done!'));
