import React from 'react';
import { TruckIcon, CheckCircleIcon, XCircleIcon, ClockIcon } from 'lucide-react';
import { supplierOrders } from '../../data/orders';
import { useCurrency } from '../../context/CurrencyContext';
const SupplierDashboard: React.FC = () => {
  const { format } = useCurrency();
  const stats = [{
    title: 'Pending Orders',
    value: supplierOrders.filter(o => o.status === 'Pending').length,
    icon: <ClockIcon className="h-6 w-6 text-yellow-500" />,
    color: 'bg-yellow-100'
  }, {
    title: 'Delivered',
    value: supplierOrders.filter(o => o.status === 'Delivered').length,
    icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
    color: 'bg-green-100'
  }, {
    title: 'Cancelled',
    value: supplierOrders.filter(o => o.status === 'Cancelled').length,
    icon: <XCircleIcon className="h-6 w-6 text-red-500" />,
    color: 'bg-red-100'
  }, {
    title: 'In Transit',
    value: supplierOrders.filter(o => o.status === 'In Transit').length,
    icon: <TruckIcon className="h-6 w-6 text-blue-500" />,
    color: 'bg-blue-100'
  }];
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
  return <div>
      {/* Order Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => <div key={index} className={`${stat.color} rounded-lg shadow p-4`}>
            <div className="flex items-center">
              <div className="mr-4">{stat.icon}</div>
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>)}
      </div>
      {/* Pending Orders */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-medium">Pending Orders</h3>
          <button className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
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
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {supplierOrders.filter(order => order.status === 'Pending').map(order => <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.items} items
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(order.total)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        Update
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        Process
                      </button>
                    </td>
                  </tr>)}
            </tbody>
          </table>
        </div>
      </div>
      {/* Delivery Updates */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-medium mb-4">Recent Delivery Updates</h3>
        <div className="space-y-4">
          {supplierOrders.filter(order => order.status === 'In Transit' || order.status === 'Delivered').slice(0, 3).map(order => <div key={order.id} className="border-l-4 border-blue-500 pl-4">
                <div className="flex justify-between">
                  <p className="font-medium">Order #{order.id}</p>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{order.date}</p>
                <p className="text-sm mt-1">
                  {order.status === 'In Transit' ? 'Package in transit to Arogya Pharmacy. ETA: 2 days.' : 'Package delivered successfully.'}
                </p>
              </div>)}
        </div>
      </div>
    </div>;
};
export default SupplierDashboard;