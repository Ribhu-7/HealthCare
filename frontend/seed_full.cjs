#!/usr/bin/env node

/**
 * HAPMS Full Data Seed Script
 * Seeds departments, doctors, and patients into core-business-service
 * Run: node seed_full.cjs
 */

const http = require('http');

const BASE = 'http://localhost:8082';

function request(method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'localhost',
      port: 8082,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {}),
      },
    };
    const req = http.request(options, (res) => {
      let raw = '';
      res.on('data', chunk => (raw += chunk));
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(raw) }); }
        catch { resolve({ status: res.statusCode, data: raw }); }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function seed() {
  console.log('🚀 Starting HAPMS full data seed...\n');

  // ─── 1. Departments ────────────────────────────────────────
  console.log('📁 Creating departments...');
  const departments = ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'General Surgery', 'Oncology'];
  const deptMap = {};

  for (const name of departments) {
    try {
      // Try to create - if it already exists, it'll fail, so we fetch all
      const res = await request('POST', '/api/v1/departments', { name, description: `${name} Department` });
      if (res.status === 201 || res.status === 200) {
        deptMap[name] = res.data.id;
        console.log(`  ✅ ${name}: ${res.data.id}`);
      } else {
        console.log(`  ⚠️  ${name}: ${res.status} - ${JSON.stringify(res.data)}`);
      }
    } catch (e) {
      console.log(`  ❌ ${name}: ${e.message}`);
    }
  }

  // Fetch all departments to get IDs
  const deptRes = await request('GET', '/api/v1/departments');
  if (deptRes.status === 200 && Array.isArray(deptRes.data)) {
    deptRes.data.forEach(d => { deptMap[d.name] = d.id; });
    console.log(`  📋 Found ${deptRes.data.length} departments\n`);
  }

  // ─── 2. Doctors ────────────────────────────────────────────
  console.log('👨‍⚕️ Creating doctors...');
  const doctors = [
    { firstName: 'Sarah', lastName: 'Jenkins', specialty: 'Cardiology', deptName: 'Cardiology', licenseNumber: 'LIC-001', consultationFee: 250 },
    { firstName: 'Michael', lastName: 'Chen', specialty: 'Neurology', deptName: 'Neurology', licenseNumber: 'LIC-002', consultationFee: 300 },
    { firstName: 'Emily', lastName: 'Rodriguez', specialty: 'Pediatrics', deptName: 'Pediatrics', licenseNumber: 'LIC-003', consultationFee: 180 },
    { firstName: 'James', lastName: 'Wilson', specialty: 'Orthopedics', deptName: 'Orthopedics', licenseNumber: 'LIC-004', consultationFee: 280 },
  ];

  const doctorIds = [];
  for (const doc of doctors) {
    const deptId = deptMap[doc.deptName] || Object.values(deptMap)[0];
    if (!deptId) { console.log(`  ⚠️  No department found for ${doc.lastName}`); continue; }
    try {
      const res = await request('POST', `/api/v1/doctors?departmentId=${deptId}`, {
        firstName: doc.firstName,
        lastName: doc.lastName,
        specialty: doc.specialty,
        licenseNumber: doc.licenseNumber,
        qualification: 'MD, FACC',
        experienceYears: 12,
        consultationFee: doc.consultationFee,
        status: 'ACTIVE',
      });
      if (res.status === 201 || res.status === 200) {
        doctorIds.push({ ...res.data, name: `${doc.firstName} ${doc.lastName}` });
        console.log(`  ✅ Dr. ${doc.firstName} ${doc.lastName}: ${res.data.id}`);
      } else {
        console.log(`  ⚠️  Dr. ${doc.lastName}: ${res.status} - ${JSON.stringify(res.data).substring(0, 100)}`);
      }
    } catch (e) { console.log(`  ❌ Dr. ${doc.lastName}: ${e.message}`); }
  }

  // Fetch all doctors if seeding failed (already exists)
  if (doctorIds.length === 0) {
    const drRes = await request('GET', '/api/v1/doctors');
    if (drRes.status === 200) drRes.data.forEach(d => doctorIds.push(d));
  }
  console.log(`  📋 ${doctorIds.length} doctors available\n`);

  // ─── 3. Patients ───────────────────────────────────────────
  console.log('🧑‍🤝‍🧑 Creating patients...');
  const patients = [
    {
      firstName: 'Eleanor', lastName: 'Wright',
      email: 'eleanor.wright@email.com', contactNumber: '(206) 555-0192',
      dateOfBirth: '1982-03-15', gender: 'FEMALE', bloodGroup: 'A+',
      allergies: JSON.stringify(['Penicillin', 'Sulfa Drugs']),
      insurance: JSON.stringify({ provider: 'BlueCross PPO', groupNumber: 'BC-9921-H' }),
      emergencyContact: JSON.stringify({ name: 'Robert Wright', phone: '(206) 555-0193', relation: 'Spouse' }),
    },
    {
      firstName: 'James', lastName: 'Morrison',
      email: 'j.morrison@email.com', contactNumber: '(415) 555-8421',
      dateOfBirth: '1975-07-22', gender: 'MALE', bloodGroup: 'O-',
      allergies: JSON.stringify(['Aspirin']),
      insurance: JSON.stringify({ provider: 'Aetna HMO', groupNumber: 'AET-4421' }),
      emergencyContact: JSON.stringify({ name: 'Lisa Morrison', phone: '(415) 555-8422', relation: 'Spouse' }),
    },
    {
      firstName: 'Maria', lastName: 'Santos',
      email: 'maria.santos@email.com', contactNumber: '(312) 555-7731',
      dateOfBirth: '1990-11-08', gender: 'FEMALE', bloodGroup: 'B+',
      allergies: JSON.stringify([]),
      insurance: JSON.stringify({ provider: 'United Health', groupNumber: 'UH-8821' }),
      emergencyContact: JSON.stringify({ name: 'Carlos Santos', phone: '(312) 555-7732', relation: 'Husband' }),
    },
    {
      firstName: 'Robert', lastName: 'Thompson',
      email: 'rob.thompson@email.com', contactNumber: '(713) 555-3345',
      dateOfBirth: '1968-02-14', gender: 'MALE', bloodGroup: 'AB+',
      allergies: JSON.stringify(['Latex', 'Codeine']),
      insurance: JSON.stringify({ provider: 'Cigna PPO', groupNumber: 'CIG-1122' }),
      emergencyContact: JSON.stringify({ name: 'Diana Thompson', phone: '(713) 555-3346', relation: 'Wife' }),
    },
  ];

  const patientIds = [];
  for (const p of patients) {
    try {
      const res = await request('POST', '/api/v1/patients', p);
      if (res.status === 201 || res.status === 200) {
        patientIds.push(res.data);
        console.log(`  ✅ ${p.firstName} ${p.lastName}: ${res.data.id}`);
      } else {
        console.log(`  ⚠️  ${p.lastName}: ${res.status} - ${JSON.stringify(res.data).substring(0, 100)}`);
      }
    } catch (e) { console.log(`  ❌ ${p.lastName}: ${e.message}`); }
  }

  // Fetch patients if already exist
  if (patientIds.length === 0) {
    const ptRes = await request('GET', '/api/v1/patients');
    if (ptRes.status === 200) ptRes.data.forEach(p => patientIds.push(p));
  }
  console.log(`  📋 ${patientIds.length} patients available\n`);

  // ─── 4. Appointments ───────────────────────────────────────
  if (patientIds.length > 0 && doctorIds.length > 0) {
    console.log('📅 Generating slots & creating appointments...');
    const today = new Date().toISOString().split('T')[0];
    const nextWeekDate = new Date();
    nextWeekDate.setDate(nextWeekDate.getDate() + 7);
    const nextWeek = nextWeekDate.toISOString().split('T')[0];

    // Generate slots for each doctor
    for (const doc of doctorIds) {
      try {
        await request('POST', `/api/v1/doctors/${doc.id}/generate-slots?startDate=${today}&endDate=${nextWeek}&startTime=08:00&endTime=18:00&durationMinutes=30`);
        console.log(`  🕒 Slots generated for Dr. ${doc.lastName || doc.id}`);
      } catch (e) {
        console.log(`  ❌ Slot generation failed for Dr. ${doc.lastName}: ${e.message}`);
      }
    }

    const appointments = [
      { patientIdx: 0, doctorIdx: 0, startTime: '09:00', type: 'CONSULTATION', reason: 'Annual checkup' },
      { patientIdx: 1, doctorIdx: 1, startTime: '10:00', type: 'FOLLOW_UP', reason: 'Blood work follow-up' },
      { patientIdx: 2, doctorIdx: 2, startTime: '11:00', type: 'CONSULTATION', reason: 'New patient visit' },
    ];
    for (const apt of appointments) {
      try {
        const res = await request('POST', '/api/v1/appointments', {
          patientId: patientIds[apt.patientIdx]?.id,
          doctorId: doctorIds[apt.doctorIdx]?.id,
          appointmentDate: today,
          startTime: apt.startTime,
          type: apt.type,
          reason: apt.reason,
        });
        if (res.status === 201 || res.status === 200) {
          console.log(`  ✅ Appointment ${res.data.id}`);
        } else {
          console.log(`  ⚠️  ${res.status}: ${JSON.stringify(res.data).substring(0, 100)}`);
        }
      } catch (e) { console.log(`  ❌ ${e.message}`); }
    }
  }

  console.log('\n✅ Seed complete!');
  console.log('🌐 Open http://localhost:5173 to see the data.\n');
}

seed().catch(e => console.error('Seed failed:', e.message));
