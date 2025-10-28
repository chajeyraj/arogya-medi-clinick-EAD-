import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, FilePlusIcon, StarIcon } from 'lucide-react';
import { customers } from '../data/customers';
const CustomerDetail: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const [activeTab, setActiveTab] = useState<'prescriptions' | 'feedback'>('prescriptions');
  const [rating, setRating] = useState<number>(5);
  const [feedback, setFeedback] = useState<string>('');
  // Find customer by ID
  const customer = customers.find(c => c.id === id);
  if (!customer) {
    return <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Customer not found
        </div>
        <Link to="/customers" className="mt-4 inline-block text-blue-600">
          Back to Customers
        </Link>
      </div>;
  }
  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the feedback to the backend
    alert('Feedback submitted successfully!');
    setFeedback('');
  };
  return <div className="container mx-auto">
      <Link to="/customers" className="inline-flex items-center text-blue-600 mb-6">
        <ArrowLeftIcon className="h-4 w-4 mr-1" /> Back to Customers
      </Link>
      {/* Customer Profile */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
              <span className="text-2xl text-gray-600">
                {customer.name.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{customer.name}</h1>
              <p className="text-gray-500">{customer.email}</p>
              <p className="text-gray-500">{customer.phone}</p>
            </div>
          </div>
          <div className="flex flex-col text-right">
            <div className="text-sm text-gray-500">
              <span className="font-medium">Registered:</span>{' '}
              {customer.registeredDate}
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-medium">Last Visit:</span>{' '}
              {customer.lastVisit}
            </div>
            <div className="mt-2">
              <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg">
                Edit Details
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="flex border-b mb-6">
        <button onClick={() => setActiveTab('prescriptions')} className={`py-2 px-4 ${activeTab === 'prescriptions' ? 'border-b-2 border-yellow-500 text-yellow-600' : 'text-gray-500'}`}>
          Prescription History
        </button>
        <button onClick={() => setActiveTab('feedback')} className={`py-2 px-4 ${activeTab === 'feedback' ? 'border-b-2 border-yellow-500 text-yellow-600' : 'text-gray-500'}`}>
          Feedback
        </button>
      </div>
      {/* Prescription History Tab */}
      {activeTab === 'prescriptions' && <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Prescription History</h2>
            <Link to="/prescription" className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center">
              <FilePlusIcon className="h-5 w-5 mr-2" /> New Prescription
            </Link>
          </div>
          {customer.prescriptions.length === 0 ? <div className="bg-gray-50 p-6 rounded-lg text-center text-gray-500">
              No prescription history found
            </div> : <div className="space-y-4">
              {customer.prescriptions.map(prescription => <div key={prescription.id} className="bg-white rounded-lg shadow p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">
                        Prescription #{prescription.id}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Date: {prescription.date}
                      </p>
                      <p className="text-sm text-gray-500">
                        Doctor: {prescription.doctor}
                      </p>
                    </div>
                    <button className="text-blue-600">View Details</button>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Medications</h4>
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Medicine
                          </th>
                          <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Dosage
                          </th>
                          <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantity
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {prescription.items.map((item, index) => <tr key={index}>
                            <td className="py-2 px-3 text-sm">
                              {item.medicine}
                            </td>
                            <td className="py-2 px-3 text-sm">{item.dosage}</td>
                            <td className="py-2 px-3 text-sm">
                              {item.quantity}
                            </td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>
                  {prescription.notes && <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                      <p className="text-sm">
                        <span className="font-medium">Notes:</span>{' '}
                        {prescription.notes}
                      </p>
                    </div>}
                </div>)}
            </div>}
        </div>}
      {/* Feedback Tab */}
      {activeTab === 'feedback' && <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Customer Feedback</h2>
            {customer.feedback.length === 0 ? <div className="bg-gray-50 p-6 rounded-lg text-center text-gray-500">
                No feedback history found
              </div> : <div className="space-y-4">
                {customer.feedback.map((item, index) => <div key={index} className="bg-white rounded-lg shadow p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => <StarIcon key={i} className={`h-5 w-5 ${i < item.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />)}
                      </div>
                      <div className="text-sm text-gray-500">{item.date}</div>
                    </div>
                    <p className="text-gray-700">{item.comment}</p>
                  </div>)}
              </div>}
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Add Feedback</h2>
            <div className="bg-white rounded-lg shadow p-4">
              <form onSubmit={handleSubmitFeedback}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Rating
                  </label>
                  <div className="flex">
                    {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  return <button type="button" key={index} onClick={() => setRating(ratingValue)} className="focus:outline-none">
                          <StarIcon className={`h-8 w-8 ${ratingValue <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                        </button>;
                })}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Comments
                  </label>
                  <textarea value={feedback} onChange={e => setFeedback(e.target.value)} rows={4} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" placeholder="Enter customer feedback..." required></textarea>
                </div>
                <button type="submit" className="bg-yellow-500 text-black px-4 py-2 rounded-lg">
                  Submit Feedback
                </button>
              </form>
            </div>
          </div>
        </div>}
    </div>;
};
export default CustomerDetail;