// types/superadmin.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  lastActive?: string;
}

export interface Business {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'pending';
  revenue: number;
  orders: number;
  manager: string;
  managerId: string;
  address: string;
  phone: string;
  email: string;
  createdAt: string;
  performance: {
    rating: number;
    completionRate: number;
    growthRate: number;
  };
}

export interface Activity {
  id: string;
  user: string;
  userId: string;
  action: string;
  description: string;
  time: string;
  timestamp: string;
  type: 'user' | 'business' | 'role' | 'report' | 'system' | 'financial';
  status?: 'success' | 'warning' | 'error' | 'info';
}

export interface Stats {
  totalUsers: number;
  activeUsers: number;
  totalBusinesses: number;
  activeBusinesses: number;
  totalRevenue: number;
  totalOrders: number;
  growth: number;
  pendingApprovals: number;
  recentSignups: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  timestamp: string;
}