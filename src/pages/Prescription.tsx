import React, { useState } from 'react';
import { PlusIcon, MinusIcon, SaveIcon } from 'lucide-react';
import { medicines } from '../data/medicines';
import { customers } from '../data/customers';
const Prescription: React.FC = () => {
  const [formData, setFormData] = useState({
    customer: '',
    doctor: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [medications, setMedications] = useState([{
    medicine: '',
    dosage: '',
    quantity: 1
  }]);
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleMedicationChange = (index: number, field: string, value: string | number) => {
    const updatedMedications = [...medications];
    updatedMedications[index] = {
      ...updatedMedications[index],
      [field]: value
    };
    setMedications(updatedMedications);
  };
  const addMedication = () => {
    setMedications([...medications, {
      medicine: '',
      dosage: '',
      quantity: 1
    }]);
  };
  const removeMedication = (index: number) => {
    if (medications.length === 1) return;
    const updatedMedications = medications.filter((_, i) => i !== index);
    setMedications(updatedMedications);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the prescription to the backend
    console.log({
      ...formData,
      medications
    });
    alert('Prescription saved successfully!');
  };
  return <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">New Prescription</h1>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Customer
              </label>
              <select name="customer" value={formData.customer} onChange={handleFormChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" required>
                <option value="">Select Customer</option>
                {customers.map(customer => <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>)}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Doctor Name
              </label>
              <input type="text" name="doctor" value={formData.doctor} onChange={handleFormChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Prescription Date
              </label>
              <input type="date" name="date" value={formData.date} onChange={handleFormChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
            </div>
          </div>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Medications</h3>
              <button type="button" onClick={addMedication} className="bg-green-500 text-white px-3 py-1 rounded-lg flex items-center text-sm">
                <PlusIcon className="h-4 w-4 mr-1" /> Add Medication
              </button>
            </div>
            {medications.map((med, index) => <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-xs font-bold mb-1">
                    Medicine
                  </label>
                  <select value={med.medicine} onChange={e => handleMedicationChange(index, 'medicine', e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" required>
                    <option value="">Select Medicine</option>
                    {medicines.map(medicine => <option key={medicine.id} value={medicine.id}>
                        {medicine.name}
                      </option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-xs font-bold mb-1">
                    Dosage
                  </label>
                  <input type="text" placeholder="e.g., 1-0-1" value={med.dosage} onChange={e => handleMedicationChange(index, 'dosage', e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
                </div>
                <div className="flex items-end">
                  <div className="flex-1">
                    <label className="block text-gray-700 text-xs font-bold mb-1">
                      Quantity
                    </label>
                    <input type="number" min="1" value={med.quantity} onChange={e => handleMedicationChange(index, 'quantity', parseInt(e.target.value))} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
                  </div>
                  <button type="button" onClick={() => removeMedication(index)} className="ml-2 bg-red-500 text-white p-2 rounded-lg" disabled={medications.length === 1}>
                    <MinusIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>)}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Notes
            </label>
            <textarea name="notes" value={formData.notes} onChange={handleFormChange} rows={3} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" placeholder="Additional notes or instructions..."></textarea>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-yellow-500 text-black px-6 py-2 rounded-lg flex items-center">
              <SaveIcon className="h-5 w-5 mr-2" /> Save Prescription
            </button>
          </div>
        </form>
      </div>
    </div>;
};
export default Prescription;