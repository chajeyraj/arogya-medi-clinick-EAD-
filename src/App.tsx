import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CurrencyProvider } from './context/CurrencyContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Prescription from './pages/Prescription';
import Billing from './pages/Billing';
import Finance from './pages/Finance';
import Customers from './pages/Customers';
import CustomerDetail from './pages/CustomerDetail';
import Suppliers from './pages/Suppliers';
import Orders from './pages/Orders';
import AdminUsers from './pages/AdminUsers';
import AdminSettings from './pages/AdminSettings';
import ProtectedRoute from './components/common/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
export function App() {
  return <AuthProvider>
    <CurrencyProvider>
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Pharmacy Module */}
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/prescription" element={<Prescription />} />
            <Route path="/billing" element={<Billing />} />
            {/* Financial Module */}
            <Route path="/finance/sales" element={<Finance tab="sales" />} />
            <Route path="/finance/expenses" element={<Finance tab="expenses" />} />
            {/* Customer Module */}
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/:id" element={<CustomerDetail />} />
            {/* Supplier Module */}
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/orders" element={<Orders />} />
            {/* Admin Module */}
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
      </CurrencyProvider>
    </AuthProvider>;
}