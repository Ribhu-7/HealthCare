# Implementation Plan: HAPMS Full-Stack (Backend, Database, Frontend Integration)

This plan details the design and step-by-step implementation of the HAPMS (Healthcare Appointment & Patient Management System) backend services, database schema, and frontend integration, fulfilling the backend, database, and frontend developer personas.

## User Review Required

> [!IMPORTANT]
> **Infrastructure Requirements:** Running this architecture locally requires Docker and Docker Compose to launch PostgreSQL (with pgvector), Redis, and Apache Kafka. Please ensure Docker is running before approving the start of the services.
> 
> **Java & Maven Setup:** We will scaffold the backend as a Java 21 + Spring Boot 3 multi-module Maven project in the `backend/` directory. We will configure parent/child POMs to manage dependencies across all microservices uniformly.
> 
> **AI API Keys:** The `ai-service` requires an OpenAI API Key for symptom triage and clinical summaries. If no OpenAI key is provided, the AI service will automatically fallback to the local rule-based degradation engine as specified in the requirements.

## Open Questions

> [!WARNING]
> 1. **Do you have Docker installed and running?** We will write a `docker-compose.yml` to spin up PostgreSQL, Redis, and Kafka. Let us know if you prefer to use pre-existing external database connections.
> 2. **Would you prefer a simplified, consolidated single Spring Boot service or separate microservice processes?** Running 6 Spring Boot processes plus Docker can be resource-intensive. If you prefer, we can create a consolidated backend that exposes all endpoints through modular packages in a single running jar, or strictly scaffold separate Maven modules for each microservice as defined in `project_scope.md`.

## Proposed Changes

We will build the database schemas first, scaffold the backend services, and then update the frontend pages to communicate with the backend.

---

### Database & Infrastructure

We will create a central Docker Compose file to provision the databases, message brokers, and caches.

#### [NEW] [docker-compose.yml](file:///Users/neosoft/Documents/HealthCare/infrastructure/docker/docker-compose.yml)
- Configure PostgreSQL 15+ with `pgvector` extension.
- Configure Redis 7+ for rate-limiting, session storage, and caching.
- Configure Kafka and Zookeeper (or KRaft) for event-driven pub-sub communication.

#### [NEW] [Flyway Migration Scripts](file:///Users/neosoft/Documents/HealthCare/backend/core-business-service/src/main/resources/db/migration)
- Create SQL scripts under each microservice's `src/main/resources/db/migration` directory:
  - `V1__create_users.sql` (auth-service)
  - `V1__create_patients.sql`, `V2__create_doctors.sql`, `V3__create_appointments.sql`, `V4__create_prescriptions.sql`, `V5__create_billing.sql` (core-business-service)
  - `V1__create_audit_logs.sql` (reporting-service)

---

### Backend Microservices

We will create a multi-module Maven project under `backend/` containing the API Gateway and the core services.

#### [NEW] [pom.xml](file:///Users/neosoft/Documents/HealthCare/backend/pom.xml)
- Parent Maven configuration specifying Spring Boot 3.4.x, Spring Cloud 2024.x, and Java 21.
- Define submodules: `api-gateway`, `auth-service`, `core-business-service`, `notification-service`, `reporting-service`, `ai-service`.

#### [NEW] [api-gateway](file:///Users/neosoft/Documents/HealthCare/backend/api-gateway)
- Scaffolds Spring Cloud Gateway to route `/api/v1/auth/**` to `auth-service` and other paths to `core-business-service`.
- Implements `JwtAuthFilter` to validate Bearer tokens and extract user context (id, roles).

#### [NEW] [auth-service](file:///Users/neosoft/Documents/HealthCare/backend/auth-service)
- Handlers for `/api/v1/auth/register`, `/api/v1/auth/login`, and `/api/v1/auth/refresh`.
- Standard Spring Security 6 integration with JWT authentication/authorization.
- DB representation: `User`, `Role` entities.

#### [NEW] [core-business-service](file:///Users/neosoft/Documents/HealthCare/backend/core-business-service)
- Entities: `Patient`, `Doctor`, `Appointment`, `AppointmentSlot`, `Prescription`, `Billing`.
- Controllers:
  - `PatientController` (CRUD + Search)
  - `DoctorController` (Availability management + Slot list)
  - `AppointmentController` (Booking, Rescheduling, Check-In, Check-Out workflows)
  - `PrescriptionController` (Creation, validation with AI service override logic)
  - `BillingController` (Receipt generation, payment updates)
- Publishes Kafka events: `appointment.created`, `billing.completed`, `prescription.created`.

#### [NEW] [notification-service](file:///Users/neosoft/Documents/HealthCare/backend/notification-service)
- Listens to Kafka topics and triggers simulation emails / SMS notifications.

#### [NEW] [reporting-service](file:///Users/neosoft/Documents/HealthCare/backend/reporting-service)
- Logs all state-changing operations into an immutable `audit_logs` table (via Kafka consumers).

#### [NEW] [ai-service](file:///Users/neosoft/Documents/HealthCare/backend/ai-service)
- Endpoints for drug interaction verification, triage, and patient history summaries.
- Integrates local rule engine fallback if OpenAI connection fails.

---

### Frontend Integration

We will refactor the static React mockups in the `frontend` workspace to perform HTTP requests using Axios and React Query, connecting authentication and operational views to the new gateway.

#### [MODIFY] [axiosInstance.ts](file:///Users/neosoft/Documents/HealthCare/frontend/src/services/axiosInstance.ts)
- Configure root interceptor to append JWT Bearer tokens to all requests and handle automatic token refreshing.

#### [MODIFY] [LoginPage.tsx](file:///Users/neosoft/Documents/HealthCare/frontend/src/features/auth/LoginPage.tsx)
- Wire up form inputs to submit login requests to `/api/v1/auth/login` and save tokens to Redux/localStorage.

#### [MODIFY] [PatientListPage.tsx](file:///Users/neosoft/Documents/HealthCare/frontend/src/features/patients/PatientListPage.tsx) & [PatientDetailPage.tsx](file:///Users/neosoft/Documents/HealthCare/frontend/src/features/patients/PatientDetailPage.tsx)
- Replace hardcoded table rows with state populated from `axios.get('/api/v1/patients')`.

#### [MODIFY] [AppointmentListPage.tsx](file:///Users/neosoft/Documents/HealthCare/frontend/src/features/appointments/AppointmentListPage.tsx)
- Fetch appointments from gateway, trigger Check-In and Check-Out actions dynamically.

---

## Verification Plan

### Automated Tests
- Run `mvn clean install` under the `backend/` directory to compile and run tests for all microservices.
- Ensure that Flyway database migrations run successfully on startup.

### Manual Verification
1. Run `docker-compose up -d` to spin up PostgreSQL, Redis, and Kafka.
2. Launch the Gateway and microservices.
3. Test Auth: Call `/api/v1/auth/register` and `/api/v1/auth/login` using `curl` to confirm access and refresh token generation.
4. Interact with the React portal in the browser on `http://localhost:5173/` and verify that actions (registering a patient, booking an appointment, paying a bill) hit the database and persist data correctly.
