const axios = require('axios');

async function seedData() {
  try {
    const p1 = await axios.post('http://localhost:8082/api/v1/patients', {
      firstName: 'Eleanor',
      lastName: 'Wright',
      dateOfBirth: '1984-05-12',
      gender: 'Female',
      contactNumber: '+1 (555) 123-4567',
      email: 'e.wright@example.com',
      bloodGroup: 'O+',
      allergies: JSON.stringify(["Penicillin", "Sulfa"]),
      insurance: JSON.stringify({ provider: "BlueCross", id: "BC123456" }),
      emergencyContact: JSON.stringify({ name: "John Wright", phone: "+1 555-987-6543" }),
      userId: '00000000-0000-0000-0000-000000000001'
    });
    console.log('Created Patient:', p1.data.firstName);

    const p2 = await axios.post('http://localhost:8082/api/v1/patients', {
      firstName: 'Michael',
      lastName: 'Chen',
      dateOfBirth: '1979-11-23',
      gender: 'Male',
      contactNumber: '+1 (555) 234-5678',
      email: 'm.chen@example.com',
      bloodGroup: 'A+',
      allergies: JSON.stringify([]),
      insurance: JSON.stringify({ provider: "Aetna", id: "AT789012" }),
      emergencyContact: JSON.stringify({ name: "Sarah Chen", phone: "+1 555-876-5432" }),
      userId: '00000000-0000-0000-0000-000000000002'
    });
    console.log('Created Patient:', p2.data.firstName);
  } catch (error) {
    console.error('Error seeding data:', error.message);
  }
}

seedData();
