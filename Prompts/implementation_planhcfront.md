# Frontend Implementation Plan: Nexus Health Enterprise OS

This plan outlines the architecture and execution strategy for building the HAPMS frontend based on the "Nexus Health Enterprise OS" design from Stitch (Project ID: `projects/16341432217417999391`) and the established `persona_frontend.md`.

## User Review Required
> [!IMPORTANT]
> **Tailwind CSS vs MUI 6:** The persona mentions both Material UI (MUI 6) and Tailwind CSS 4. Since the Stitch design system uses detailed utility tokens (colors like `primary: #003d9b`, `surface-dim: #d9d9e4`), **Tailwind CSS** is typically the best fit for 1:1 translation of these utility tokens. We will use Tailwind CSS as the primary styling engine and headless UI components (or standard HTML) to keep the app lightweight and pixel-perfect to the Stitch design. If you strictly require MUI 6 for form components, please let me know, otherwise I will default to Tailwind CSS for all custom styling.

> [!WARNING]
> **React 19 & Tailwind 4:** Both are very new. We will use Vite with the latest React and Tailwind CSS v4 alpha/beta, or fallback to Tailwind CSS v3 if v4 is not stable enough for your setup. Please confirm if standard Tailwind v3 is acceptable if v4 causes initialization issues.

## Proposed Changes

### Phase 1: Foundation & Setup
- Initialize Vite + React + TypeScript in the `frontend/` directory.
- Install core dependencies: `react-router-dom`, `@reduxjs/toolkit`, `react-redux`, `@tanstack/react-query`, `axios`, `lucide-react` (for icons).
- Configure Tailwind CSS with the Nexus Health Design System tokens:
  - **Colors:** Primary Blue (`#0052cc`), Secondary Teal (`#00687a`), Slate Neutrals, and Semantic Status colors.
  - **Typography:** `Inter` for all fonts, `JetBrains Mono` for code.
  - **Radius & Spacing:** 12px rounded corners for cards, dense/comfortable spacing scales.
- Create the global `index.css` applying the base theme.

### Phase 2: Core Layout & Navigation
- Build `AuthLayout` (for login) and `MainLayout` (with sidebar and header).
- Implement the 280px fixed Sidebar with role-based navigation links.
- Create core atomic components: `Button`, `Input`, `Card`, `Badge` (for status pills), `Table`.

### Phase 3: Screen Implementation (From Stitch)
We will fetch the HTML/CSS for the 13 screens defined in Stitch and convert them into reusable React components.
1. **HAPMS Login** -> `features/auth/LoginPage.tsx`
2. **Admin Dashboard** -> `features/dashboard/AdminDashboard.tsx`
3. **Doctor Dashboard** -> `features/dashboard/DoctorDashboard.tsx`
4. **Appointment Management** -> `features/appointments/AppointmentListPage.tsx`
5. **Patient Management - Directory** -> `features/patients/PatientListPage.tsx`
6. **Patient 360° Profile** -> `features/patients/PatientDetailPage.tsx`
7. **Doctor & Staff Directory** -> `features/doctors/DoctorListPage.tsx`
8. **Prescription Creation & Safety Check** -> `features/prescriptions/PrescriptionCreatePage.tsx`
9. **Billing & Revenue Management** -> `features/billing/BillingListPage.tsx`
10. **Notifications & Alerts Center** -> `features/notifications/NotificationListPage.tsx`
11. **Reporting & Analytics** -> `features/reports/ReportPage.tsx`
12. **AI Clinical & Operational Assistant** -> `features/ai/ClinicalAssistantPage.tsx`
13. **System Settings & Configuration** -> `features/settings/SystemSettingsPage.tsx`

### Phase 4: State Management & Mock API
- Setup Redux store (`store.ts`) with slices for Auth, Patients, and Appointments.
- Configure Axios instance with mock interceptors (since backend is not yet built) to allow the UI to function and be interactive.

## Verification Plan
### Automated Tests
- Run `npm run build` to ensure the TypeScript compilation and Vite build succeed.
- Run `npm run lint` to verify code quality.

### Manual Verification
- Start the dev server (`npm run dev`) and manually navigate through the 13 screens to ensure routing works.
- Verify that the layout is responsive and matches the Stitch Nexus Health Enterprise OS design exactly.
