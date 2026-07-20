export interface Business {
  id: string;
  name: string;
  type: 'restaurant' | 'bakery' | 'decoration' | 'mixed';
  status: 'active' | 'inactive' | 'suspended';
  location: string;
  managerId?: string;
  managerName?: string;
  staffCount: number;
  revenue: number;
  orders: number;
  rating: number;
  joinedDate: string;
  lastActive: string;
  settings: {
    operatingHours: string;
    deliveryRadius: number;
    deliveryFee: number;
  };
}

export interface Manager {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessId: string;
  businessName: string;
  role: string;
  status: 'active' | 'inactive';
  assignedDate: string;
  lastLogin?: string;
  permissions: string[];
  avatar?: string;
}

export interface Role {
  id: string;
  name: string;
  displayName: string;
  type: 'business' | 'department' | 'system';
  level: 'system' | 'general' | 'department';
  department?: 'restaurant' | 'bakery' | 'decoration';
  description: string;
  responsibilities: string[];
  keyPages: string[];
  permissions: string[];
  canView: string[];
  canCreate: string[];
  canEdit: string[];
  canDelete: string[];
  businessId?: string;
  assignedCount: number;
  createdAt: string;
}

export interface BusinessReport {
  id: string;
  businessId: string;
  businessName: string;
  period: string;
  revenue: {
    total: number;
    growth: number;
    breakdown: Record<string, number>;
  };
  orders: {
    total: number;
    growth: number;
    average: number;
  };
  staff: {
    total: number;
    active: number;
    turnover: number;
  };
  performance: {
    rating: number;
    completedOrders: number;
    cancelledOrders: number;
    avgPreparationTime: number;
  };
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  businessId: string;
  businessName: string;
  action: string;
  details: string;
  timestamp: string;
  type: 'business' | 'manager' | 'role' | 'report' | 'system';
}

export interface GeneralStats {
  totalBusinesses: number;
  activeBusinesses: number;
  totalManagers: number;
  activeManagers: number;
  totalRevenue: number;
  totalOrders: number;
  growthRate: number;
  businesses: Business[];
  recentActivity: ActivityLog[];
  performance: {
    avgRating: number;
    completionRate: number;
    growthRate: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  joinedDate: string;
  lastLogin?: string;
  avatar?: string;
  job?: string;
}

export interface RoleAssignment {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  businessId: string;
  businessName: string;
  roleId: string;
  roleName: string;
  roleLevel: 'system' | 'general' | 'department';
  department?: 'restaurant' | 'bakery' | 'decoration';
  assignedBy: string;
  assignedDate: string;
  status: 'active' | 'inactive';
  canAssignRoles: boolean; // true if this user can assign sub-roles
  assignableRoles: string[]; // list of role IDs this user can assign
}

export interface RoleAssignmentLog {
  id: string;
  assignmentId: string;
  action: 'created' | 'updated' | 'deleted' | 'suspended' | 'reactivated';
  performedBy: string;
  performedByRole: string;
  timestamp: string;
  changes: string;
}