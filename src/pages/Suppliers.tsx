import React, { useState } from 'react';
import { SearchIcon, PlusIcon, PhoneIcon, MailIcon } from 'lucide-react';
import { suppliers } from '../data/suppliers';
const Suppliers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // Filter suppliers based on search term
  const filteredSuppliers = suppliers.filter(supplier => supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) || supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) || supplier.email.toLowerCase().includes(searchTerm.toLowerCase()));
  return <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Supplier Management</h1>
        <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg flex items-center">
          <PlusIcon className="h-5 w-5 mr-2" /> Add New Supplier
        </button>
      </div>
      {/* Search Bar */}
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input type="text" placeholder="Search suppliers by name, contact person, or email..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-500" />
      </div>
      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.map(supplier => <div key={supplier.id} className={`bg-white rounded-lg shadow p-6 border-l-4 ${supplier.status === 'active' ? 'border-green-500' : 'border-red-500'}`}>
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-bold">{supplier.name}</h2>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${supplier.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {supplier.status}
              </span>
            </div>
            <p className="text-gray-600 mt-1">{supplier.contactPerson}</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-gray-600">
                <PhoneIcon className="h-4 w-4 mr-2" />
                <span>{supplier.phone}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MailIcon className="h-4 w-4 mr-2" />
                <span>{supplier.email}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-gray-500">Lead Time</p>
                  <p className="font-medium">{supplier.leadTime} days</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Payment Terms</p>
                  <p className="font-medium">{supplier.paymentTerms}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Rating</p>
                  <p className="font-medium">{supplier.rating}/5</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Since</p>
                  <p className="font-medium">{supplier.registeredDate}</p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex space-x-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm">
                View Orders
              </button>
              <button className="bg-yellow-500 text-black px-3 py-1 rounded-lg text-sm">
                Place Order
              </button>
            </div>
            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-1">Products</p>
              <div className="flex flex-wrap gap-2">
                {supplier.products.slice(0, 3).map((product, index) => <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                    {product}
                  </span>)}
                {supplier.products.length > 3 && <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                    +{supplier.products.length - 3} more
                  </span>}
              </div>
            </div>
          </div>)}
      </div>
    </div>;
};
export default Suppliers;