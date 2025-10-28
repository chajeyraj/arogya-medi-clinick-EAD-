import React, { useState } from 'react';
import { SearchIcon, FilterIcon, TruckIcon, CheckCircleIcon, XCircleIcon, ClockIcon, PlusIcon } from 'lucide-react';
import { supplierOrders } from '../data/orders';
import { suppliers } from '../data/suppliers';
import { useCurrency } from '../context/CurrencyContext';
const Orders: React.FC = () => {
  const { format } = useCurrency();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  // Filter orders based on search term and status
  const filteredOrders = supplierOrders.filter(order => {
    const matchesSearch = order.supplier.toLowerCase().includes(searchTerm.toLowerCase()) || order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'Delivered':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'Cancelled':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'In Transit':
        return <TruckIcon className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Purchase Orders</h1>
        <button onClick={() => setShowAddOrderModal(true)} className="bg-yellow-500 text-black px-4 py-2 rounded-lg flex items-center">
          <PlusIcon className="h-5 w-5 mr-2" /> New Order
        </button>
      </div>
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input type="text" placeholder="Search orders by ID or supplier..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-500" />
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FilterIcon className="h-5 w-5 text-gray-400" />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="pl-10 pr-8 py-2 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supplier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expected Delivery
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map(order => <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.supplier}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.expectedDelivery}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.items} items
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {format(order.total)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(order.status)}
                      <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      Details
                    </button>
                    {order.status === 'Pending' && <button className="text-red-600 hover:text-red-900">
                        Cancel
                      </button>}
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
      {/* Add Order Modal */}
      {showAddOrderModal && <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Create New Order</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Supplier
                </label>
                <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500">
                  <option value="">Select Supplier</option>
                  {suppliers.filter(s => s.status === 'active').map(supplier => <option key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </option>)}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Expected Delivery Date
                </label>
                <input type="date" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Products
                </label>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Add Products</h4>
                    <button type="button" className="text-blue-600 text-sm">
                      + Add Product
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <select className="w-full px-2 py-1 border rounded text-sm">
                          <option value="">Select Product</option>
                          <option>Paracetamol 500mg</option>
                          <option>Amoxicillin 250mg</option>
                        </select>
                      </div>
                      <div>
                        <input type="number" placeholder="Quantity" className="w-full px-2 py-1 border rounded text-sm" />
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm mr-2">{format(2.5)}/unit</span>
                        <button type="button" className="text-red-500 text-sm">
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Notes
                </label>
                <textarea rows={3} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" placeholder="Any special instructions..."></textarea>
              </div>
              <div className="flex justify-end space-x-3">
                <button type="button" onClick={() => setShowAddOrderModal(false)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-yellow-500 text-black rounded-lg">
                  Create Order
                </button>
              </div>
            </form>
          </div>
        </div>}
    </div>;
};
export default Orders;