-- Create Departments Table
CREATE TABLE departments (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT
);

-- Create Patients Table
CREATE TABLE patients (
    id UUID PRIMARY KEY,
    user_id UUID,
    mrn VARCHAR(100) UNIQUE NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(50) NOT NULL,
    blood_group VARCHAR(10),
    allergies JSONB,
    insurance JSONB,
    emergency_contact JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    version INTEGER NOT NULL DEFAULT 0
);

-- Create Doctors Table
CREATE TABLE doctors (
    id UUID PRIMARY KEY,
    user_id UUID,
    license_number VARCHAR(100) UNIQUE NOT NULL,
    specialty VARCHAR(255) NOT NULL,
    department_id UUID NOT NULL REFERENCES departments(id),
    qualification VARCHAR(255),
    experience_years INTEGER,
    consultation_fee DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    version INTEGER NOT NULL DEFAULT 0
);

-- Create Appointment Slots Table
CREATE TABLE appointment_slots (
    id UUID PRIMARY KEY,
    doctor_id UUID NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
    slot_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'AVAILABLE',
    version INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT unique_doctor_slot UNIQUE (doctor_id, slot_date, start_time)
);

-- Create Appointments Table
CREATE TABLE appointments (
    id UUID PRIMARY KEY,
    patient_id UUID NOT NULL REFERENCES patients(id),
    doctor_id UUID NOT NULL REFERENCES doctors(id),
    department_id UUID NOT NULL REFERENCES departments(id),
    appointment_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    type VARCHAR(50) NOT NULL, -- e.g., CONSULTATION, FOLLOW_UP, PROCEDURE
    status VARCHAR(50) NOT NULL, -- e.g., SCHEDULED, CHECKED_IN, IN_PROGRESS, COMPLETED, CHECKED_OUT, CANCELLED, NO_SHOW
    reason TEXT,
    notes TEXT,
    qr_code TEXT,
    checked_in_at TIMESTAMP,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    version INTEGER NOT NULL DEFAULT 0
);

-- Create Prescriptions Table
CREATE TABLE prescriptions (
    id UUID PRIMARY KEY,
    appointment_id UUID NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES patients(id),
    doctor_id UUID NOT NULL REFERENCES doctors(id),
    diagnosis JSONB,
    medications JSONB,
    interaction_status VARCHAR(100),
    status VARCHAR(50) NOT NULL, -- e.g. ACTIVE, COMPLETED, DISCONTINUED
    version_chain VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    version INTEGER NOT NULL DEFAULT 0
);

-- Create Billing Table
CREATE TABLE billing (
    id UUID PRIMARY KEY,
    appointment_id UUID NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES patients(id),
    line_items JSONB NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    insurance_adj DECIMAL(10,2) DEFAULT 0.00,
    discount DECIMAL(10,2) DEFAULT 0.00,
    tax DECIMAL(10,2) DEFAULT 0.00,
    total_due DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50),
    status VARCHAR(50) NOT NULL, -- e.g. PENDING, PAID, CLAIM_SUBMITTED, DISPUTED
    paid_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    version INTEGER NOT NULL DEFAULT 0
);
