import React from 'react';
import { UserIcon, ActivityIcon, AlertTriangleIcon, CheckCircleIcon } from 'lucide-react';
import { users } from '../../data/users';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
const AdminDashboard: React.FC = () => {
  // Filter out the password field for display
  const usersData = users.map(({
    password,
    ...rest
  }) => rest);
  const usersByRole = [{
    name: 'Pharmacists',
    value: usersData.filter(u => u.role === 'pharmacist').length
  }, {
    name: 'Owners',
    value: usersData.filter(u => u.role === 'owner').length
  }, {
    name: 'Suppliers',
    value: usersData.filter(u => u.role === 'supplier').length
  }, {
    name: 'Admins',
    value: usersData.filter(u => u.role === 'admin').length
  }];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const systemActivities = [{
    id: 1,
    user: 'admin',
    action: 'System backup completed',
    time: '10 minutes ago',
    status: 'success'
  }, {
    id: 2,
    user: 'pharmacist1',
    action: 'Failed login attempt',
    time: '2 hours ago',
    status: 'warning'
  }, {
    id: 3,
    user: 'owner',
    action: 'Updated system settings',
    time: '5 hours ago',
    status: 'info'
  }, {
    id: 4,
    user: 'supplier2',
    action: 'Password reset requested',
    time: '1 day ago',
    status: 'info'
  }, {
    id: 5,
    user: 'admin',
    action: 'New user account created',
    time: '2 days ago',
    status: 'success'
  }];
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <ActivityIcon className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };
  return <div>
      {/* User Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium mb-4">User Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={usersByRole} cx="50%" cy="50%" labelLine={false} label={({
                name,
                percent
              }) => `${name}: ${(percent * 100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                  {usersByRole.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Users Overview</h3>
            <button className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition">
              Manage Users
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {usersByRole.map((role, index) => <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <UserIcon className="h-8 w-8 text-yellow-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">{role.name}</p>
                    <p className="text-xl font-bold">{role.value}</p>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>
      {/* System Activity */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-medium mb-4">System Activity</h3>
        <div className="space-y-4">
          {systemActivities.map(activity => <div key={activity.id} className="flex items-start p-3 bg-gray-50 rounded-lg">
              <div className="mr-3 mt-1">{getStatusIcon(activity.status)}</div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-medium">{activity.action}</p>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
                <p className="text-sm text-gray-600">by {activity.user}</p>
              </div>
            </div>)}
        </div>
        <div className="mt-4 text-center">
          <button className="text-blue-500 hover:text-blue-700">
            View All Activity
          </button>
        </div>
      </div>
    </div>;
};
export default AdminDashboard;