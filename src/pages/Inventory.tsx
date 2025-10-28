import React, { useState } from 'react';
import { SearchIcon, PlusIcon, EditIcon, TrashIcon } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { medicines } from '../data/medicines';
const Inventory: React.FC = () => {
  const { currency, format } = useCurrency();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentMedicine, setCurrentMedicine] = useState<any>(null);
  // Filter medicines based on search term
  const filteredMedicines = medicines.filter(medicine => medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) || medicine.category.toLowerCase().includes(searchTerm.toLowerCase()) || medicine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()));
  const handleAddNew = () => {
    setCurrentMedicine(null);
    setShowModal(true);
  };
  const handleEdit = (medicine: any) => {
    setCurrentMedicine(medicine);
    setShowModal(true);
  };
  const handleDelete = (id: string) => {
    // In a real app, this would call an API to delete the medicine
    alert(`Delete medicine with ID: ${id}`);
  };
  // Function to determine row color based on stock and expiry
  const getRowClass = (medicine: any) => {
    const today = new Date();
    const expiryDate = new Date(medicine.expiryDate);
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
    if (expiryDate < today) {
      return 'bg-red-100'; // Expired
    } else if (expiryDate < threeMonthsFromNow) {
      return 'bg-yellow-100'; // Expiring soon
    } else if (medicine.stockQuantity < medicine.reorderLevel) {
      return 'bg-orange-100'; // Low stock
    }
    return '';
  };
  return <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Medicine Inventory</h1>
        <button onClick={handleAddNew} className="bg-yellow-500 text-black px-4 py-2 rounded-lg flex items-center">
          <PlusIcon className="h-5 w-5 mr-2" /> Add New Medicine
        </button>
      </div>
      {/* Search Bar */}
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input type="text" placeholder="Search by name, category, or manufacturer..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-500" />
      </div>
      {/* Legend */}
      <div className="flex space-x-4 mb-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-100 mr-2"></div>
          <span className="text-sm">Expired</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-100 mr-2"></div>
          <span className="text-sm">Expiring Soon</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-orange-100 mr-2"></div>
          <span className="text-sm">Low Stock</span>
        </div>
      </div>
      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Batch No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiry Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price ({currency === 'INR' ? '₹' : 'LKR'})
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMedicines.map(medicine => <tr key={medicine.id} className={getRowClass(medicine)}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {medicine.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {medicine.manufacturer}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {medicine.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {medicine.batchNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {medicine.expiryDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {medicine.stockQuantity}
                    </div>
                    <div className="text-sm text-gray-500">
                      Min: {medicine.reorderLevel}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {format(medicine.sellingPrice)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Cost: {format(medicine.unitPrice)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleEdit(medicine)} className="text-blue-600 hover:text-blue-900 mr-3">
                      <EditIcon className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleDelete(medicine.id)} className="text-red-600 hover:text-red-900">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
      {/* Add/Edit Medicine Modal */}
      {showModal && <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {currentMedicine ? 'Edit Medicine' : 'Add New Medicine'}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Medicine Name
                </label>
                <input type="text" defaultValue={currentMedicine?.name || ''} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              </div>
              {/* More form fields would go here */}
              <div className="flex justify-end space-x-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-yellow-500 text-black rounded-lg">
                  {currentMedicine ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>}
    </div>;
};
export default Inventory;