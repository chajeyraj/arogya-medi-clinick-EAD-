export const supplierOrders = [{
  id: 'O001',
  supplier: 'Lanka Pharma Ltd',
  date: '2023-09-10',
  expectedDelivery: '2023-09-13',
  items: 3,
  total: 15000.0,
  status: 'Delivered',
  products: [{
    medicine: 'Paracetamol 500mg',
    quantity: 500,
    unitPrice: 2.5,
    total: 1250.0
  }, {
    medicine: 'Amoxicillin 250mg',
    quantity: 200,
    unitPrice: 8.75,
    total: 1750.0
  }, {
    medicine: 'Cetirizine 10mg',
    quantity: 300,
    unitPrice: 3.2,
    total: 960.0
  }]
}, {
  id: 'O002',
  supplier: 'MedPlus Distributors',
  date: '2023-09-12',
  expectedDelivery: '2023-09-17',
  items: 2,
  total: 8750.0,
  status: 'Pending',
  products: [{
    medicine: 'Metformin 500mg',
    quantity: 400,
    unitPrice: 6.25,
    total: 2500.0
  }, {
    medicine: 'Atorvastatin 10mg',
    quantity: 500,
    unitPrice: 12.5,
    total: 6250.0
  }]
}, {
  id: 'O003',
  supplier: 'Global Meds Inc.',
  date: '2023-09-05',
  expectedDelivery: '2023-09-12',
  items: 1,
  total: 12000.0,
  status: 'In Transit',
  products: [{
    medicine: 'Salbutamol Inhaler',
    quantity: 100,
    unitPrice: 120.0,
    total: 12000.0
  }]
}, {
  id: 'O004',
  supplier: 'Sri Lanka Pharmaceuticals',
  date: '2023-09-08',
  expectedDelivery: '2023-09-10',
  items: 2,
  total: 5800.0,
  status: 'Delivered',
  products: [{
    medicine: 'Paracetamol 500mg',
    quantity: 1000,
    unitPrice: 2.5,
    total: 2500.0
  }, {
    medicine: 'Omeprazole 20mg',
    quantity: 300,
    unitPrice: 5.8,
    total: 1740.0
  }]
}, {
  id: 'O005',
  supplier: 'Lanka Pharma Ltd',
  date: '2023-09-15',
  expectedDelivery: '2023-09-18',
  items: 2,
  total: 7800.0,
  status: 'Pending',
  products: [{
    medicine: 'Amoxicillin 250mg',
    quantity: 300,
    unitPrice: 8.75,
    total: 2625.0
  }, {
    medicine: 'Cetirizine 10mg',
    quantity: 400,
    unitPrice: 3.2,
    total: 1280.0
  }]
}, {
  id: 'O006',
  supplier: 'MedPlus Distributors',
  date: '2023-09-01',
  expectedDelivery: '2023-09-06',
  items: 1,
  total: 5850.0,
  status: 'Cancelled',
  products: [{
    medicine: 'Losartan 50mg',
    quantity: 600,
    unitPrice: 9.75,
    total: 5850.0
  }]
}];