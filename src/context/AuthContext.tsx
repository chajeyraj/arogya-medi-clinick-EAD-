import React, { useEffect, useState, createContext, useContext } from 'react';
import { users } from '../data/users';
type User = {
  id: string;
  username: string;
  name: string;
  role: 'pharmacist' | 'owner' | 'supplier' | 'admin';
  avatar?: string;
};
type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);
  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call with mock data
    return new Promise(resolve => {
      setTimeout(() => {
        // In a real app, you would hash the password and compare with the stored hash
        const foundUser = users.find(u => u.username === username && u.password === password);
        if (foundUser) {
          const {
            password,
            ...userWithoutPassword
          } = foundUser;
          setUser(userWithoutPassword);
          setIsAuthenticated(true);
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500); // Simulate network delay
    });
  };
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };
  return <AuthContext.Provider value={{
    user,
    login,
    logout,
    isAuthenticated
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};