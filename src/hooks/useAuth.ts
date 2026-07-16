import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type LoginFormData, type RegisterFormData, type AuthResponse } from '@/types/auth.types';

// Demo Credentials
const SUPER_ADMIN_CREDENTIALS = {
  email: 'admin@npgroup.com',
  password: 'admin123',
};

const GENERAL_MANAGER_CREDENTIALS = {
  email: 'manager@npgroup.com',
  password: 'manager123',
};

export const useAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginFormData): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check for Super Admin credentials
      const isSuperAdmin = 
        data.email === SUPER_ADMIN_CREDENTIALS.email && 
        data.password === SUPER_ADMIN_CREDENTIALS.password;

      // Check for General Manager credentials
      const isGeneralManager = 
        data.email === GENERAL_MANAGER_CREDENTIALS.email && 
        data.password === GENERAL_MANAGER_CREDENTIALS.password;

      let role = 'RESTAURANT_WAITER';
      let department = 'RESTAURANT';
      let redirectPath = '/login/home';

      if (isSuperAdmin) {
        role = 'SUPER_ADMIN';
        department = 'ADMIN';
        redirectPath = '/superadmin';
      } else if (isGeneralManager) {
        role = 'GENERAL_MANAGER';
        department = 'MANAGEMENT';
        redirectPath = '/generalmanager';
      }

      const response: AuthResponse = {
        success: true,
        message: 'Login successful',
        user: {
          id: isSuperAdmin ? 'sa-001' : isGeneralManager ? 'gm-001' : '1',
          name: isSuperAdmin ? 'Super Admin' : isGeneralManager ? 'John Manager' : 'John Doe',
          email: data.email,
          role: role,
          department: department,
        },
        token: 'mock-jwt-token',
      };

      // Store token and user
      localStorage.setItem('token', response.token || '');
      localStorage.setItem('user', JSON.stringify(response.user));

      // Redirect based on role
      navigate(redirectPath);
      return response;
    } catch (err) {
      const errorResponse: AuthResponse = {
        success: false,
        message: err instanceof Error ? err.message : 'Login failed',
      };
      setError(errorResponse.message);
      return errorResponse;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (_data: RegisterFormData): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const response: AuthResponse = {
        success: true,
        message: 'Account created successfully',
      };

      return response;
    } catch (err) {
      const errorResponse: AuthResponse = {
        success: false,
        message: err instanceof Error ? err.message : 'Registration failed',
      };
      setError(errorResponse.message);
      return errorResponse;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const googleLogin = async (): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate Google login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response: AuthResponse = {
        success: true,
        message: 'Google login successful',
        user: {
          id: '2',
          name: 'Google User',
          email: 'google.user@gmail.com',
          role: 'RESTAURANT_WAITER',
          department: 'RESTAURANT',
        },
        token: 'mock-google-jwt-token',
      };

      localStorage.setItem('token', response.token || '');
      localStorage.setItem('user', JSON.stringify(response.user));

      navigate('home');
      return response;
    } catch (err) {
      const errorResponse: AuthResponse = {
        success: false,
        message: err instanceof Error ? err.message : 'Google login failed',
      };
      setError(errorResponse.message);
      return errorResponse;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    register,
    logout,
    googleLogin,
    isLoading,
    error,
    setError,
    user: JSON.parse(localStorage.getItem('user') || 'null') as AuthResponse['user'] | null,
  };
};