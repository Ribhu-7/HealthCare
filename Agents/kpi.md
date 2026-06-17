# KPI Dashboard — HAPMS

> Healthcare Appointment & Patient Management System  
> Version 1.0 | 2026-06-16

---

## 1. Authentication & Authorization (auth-service)

| KPI ID | KPI Name | Verification Method | Target Criteria | Telemetry Event / Log Source | Alert Route |
|---|---|---|---|---|---|
| AUTH-01 | Login Success Rate | Ratio of `200 OK` to total `/auth/login` requests | ≥ 99.5% | `auth-service` Prometheus counter `auth_login_total{status}` | PagerDuty → On-call Backend |
| AUTH-02 | Login API Latency (P95) | Prometheus histogram bucket for `/auth/login` | < 150 ms | `auth_login_duration_seconds` histogram | Grafana alert → Slack `#sre-alerts` |
| AUTH-03 | Token Refresh Success Rate | Ratio of `200 OK` to total `/auth/refresh` requests | ≥ 99.9% | `auth_token_refresh_total{status}` | PagerDuty → On-call Backend |
| AUTH-04 | Failed Login Attempts (Brute-Force) | Count of consecutive `401` per IP within 10 min window | < 5 per IP before lockout | `auth_login_failed_total{ip}` + Redis sliding window | Grafana alert → Slack `#security-alerts` + email to Security Lead |
| AUTH-05 | JWT Validation Failure Rate | `401 Unauthorized` from API Gateway due to invalid/expired tokens | < 2% of total authenticated requests | `gateway_auth_rejection_total{reason}` | Grafana alert → Slack `#sre-alerts` |
| AUTH-06 | User Registration Completion Rate | Registrations with `ACTIVE` status / total registration starts | ≥ 85% | Kafka topic `user.registered` count vs. `/auth/register` POST count | Weekly product report → PM dashboard |
| AUTH-07 | Password Reset Turnaround | Time from reset request to successful password change | < 10 min (P95) | `auth_password_reset_duration_seconds` | Grafana alert → Slack `#support-alerts` (if > 30 min) |
| AUTH-08 | RBAC Violation Attempts | `403 Forbidden` responses from API Gateway | < 0.5% of total requests | `gateway_rbac_denied_total{role, path}` | Grafana alert → Slack `#security-alerts` |
| AUTH-09 | OAuth2 Provider Availability | Health-check response time for Google/OAuth2 provider | < 500 ms, uptime ≥ 99.9% | `auth_oauth2_health_check{provider}` | PagerDuty → On-call Backend |
| AUTH-10 | Active Session Count | Concurrent active refresh tokens in Redis | ≤ 1 per user (rotation enforced) | Redis `DBSIZE` on `refresh_tokens:*` keyspace | Grafana dashboard (informational) |

---

## 2. API Gateway (api-gateway)

| KPI ID | KPI Name | Verification Method | Target Criteria | Telemetry Event / Log Source | Alert Route |
|---|---|---|---|---|---|
| GW-01 | Overall API Response Time (P95) | Prometheus histogram across all routes | < 200 ms | `gateway_request_duration_seconds` histogram | PagerDuty → On-call SRE |
| GW-02 | Overall API Response Time (P99) | Prometheus histogram across all routes | < 500 ms | `gateway_request_duration_seconds` histogram | PagerDuty → On-call SRE |
| GW-03 | 5xx Error Rate | `5xx` responses / total responses | < 0.1% | `gateway_responses_total{status=~"5.."}` | PagerDuty (CRITICAL) → On-call SRE + Slack `#incidents` |
| GW-04 | 4xx Error Rate (Client Errors) | `4xx` responses / total responses (excl. 401/403) | < 5% | `gateway_responses_total{status=~"4.."}` | Grafana alert → Slack `#sre-alerts` (if > 10%) |
| GW-05 | Rate Limit Rejections | `429 Too Many Requests` count per 5 min window | < 50 per 5 min (normal ops) | `gateway_rate_limit_rejected_total{user_id}` | Grafana alert → Slack `#security-alerts` (if spike > 200) |
| GW-06 | Request Throughput | Requests per second (RPS) | Handles ≥ 500 RPS sustained | `gateway_requests_total` rate | Grafana dashboard (informational); PagerDuty if drops to 0 |
| GW-07 | Circuit Breaker Open Events | Count of circuit breaker state transitions to OPEN | 0 under normal load | `resilience4j_circuitbreaker_state{state="OPEN"}` | PagerDuty (HIGH) → On-call SRE + Slack `#incidents` |
| GW-08 | Upstream Service Timeout Rate | `504 Gateway Timeout` count | < 0.05% of total requests | `gateway_responses_total{status="504"}` | PagerDuty → On-call Backend |
| GW-09 | Gateway Uptime | Kubernetes liveness/readiness probe success | ≥ 99.99% | `kube_pod_status_ready{pod=~"api-gateway.*"}` | PagerDuty (CRITICAL) → On-call SRE |
| GW-10 | Request Payload Validation Rejection | `400 Bad Request` for malformed payloads | Monitor trend (no fixed target) | ELK: `gateway.access.log` filtered by `status:400` | Weekly review → Dev Lead |

---

## 3. Patient Management (core-business-service)

| KPI ID | KPI Name | Verification Method | Target Criteria | Telemetry Event / Log Source | Alert Route |
|---|---|---|---|---|---|
| PAT-01 | Patient Registration Success Rate | `201 Created` / total POST `/patients` | ≥ 99% | `core_patient_create_total{status}` | Grafana alert → Slack `#ops-alerts` |
| PAT-02 | Duplicate Patient Detection Rate | Fuzzy-match flagged duplicates / total registrations | Flag ≥ 95% of true duplicates | `core_patient_duplicate_flagged_total` | Weekly report → Admin dashboard |
| PAT-03 | Patient Search Latency (P95) | Prometheus histogram for GET `/patients?search=` | < 300 ms | `core_patient_search_duration_seconds` | Grafana alert → Slack `#sre-alerts` |
| PAT-04 | Medical History Retrieval Latency (P95) | Prometheus histogram for GET `/patients/{id}/history` | < 500 ms | `core_patient_history_duration_seconds` | Grafana alert → Slack `#sre-alerts` |
| PAT-05 | Patient Data Completeness | % of patients with all required fields populated | ≥ 90% | Nightly batch audit query on `patients` table | Weekly report → PM dashboard |
| PAT-06 | Patient Profile Update Success | `200 OK` / total PUT `/patients/{id}` | ≥ 99.5% | `core_patient_update_total{status}` | Grafana alert → Slack `#ops-alerts` |

---

## 4. Appointment Management (core-business-service)

| KPI ID | KPI Name | Verification Method | Target Criteria | Telemetry Event / Log Source | Alert Route |
|---|---|---|---|---|---|
| APPT-01 | Booking Success Rate | `201 Created` / total POST `/appointments` | ≥ 99.5% | `core_appointment_booking_total{status}` | PagerDuty → On-call Backend |
| APPT-02 | Double-Booking Incidents | `409 Conflict` due to optimistic lock failure | 0 confirmed double-bookings | `core_appointment_conflict_total` + audit log | PagerDuty (CRITICAL) → On-call Backend + PM |
| APPT-03 | Booking API Latency (P95) | Prometheus histogram for POST `/appointments` | < 250 ms | `core_appointment_booking_duration_seconds` | Grafana alert → Slack `#sre-alerts` |
| APPT-04 | Cancellation Rate | Cancelled appointments / total scheduled | ≤ 15% | Kafka topic `appointment.cancelled` count / `appointment.created` count | Weekly report → Admin dashboard |
| APPT-05 | No-Show Rate | `NO_SHOW` status appointments / total scheduled | ≤ 10% (from 23% baseline) | `core_appointment_status_total{status="NO_SHOW"}` | Weekly report → Admin dashboard; Grafana if > 15% → Slack `#ops-alerts` |
| APPT-06 | No-Show Auto-Detection Latency | Time from scheduled start + 15 min to status flip | < 5 min | `core_noshow_detection_delay_seconds` | Grafana alert → Slack `#ops-alerts` (if > 10 min) |
| APPT-07 | Rescheduling Success Rate | `200 OK` / total PUT `/appointments/{id}/reschedule` | ≥ 98% | `core_appointment_reschedule_total{status}` | Grafana alert → Slack `#ops-alerts` |
| APPT-08 | Check-In to Consultation Wait Time | Time from `CHECKED_IN` to `IN_PROGRESS` | ≤ 15 min (avg) | `core_appointment_wait_duration_seconds` | Grafana alert → Slack `#ops-alerts` (if avg > 25 min) |
| APPT-09 | Appointment Slot Utilization | Booked slots / total available slots per day | ≥ 85% | Nightly batch: `SELECT count(*) FROM appointment_slots WHERE status='BOOKED'` | Weekly report → Admin dashboard |
| APPT-10 | Appointment Status Transition Integrity | All appointments follow valid state machine | 0 invalid transitions | `core_appointment_invalid_transition_total` | PagerDuty (HIGH) → On-call Backend |

---

## 5. Doctor & Schedule Management (core-business-service)

| KPI ID | KPI Name | Verification Method | Target Criteria | Telemetry Event / Log Source | Alert Route |
|---|---|---|---|---|---|
| DOC-01 | Availability Update Success | `200 OK` / total PUT `/doctors/{id}/availability` | ≥ 99% | `core_doctor_availability_update_total{status}` | Grafana alert → Slack `#ops-alerts` |
| DOC-02 | Slot Generation Accuracy | Generated slots match defined availability (no gaps/overlaps) | 100% accuracy | Nightly reconciliation job: `slot_audit_check` | PagerDuty (HIGH) → On-call Backend |
| DOC-03 | Doctor Unavailability Notification Latency | Time from `DOCTOR_UNAVAILABLE` event to patient notification | < 5 min | Kafka consumer lag on `doctor.unavailable` | Grafana alert → Slack `#ops-alerts` |
| DOC-04 | Affected Appointment Reschedule Rate | % of affected appointments rescheduled within 24h of doctor block | ≥ 90% | `core_appointment_reschedule_after_block_total` | Weekly report → Admin dashboard |
| DOC-05 | Doctor Profile Completeness | % of doctor profiles with all required fields | 100% | Nightly audit query on `doctors` table | Weekly report → Admin dashboard |

---

## 6. Prescription Management (core-business-service)

| KPI ID | KPI Name | Verification Method | Target Criteria | Telemetry Event / Log Source | Alert Route |
|---|---|---|---|---|---|
| RX-01 | Prescription Creation Success | `201 Created` / total POST `/prescriptions` | ≥ 99% | `core_prescription_create_total{status}` | Grafana alert → Slack `#ops-alerts` |
| RX-02 | Drug Interaction Check Coverage | % of prescriptions with completed interaction check | 100% | `core_prescription_interaction_check_total{status}` | PagerDuty (CRITICAL if < 100%) → On-call Backend |
| RX-03 | SEVERE Interaction Detection Rate | SEVERE interactions detected / known SEVERE interactions present | 100% | Quarterly audit: `ai_interaction_logs` vs. reference DB | Quarterly audit report → Medical Director + PM |
| RX-04 | Drug Interaction Check Latency (P95) | Prometheus histogram for `ai-service` `/drug-interactions` | < 1 second | `ai_drug_interaction_duration_seconds` | Grafana alert → Slack `#sre-alerts` |
| RX-05 | Doctor Override Rate | Overridden interaction warnings / total warnings | Monitor trend (flag if > 30%) | `core_prescription_override_total` + audit log | Monthly report → Medical Director |
| RX-06 | Allergy Conflict Detection Rate | Known allergen prescriptions blocked / allergen present cases | 100% (non-overridable) | `core_prescription_allergy_block_total` | PagerDuty (CRITICAL if missed) → On-call Backend + Medical Director |
| RX-07 | Prescription Immutability Integrity | 0 `UPDATE`/`DELETE` on prescription records | 0 violations | PostgreSQL audit trigger on `prescriptions` table | PagerDuty (CRITICAL) → Security Lead |

---

## 7. Billing (core-business-service)

| KPI ID | KPI Name | Verification Method | Target Criteria | Telemetry Event / Log Source | Alert Route |
|---|---|---|---|---|---|
| BILL-01 | Billing Generation Success | `201 Created` / total POST `/billing` | ≥ 99.5% | `core_billing_create_total{status}` | PagerDuty → On-call Backend |
| BILL-02 | Duplicate Bill Prevention | Idempotency key rejections (same `appointmentId + type`) | 0 duplicate bills created | `core_billing_idempotency_reject_total` | Grafana alert → Slack `#ops-alerts` |
| BILL-03 | Billing Error / Dispute Rate | `BILLING_DISPUTE` status bills / total bills | < 2% | `core_billing_dispute_total` / `core_billing_create_total` | Monthly report → Admin + Finance Lead |
| BILL-04 | Payment Processing Success | `200 OK` / total PUT `/billing/{id}/pay` | ≥ 99% | `core_billing_payment_total{status}` | PagerDuty → On-call Backend + Finance Lead |
| BILL-05 | Revenue Collection Cycle (Days in A/R) | Average days from bill creation to `PAID` status | ≤ 7 days (target 20% reduction from baseline) | Nightly batch query: `AVG(paid_at - created_at)` from `billing` table | Monthly report → Finance Lead |
| BILL-06 | Auto-Generated Bill Accuracy | Bills requiring manual correction / total auto-generated bills | < 3% | `core_billing_correction_total` | Monthly report → Admin + PM |
| BILL-07 | Insurance Claim Submission Success | `CLAIM_SUBMITTED` transitions without error / total claims | ≥ 95% | `core_billing_claim_total{status}` | Grafana alert → Slack `#ops-alerts` |

---

## 8. Notifications (notification-service)

| KPI ID | KPI Name | Verification Method | Target Criteria | Telemetry Event / Log Source | Alert Route |
|---|---|---|---|---|---|
| NOTIF-01 | Email Delivery Success Rate | SendGrid delivery webhook `delivered` / total sent | ≥ 98% | `notification_email_total{status}` + SendGrid webhook logs | Grafana alert → Slack `#ops-alerts` |
| NOTIF-02 | SMS Delivery Success Rate | Twilio delivery callback `delivered` / total sent | ≥ 95% | `notification_sms_total{status}` + Twilio callback logs | Grafana alert → Slack `#ops-alerts` |
| NOTIF-03 | Kafka Event Consumption Lag | Consumer group lag for notification topics | < 100 messages | Kafka `consumer_lag` metric via Prometheus JMX exporter | PagerDuty (HIGH if > 500) → On-call Backend |
| NOTIF-04 | End-to-End Notification Latency | Time from Kafka event publish to notification dispatch | < 30 seconds (P95) | `notification_e2e_latency_seconds` (publish timestamp in event vs. dispatch timestamp) | Grafana alert → Slack `#sre-alerts` |
| NOTIF-05 | Appointment Reminder Delivery Rate | Reminders sent / appointments scheduled for next 24h | ≥ 99% | Nightly reconciliation: `scheduled_reminders` vs. `notification_logs` | Grafana alert → Slack `#ops-alerts` |
| NOTIF-06 | Dead Letter Queue (DLQ) Volume | Messages in `*.dlq` topics | 0 under normal ops | Kafka topic `notification.dlq` message count | PagerDuty (HIGH if > 0) → On-call Backend |
| NOTIF-07 | Notification Preference Compliance | Notifications sent matching user preference channel | 100% | `notification_preference_violation_total` | Grafana alert → Slack `#ops-alerts` |
| NOTIF-08 | Bounce/Complaint Rate (Email) | SendGrid bounce + complaint rate | < 2% bounce, < 0.1% complaint | SendGrid stats API | Grafana alert → Slack `#ops-alerts` + email to PM |

---

## 9. Dashboard & Analytics (reporting-service)

| KPI ID | KPI Name | Verification Method | Target Criteria | Telemetry Event / Log Source | Alert Route |
|---|---|---|---|---|---|
| DASH-01 | Dashboard Load Time | Frontend performance metric (React Profiler / Lighthouse) | < 2 seconds (initial), < 500 ms (subsequent) | Browser `performance.mark()` sent to ELK via frontend telemetry SDK | Grafana alert → Slack `#frontend-alerts` |
| DASH-02 | Report Generation Success | `200 OK` for GET `/reports/*` endpoints | ≥ 99% | `reporting_request_total{status}` | Grafana alert → Slack `#sre-alerts` |
| DASH-03 | Async Report Generation Time | Time from POST `/reports/generate` to job `COMPLETED` | < 60 seconds for standard reports | `reporting_job_duration_seconds` | Grafana alert → Slack `#ops-alerts` (if > 120s) |
| DASH-04 | Dashboard Data Freshness | Lag between real-time event and dashboard reflection | < 30 seconds | Compare latest Kafka event timestamp vs. dashboard query timestamp | Grafana alert → Slack `#sre-alerts` |
| DASH-05 | Report Download Availability | Generated reports accessible via GET `/reports/jobs/{id}` | ≥ 99.9% | `reporting_download_total{status}` | Grafana alert → Slack `#ops-alerts` |
| DASH-06 | Admin Dashboard Daily Active Users | Unique admin logins viewing dashboard / total admins | ≥ 80% within 3 months of launch | ELK: page-view logs filtered by `/dashboard` + role `ADMIN` | Monthly report → PM dashboard |

---

## 10. Reporting & Audit (reporting-service)

| KPI ID | KPI Name | Verification Method | Target Criteria | Telemetry Event / Log Source | Alert Route |
|---|---|---|---|---|---|
| AUDIT-01 | Audit Log Completeness | All state-changing operations have a corresponding audit entry | 100% | Nightly reconciliation: `COUNT(audit_logs)` for each entity type vs. expected event count from Kafka topics | PagerDuty (CRITICAL if < 100%) → Security Lead |
| AUDIT-02 | Audit Log Immutability | 0 `UPDATE`/`DELETE` operations on `audit_logs` table | 0 violations | PostgreSQL trigger + `pg_stat_user_tables` monitoring | PagerDuty (CRITICAL) → Security Lead |
| AUDIT-03 | Audit Trail Query Latency (P95) | Prometheus histogram for GET `/reports/audit-trail` | < 1 second | `reporting_audit_query_duration_seconds` | Grafana alert → Slack `#sre-alerts` |
| AUDIT-04 | Audit Log Retention | Logs retained for ≥ 7 years (HIPAA) | No records deleted within retention period | Nightly check: `MIN(created_at)` from `audit_logs` | Quarterly compliance review → Compliance Officer |
| AUDIT-05 | Scheduled Report Execution Rate | Successfully executed scheduled reports / total scheduled | ≥ 99% | `reporting_scheduled_execution_total{status}` | Grafana alert → Slack `#ops-alerts` |

---

## 11. AI Assistant (ai-service)

| KPI ID | KPI Name | Verification Method | Target Criteria | Telemetry Event / Log Source | Alert Route |
|---|---|---|---|---|---|
| AI-01 | Symptom Triage Accuracy | Retrospective: AI suggested specialty vs. actual consultation specialty | ≥ 85% match | `ai_triage_outcome` table (joined with `appointments.department_id` post-visit) | Monthly report → Medical Director + PM |
| AI-02 | Triage Response Latency (P95) | Prometheus histogram for POST `/ai/triage` | < 3 seconds | `ai_triage_duration_seconds` | Grafana alert → Slack `#sre-alerts` |
| AI-03 | Patient Summary Generation Latency (P95) | Prometheus histogram for POST `/ai/patient-summary` | < 5 seconds | `ai_patient_summary_duration_seconds` | Grafana alert → Slack `#sre-alerts` |
| AI-04 | Drug Interaction API Availability | `/ai/drug-interactions` uptime | ≥ 99.9% | `ai_drug_interaction_health` probe | PagerDuty (CRITICAL) → On-call Backend |
| AI-05 | AI False Positive Rate (Triage URGENT) | URGENT triage → non-urgent actual diagnosis | < 15% | Retrospective audit: `ai_sessions` where `urgencyLevel='URGENT'` joined with appointment outcomes | Quarterly report → Medical Director |
| AI-06 | AI Assistant Monthly Active Users | Unique users with ≥ 1 AI session / total active users | ≥ 30% | `ai_sessions` distinct `userId` count / `users` active count | Monthly report → PM dashboard |
| AI-07 | RAG Pipeline Retrieval Relevance | Human-reviewed relevance score on sampled retrievals | ≥ 80% relevant | Quarterly manual audit: sample 50 retrievals, score relevance | Quarterly report → AI Lead |
| AI-08 | OpenAI API Availability (External) | Health-check latency + error rate to OpenAI endpoint | < 1s latency, < 1% error | `ai_openai_health{status}` | PagerDuty → On-call Backend (fallback to rule-engine) |
| AI-09 | AI Graceful Degradation Success | When OpenAI is down, drug-interaction falls back to rule-engine without user error | 100% fallback success | `ai_fallback_triggered_total{reason}` | PagerDuty → On-call Backend |
| AI-10 | Smart Scheduling Suggestion Adoption | Doctor-accepted suggestions / total suggestions shown | ≥ 20% adoption | `ai_scheduling_suggestion_total{action="accepted"}` | Monthly report → PM dashboard |

---

## 12. Infrastructure & Platform (Cross-Cutting)

| KPI ID | KPI Name | Verification Method | Target Criteria | Telemetry Event / Log Source | Alert Route |
|---|---|---|---|---|---|
| INFRA-01 | System Uptime (Overall) | Composite health of all services via K8s readiness | ≥ 99.9% | `kube_pod_status_ready` across all deployments | PagerDuty (CRITICAL) → On-call SRE |
| INFRA-02 | PostgreSQL Query Performance (P90) | `pg_stat_statements` mean time | < 50 ms | `pg_stat_statements_mean_time_seconds` | Grafana alert → Slack `#dba-alerts` |
| INFRA-03 | PostgreSQL Replication Lag | Standby replay lag | < 1 second | `pg_stat_replication_replay_lag_seconds` | PagerDuty (HIGH) → On-call DBA |
| INFRA-04 | Redis Cache Hit Rate | `keyspace_hits / (keyspace_hits + keyspace_misses)` | ≥ 80% | Redis `INFO stats` via Prometheus exporter | Grafana alert → Slack `#sre-alerts` (if < 60%) |
| INFRA-05 | Redis Memory Usage | Used memory vs. max memory | < 80% of max | `redis_memory_used_bytes` / `redis_memory_max_bytes` | PagerDuty (HIGH if > 90%) → On-call SRE |
| INFRA-06 | Kafka Broker Health | All brokers in-sync, no under-replicated partitions | 0 under-replicated partitions | `kafka_server_ReplicaManager_UnderReplicatedPartitions` | PagerDuty (CRITICAL) → On-call SRE |
| INFRA-07 | Kafka Consumer Lag (All Topics) | Max consumer lag across all consumer groups | < 500 messages | `kafka_consumergroup_lag` | PagerDuty (HIGH if > 1000) → On-call Backend |
| INFRA-08 | Kubernetes Pod Restart Count | Pod restarts in last 1h | 0 (normal ops) | `kube_pod_container_status_restarts_total` rate | PagerDuty → On-call SRE (if > 3 in 1h) |
| INFRA-09 | CPU Utilization (Per Service) | Prometheus cAdvisor metrics | < 70% sustained (avg) | `container_cpu_usage_seconds_total` | Grafana alert → Slack `#sre-alerts` (if > 85% for 5 min) |
| INFRA-10 | Memory Utilization (Per Service) | Prometheus cAdvisor metrics | < 80% of limit | `container_memory_usage_bytes` / `container_spec_memory_limit_bytes` | PagerDuty (HIGH if > 90%) → On-call SRE |
| INFRA-11 | Disk Usage (PostgreSQL) | Storage used vs. provisioned | < 70% | `node_filesystem_avail_bytes` for PG volume | PagerDuty (HIGH if > 85%) → On-call DBA |
| INFRA-12 | CI/CD Pipeline Success Rate | GitHub Actions workflow success / total runs | ≥ 95% | GitHub Actions API / Prometheus webhook | Slack `#ci-cd-alerts` |
| INFRA-13 | Deployment Frequency | Successful production deployments per week | ≥ 2 per week | GitHub Actions deploy workflow completion count | Monthly report → Engineering Lead |
| INFRA-14 | Mean Time to Recovery (MTTR) | Time from incident detection to resolution | < 15 minutes | PagerDuty incident analytics | Monthly report → Engineering Lead |
| INFRA-15 | ELK Log Ingestion Rate | Logs/sec ingested by Logstash | No dropped logs under normal load | `logstash_events_in_total` vs. `logstash_events_out_total` | Grafana alert → Slack `#sre-alerts` |

---

## 13. Security (Cross-Cutting)

| KPI ID | KPI Name | Verification Method | Target Criteria | Telemetry Event / Log Source | Alert Route |
|---|---|---|---|---|---|
| SEC-01 | OWASP Vulnerability Count (Critical/High) | OWASP ZAP automated scan in CI/CD | 0 CRITICAL, 0 HIGH | GitHub Actions OWASP ZAP step output | Slack `#security-alerts` → Security Lead (blocks deploy) |
| SEC-02 | Dependency Vulnerability Count | Dependabot / Snyk scan | 0 CRITICAL, 0 HIGH (within 7-day SLA) | GitHub Dependabot alerts API | Slack `#security-alerts` → Security Lead |
| SEC-03 | Data Encryption at Rest | All PG volumes encrypted (AES-256) | 100% | Cloud provider encryption status API | Quarterly compliance audit → Compliance Officer |
| SEC-04 | Data Encryption in Transit | All inter-service and client-server comms over TLS 1.3 | 100% | `gateway_tls_version` metric | Quarterly compliance audit → Compliance Officer |
| SEC-05 | Token Blacklist Effectiveness | Revoked tokens rejected within TTL window | 100% | `auth_blacklisted_token_rejected_total` | PagerDuty (CRITICAL if leaks) → Security Lead |
| SEC-06 | Rate Limit Enforcement | `429` returned when threshold exceeded | 100% enforcement | `gateway_rate_limit_rejected_total` | Grafana dashboard (informational) |

---

## 14. Business Adoption (Cross-Cutting)

| KPI ID | KPI Name | Verification Method | Target Criteria | Telemetry Event / Log Source | Alert Route |
|---|---|---|---|---|---|
| BIZ-01 | Staff Adoption Rate | Monthly active staff users / total registered staff | ≥ 80% within 3 months | ELK: `login` events filtered by `role IN (ADMIN, DOCTOR, RECEPTIONIST)` | Monthly report → PM + Stakeholders |
| BIZ-02 | Patient Portal Adoption | Online bookings / total bookings | ≥ 40% within 6 months | `core_appointment_booking_total{channel="ONLINE"}` / total | Monthly report → PM + Stakeholders |
| BIZ-03 | Patient Satisfaction (NPS) | Post-visit survey scores | ≥ 50 NPS | Survey platform (integrated via webhook) → reporting DB | Quarterly report → PM + Stakeholders |
| BIZ-04 | Administrative Error Reduction | Billing disputes + scheduling corrections post-launch vs. baseline | ≥ 40% reduction | `core_billing_dispute_total` + `core_appointment_conflict_total` vs. baseline | Quarterly report → Admin + Finance Lead |
| BIZ-05 | Revenue Cycle Improvement | Average days in A/R post-launch vs. baseline | ≥ 20% reduction | Nightly batch query on `billing` table | Monthly report → Finance Lead |

---

## Summary: KPI Count by Module

| Module | KPI Count | Critical Alerts | High Alerts |
|---|---|---|---|
| Authentication & Authorization | 10 | 0 | 2 |
| API Gateway | 10 | 1 | 1 |
| Patient Management | 6 | 0 | 0 |
| Appointment Management | 10 | 1 | 1 |
| Doctor & Schedule Management | 5 | 0 | 1 |
| Prescription Management | 7 | 3 | 0 |
| Billing | 7 | 0 | 0 |
| Notifications | 8 | 0 | 1 |
| Dashboard & Analytics | 6 | 0 | 0 |
| Reporting & Audit | 5 | 2 | 0 |
| AI Assistant | 10 | 1 | 0 |
| Infrastructure & Platform | 15 | 2 | 4 |
| Security | 6 | 2 | 0 |
| Business Adoption | 5 | 0 | 0 |
| **Total** | **110** | **12** | **10** |
