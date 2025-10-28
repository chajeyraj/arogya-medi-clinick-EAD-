import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { recentSales } from '../data/sales';
import { useCurrency } from '../context/CurrencyContext';
type FinanceProps = {
  tab?: 'sales' | 'expenses';
};
const Finance: React.FC<FinanceProps> = ({
  tab = 'sales'
}) => {
  const [activeTab, setActiveTab] = useState<'sales' | 'expenses'>(tab);
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  // Mock data for sales report
  const monthlySalesData = [{
    month: 'Jan',
    sales: 125000,
    expenses: 85000,
    profit: 40000
  }, {
    month: 'Feb',
    sales: 118000,
    expenses: 82000,
    profit: 36000
  }, {
    month: 'Mar',
    sales: 135000,
    expenses: 88000,
    profit: 47000
  }, {
    month: 'Apr',
    sales: 142000,
    expenses: 90000,
    profit: 52000
  }, {
    month: 'May',
    sales: 149000,
    expenses: 92000,
    profit: 57000
  }, {
    month: 'Jun',
    sales: 138000,
    expenses: 87000,
    profit: 51000
  }, {
    month: 'Jul',
    sales: 152000,
    expenses: 94000,
    profit: 58000
  }, {
    month: 'Aug',
    sales: 165000,
    expenses: 98000,
    profit: 67000
  }, {
    month: 'Sep',
    sales: 172000,
    expenses: 100000,
    profit: 72000
  }];
  // Mock data for expense categories
  const expenseCategories = [{
    name: 'Inventory',
    amount: 65000
  }, {
    name: 'Salaries',
    amount: 25000
  }, {
    name: 'Rent',
    amount: 15000
  }, {
    name: 'Utilities',
    amount: 8000
  }, {
    name: 'Marketing',
    amount: 5000
  }, {
    name: 'Misc',
    amount: 2000
  }];
  const totalSales = monthlySalesData.reduce((sum, data) => sum + data.sales, 0);
  const totalExpenses = monthlySalesData.reduce((sum, data) => sum + data.expenses, 0);
  const totalProfit = totalSales - totalExpenses;
  const { format, currency } = useCurrency();
  return <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Financial Management</h1>
      </div>
      {/* Tab Navigation */}
      <div className="flex border-b mb-6">
        <button onClick={() => setActiveTab('sales')} className={`py-2 px-4 ${activeTab === 'sales' ? 'border-b-2 border-yellow-500 text-yellow-600' : 'text-gray-500'}`}>
          Sales Report
        </button>
        <button onClick={() => setActiveTab('expenses')} className={`py-2 px-4 ${activeTab === 'expenses' ? 'border-b-2 border-yellow-500 text-yellow-600' : 'text-gray-500'}`}>
          Expenses
        </button>
      </div>
      {/* Sales Report Tab */}
      {activeTab === 'sales' && <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <select value={period} onChange={e => setPeriod(e.target.value as any)} className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg">
              Export Report
            </button>
          </div>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm text-gray-500">Total Sales</h3>
              <p className="text-2xl font-bold">
                {format(totalSales)}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm text-gray-500">Total Expenses</h3>
              <p className="text-2xl font-bold">
                {format(totalExpenses)}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm text-gray-500">Net Profit</h3>
              <p className="text-2xl font-bold text-green-600">
                {format(totalProfit)}
              </p>
            </div>
          </div>
          {/* Sales Chart */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <h3 className="text-lg font-medium mb-4">Sales Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlySalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#F59E0B" strokeWidth={2} />
                  <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* Sales Table */}
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
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentSales.map(sale => <tr key={sale.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {sale.billNo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {sale.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {sale.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {sale.items.length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {format(sale.total)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {sale.paymentMethod}
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </>}
      {/* Expenses Tab */}
      {activeTab === 'expenses' && <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-medium mb-4">Expense Categories</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={expenseCategories}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#F59E0B" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-medium mb-4">Add New Expense</h3>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Expense Name
                  </label>
                  <input type="text" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" placeholder="e.g., Electricity Bill" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Category
                  </label>
                  <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500">
                    <option value="">Select Category</option>
                    <option value="inventory">Inventory</option>
                    <option value="salaries">Salaries</option>
                    <option value="rent">Rent</option>
                    <option value="utilities">Utilities</option>
                    <option value="marketing">Marketing</option>
                    <option value="misc">Miscellaneous</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Amount ({currency === 'INR' ? '₹' : 'LKR'})
                  </label>
                  <input type="number" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" placeholder="0.00" min="0" step="0.01" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Date
                  </label>
                  <input type="date" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Notes
                  </label>
                  <textarea className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" rows={3}></textarea>
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="bg-yellow-500 text-black px-4 py-2 rounded-lg">
                    Add Expense
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-medium mb-4">Profit Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="text-sm text-gray-500">Total Sales (YTD)</h4>
                <p className="text-2xl font-bold text-green-600">
                  {format(totalSales)}
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="text-sm text-gray-500">Total Expenses (YTD)</h4>
                <p className="text-2xl font-bold text-red-600">
                  {format(totalExpenses)}
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="text-sm text-gray-500">Net Profit (YTD)</h4>
                <p className="text-2xl font-bold text-blue-600">
                  {format(totalProfit)}
                </p>
                <p className="text-sm text-gray-500">
                  Profit Margin: {(totalProfit / totalSales * 100).toFixed(1)}
                  %
                </p>
              </div>
            </div>
          </div>
        </>}
    </div>;
};
export default Finance;