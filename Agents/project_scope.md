# Project Scope — HAPMS

> Healthcare Appointment & Patient Management System  
> Version 1.0 | 2026-06-16

---

## 1. Goal & Overview

### 1.1 Project Goal

Build a **cloud-native, microservices-based healthcare management platform** that centralizes appointment scheduling, patient records, prescriptions, billing, and analytics into a single system — eliminating data silos, automating manual workflows, and providing AI-powered clinical and operational insights.

### 1.2 Problem Being Solved

| Problem | Current State | Target State |
|---|---|---|
| Fragmented patient data | Records in 3–5 disconnected systems | Unified Patient 360° view |
| Manual scheduling | Phone/walk-in based, 23% no-show rate | AI-powered online booking, ≤ 10% no-show |
| Billing errors | 7–12% error rate, 3–5% revenue leakage | Auto-generated bills, < 3% correction rate |
| No real-time insights | Month-end stale reports | Live dashboards with < 30s data freshness |
| Prescription risks | Uncoordinated drug checks | Automated drug-interaction & allergy alerts |
| Communication gaps | Missed appointments, no reminders | Automated email/SMS notifications |
| Audit burden | Manual record-keeping | Immutable, queryable audit trail |

### 1.3 MVP Scope Summary

| Pillar | What's Included |
|---|---|
| **User Management** | Registration, login, JWT/OAuth2, RBAC (Admin, Doctor, Receptionist, Patient) |
| **Business Workflow** | Patient CRUD, appointment lifecycle, doctor availability, check-in/out, prescriptions, billing |
| **Dashboard** | Admin dashboard (volume, revenue, demographics), Doctor dashboard (schedule, pending Rx) |
| **Notifications** | Email for confirmations, 24h reminders, cancellations, billing receipts |
| **Reporting** | Appointment/billing reports (daily/weekly/monthly), audit trail viewer |
| **AI Insights** | Symptom triage chatbot, drug interaction alerts, smart scheduling suggestions |

### 1.4 Architecture Stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, TypeScript, Redux Toolkit, React Query, Material UI + Tailwind CSS |
| Backend | Java 21, Spring Boot 3, Spring Security 6, Spring Cloud |
| Database | PostgreSQL 15+ (pgvector for AI embeddings) |
| Cache | Redis 7+ |
| Messaging | Apache Kafka 3.x |
| DevOps | Docker, Kubernetes, GitHub Actions |
| Monitoring | Prometheus, Grafana, ELK Stack |
| Security | JWT (RS256), OAuth2, RBAC |
| AI | OpenAI API / Local LLM, RAG (LangChain4j / Spring AI), pgvector |

### 1.5 Microservices

| Service | Port | Responsibility |
|---|---|---|
| `api-gateway` | 8080 | Routing, rate limiting, JWT validation, CORS |
| `auth-service` | 8081 | Registration, login, tokens, roles, OAuth2 |
| `core-business-service` | 8082 | Patients, doctors, appointments, prescriptions, billing |
| `notification-service` | 8083 | Email/SMS dispatch, Kafka consumer, templates |
| `reporting-service` | 8084 | Reports, analytics aggregation, audit trail |
| `ai-service` | 8085 | Triage, drug interactions, chat, scheduling insights |

---

## 2. Directory / Folder Structure

```
healthcare-appointment-system/
│
├── docs/                                  # Project documentation
│   ├── PRD.md
│   ├── kpi.md
│   ├── project_scope.md
│   ├── api-contracts/                     # OpenAPI specs per service
│   │   ├── auth-service.yaml
│   │   ├── core-business-service.yaml
│   │   ├── notification-service.yaml
│   │   ├── reporting-service.yaml
│   │   └── ai-service.yaml
│   └── architecture/
│       ├── system-architecture.png
│       ├── database-erd.png
│       └── kafka-event-flow.png
│
├── frontend/                              # React 19 SPA
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── manifest.json
│   ├── src/
│   │   ├── main.tsx                       # App entry point
│   │   ├── App.tsx                        # Root component + router
│   │   ├── index.css                      # Global styles & design tokens
│   │   │
│   │   ├── assets/                        # Static assets (images, icons, fonts)
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   └── fonts/
│   │   │
│   │   ├── config/                        # App configuration
│   │   │   ├── env.ts                     # Environment variables
│   │   │   ├── routes.ts                  # Route constants
│   │   │   └── api.ts                     # API base URLs
│   │   │
│   │   ├── store/                         # Redux Toolkit store
│   │   │   ├── store.ts                   # Store configuration
│   │   │   ├── rootReducer.ts
│   │   │   └── slices/
│   │   │       ├── authSlice.ts
│   │   │       ├── patientSlice.ts
│   │   │       ├── appointmentSlice.ts
│   │   │       ├── doctorSlice.ts
│   │   │       ├── billingSlice.ts
│   │   │       ├── notificationSlice.ts
│   │   │       └── aiSlice.ts
│   │   │
│   │   ├── hooks/                         # Custom React hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useDebounce.ts
│   │   │   ├── usePermission.ts
│   │   │   └── useNotification.ts
│   │   │
│   │   ├── services/                      # API service layer (React Query + Axios)
│   │   │   ├── axiosInstance.ts           # Axios config + interceptors (token refresh)
│   │   │   ├── authService.ts
│   │   │   ├── patientService.ts
│   │   │   ├── appointmentService.ts
│   │   │   ├── doctorService.ts
│   │   │   ├── billingService.ts
│   │   │   ├── prescriptionService.ts
│   │   │   ├── notificationService.ts
│   │   │   ├── reportService.ts
│   │   │   └── aiService.ts
│   │   │
│   │   ├── components/                    # Shared/reusable UI components
│   │   │   ├── ui/                        # Atomic design system components
│   │   │   │   ├── Button/
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   ├── Button.test.tsx
│   │   │   │   │   └── Button.module.css
│   │   │   │   ├── Input/
│   │   │   │   ├── Modal/
│   │   │   │   ├── Table/
│   │   │   │   ├── Card/
│   │   │   │   ├── Badge/
│   │   │   │   ├── Avatar/
│   │   │   │   ├── Spinner/
│   │   │   │   ├── Toast/
│   │   │   │   └── Skeleton/
│   │   │   │
│   │   │   ├── layout/                    # Layout components
│   │   │   │   ├── Sidebar/
│   │   │   │   ├── Header/
│   │   │   │   ├── Footer/
│   │   │   │   ├── MainLayout.tsx
│   │   │   │   └── AuthLayout.tsx
│   │   │   │
│   │   │   ├── forms/                     # Reusable form components
│   │   │   │   ├── PatientForm.tsx
│   │   │   │   ├── AppointmentForm.tsx
│   │   │   │   ├── PrescriptionForm.tsx
│   │   │   │   └── BillingForm.tsx
│   │   │   │
│   │   │   ├── charts/                    # Dashboard chart components
│   │   │   │   ├── AppointmentChart.tsx
│   │   │   │   ├── RevenueChart.tsx
│   │   │   │   └── PatientDemographics.tsx
│   │   │   │
│   │   │   └── ai/                        # AI assistant components
│   │   │       ├── ChatWidget.tsx
│   │   │       ├── TriageResult.tsx
│   │   │       └── DrugInteractionAlert.tsx
│   │   │
│   │   ├── features/                      # Feature modules (page-level)
│   │   │   ├── auth/
│   │   │   │   ├── LoginPage.tsx
│   │   │   │   ├── RegisterPage.tsx
│   │   │   │   ├── ForgotPasswordPage.tsx
│   │   │   │   └── VerifyEmailPage.tsx
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── AdminDashboard.tsx
│   │   │   │   ├── DoctorDashboard.tsx
│   │   │   │   ├── ReceptionistDashboard.tsx
│   │   │   │   └── PatientDashboard.tsx
│   │   │   │
│   │   │   ├── patients/
│   │   │   │   ├── PatientListPage.tsx
│   │   │   │   ├── PatientDetailPage.tsx
│   │   │   │   ├── PatientCreatePage.tsx
│   │   │   │   └── PatientHistoryPage.tsx
│   │   │   │
│   │   │   ├── doctors/
│   │   │   │   ├── DoctorListPage.tsx
│   │   │   │   ├── DoctorProfilePage.tsx
│   │   │   │   └── DoctorAvailabilityPage.tsx
│   │   │   │
│   │   │   ├── appointments/
│   │   │   │   ├── AppointmentListPage.tsx
│   │   │   │   ├── AppointmentBookingPage.tsx
│   │   │   │   ├── AppointmentDetailPage.tsx
│   │   │   │   └── WaitingQueuePage.tsx
│   │   │   │
│   │   │   ├── prescriptions/
│   │   │   │   ├── PrescriptionCreatePage.tsx
│   │   │   │   ├── PrescriptionDetailPage.tsx
│   │   │   │   └── PrescriptionListPage.tsx
│   │   │   │
│   │   │   ├── billing/
│   │   │   │   ├── BillingCreatePage.tsx
│   │   │   │   ├── BillingDetailPage.tsx
│   │   │   │   ├── BillingListPage.tsx
│   │   │   │   └── PaymentPage.tsx
│   │   │   │
│   │   │   ├── notifications/
│   │   │   │   ├── NotificationListPage.tsx
│   │   │   │   └── NotificationPreferencesPage.tsx
│   │   │   │
│   │   │   ├── reports/
│   │   │   │   ├── AppointmentReportPage.tsx
│   │   │   │   ├── BillingReportPage.tsx
│   │   │   │   ├── AuditTrailPage.tsx
│   │   │   │   └── CustomReportPage.tsx
│   │   │   │
│   │   │   ├── ai/
│   │   │   │   ├── SymptomCheckerPage.tsx
│   │   │   │   ├── ClinicalAssistantPage.tsx
│   │   │   │   └── OperationalInsightsPage.tsx
│   │   │   │
│   │   │   └── settings/
│   │   │       ├── UserManagementPage.tsx
│   │   │       ├── RoleManagementPage.tsx
│   │   │       └── SystemSettingsPage.tsx
│   │   │
│   │   ├── guards/                        # Route protection
│   │   │   ├── AuthGuard.tsx
│   │   │   └── RoleGuard.tsx
│   │   │
│   │   ├── utils/                         # Utility functions
│   │   │   ├── formatDate.ts
│   │   │   ├── formatCurrency.ts
│   │   │   ├── validators.ts
│   │   │   └── constants.ts
│   │   │
│   │   └── types/                         # TypeScript type definitions
│   │       ├── auth.types.ts
│   │       ├── patient.types.ts
│   │       ├── appointment.types.ts
│   │       ├── doctor.types.ts
│   │       ├── prescription.types.ts
│   │       ├── billing.types.ts
│   │       ├── notification.types.ts
│   │       ├── report.types.ts
│   │       └── ai.types.ts
│   │
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   ├── .eslintrc.cjs
│   └── .prettierrc
│
├── backend/                               # Java 21 + Spring Boot 3 microservices
│   │
│   ├── api-gateway/
│   │   ├── src/main/java/com/hapms/gateway/
│   │   │   ├── GatewayApplication.java
│   │   │   ├── config/
│   │   │   │   ├── RouteConfig.java        # Route definitions per service
│   │   │   │   ├── CorsConfig.java
│   │   │   │   ├── RateLimitConfig.java    # Redis-based rate limiting
│   │   │   │   └── SecurityConfig.java     # JWT validation filter
│   │   │   └── filter/
│   │   │       ├── JwtAuthFilter.java
│   │   │       ├── RequestLoggingFilter.java
│   │   │       └── RateLimitFilter.java
│   │   ├── src/main/resources/
│   │   │   └── application.yml
│   │   ├── Dockerfile
│   │   └── pom.xml
│   │
│   ├── auth-service/
│   │   ├── src/main/java/com/hapms/auth/
│   │   │   ├── AuthServiceApplication.java
│   │   │   ├── config/
│   │   │   │   ├── SecurityConfig.java
│   │   │   │   ├── JwtConfig.java
│   │   │   │   └── OAuth2Config.java
│   │   │   ├── controller/
│   │   │   │   ├── AuthController.java
│   │   │   │   └── UserController.java
│   │   │   ├── service/
│   │   │   │   ├── AuthService.java
│   │   │   │   ├── UserService.java
│   │   │   │   ├── JwtService.java
│   │   │   │   └── OtpService.java
│   │   │   ├── repository/
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── RoleRepository.java
│   │   │   │   └── RefreshTokenRepository.java
│   │   │   ├── model/
│   │   │   │   ├── User.java
│   │   │   │   ├── Role.java
│   │   │   │   ├── Permission.java
│   │   │   │   └── RefreshToken.java
│   │   │   ├── dto/
│   │   │   │   ├── LoginRequest.java
│   │   │   │   ├── RegisterRequest.java
│   │   │   │   ├── TokenResponse.java
│   │   │   │   └── UserResponse.java
│   │   │   ├── event/
│   │   │   │   └── UserRegisteredEvent.java
│   │   │   └── exception/
│   │   │       ├── AuthException.java
│   │   │       └── GlobalExceptionHandler.java
│   │   ├── src/main/resources/
│   │   │   ├── application.yml
│   │   │   └── db/migration/              # Flyway migrations
│   │   │       ├── V1__create_users.sql
│   │   │       ├── V2__create_roles.sql
│   │   │       └── V3__create_refresh_tokens.sql
│   │   ├── src/test/java/com/hapms/auth/
│   │   ├── Dockerfile
│   │   └── pom.xml
│   │
│   ├── core-business-service/
│   │   ├── src/main/java/com/hapms/core/
│   │   │   ├── CoreServiceApplication.java
│   │   │   ├── config/
│   │   │   │   ├── SecurityConfig.java
│   │   │   │   ├── KafkaProducerConfig.java
│   │   │   │   └── RedisConfig.java
│   │   │   ├── controller/
│   │   │   │   ├── PatientController.java
│   │   │   │   ├── DoctorController.java
│   │   │   │   ├── AppointmentController.java
│   │   │   │   ├── PrescriptionController.java
│   │   │   │   └── BillingController.java
│   │   │   ├── service/
│   │   │   │   ├── PatientService.java
│   │   │   │   ├── DoctorService.java
│   │   │   │   ├── AppointmentService.java
│   │   │   │   ├── SlotService.java
│   │   │   │   ├── PrescriptionService.java
│   │   │   │   ├── BillingService.java
│   │   │   │   └── NoShowDetectionService.java
│   │   │   ├── repository/
│   │   │   │   ├── PatientRepository.java
│   │   │   │   ├── DoctorRepository.java
│   │   │   │   ├── AppointmentRepository.java
│   │   │   │   ├── AppointmentSlotRepository.java
│   │   │   │   ├── PrescriptionRepository.java
│   │   │   │   ├── BillingRepository.java
│   │   │   │   └── DepartmentRepository.java
│   │   │   ├── model/
│   │   │   │   ├── Patient.java
│   │   │   │   ├── Doctor.java
│   │   │   │   ├── Appointment.java
│   │   │   │   ├── AppointmentSlot.java
│   │   │   │   ├── Prescription.java
│   │   │   │   ├── Billing.java
│   │   │   │   ├── Department.java
│   │   │   │   └── enums/
│   │   │   │       ├── AppointmentStatus.java
│   │   │   │       ├── BillingStatus.java
│   │   │   │       ├── PrescriptionStatus.java
│   │   │   │       └── SlotStatus.java
│   │   │   ├── dto/
│   │   │   │   ├── patient/
│   │   │   │   ├── doctor/
│   │   │   │   ├── appointment/
│   │   │   │   ├── prescription/
│   │   │   │   └── billing/
│   │   │   ├── event/
│   │   │   │   ├── AppointmentCreatedEvent.java
│   │   │   │   ├── AppointmentCancelledEvent.java
│   │   │   │   ├── AppointmentCompletedEvent.java
│   │   │   │   ├── BillingCompletedEvent.java
│   │   │   │   ├── DoctorUnavailableEvent.java
│   │   │   │   └── PrescriptionCreatedEvent.java
│   │   │   ├── client/
│   │   │   │   └── AiServiceClient.java   # OpenFeign client for ai-service
│   │   │   └── exception/
│   │   │       ├── SlotUnavailableException.java
│   │   │       ├── PatientNotFoundException.java
│   │   │       └── GlobalExceptionHandler.java
│   │   ├── src/main/resources/
│   │   │   ├── application.yml
│   │   │   └── db/migration/
│   │   │       ├── V1__create_patients.sql
│   │   │       ├── V2__create_doctors.sql
│   │   │       ├── V3__create_departments.sql
│   │   │       ├── V4__create_appointments.sql
│   │   │       ├── V5__create_appointment_slots.sql
│   │   │       ├── V6__create_prescriptions.sql
│   │   │       └── V7__create_billing.sql
│   │   ├── src/test/java/com/hapms/core/
│   │   ├── Dockerfile
│   │   └── pom.xml
│   │
│   ├── notification-service/
│   │   ├── src/main/java/com/hapms/notification/
│   │   │   ├── NotificationServiceApplication.java
│   │   │   ├── config/
│   │   │   │   ├── KafkaConsumerConfig.java
│   │   │   │   ├── SendGridConfig.java
│   │   │   │   └── TwilioConfig.java
│   │   │   ├── controller/
│   │   │   │   └── NotificationController.java
│   │   │   ├── service/
│   │   │   │   ├── NotificationService.java
│   │   │   │   ├── EmailService.java
│   │   │   │   ├── SmsService.java
│   │   │   │   └── TemplateService.java
│   │   │   ├── consumer/
│   │   │   │   ├── AppointmentEventConsumer.java
│   │   │   │   ├── BillingEventConsumer.java
│   │   │   │   └── UserEventConsumer.java
│   │   │   ├── repository/
│   │   │   │   ├── NotificationLogRepository.java
│   │   │   │   ├── TemplateRepository.java
│   │   │   │   └── PreferenceRepository.java
│   │   │   ├── model/
│   │   │   │   ├── NotificationLog.java
│   │   │   │   ├── NotificationTemplate.java
│   │   │   │   └── NotificationPreference.java
│   │   │   └── dto/
│   │   ├── src/main/resources/
│   │   │   ├── application.yml
│   │   │   ├── templates/                 # Email HTML templates
│   │   │   │   ├── appointment-confirmation.html
│   │   │   │   ├── appointment-reminder.html
│   │   │   │   ├── appointment-cancellation.html
│   │   │   │   └── billing-receipt.html
│   │   │   └── db/migration/
│   │   │       ├── V1__create_notification_logs.sql
│   │   │       ├── V2__create_templates.sql
│   │   │       └── V3__create_preferences.sql
│   │   ├── Dockerfile
│   │   └── pom.xml
│   │
│   ├── reporting-service/
│   │   ├── src/main/java/com/hapms/reporting/
│   │   │   ├── ReportingServiceApplication.java
│   │   │   ├── config/
│   │   │   │   └── KafkaConsumerConfig.java
│   │   │   ├── controller/
│   │   │   │   ├── ReportController.java
│   │   │   │   └── AuditTrailController.java
│   │   │   ├── service/
│   │   │   │   ├── AppointmentReportService.java
│   │   │   │   ├── BillingReportService.java
│   │   │   │   ├── PatientReportService.java
│   │   │   │   ├── AuditTrailService.java
│   │   │   │   └── ReportGenerationService.java
│   │   │   ├── consumer/
│   │   │   │   └── AuditEventConsumer.java
│   │   │   ├── repository/
│   │   │   │   ├── AuditLogRepository.java
│   │   │   │   ├── ReportConfigRepository.java
│   │   │   │   └── ScheduledReportRepository.java
│   │   │   ├── model/
│   │   │   │   ├── AuditLog.java
│   │   │   │   ├── ReportConfig.java
│   │   │   │   └── ScheduledReport.java
│   │   │   └── dto/
│   │   ├── src/main/resources/
│   │   │   ├── application.yml
│   │   │   └── db/migration/
│   │   │       ├── V1__create_audit_logs.sql
│   │   │       ├── V2__create_report_configs.sql
│   │   │       └── V3__create_scheduled_reports.sql
│   │   ├── Dockerfile
│   │   └── pom.xml
│   │
│   ├── ai-service/
│   │   ├── src/main/java/com/hapms/ai/
│   │   │   ├── AiServiceApplication.java
│   │   │   ├── config/
│   │   │   │   ├── OpenAiConfig.java
│   │   │   │   ├── PgVectorConfig.java
│   │   │   │   └── RagPipelineConfig.java
│   │   │   ├── controller/
│   │   │   │   ├── TriageController.java
│   │   │   │   ├── DrugInteractionController.java
│   │   │   │   ├── ChatController.java
│   │   │   │   ├── SchedulingInsightController.java
│   │   │   │   └── PatientSummaryController.java
│   │   │   ├── service/
│   │   │   │   ├── TriageService.java
│   │   │   │   ├── DrugInteractionService.java
│   │   │   │   ├── ChatService.java
│   │   │   │   ├── SchedulingInsightService.java
│   │   │   │   ├── PatientSummaryService.java
│   │   │   │   ├── EmbeddingService.java
│   │   │   │   └── FallbackRuleEngine.java  # Local fallback when OpenAI is down
│   │   │   ├── repository/
│   │   │   │   ├── EmbeddingRepository.java
│   │   │   │   ├── AiSessionRepository.java
│   │   │   │   └── InteractionLogRepository.java
│   │   │   ├── model/
│   │   │   │   ├── Embedding.java
│   │   │   │   ├── AiSession.java
│   │   │   │   └── InteractionLog.java
│   │   │   └── dto/
│   │   │       ├── TriageRequest.java
│   │   │       ├── TriageResponse.java
│   │   │       ├── DrugInteractionRequest.java
│   │   │       └── DrugInteractionResponse.java
│   │   ├── src/main/resources/
│   │   │   ├── application.yml
│   │   │   └── db/migration/
│   │   │       ├── V1__create_embeddings.sql
│   │   │       ├── V2__create_ai_sessions.sql
│   │   │       └── V3__create_interaction_logs.sql
│   │   ├── Dockerfile
│   │   └── pom.xml
│   │
│   └── pom.xml                            # Parent POM (multi-module Maven)
│
├── infrastructure/                        # IaC & DevOps
│   ├── docker/
│   │   └── docker-compose.yml             # Local dev environment
│   ├── k8s/
│   │   ├── namespaces/
│   │   │   └── hapms-namespace.yaml
│   │   ├── deployments/
│   │   │   ├── api-gateway.yaml
│   │   │   ├── auth-service.yaml
│   │   │   ├── core-business-service.yaml
│   │   │   ├── notification-service.yaml
│   │   │   ├── reporting-service.yaml
│   │   │   └── ai-service.yaml
│   │   ├── services/
│   │   │   ├── api-gateway-svc.yaml
│   │   │   ├── auth-service-svc.yaml
│   │   │   ├── core-service-svc.yaml
│   │   │   ├── notification-service-svc.yaml
│   │   │   ├── reporting-service-svc.yaml
│   │   │   └── ai-service-svc.yaml
│   │   ├── configmaps/
│   │   │   └── hapms-config.yaml
│   │   ├── secrets/
│   │   │   └── hapms-secrets.yaml
│   │   ├── ingress/
│   │   │   └── hapms-ingress.yaml
│   │   └── hpa/
│   │       ├── api-gateway-hpa.yaml
│   │       ├── core-service-hpa.yaml
│   │       └── ai-service-hpa.yaml
│   └── monitoring/
│       ├── prometheus/
│       │   ├── prometheus.yml
│       │   └── alert-rules.yml
│       ├── grafana/
│       │   └── dashboards/
│       │       ├── api-gateway-dashboard.json
│       │       ├── core-service-dashboard.json
│       │       ├── kafka-dashboard.json
│       │       └── redis-dashboard.json
│       └── elk/
│           ├── logstash.conf
│           └── kibana-dashboards/
│
├── .github/
│   └── workflows/
│       ├── ci.yml                         # Build + test on PR
│       ├── cd-staging.yml                 # Deploy to staging
│       ├── cd-production.yml              # Deploy to production
│       └── security-scan.yml              # OWASP ZAP + Dependabot
│
├── .gitignore
├── README.md
└── LICENSE
```

---

## 3. Core Features & Requirements

### 3.1 Authentication & Authorization

| Req ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| AUTH-F01 | User registration with email + password | P0 | `201 Created` with `PENDING_VERIFICATION` status; Kafka `user.registered` published |
| AUTH-F02 | Email/OTP verification | P0 | Account status flips to `ACTIVE` on valid OTP; OTP expires in 10 min |
| AUTH-F03 | Login with JWT issuance | P0 | Returns access token (15 min TTL) + refresh token (7 day TTL); `200 OK` < 150 ms P95 |
| AUTH-F04 | Token refresh with rotation | P0 | Old refresh token invalidated on new issuance; `200 OK` with new token pair |
| AUTH-F05 | Logout with token blacklisting | P0 | Refresh token deleted from Redis; access token `jti` blacklisted for remaining TTL |
| AUTH-F06 | OAuth2 login (Google) | P1 | Redirect flow completes in < 3s; new user auto-created with `PATIENT` role |
| AUTH-F07 | RBAC enforcement (4 roles) | P0 | `403 Forbidden` returned for unauthorized endpoint access; 0 RBAC bypass |
| AUTH-F08 | User CRUD (Admin) | P0 | List/search/update/deactivate users; paginated response |
| AUTH-F09 | Role assignment (Admin) | P0 | Admin can change any user's role; audit logged |
| AUTH-F10 | Brute-force protection | P0 | Account locked after 5 failed attempts in 10 min; `429` returned |

### 3.2 Patient Management

| Req ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| PAT-F01 | Patient profile creation | P0 | MRN auto-generated; all required fields validated; `201 Created` |
| PAT-F02 | Patient search (name, phone, MRN) | P0 | Results returned < 300 ms P95; paginated; fuzzy match supported |
| PAT-F03 | Patient profile update | P0 | Optimistic locking; audit trail entry on every change |
| PAT-F04 | Duplicate detection | P1 | Fuzzy match on `(firstName, lastName, DOB)` flags potential duplicates before creation |
| PAT-F05 | Medical history view | P0 | Aggregated view of past appointments, prescriptions, diagnoses; < 500 ms P95 |
| PAT-F06 | Allergy and insurance tracking | P0 | Stored as structured JSON; surfaced during prescription and billing flows |

### 3.3 Doctor & Schedule Management

| Req ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| DOC-F01 | Doctor profile creation (Admin) | P0 | Linked to user account; specialty, department, consultation fee stored |
| DOC-F02 | Weekly availability schedule | P0 | Define day-of-week, start/end time, slot duration, break times; effective date range |
| DOC-F03 | One-off availability slots | P1 | Create/override individual date availability outside recurring schedule |
| DOC-F04 | Time-off blocking | P0 | Block date range → affected appointments flagged → Kafka `doctor.unavailable` published |
| DOC-F05 | Available slot retrieval | P0 | GET by doctor + date returns slots with `AVAILABLE`/`BOOKED` status |
| DOC-F06 | Doctor search by specialty/department | P0 | Filterable, paginated list; any authenticated user can access |

### 3.4 Appointment Management

| Req ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| APPT-F01 | Appointment booking | P0 | Optimistic lock prevents double-booking; `201` with QR code; Kafka `appointment.created` |
| APPT-F02 | Appointment cancellation | P0 | Allowed up to 2h before; status → `CANCELLED`; slot released; Kafka `appointment.cancelled` |
| APPT-F03 | Appointment rescheduling | P0 | Old slot released, new slot booked atomically; single transaction |
| APPT-F04 | Check-in (QR or manual) | P0 | Status → `CHECKED_IN`; patient added to doctor's waiting queue |
| APPT-F05 | Consultation start/complete | P0 | Status → `IN_PROGRESS` → `COMPLETED`; timestamp recorded |
| APPT-F06 | Check-out | P0 | Status → `CHECKED_OUT` after billing; Kafka `appointment.completed` |
| APPT-F07 | No-show auto-detection | P0 | 15 min after scheduled time with no check-in → status `NO_SHOW`; patient notified |
| APPT-F08 | Repeat no-show flagging | P1 | ≥ 3 no-shows in 90 days → future bookings require receptionist confirmation |
| APPT-F09 | Appointment status state machine | P0 | Invalid transitions rejected; `core_appointment_invalid_transition_total` = 0 |
| APPT-F10 | Appointment listing with filters | P0 | Filter by date, doctor, patient, department, status; paginated |

### 3.5 Prescription Management

| Req ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| RX-F01 | Prescription creation (Doctor) | P0 | Linked to appointment; diagnosis (ICD-10) + medications stored |
| RX-F02 | Automatic drug-interaction check | P0 | `ai-service` called synchronously before save; SEVERE blocks save; MODERATE warns |
| RX-F03 | Allergy cross-reference | P0 | Known allergen → CRITICAL alert, non-overridable |
| RX-F04 | Doctor override with audit | P0 | Override reason logged to audit trail; `core_prescription_override_total` tracked |
| RX-F05 | Prescription immutability | P0 | No UPDATE/DELETE; modifications create new version with chain reference |
| RX-F06 | Prescription history per patient | P0 | Paginated list; accessible by Doctor and Patient (own) |

### 3.6 Billing

| Req ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| BILL-F01 | Auto-generate bill from appointment | P0 | Line items from consultation code + procedures + medications |
| BILL-F02 | Insurance adjustment | P1 | Subtract insurance-covered amount; show copay |
| BILL-F03 | Payment recording (cash/card) | P0 | Status → `PAID`; `paid_at` timestamp; Kafka `billing.completed` |
| BILL-F04 | Insurance claim submission | P1 | Status → `CLAIM_SUBMITTED` |
| BILL-F05 | Billing dispute workflow | P1 | `BILLING_DISPUTE` status; routed to admin queue |
| BILL-F06 | Idempotent bill creation | P0 | Same `appointmentId + type` returns existing bill, no duplicate |
| BILL-F07 | Receipt PDF generation | P0 | PDF generated and emailed via notification-service |
| BILL-F08 | Patient billing history | P0 | Paginated list of all bills for a patient |

### 3.7 Notifications

| Req ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| NOTIF-F01 | Appointment confirmation email/SMS | P0 | Sent within 30s of `appointment.created` Kafka event |
| NOTIF-F02 | 24h appointment reminder | P0 | Scheduled job sends reminders for next-day appointments |
| NOTIF-F03 | Cancellation notification | P0 | Sent to patient + doctor on `appointment.cancelled` |
| NOTIF-F04 | Billing receipt email | P0 | Sent on `billing.completed` with PDF attachment |
| NOTIF-F05 | In-app notification feed | P0 | REST endpoint returns user's notifications; mark as read |
| NOTIF-F06 | Notification preferences | P1 | User can opt-in/out of email, SMS per notification type |
| NOTIF-F07 | Dead-letter queue handling | P0 | Failed messages → `*.dlq` topic after 3 retries |
| NOTIF-F08 | Template management (Admin) | P1 | CRUD for notification templates with variable placeholders |

### 3.8 Dashboard & Analytics

| Req ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| DASH-F01 | Admin dashboard | P0 | Appointment volume, revenue summary, patient demographics, no-show rate |
| DASH-F02 | Doctor dashboard | P0 | Today's schedule, waiting queue, pending prescriptions |
| DASH-F03 | Receptionist dashboard | P1 | Today's check-in queue, upcoming appointments, walk-in registration |
| DASH-F04 | Patient dashboard | P0 | Upcoming appointments, recent prescriptions, billing history |
| DASH-F05 | Real-time data refresh | P0 | Dashboard data freshness < 30s from event occurrence |
| DASH-F06 | Dashboard load time | P0 | Initial load < 2s; subsequent navigation < 500 ms |

### 3.9 Reporting & Audit

| Req ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| RPT-F01 | Appointment reports (daily/weekly/monthly) | P0 | Breakdown by department, doctor, status; exportable |
| RPT-F02 | Billing/revenue reports | P0 | Total revenue, outstanding, by payment method |
| RPT-F03 | Audit trail viewer (Admin) | P0 | Filterable by entity, action, user, date range; < 1s P95 |
| RPT-F04 | Custom report generation (async) | P1 | POST returns job ID; poll for completion; download PDF/CSV |
| RPT-F05 | Audit log immutability | P0 | No UPDATE/DELETE on audit tables; PostgreSQL trigger enforced |
| RPT-F06 | 7-year audit retention | P0 | Retention policy configured; no purge within window |

### 3.10 AI Assistant

| Req ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| AI-F01 | Symptom triage (Patient) | P0 | NL input → urgency level + possible conditions + recommendation; < 3s P95 |
| AI-F02 | Drug interaction check (Doctor) | P0 | Current + new medications → interaction report with severity; < 1s P95 |
| AI-F03 | Patient history summary (Doctor) | P1 | NL query → summarized medical history from RAG pipeline; < 5s P95 |
| AI-F04 | Smart scheduling insights (Admin/Doctor) | P1 | No-show pattern analysis → optimal slot recommendations |
| AI-F05 | Operational insights chat (Admin) | P2 | NL queries about clinic operations → data-backed answers |
| AI-F06 | Graceful degradation | P0 | OpenAI down → drug interactions fall back to rule engine; triage/chat unavailable with user-facing message |
| AI-F07 | AI disclaimer | P0 | All triage responses include medical disclaimer |
| AI-F08 | Triage-to-booking bridge | P1 | Triage result pre-fills specialty in booking flow |

---

## 4. Design System & UX Standards

### 4.1 Design Principles

| Principle | Description |
|---|---|
| **Clarity First** | Medical data must be unambiguous. Use clear labels, adequate contrast, and explicit status indicators. |
| **Role-Adaptive UI** | Interface adapts based on logged-in role. Sidebar navigation, visible modules, and available actions change per role. |
| **Minimal Cognitive Load** | Reduce clicks to complete core tasks. Booking an appointment: ≤ 4 steps. Check-in: ≤ 2 clicks. |
| **Responsive** | Fully functional on desktop (1024px+), tablet (768px+), and mobile (375px+). |
| **Accessible** | WCAG 2.1 AA compliance. Keyboard navigable. Screen reader compatible. |
| **Real-Time Feedback** | Loading skeletons, toast notifications, optimistic UI updates for actions. |

### 4.2 Color Palette

| Token | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| `--color-primary` | `#2563EB` (Blue 600) | `#3B82F6` (Blue 500) | Primary actions, links, active states |
| `--color-primary-hover` | `#1D4ED8` (Blue 700) | `#2563EB` (Blue 600) | Hover states |
| `--color-secondary` | `#059669` (Emerald 600) | `#10B981` (Emerald 500) | Success, confirmations, check-in |
| `--color-danger` | `#DC2626` (Red 600) | `#EF4444` (Red 500) | Errors, cancellations, SEVERE alerts |
| `--color-warning` | `#D97706` (Amber 600) | `#F59E0B` (Amber 500) | Warnings, MODERATE drug interactions |
| `--color-info` | `#0891B2` (Cyan 600) | `#06B6D4` (Cyan 500) | Informational, MILD alerts |
| `--color-bg` | `#FFFFFF` | `#0F172A` (Slate 900) | Page background |
| `--color-surface` | `#F8FAFC` (Slate 50) | `#1E293B` (Slate 800) | Cards, modals, panels |
| `--color-text` | `#0F172A` (Slate 900) | `#F1F5F9` (Slate 100) | Body text |
| `--color-text-muted` | `#64748B` (Slate 500) | `#94A3B8` (Slate 400) | Secondary text, labels |
| `--color-border` | `#E2E8F0` (Slate 200) | `#334155` (Slate 700) | Borders, dividers |

### 4.3 Typography

| Token | Value | Usage |
|---|---|---|
| `--font-family` | `'Inter', system-ui, sans-serif` | All text (loaded via Google Fonts) |
| `--font-mono` | `'JetBrains Mono', monospace` | Code, IDs, MRN numbers |
| `--font-size-xs` | `0.75rem` (12px) | Badges, captions |
| `--font-size-sm` | `0.875rem` (14px) | Labels, secondary text |
| `--font-size-base` | `1rem` (16px) | Body text, inputs |
| `--font-size-lg` | `1.125rem` (18px) | Subheadings |
| `--font-size-xl` | `1.25rem` (20px) | Section titles |
| `--font-size-2xl` | `1.5rem` (24px) | Page titles |
| `--font-size-3xl` | `1.875rem` (30px) | Dashboard hero metrics |
| `--font-weight-normal` | `400` | Body text |
| `--font-weight-medium` | `500` | Labels, navigation |
| `--font-weight-semibold` | `600` | Headings, buttons |
| `--font-weight-bold` | `700` | Hero metrics, alerts |

### 4.4 Spacing & Layout

| Token | Value | Usage |
|---|---|---|
| `--space-1` | `0.25rem` (4px) | Tight gaps (icon-text) |
| `--space-2` | `0.5rem` (8px) | Compact padding |
| `--space-3` | `0.75rem` (12px) | Input padding |
| `--space-4` | `1rem` (16px) | Card padding, section gaps |
| `--space-6` | `1.5rem` (24px) | Between form fields |
| `--space-8` | `2rem` (32px) | Section separation |
| `--radius-sm` | `0.375rem` (6px) | Inputs, badges |
| `--radius-md` | `0.5rem` (8px) | Cards, buttons |
| `--radius-lg` | `0.75rem` (12px) | Modals, panels |
| `--radius-full` | `9999px` | Avatars, pills |
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle elevation |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.07)` | Cards |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--sidebar-width` | `260px` | Sidebar collapsed: `72px` |

### 4.5 Component Standards

| Component | Specification |
|---|---|
| **Buttons** | Primary (filled), Secondary (outlined), Ghost (text-only), Danger. Sizes: `sm` (32px), `md` (40px), `lg` (48px). Loading spinner replaces label during async. |
| **Forms** | Floating labels. Inline validation on blur. Error messages below field in `--color-danger`. Required fields marked with `*`. |
| **Tables** | Sticky header. Sortable columns. Row hover highlight. Pagination at bottom. Empty state illustration. |
| **Cards** | `--radius-md`, `--shadow-md`. Header with title + action menu. Content body. Optional footer. |
| **Modals** | Backdrop blur. Max-width `560px`. Close on `Esc` or backdrop click. Focus trap enabled. |
| **Toasts** | Auto-dismiss after 5s. Types: success, error, warning, info. Stack max 3. Position: top-right. |
| **Skeletons** | Animated pulse. Match layout of actual content. Used during all async data fetches. |
| **Status Badges** | Pill shape. Color-coded: Scheduled (blue), Checked-In (cyan), In-Progress (amber), Completed (green), Cancelled (red), No-Show (gray). |
| **Charts** | Use Recharts or Chart.js. Consistent color scheme from palette. Tooltip on hover. Responsive. |

### 4.6 Appointment Status Badge Mapping

| Status | Background | Text Color | Icon |
|---|---|---|---|
| `SCHEDULED` | `--color-primary` @ 10% | `--color-primary` | 📅 Calendar |
| `CHECKED_IN` | `--color-info` @ 10% | `--color-info` | ✅ Check |
| `IN_PROGRESS` | `--color-warning` @ 10% | `--color-warning` | ⏳ Clock |
| `COMPLETED` | `--color-secondary` @ 10% | `--color-secondary` | ✔️ Done |
| `CHECKED_OUT` | `--color-secondary` @ 15% | `--color-secondary` | 🚪 Exit |
| `CANCELLED` | `--color-danger` @ 10% | `--color-danger` | ✖️ Cross |
| `NO_SHOW` | Slate 200 | Slate 600 | 👻 Ghost |

### 4.7 Responsive Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| Mobile | `< 768px` | Single column, bottom nav, hamburger menu |
| Tablet | `768px – 1023px` | Collapsed sidebar (icons only), 2-col grids |
| Desktop | `≥ 1024px` | Full sidebar, 3–4 col grids, side panels |

### 4.8 Animation Standards

| Animation | Duration | Easing | Usage |
|---|---|---|---|
| Page transitions | `200ms` | `ease-in-out` | Route changes |
| Modal open/close | `150ms` | `ease-out` / `ease-in` | Scale + fade |
| Toast slide-in | `300ms` | `cubic-bezier(0.16, 1, 0.3, 1)` | Enter from right |
| Skeleton pulse | `1.5s` | `ease-in-out` (infinite) | Data loading |
| Button press | `100ms` | `ease-out` | Scale to 0.97 |
| Hover lift | `150ms` | `ease-out` | TranslateY -2px + shadow-lg |

---

## 5. Out of Scope (MVP)

### 5.1 Excluded Features

| Feature | Reason | Planned Phase |
|---|---|---|
| Full EHR/EMR integration (HL7 FHIR) | Complex certification, vendor partnerships | Phase 2 |
| Telemedicine / video consultation | WebRTC infra, HIPAA-compliant streaming | Phase 2 |
| Native mobile apps (iOS/Android) | Separate dev cycle; MVP uses responsive web | Phase 2 |
| Lab & imaging order integration | DICOM/HL7/LIS integration scope | Phase 2 |
| Patient document upload & OCR | Document management module | Phase 2 |
| Local LLM fallback (Ollama/vLLM) | Infra complexity; OpenAI is primary for MVP | Phase 2 |
| Multi-language support (i18n) | Translation infra; MVP targets English only | Phase 3 |
| Multi-tenancy | Tenant isolation architecture | Phase 3 |
| Insurance auto-adjudication (EDI 837/835) | Payer system integration, regional variance | Phase 3 |
| Pharmacy e-prescribing (Surescripts) | NCPDP/SCRIPT certification | Phase 3 |
| Offline / PWA mode | Service worker + sync queue complexity | Phase 3 |
| Blockchain-based audit immutability | Over-engineered for MVP; PG triggers suffice | Phase 3 |

### 5.2 Technical Constraints

| Constraint | Detail |
|---|---|
| Single-tenant only | One clinic/hospital per deployment |
| Concurrency ceiling | Tested for ≤ 1,000 concurrent users, ≤ 50,000 patient records |
| No offline support | Requires active internet (≥ 10 Mbps) |
| Browser support | Latest 2 versions of Chrome, Firefox, Safari, Edge. No IE. |
| AI external dependency | OpenAI API required; graceful degradation if unavailable |
| Notification provider dependency | SendGrid (email) + Twilio (SMS); in-app remains if providers are down |
| No patient-initiated payments | MVP records payments made at counter; no online payment gateway integration |

### 5.3 Assumptions

| # | Assumption |
|---|---|
| 1 | Clinic has reliable internet connectivity (≥ 10 Mbps) |
| 2 | Staff training conducted before go-live (2 half-day sessions per role) |
| 3 | Email/SMS provider accounts (SendGrid, Twilio) are provisioned |
| 4 | K8s cluster available (cloud or on-prem) |
| 5 | Domain name + SSL certificate available |
| 6 | Legacy data migration handled as separate project |
| 7 | Billing codes and fee schedule configured during setup |
| 8 | Users have modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+) |

### 5.4 Dependencies

| Dependency | Risk | Mitigation |
|---|---|---|
| PostgreSQL 15+ | Low | Managed DB (RDS, Cloud SQL) |
| Redis 7+ | Low | Managed Redis (ElastiCache) |
| Apache Kafka | Medium | Managed Kafka (MSK, Confluent); fallback to sync HTTP |
| OpenAI API | Medium | Response caching, rule-engine fallback, graceful degradation |
| SendGrid / Twilio | Low | In-app notifications as fallback |
| Docker / Kubernetes | Low | Managed K8s (EKS, GKE, AKS) |
| GitHub Actions | Low | Portable to GitLab CI / Jenkins |
