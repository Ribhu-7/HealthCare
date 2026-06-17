# End-to-End Functionalization Plan

This plan outlines the systematic implementation of the missing functionalities across the HAPMS UI, addressing your feedback on exports, navbar logic, page interactions, and the AI tool.

## User Review Required

> [!IMPORTANT]
> **AI Assistant Location:** You mentioned the AI tool is not working "on any page". To solve this completely, I propose adding a **Floating AI Widget** to the bottom right of the screen. This will allow you to open the AI chat from *literally any page* without losing your context. Let me know if you prefer this over just having the dedicated `/ai-assistant` page!

## Proposed Changes

### 1. Global AI Assistant Widget
- **[NEW] `FloatingAIAssistant.tsx`**: Create a modern, floating chat widget that connects to the `ai-service`.
- **[MODIFY] `MainLayout.tsx`**: Inject the `FloatingAIAssistant` component into the global layout so it is accessible from the Dashboard, Patients, Billing, etc.

### 2. PDF Export Functionality
- **[MODIFY] `AdminDashboard.tsx`, `DoctorDashboard.tsx`, `PatientListPage.tsx`, `DoctorListPage.tsx`, `BillingListPage.tsx`, `ReportPage.tsx`, `SystemSettingsPage.tsx`**
  - Wire up all "Export" / "Download PDF" buttons.
  - Implement a clean browser-native print strategy using `window.print()`.
  - Add Tailwind `print:hidden` classes to navbars and sidebars so the exported PDFs are clean and strictly contain the relevant data tables and charts.

### 3. Navbar Fixes
- **[MODIFY] `MainLayout.tsx`**
  - **Search**: Bind the search input to local state. When you press `Enter`, navigate the app to `/patients?search=term` to dynamically filter the patient directory.
  - **Notifications**: Convert the static bell icon into an interactive `<Link to="/notifications">` with a simulated unread badge.

### 4. Page Functionalization (Wiring to Backend/State)
- **[MODIFY] `BillingListPage.tsx`**: Ensure the "Record Payment" flow visually updates the local list to "PAID" so you can see the change immediately.
- **[MODIFY] `PrescriptionCreatePage.tsx`**: Validate the `prescriptionApi.create()` payload to ensure it cleanly creates prescriptions in the Postgres database without failing silently.
- **[MODIFY] `ReportPage.tsx`**: Wire the mock charts to actual backend data (e.g., fetching total patients, total doctors, total appointments via `api.ts`).
- **[MODIFY] `NotificationListPage.tsx`**: Add functional state to allow "Marking all as read" and dismissing individual notifications.
- **[MODIFY] `SystemSettingsPage.tsx`**: Wire up the toggle switches so they actually update UI state and reflect changes instantly.

## Verification Plan
### Automated Tests
- None required for this phase.
### Manual Verification
- Click "Export PDF" on the dashboard and verify the print dialog appears without sidebars.
- Type in the Navbar search and verify it routes to the Patient Directory.
- Click the AI widget on the Billing page and confirm it streams a response from the `ai-service`.
- Pay a bill and verify the status badge changes from "PENDING" to "PAID".
