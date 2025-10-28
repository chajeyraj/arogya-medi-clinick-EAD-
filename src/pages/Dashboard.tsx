import React from 'react';
import { useAuth } from '../context/AuthContext';
import OwnerDashboard from '../components/dashboard/OwnerDashboard';
import PharmacistDashboard from '../components/dashboard/PharmacistDashboard';
import SupplierDashboard from '../components/dashboard/SupplierDashboard';
import AdminDashboard from '../components/dashboard/AdminDashboard';
const Dashboard: React.FC = () => {
  const {
    user
  } = useAuth();
  // Render different dashboard based on user role
  const renderDashboard = () => {
    switch (user?.role) {
      case 'owner':
        return <OwnerDashboard />;
      case 'pharmacist':
        return <PharmacistDashboard />;
      case 'supplier':
        return <SupplierDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <div>Invalid user role</div>;
    }
  };
  return <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {renderDashboard()}
    </div>;
};
export default Dashboard;