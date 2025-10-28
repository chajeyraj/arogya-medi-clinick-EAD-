import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, PlusIcon, EyeIcon, UserIcon } from 'lucide-react';
import { customers } from '../data/customers';
const Customers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || customer.email.toLowerCase().includes(searchTerm.toLowerCase()) || customer.phone.includes(searchTerm));
  return <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customer Management</h1>
        <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg flex items-center">
          <PlusIcon className="h-5 w-5 mr-2" /> Add New Customer
        </button>
      </div>
      {/* Search Bar */}
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input type="text" placeholder="Search customers by name, email, or phone..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-500" />
      </div>
      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registered
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Visit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prescriptions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map(customer => <tr key={customer.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <UserIcon className="h-6 w-6 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {customer.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {customer.address}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {customer.phone}
                    </div>
                    <div className="text-sm text-gray-500">
                      {customer.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.registeredDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.lastVisit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.prescriptions.length}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link to={`/customers/${customer.id}`} className="text-blue-600 hover:text-blue-900 flex items-center">
                      <EyeIcon className="h-5 w-5 mr-1" /> View
                    </Link>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
};
export default Customers;