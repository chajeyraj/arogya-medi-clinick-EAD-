import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
const MainLayout: React.FC = () => {
  return <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          <Outlet />
        </main>
      </div>
    </div>;
};
export default MainLayout;