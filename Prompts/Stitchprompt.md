# Healthcare Appointment & Patient Management System (HAPMS)

## Frontend UI Design Prompt for Stitch

# R — ROLE

You are a Senior Product Designer, Healthcare UX Specialist, and Staff Frontend Architect with expertise in designing enterprise healthcare SaaS platforms.

Your responsibility is to design a modern, scalable, responsive, and production-ready frontend UI for a Healthcare Appointment & Patient Management System (HAPMS).

The application must support the following user personas:

* Patient
* Doctor
* Receptionist
* Administrator

Design quality should be comparable to:

* Linear
* Stripe Dashboard
* Notion
* Epic Systems
* Athenahealth
* Google Material Design 3

Focus on:

* Healthcare-grade usability
* Enterprise workflows
* Accessibility (WCAG 2.1 AA)
* Responsive design
* Data visualization
* AI-assisted healthcare experiences

---

# T — TASK

Design the complete frontend application including:

## Design System

Create:

* Color palette
* Typography scale
* Design tokens
* Iconography
* Grid system
* Spacing system
* Component library
* Form system
* Table system
* Card system
* Modal system
* Notification system
* Empty states
* Loading states
* Error states

---

## Authentication Module

Create screens for:

### Login

Components:

* Email
* Password
* Remember Me
* Forgot Password
* Login Button
* Continue With Google

Include:

* Healthcare illustration
* Product benefits panel

### Registration

Fields:

* First Name
* Last Name
* Email
* Phone
* Password
* Confirm Password

### Forgot Password

### OTP Verification

### Email Verification

---

## Application Shell

### Left Sidebar Navigation

Modules:

* Dashboard
* Patients
* Appointments
* Doctors
* Prescriptions
* Billing
* Reports
* Notifications
* AI Assistant
* Settings

### Top Navigation

Components:

* Global Search
* Notifications
* User Profile
* Role Badge
* Theme Toggle

### Main Content Area

* Responsive
* 12-column grid
* Dashboard-first layout

---

## Admin Dashboard

Create KPI cards for:

* Total Patients
* Total Appointments
* Revenue
* Active Doctors
* No-Show Rate
* Appointment Utilization

Charts:

* Revenue Trends
* Appointment Volume
* Department Performance
* Patient Demographics

Widgets:

* Recent Activities
* System Alerts
* Upcoming Appointments
* Notification Status

AI Widget:

Operational Insights Panel

Example:

"What was our no-show rate last month?"

---

## Doctor Dashboard

Widgets:

* Today's Schedule
* Patient Queue
* Upcoming Consultations
* Prescription Alerts
* Drug Interaction Warnings

Views:

* Calendar
* Daily Schedule
* Patient Summary Drawer

AI Clinical Assistant Widget

---

## Receptionist Dashboard

Widgets:

* Today's Appointments
* Check-In Queue
* Pending Bills
* Walk-In Patients

Quick Actions:

* Register Patient
* Book Appointment
* Check-In Patient
* Process Payment

---

## Patient Dashboard

Widgets:

* Upcoming Appointment
* Medical History
* Prescriptions
* Bills
* Notifications

Primary CTA:

Book Appointment

AI Symptom Checker Access

---

## Patient Management

### Patient List

Features:

* Search
* Filter
* Sort
* Pagination

Columns:

* MRN
* Patient Name
* DOB
* Gender
* Contact Number
* Last Visit

### Patient Profile

Sections:

* Demographics
* Insurance Information
* Allergies
* Medical History
* Appointments
* Prescriptions
* Billing

Create a Patient 360° View.

### Patient Registration

Multi-step wizard:

1. Personal Information
2. Contact Information
3. Insurance Details
4. Emergency Contact
5. Review & Submit

---

## Appointment Management

### Appointment Calendar

Views:

* Day
* Week
* Month

Status Colors:

* Scheduled
* Checked In
* In Progress
* Completed
* Cancelled
* No Show

### Appointment Booking Flow

Steps:

1. Select Specialty
2. Select Doctor
3. Select Time Slot
4. Review Details
5. Confirm Appointment

Display available slots visually.

### Waiting Queue

Live-updating queue table.

Columns:

* Token Number
* Patient
* Check-In Time
* Priority
* Status

---

## Doctor Management

### Doctor Directory

Views:

* Cards
* Table

Filters:

* Department
* Specialty
* Availability

### Doctor Profile

Sections:

* Professional Information
* Availability
* Appointments
* Reviews
* Analytics

### Availability Management

Interactive calendar.

Features:

* Drag-and-drop scheduling
* Block dates
* Vacation mode

---

## Prescription Management

### Prescription Creation

Layout:

Left Panel:

* Patient Summary
* Medical History
* Allergies

Center Panel:

* Prescription Form

Right Panel:

* AI Drug Interaction Checker

Alert Levels:

* Mild
* Moderate
* Severe

Override Workflow Modal

### Prescription History

Timeline-based layout.

---

## Billing Module

### Billing Dashboard

KPIs:

* Revenue
* Outstanding Payments
* Insurance Claims
* Collection Rate

### Bill Creation

Features:

* Auto-generated line items
* Insurance adjustment calculations
* Tax calculations
* Payment summary

### Payment Screen

Methods:

* Card
* Cash
* Insurance

Receipt Preview Panel

---

## Notifications

### Notification Center

Tabs:

* Email
* SMS
* System

Timeline layout.

### Notification Preferences

Settings page with toggle controls.

---

## Reporting Module

### Reports Dashboard

Cards:

* Appointment Reports
* Revenue Reports
* Billing Reports
* Audit Reports

### Audit Trail Viewer

Enterprise-grade table.

Columns:

* Timestamp
* User
* Action
* Entity
* Details

Advanced filtering and export actions.

---

## AI Assistant Experiences

### AI Symptom Checker

ChatGPT-style conversation interface.

Features:

* Chat history
* Suggested prompts
* Triage result cards

Output:

* Urgency Level
* Suggested Specialty
* Recommended Action

Display medical disclaimer prominently.

---

### Clinical Assistant

For Doctors

Features:

* Drug Interaction Check
* Patient Summary Generation
* Clinical Insights

Persistent AI side panel.

---

### Operational Insights

For Admins

Features:

* Natural Language Queries
* AI-generated charts
* KPI explanations

Example:

"Which department generated the highest revenue this quarter?"

---

# C — CONTEXT

Healthcare facilities currently face:

* Fragmented patient records
* Manual scheduling
* High no-show rates
* Billing errors
* Poor visibility into operations
* Prescription safety risks

The platform consolidates:

* Appointments
* Patient records
* Prescriptions
* Billing
* Notifications
* Reporting
* AI-powered healthcare insights

Frontend Technology Stack:

* React 19
* TypeScript
* Redux Toolkit
* React Query
* Material UI
* Tailwind CSS
* Recharts

Design should support enterprise healthcare operations and scale from small clinics to multi-specialty hospitals.

---

# F — FORMAT

Generate:

## Design Deliverables

1. Design System
2. Application Shell
3. Authentication Flow
4. Admin Dashboard
5. Doctor Dashboard
6. Receptionist Dashboard
7. Patient Dashboard
8. Patient Management Screens
9. Appointment Management Screens
10. Doctor Management Screens
11. Prescription Screens
12. Billing Screens
13. Reporting Screens
14. Notification Screens
15. AI Assistant Screens
16. Tablet Layouts
17. Mobile Layouts

For every screen provide:

* Layout structure
* Component hierarchy
* Responsive behavior
* Interaction patterns
* Visual styling recommendations

Visual Style:

* Professional Healthcare SaaS
* White surfaces
* Soft blue primary
* Teal secondary
* Rounded corners (12px)
* Minimal shadows
* Enterprise tables
* Modern charts
* Clean typography
* Accessible contrast ratios

Output should feel production-ready and suitable for hospitals, clinics, and healthcare networks.

make the other pages you only made 4 , where are the pages for doctors, prescriptions, billings, reports, notifications , ai assistant , settings etc


check the files in my stitch and give the details

Nexus Health Enterprise OS
projects/16341432217417999391

refer to frontend_persona.md take Title: FAQBot Design System & Interface ID: projects/2534138631142238984 from stitch ui and make the ui accordingly