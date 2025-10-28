import React from 'react';
import { Link } from 'react-router-dom';
import { FilePlusIcon, PackageIcon, FileTextIcon } from 'lucide-react';
import { recentSales } from '../../data/sales';
import { useCurrency } from '../../context/CurrencyContext';
const PharmacistDashboard: React.FC = () => {
  const { format } = useCurrency();
  const quickActions = [{
    title: 'Add Prescription',
    icon: <FilePlusIcon size={24} />,
    path: '/prescription',
    color: 'bg-blue-500'
  }, {
    title: 'Update Inventory',
    icon: <PackageIcon size={24} />,
    path: '/inventory',
    color: 'bg-green-500'
  }, {
    title: 'Generate Bill',
    icon: <FileTextIcon size={24} />,
    path: '/billing',
    color: 'bg-yellow-500'
  }];
  return <div>
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {quickActions.map((action, index) => <Link key={index} to={action.path} className={`${action.color} text-white rounded-lg shadow p-6 flex items-center transition-transform hover:scale-105`}>
            <div className="mr-4">{action.icon}</div>
            <div>
              <h3 className="font-bold">{action.title}</h3>
              <p className="text-sm opacity-80">Click to proceed</p>
            </div>
          </Link>)}
      </div>
      {/* Recent Sales Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-lg font-medium">Recent Sales</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bill No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
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
              {recentSales.slice(0, 5).map(sale => <tr key={sale.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{sale.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sale.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sale.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(sale.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${sale.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {sale.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" className="text-blue-600 hover:text-blue-900">
                      View
                    </a>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
};
export default PharmacistDashboard;