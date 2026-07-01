import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type LoginFormData, type RegisterFormData, type AuthResponse } from '@/types/auth.types';

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
      
      // Mock successful login
      const response: AuthResponse = {
        success: true,
        message: 'Login successful',
        user: {
          id: '1',
          name: 'John Doe',
          email: data.email,
          role: 'RESTAURANT_WAITER',
          department: 'RESTAURANT',
        },
        token: 'mock-jwt-token',
      };

      // Store token
      localStorage.setItem('token', response.token || '');
      localStorage.setItem('user', JSON.stringify(response.user));

      navigate('home');
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

  const register = async (data: RegisterFormData): Promise<AuthResponse> => {
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