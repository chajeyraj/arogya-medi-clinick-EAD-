import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HomeIcon, PackageIcon, ShoppingCartIcon, BarChartIcon, UsersIcon, TruckIcon, ShieldIcon, SettingsIcon } from 'lucide-react';
const Sidebar: React.FC = () => {
  const {
    user
  } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  // Define menu items based on user role
  const menuItems = [{
    label: 'Dashboard',
    icon: <HomeIcon size={20} />,
    path: '/dashboard',
    roles: ['pharmacist', 'owner', 'supplier', 'admin']
  }, {
    label: 'Inventory',
    icon: <PackageIcon size={20} />,
    path: '/inventory',
    roles: ['pharmacist', 'owner']
  }, {
    label: 'Prescriptions',
    icon: <div size={20} />,
    path: '/prescription',
    roles: ['pharmacist', 'owner']
  }, {
    label: 'Billing',
    icon: <ShoppingCartIcon size={20} />,
    path: '/billing',
    roles: ['pharmacist', 'owner']
  }, {
    label: 'Finance',
    icon: <BarChartIcon size={20} />,
    path: '/finance/sales',
    roles: ['owner']
  }, {
    label: 'Customers',
    icon: <UsersIcon size={20} />,
    path: '/customers',
    roles: ['pharmacist', 'owner']
  }, {
    label: 'Suppliers',
    icon: <TruckIcon size={20} />,
    path: '/suppliers',
    roles: ['owner', 'supplier']
  }, {
    label: 'Orders',
    icon: <ShoppingCartIcon size={20} />,
    path: '/orders',
    roles: ['owner', 'supplier']
  }, {
    label: 'User Management',
    icon: <ShieldIcon size={20} />,
    path: '/admin/users',
    roles: ['admin']
  }, {
    label: 'Settings',
    icon: <SettingsIcon size={20} />,
    path: '/admin/settings',
    roles: ['admin', 'owner']
  }];
  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(item => user && item.roles.includes(user.role));
  return <div className={`bg-gradient-to-b from-blue-900 to-blue-950 text-white ${collapsed ? 'w-20' : 'w-64'} transition-all duration-300 ease-in-out`}>
      <div className="p-4 flex justify-between items-center">
        {!collapsed && <div className="font-bold text-xl text-green-400">Arogya</div>}
        <button onClick={() => setCollapsed(!collapsed)} className="p-1 rounded-full hover:bg-blue-800 focus:outline-none transition">
          {collapsed ? '→' : '←'}
        </button>
      </div>
      <nav className="mt-5">
        <ul>
          {filteredMenuItems.map(item => <li key={item.path}>
              <Link to={item.path} className={`flex items-center py-3 px-4 transition ${location.pathname === item.path ? 'bg-green-500 text-white' : 'text-gray-300 hover:bg-blue-800'} ${collapsed ? 'justify-center' : 'space-x-3'}`}>
                <span>{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </li>)}
        </ul>
      </nav>
    </div>;
};
export default Sidebar;