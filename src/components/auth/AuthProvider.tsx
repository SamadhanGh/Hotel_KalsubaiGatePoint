import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '../../utils/authApi';

interface User {
  id: number;
  username: string;
  email: string;
  roles: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (userData: any) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing authentication on app load
    const initAuth = () => {
      try {
        const currentUser = authApi.getCurrentUser();
        if (currentUser && authApi.isAuthenticated()) {
          setUser(currentUser.user);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        authApi.logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = (userData: any) => {
    setUser(userData.user);
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.roles?.includes('ROLE_ADMIN') || false,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};