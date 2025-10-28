import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRoles?: Array<'pharmacist' | 'owner' | 'supplier' | 'admin'>;
};
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles
}) => {
  const {
    isAuthenticated,
    user
  } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{
      from: location
    }} replace />;
  }
  // If specific roles are required, check user role
  if (requiredRoles && user && !requiredRoles.includes(user.role)) {
    // Redirect to dashboard if authenticated but doesn't have the required role
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
};
export default ProtectedRoute;