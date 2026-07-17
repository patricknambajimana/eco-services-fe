export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  department: string;
  role: string;
  agreeTerms: boolean;
}

export interface Department {
  value: string;
  label: string;
  icon: string;
}

export interface Role {
  value: string;
  label: string;
  department: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
    department: string;
  };
  token?: string;
}

export type EntityStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'ON_LEAVE';