import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { BellIcon, LogOutIcon, UserIcon } from 'lucide-react';
const Navbar: React.FC = () => {
  const {
    user,
    logout
  } = useAuth();
  return <nav className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-md">
      <div className="max-w-full mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-white font-bold text-xl">
              Arogya Pharmacy
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-1 text-white focus:outline-none hover:text-green-200 transition">
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-0 right-0 bg-green-500 rounded-full h-4 w-4 text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
            <div className="flex items-center space-x-2">
              {user?.avatar ? <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" /> : <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-blue-600">
                  <UserIcon className="h-5 w-5" />
                </div>}
              <div className="text-sm">
                <p className="text-white font-medium">{user?.name}</p>
                <p className="text-blue-200 capitalize text-xs">{user?.role}</p>
              </div>
            </div>
            <button onClick={logout} className="p-1 text-white hover:text-green-200 focus:outline-none transition">
              <LogOutIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>;
};
export default Navbar;