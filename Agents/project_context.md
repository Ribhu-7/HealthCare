### Appendix A: Role-Based Access Control (RBAC) Matrix

| Resource | ADMIN | DOCTOR | RECEPTIONIST | PATIENT |
|---|---|---|---|---|
| **User Management** | Full CRUD | View own profile | View own profile | View/edit own profile |
| **Patient Records** | Full CRUD | Read (assigned) | Create, Read, Update | Read own |
| **Doctor Profiles** | Full CRUD | Edit own | Read | Read |
| **Appointments** | Full CRUD | Read/update assigned | Create, Read, Update | Create, Read, Cancel own |
| **Prescriptions** | Read | Create, Read | Read | Read own |
| **Billing** | Full CRUD | Read assigned | Create, Read, Update | Read own, Pay |
| **Reports** | Full access | Department reports | No access | No access |
| **Audit Trail** | Full access | No access | No access | No access |
| **AI Triage** | No access | Clinical assistant | No access | Symptom checker |
| **Notifications** | Manage templates | View own | View own | View own, manage preferences |
| **System Settings** | Full access | No access | No access | No access |

### Appendix B: Database Schema Overview (Key Tables)

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│     users        │     │    patients      │     │    doctors       │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ id (PK, UUID)   │◄───┤ user_id (FK)     │     │ user_id (FK)     │
│ email (UNIQUE)  │     │ mrn (UNIQUE)     │     │ license_number   │
│ password_hash   │     │ date_of_birth    │     │ specialty        │
│ first_name      │     │ gender           │     │ department_id(FK)│
│ last_name       │     │ blood_group      │     │ qualification    │
│ phone           │     │ allergies (JSON) │     │ experience_years │
│ role            │     │ insurance (JSON) │     │ consultation_fee │
│ status          │     │ emergency_contact│     │ status           │
│ created_at      │     │ created_at       │     │ created_at       │
│ version         │     │ version          │     │ version          │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                        appointments                              │
├─────────────────────────────────────────────────────────────────┤
│ id (PK, UUID) │ patient_id (FK) │ doctor_id (FK)               │
│ department_id  │ appointment_date │ start_time │ end_time       │
│ type           │ status (ENUM)    │ reason     │ notes          │
│ qr_code        │ checked_in_at    │ started_at │ completed_at   │
│ created_at     │ version          │                              │
└────────────┬────────────────────────────────┬───────────────────┘
             │                                │
             ▼                                ▼
┌─────────────────────┐          ┌─────────────────────┐
│    prescriptions     │          │      billing         │
├─────────────────────┤          ├─────────────────────┤
│ id (PK, UUID)       │          │ id (PK, UUID)       │
│ appointment_id (FK) │          │ appointment_id (FK) │
│ patient_id (FK)     │          │ patient_id (FK)     │
│ doctor_id (FK)      │          │ line_items (JSON)   │
│ diagnosis (JSON)    │          │ subtotal            │
│ medications (JSON)  │          │ insurance_adj       │
│ interaction_status  │          │ discount            │
│ status              │          │ tax                 │
│ version_chain       │          │ total_due           │
│ created_at          │          │ payment_method      │
│ version             │          │ status              │
└─────────────────────┘          │ paid_at             │
                                 │ created_at          │
                                 │ version             │
                                 └─────────────────────┘
```

**Appointment Status ENUM:** `SCHEDULED` → `CHECKED_IN` → `IN_PROGRESS` → `COMPLETED` → `CHECKED_OUT`  
**Additional statuses:** `CANCELLED`, `NO_SHOW`, `RESCHEDULED`

### Appendix C: Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    KUBERNETES CLUSTER                             │
│                                                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │ Ingress     │  │ ConfigMap / │  │  Prometheus + Grafana   │ │
│  │ (NGINX)     │  │ Secrets     │  │  ELK Stack              │ │
│  └──────┬──────┘  └─────────────┘  └─────────────────────────┘ │
│         │                                                        │
│         ▼                                                        │
│  ┌──────────────┐                                                │
│  │ API Gateway  │ (2 replicas, HPA: 2–6)                        │
│  └──────┬───────┘                                                │
│         │                                                        │
│  ┌──────┼──────────────────────────────────────────────┐        │
│  │      │                                              │        │
│  │  ┌───▼────┐ ┌──────────┐ ┌──────────┐ ┌────────┐  │        │
│  │  │ auth   │ │  core    │ │ notif.   │ │ report │  │        │
│  │  │service │ │ business │ │ service  │ │service │  │        │
│  │  │(2 rep.)│ │(3 rep.)  │ │(2 rep.)  │ │(2 rep.)│  │        │
│  │  └────────┘ └──────────┘ └──────────┘ └────────┘  │        │
│  │                                                     │        │
│  │  ┌──────────┐                                       │        │
│  │  │ ai-      │ (1–3 rep., HPA based on CPU)         │        │
│  │  │ service  │                                       │        │
│  │  └──────────┘                                       │        │
│  └─────────────────────────────────────────────────────┘        │
│                                                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                      │
│  │PostgreSQL│  │  Redis   │  │  Kafka   │ (managed or          │
│  │(Primary+ │  │ Sentinel │  │  Cluster │  StatefulSet)        │
│  │ Standby) │  │ (3 nodes)│  │ (3 nodes)│                      │
│  └──────────┘  └──────────┘  └──────────┘                      │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Appendix D: Sprint Planning Estimate (MVP)

| Sprint | Duration | Focus | Key Deliverables |
|---|---|---|---|
| **Sprint 0** | 2 weeks | Infrastructure & Setup | K8s cluster, CI/CD pipelines, DB schemas, project scaffolding, API Gateway |
| **Sprint 1** | 2 weeks | Auth & User Management | Registration, login, JWT, RBAC, user CRUD, role assignment |
| **Sprint 2** | 2 weeks | Patient & Doctor Management | Patient CRUD, doctor profiles, availability management, slot generation |
| **Sprint 3** | 2 weeks | Appointment Workflow | Booking, cancellation, rescheduling, check-in/out, status transitions |
| **Sprint 4** | 2 weeks | Prescriptions & Billing | Prescription CRUD, billing generation, payment recording, receipt generation |
| **Sprint 5** | 2 weeks | Notifications & Events | Kafka integration, email/SMS notifications, in-app notifications, templates |
| **Sprint 6** | 2 weeks | Dashboard & Reporting | Admin dashboard, doctor dashboard, appointment/billing reports, audit trail |
| **Sprint 7** | 2 weeks | AI Integration | Symptom triage, drug interactions, smart scheduling, patient summary |
| **Sprint 8** | 2 weeks | Frontend Polish & Integration | UI/UX refinement, end-to-end integration, responsive design |
| **Sprint 9** | 2 weeks | Testing & Hardening | Load testing, security audit, UAT, bug fixes, documentation |
| **Sprint 10** | 1 week | Go-Live Preparation | Production deployment, monitoring verification, staff training, launch |

**Total Estimated Duration:** ~21 weeks (~5 months)  
**Team Size Recommendation:** 2 frontend, 3 backend, 1 DevOps, 1 QA, 1 PM/PO