import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { AlertCircleIcon } from 'lucide-react';
import { monthlySales } from '../../data/sales';
import { useCurrency } from '../../context/CurrencyContext';
const OwnerDashboard: React.FC = () => {
  const { format } = useCurrency();
  const summaryCards = [{
    title: 'Total Sales',
    value: format(248500),
    change: '+12%',
    positive: true
  }, {
    title: 'Monthly Profit',
    value: format(84320),
    change: '+8%',
    positive: true
  }, {
    title: 'Low Stock Items',
    value: '24',
    change: '+5',
    positive: false
  }, {
    title: 'Active Suppliers',
    value: '18',
    change: '0',
    positive: true
  }];
  const alerts = [{
    id: 1,
    message: 'Paracetamol stock is below threshold',
    level: 'warning'
  }, {
    id: 2,
    message: 'Monthly sales target achieved',
    level: 'success'
  }, {
    id: 3,
    message: '5 medicines expiring next month',
    level: 'danger'
  }, {
    id: 4,
    message: 'New supplier application received',
    level: 'info'
  }];
  const getAlertClass = (level: string) => {
    switch (level) {
      case 'warning':
        return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      case 'success':
        return 'bg-green-100 border-green-500 text-green-700';
      case 'danger':
        return 'bg-red-100 border-red-500 text-red-700';
      case 'info':
        return 'bg-blue-100 border-blue-500 text-blue-700';
      default:
        return 'bg-gray-100 border-gray-500 text-gray-700';
    }
  };
  return <div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {summaryCards.map((card, index) => <div key={index} className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm text-gray-500">{card.title}</h3>
            <p className="text-2xl font-bold">{card.value}</p>
            <p className={`text-sm ${card.positive ? 'text-green-600' : 'text-red-600'}`}>
              {card.change} from last month
            </p>
          </div>)}
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium mb-4">Monthly Sales</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium mb-4">Top Selling Products</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{
              name: 'Paracetamol',
              sales: 145
            }, {
              name: 'Amoxicillin',
              sales: 120
            }, {
              name: 'Cetirizine',
              sales: 98
            }, {
              name: 'Omeprazole',
              sales: 80
            }, {
              name: 'Metformin',
              sales: 74
            }]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Alerts Section */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <AlertCircleIcon className="h-5 w-5 mr-2" /> Alerts & Notifications
        </h3>
        <div className="space-y-3">
          {alerts.map(alert => <div key={alert.id} className={`border-l-4 p-3 ${getAlertClass(alert.level)}`}>
              {alert.message}
            </div>)}
        </div>
      </div>
    </div>;
};
export default OwnerDashboard;