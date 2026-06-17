# Project Boundary & Constraints

> **Project:** Healthcare Appointment & Patient Management System (HAPMS)  
> **Version:** 1.0

This document defines the overarching boundaries, operational rules, and AI interaction constraints for the HAPMS project.

---

## 1. Interaction Boundaries (AI Assistant Rules)

The following operational rules apply strictly to the AI assistant during the development and lifecycle of this project:

1. **Do not commit code yourself.**  
   *All git commits, pushes, and branch management must be performed by the user. Do not run `git commit`, `git push`, or equivalent commands.*
2. **Do not run any commands without asking me first.**  
   *Before executing any terminal commands (e.g., starting services, running tests, installing dependencies), you must explicitly propose the command and await user approval.*
3. **Do not write code unless you have the full picture.**  
   *If requirements are ambiguous, underspecified, or if there is a gap in understanding the architecture, **ask questions first**. Do not waste tokens building unverified features or making assumptions.*
4. **Only create maintainable, modular code.**  
   *Adhere strictly to the defined microservices architecture, atomic design principles for the frontend, and established design patterns. Code must be DRY, well-structured, and easy to test.*

---

## 2. Project Summary

**Healthcare Appointment & Patient Management System (HAPMS)** is a cloud-native, microservices-based platform designed to consolidate and automate the operations of clinics and healthcare networks.

### Core Objectives:
- **Unified Patient 360° View:** Centralize patient demographics, medical history, prescriptions, and billing.
- **Intelligent Scheduling:** AI-powered online booking to reduce no-show rates (target ≤ 10%) and maximize slot utilization.
- **Automated Workflows:** End-to-end automation of check-in, consultation, drug-interaction checks, and billing.
- **Real-Time Analytics:** Provide actionable insights and dashboards for administrators and doctors.
- **AI-Powered Assistance:** Symptom triage for patients and clinical/operational insights for staff.

### Technical Foundation:
- **Frontend:** React 19, TypeScript, Redux Toolkit, React Query, Material UI/Tailwind CSS.
- **Backend:** Java 21, Spring Boot 3, Spring Cloud (API Gateway, OpenFeign, Resilience4j).
- **Data & Cache:** PostgreSQL (with pgvector), Redis.
- **Eventing:** Apache Kafka for asynchronous, decoupled service communication.
- **Deployment:** Docker, Kubernetes, managed CI/CD pipelines.

---

## 3. Scope Boundaries

To ensure the MVP is delivered successfully within the estimated ~21-week timeframe, the following boundaries define what is explicitly **Out of Scope** for Phase 1:

1. **Full EHR/EMR Integration (HL7 FHIR):** Complex legacy integrations are deferred to Phase 2.
2. **Telemedicine / Video Consultations:** Streaming infrastructure is excluded from the MVP.
3. **Native Mobile Applications:** The MVP will rely on a responsive web application; native iOS/Android are deferred.
4. **External Pharmacy Integrations:** Direct e-prescribing (e.g., Surescripts) is excluded.
5. **Insurance Auto-Adjudication:** Real-time EDI 837/835 integration with payers is excluded.
6. **Offline Mode:** The system requires continuous, reliable internet connectivity (≥ 10 Mbps).
7. **Local LLM Fallback:** The MVP relies on the OpenAI API for AI features. Local models (Ollama/vLLM) will be introduced in Phase 2 for enhanced resilience.

---

## 4. Architectural Boundaries

1. **Microservices Isolation:** Services (Auth, Core, Notification, Reporting, AI) must not share databases. All cross-domain data access must occur via REST APIs or Kafka events.
2. **Synchronous vs. Asynchronous:** Use synchronous REST calls only for queries (reads) and immediate validations (e.g., drug interaction checks). Use Kafka events for state changes and cross-service workflows.
3. **Security Posture:** All external endpoints must route through the API Gateway for rate limiting and JWT validation. Intra-cluster communication should be secured via mTLS or strict network policies.
4. **Immutability of Audit Data:** Audit logs and historical prescription records are append-only. `UPDATE` and `DELETE` operations are strictly prohibited at the database level for these entities.
