# PRD:

You are an expert product manager and technical architect.  
Generate a complete **Product Requirements Document (PRD)** for a **Healthcare Appointment & Patient Management System** based on the following context.
### Context (Provided by the user)
**Problem Statement:**  
Centralized management of appointments, patient records, billing, and prescriptions.
**Architecture Stack:**
- Frontend: React 19, TypeScript, Redux Toolkit, React Query, Material UI/Tailwind CSS
- Backend: Java 21, Spring Boot 3, Spring Security, Spring Cloud
- Database: PostgreSQL
- Cache: Redis
- Messaging: Apache Kafka
- DevOps: Docker, Kubernetes, GitHub Actions
- Monitoring: Prometheus, Grafana, ELK
- Security: JWT, OAuth2, RBAC
- AI: OpenAI/Local LLM, RAG, pgvector
**Core Modules:**
- Authentication & Authorization
- Dashboard & Analytics
- Workflow Management
- Notifications
- Reporting & Audit
- AI Assistant
**Microservices:**
- auth-service
- api-gateway
- core-business-service
- notification-service
- reporting-service
- ai-service
**MVP Scope:**  
User Management, Business Workflow, Dashboard, Notifications, Reporting, AI-powered insights.
---
### Required PRD Sections
Please structure the PRD with the following sections, each containing detailed, actionable information:
1. **Problem Statement**  
   - Articulate the core challenges faced by healthcare providers and patients today (e.g., fragmented data, manual scheduling, billing errors, lack of real-time insights) and how this system solves them.
2. **Solution Overview**  
   - High‑level description of the system’s purpose, key value propositions, and how the proposed architecture (microservices, event‑driven communication, AI integration) enables a scalable, secure, and intelligent platform.  
   - Mention the MVP scope and how it aligns with the overall vision.
3. **User Flow**  
   - Provide end‑to‑end user journeys for the primary personas (e.g., Patient, Doctor, Receptionist, Admin).  
   - Include at least these flows:  
     - Patient registration & appointment booking  
     - Doctor availability & calendar management  
     - Check‑in / check‑out process  
     - Prescription generation & billing  
     - AI assistant interaction (e.g., symptom checker, smart scheduling)  
   - Use flowcharts or step‑by‑step narrative.
4. **API Design**  
   - Describe the overall API strategy (RESTful, GraphQL, or hybrid) and the role of the API Gateway.  
   - For each microservice, list the key endpoints with:  
     - Purpose  
     - HTTP method & path  
     - Request/response examples (JSON)  
     - Authentication/authorization requirements  
   - Highlight how Kafka is used for asynchronous events (e.g., appointment created → notification triggered).  
   - Include OpenAPI/Swagger specifications in summary.
5. **Edge Cases**  
   - Enumerate non‑happy‑path scenarios and how the system should handle them, such as:  
     - Double‑booking of appointments (concurrency)  
     - Patient cancellation / no‑show  
     - Prescription drug interactions  
     - Billing discrepancies  
     - Network failures / service degradation  
     - Invalid or malformed input data  
     - Session expiry and token refresh  
   - Provide mitigation strategies (e.g., optimistic locking, idempotent APIs, circuit breakers).
6. **KPIs (Success Metrics / Acceptance Criteria)**  
   - Define measurable success indicators for the MVP, e.g.:  
     - Appointment booking success rate > 99.5%  
     - Average response time for API calls < 200 ms  
     - User adoption rate (e.g., 80% of staff use the system within 3 months)  
     - Reduction in administrative errors (e.g., billing corrections down by 40%)  
     - AI assistant accuracy (e.g., symptom triage matches doctor’s diagnosis in 85% of cases)  
   - Include both technical and business metrics, with specific targets.
7. **Limitations**  
   - Explicitly state what the MVP does **not** cover (e.g., full EHR integration, telemedicine video, multi‑language support) and why.  
   - Note any technical constraints (e.g., no offline mode, initial single‑tenant support, limited scalability for >1000 concurrent users).  
   - List assumptions (e.g., reliable internet connectivity, staff trained on the new system) and dependencies (e.g., third‑party payment gateway, external EHR APIs).  
   - Mention future roadmap items to address these limitations.
---
### Additional Guidelines

- Use clear, professional language suitable for stakeholders (executives, developers, QA).  
- Include diagrams or mockups where appropriate (described in text if not possible).  
- Ensure alignment with the given tech stack and microservices.  
- Provide realistic details – the document should be ready for development estimation and sprint planning.
Generate the PRD now, covering all sections thoroughly.

# save token:
[save_token.md] follow this file for everything related to this project

# KPI:
[PRD.md] refer to this file and make a comprehensive kpi.md file which will primarily have the different modules with this points kpi tables columns
1. KPI Number
2. KPI Name
3. verification method
4. Target criteria
5.Telemetry event/log source
6.Alert route

# Project Scope:
[PRD.md] [kpi.md]  refer to this files and make a comprehensive project_scope.md file in which you will primarily have this points 
1.Goal & overview 
2.Directory/folder structure
3.core feature & requirements
4.design system & ux standards
5.out of scope

# Persona:
[PRD.md] [kpi.md] refer to this files and make 3 different persona files of frontend,backend and database, each should have roles, responsibilities and tech stack description

# Boundary:
[prd.md]  [kpi.md] by refering this create project_boundary.md which consists the overall summary of my project with different boundaries the project should have like 1. Do not commit code yourself.
2. Do not run any commands without asking me first.
3. Do not write code unless you have full picture. If you have any questions, ask me first. Lets not waste tokens and build something we do not want.
4. Only create maintainable modular code.

# Development:
[Agents](directory;file:///Users/neosoft/Documents/HealthCare/Agents) by refering to this file build the project and start it , kindly fix the ui as well as it is overlapping

create the necessary test files and test the entire project from frontend to backend to database and all screens and create a testreportstatus file as well giving the necessary output

# FIX PROMPT
# Healthcare HAPMS UI Refactoring Prompt
## ROLE
You are a Principal Frontend Engineer specializing in React, TypeScript, Material UI, Tailwind CSS, Responsive Design, Accessibility, and Enterprise SaaS applications.
Your task is NOT to redesign the UI.
Your task is to refactor and productionize the existing frontend implementation while preserving the original Stitch design.
---
## TASK
Analyze the entire frontend codebase and identify all UI, UX, layout, responsiveness, navigation, accessibility, and component architecture issues.
Fix them systematically.
Maintain the visual appearance generated by Stitch while improving implementation quality.
---
# LAYOUT REQUIREMENTS
Replace any poor layout implementation with proper responsive layouts.
Rules:
### Never use
* absolute positioning for page layouts
* hardcoded pixel heights
* hardcoded pixel widths
* fixed viewport calculations
* nested scrolling containers
### Use
* CSS Grid
* Flexbox
* Responsive containers
* Tailwind responsive utilities
* Material UI Grid system
Examples:
Good:
```tsx
grid-cols-1 md:grid-cols-2 xl:grid-cols-4
```
Good:
```tsx
flex flex-col lg:flex-row
```
Bad:
```tsx
position:absolute
left:500px
top:200px
width:1200px
```
---
# RESPONSIVENESS
Ensure every screen works correctly on:
### Mobile
390px
### Tablet
768px
### Laptop
1024px
### Desktop
1440px+
Fix:
* overlapping cards
* overflowing tables
* clipped dialogs
* broken sidebars
* hidden buttons
* chart overflow
* form overflow
---
# DASHBOARD FIXES
Refactor all dashboards.
Requirements:
KPI Cards:
* equal height
* responsive grid
* proper spacing
Charts:
* responsive width
* responsive height
* container-aware
Tables:
* horizontal scroll on mobile
* sticky headers
Widgets:
* stack vertically on mobile
* grid layout on desktop
---
# SIDEBAR FIXES
Implement production-grade sidebar.
Requirements:
Desktop:
* fixed sidebar
* collapsible
Tablet:
* collapsible
Mobile:
* drawer menu
Preserve active route highlighting.
Persist collapse state.
---
# HEADER FIXES
Fix top navigation.
Requirements:
* responsive search
* notifications
* profile menu
* role badge
Prevent overlap with page content.
---
# NAVIGATION FIXES
Audit entire routing system.
Fix:
* broken links
* dead routes
* missing pages
* inconsistent route names
* nested route failures
Use React Router properly.
Create:
```tsx
MainLayout
AuthLayout
ProtectedRoute
RoleGuard
```
Ensure every sidebar item routes correctly.
---
# COMPONENT REFACTORING
Convert duplicated UI into reusable components.
Create:
* Button
* Card
* DataTable
* Modal
* Drawer
* PageHeader
* KPIWidget
* StatusBadge
* EmptyState
* LoadingState
Use consistent styling everywhere.
---
# FORMS
Refactor all forms.
Requirements:
* React Hook Form
* Zod validation
* Accessible labels
* Error handling
* Responsive layouts
Fix:
* overlapping inputs
* broken validation
* inconsistent spacing
---
# TABLES
Refactor all tables.
Requirements:
* sorting
* filtering
* pagination
* loading states
* empty states
Responsive behavior:
Desktop → full table
Mobile → card/table hybrid view
---
# ACCESSIBILITY
Achieve WCAG 2.1 AA compliance.
Fix:
* missing labels
* poor contrast
* keyboard traps
* missing focus states
* incorrect ARIA attributes
---
# PERFORMANCE
Optimize frontend.
Requirements:
* Lazy loading
* Route-based code splitting
* Memoization where needed
* Skeleton loaders
* Avoid unnecessary rerenders
Target:
* Initial load < 2 seconds
* Navigation < 500 ms
---
# DESIGN CONSISTENCY
Audit every screen.
Ensure:
* consistent spacing
* consistent typography
* consistent colors
* consistent card styles
* consistent button styles
No visual regressions.
Preserve the Stitch design language.
---

# DELIVERABLE

Provide:

1. List of all UI issues found.
2. List of all routing issues found.
3. Refactored component architecture.
4. Responsive layout fixes.
5. Updated React code.
6. Updated Tailwind/MUI implementation.
7. Production-ready frontend structure.
8. Verification checklist confirming:

   * No overlapping elements
   * No broken navigation
   * Mobile responsive
   * Tablet responsive
   * Desktop responsive
   * Accessible
   * Production ready


# Fixes:
fix the ui as what you made is overalpping a lot , navigations are not working , refer to  take Title: Nexus Health Enterprise OS & Interface ID: projects/16341432217417999391 from stitch ui and make ui 100% similar as it is there

functionalities are not working at all on all pages , prescriptions page ui is distorted, unable to send messages to ai chatbot , kindly fix the issues so that each functionality works , 

wire chatbot to spring boot backend and proceed

wire all the functionalities mentioned in my [Agents](directory;file:///Users/neosoft/Documents/HealthCare/Agents) folder and connect it for frontend and backend so that the complete functionalities work in all the pages

the functionalities are still not working in all the pages kindly fix the issues like backend and frontend should be wired properly, i can see ui issues as well with overlaps and shrink views please fix them , refer to [Agents](directory;file:///Users/neosoft/Documents/HealthCare/Agents) folder and try to fix all the functionalities and yes proceed to phase 2 and complete everything

the ui is fine now but in dashboard when im clicking on new appointment it is not working like its not going anywhere or no functionality, same for register patient in patients page , the buttons in different pages are not working properly please fix the issues so that the website is end to end compatible with both backend and frontend

the buttons are working now but appointments are failing and patient registration is also failing saying 500 status code , please fix the issues

ai assistant page is giving a similar answer to every question and not giving correct response, settings page button functionalities, reports page button , still not working kindly fix it 

# TESTING:
make test cases (mock + audit_report) for every feature which mentioned in your project
along with migrations scripts (if  db involved)