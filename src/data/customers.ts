export const customers = [{
  id: '1',
  name: 'Dinesh Perera',
  email: 'dinesh@example.com',
  phone: '+94 77 123 4567',
  address: '123 Main St, Colombo 5',
  registeredDate: '2022-06-15',
  lastVisit: '2023-09-12',
  prescriptions: [{
    id: 'P001',
    date: '2023-09-12',
    doctor: 'Dr. Ravi Silva',
    items: [{
      medicine: 'Paracetamol 500mg',
      dosage: '1-0-1',
      quantity: 20
    }, {
      medicine: 'Cetirizine 10mg',
      dosage: '0-0-1',
      quantity: 10
    }],
    notes: 'Take after meals'
  }, {
    id: 'P002',
    date: '2023-08-05',
    doctor: 'Dr. Ravi Silva',
    items: [{
      medicine: 'Amoxicillin 250mg',
      dosage: '1-1-1',
      quantity: 15
    }],
    notes: 'For throat infection'
  }],
  feedback: [{
    date: '2023-08-06',
    rating: 4,
    comment: 'Good service, but had to wait a bit long'
  }]
}, {
  id: '2',
  name: 'Malini Fernando',
  email: 'malini@example.com',
  phone: '+94 77 234 5678',
  address: '456 Park Ave, Colombo 7',
  registeredDate: '2022-08-20',
  lastVisit: '2023-09-10',
  prescriptions: [{
    id: 'P003',
    date: '2023-09-10',
    doctor: 'Dr. Kumara Jayawardene',
    items: [{
      medicine: 'Metformin 500mg',
      dosage: '1-0-1',
      quantity: 60
    }, {
      medicine: 'Atorvastatin 10mg',
      dosage: '0-0-1',
      quantity: 30
    }],
    notes: 'Monthly prescription for diabetes'
  }],
  feedback: [{
    date: '2023-09-10',
    rating: 5,
    comment: 'Excellent service and advice from the pharmacist'
  }]
}, {
  id: '3',
  name: 'Ahmed Khan',
  email: 'ahmed@example.com',
  phone: '+94 77 345 6789',
  address: '789 Beach Rd, Negombo',
  registeredDate: '2023-01-10',
  lastVisit: '2023-09-08',
  prescriptions: [{
    id: 'P004',
    date: '2023-09-08',
    doctor: 'Dr. Sarah Williams',
    items: [{
      medicine: 'Salbutamol Inhaler',
      dosage: 'As needed',
      quantity: 1
    }, {
      medicine: 'Cetirizine 10mg',
      dosage: '0-0-1',
      quantity: 15
    }],
    notes: 'For asthma and allergies'
  }],
  feedback: []
}, {
  id: '4',
  name: 'Kamala Nayake',
  email: 'kamala@example.com',
  phone: '+94 77 456 7890',
  address: '101 Hill St, Kandy',
  registeredDate: '2022-05-05',
  lastVisit: '2023-09-05',
  prescriptions: [{
    id: 'P005',
    date: '2023-09-05',
    doctor: 'Dr. Anura Bandara',
    items: [{
      medicine: 'Losartan 50mg',
      dosage: '1-0-1',
      quantity: 30
    }, {
      medicine: 'Omeprazole 20mg',
      dosage: '1-0-0',
      quantity: 15
    }],
    notes: 'For hypertension and gastritis'
  }, {
    id: 'P006',
    date: '2023-08-10',
    doctor: 'Dr. Anura Bandara',
    items: [{
      medicine: 'Losartan 50mg',
      dosage: '1-0-1',
      quantity: 30
    }],
    notes: 'Monthly prescription for hypertension'
  }],
  feedback: [{
    date: '2023-08-11',
    rating: 3,
    comment: 'Medicine was out of stock, had to come back next day'
  }]
}];