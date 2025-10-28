import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    login
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // Get the page user was trying to access before being redirected to login
  const from = location.state?.from?.pathname || '/dashboard';
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const success = await login(username, password);
      if (success) {
        navigate(from, {
          replace: true
        });
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">Arogya</h1>
          <p className="text-gray-600">Pharmacy Management System</p>
        </div>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-2 px-4 rounded-md hover:from-blue-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-medium transition">
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Demo Accounts:</p>
            <p>pharmacist / password</p>
            <p>owner / password</p>
            <p>supplier / password</p>
            <p>admin / password</p>
          </div>
        </form>
      </div>
    </div>;
};
export default Login;