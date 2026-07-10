import { useState, useMemo } from 'react';
import type { Business, Manager, Role, ActivityLog, GeneralStats } from '../types/general.types';
import { ALL_ROLES } from '@/constants/roles.constant';

// Mock Data
const MOCK_BUSINESSES: Business[] = [
  {
    id: '1',
    name: 'Downtown Bistro',
    type: 'restaurant',
    status: 'active',
    location: '123 Main St, City',
    managerId: 'm1',
    managerName: 'John Smith',
    staffCount: 15,
    revenue: 12430,
    orders: 156,
    rating: 4.8,
    joinedDate: '2025-01-15',
    lastActive: '2026-06-30 14:30',
    settings: {
      operatingHours: '9:00 AM - 11:00 PM',
      deliveryRadius: 5,
      deliveryFee: 2.99,
    },
  },
  {
    id: '2',
    name: 'Artisan Bakery',
    type: 'bakery',
    status: 'active',
    location: '456 Oak Ave, City',
    managerId: 'm2',
    managerName: 'Sarah Johnson',
    staffCount: 8,
    revenue: 2890,
    orders: 78,
    rating: 4.9,
    joinedDate: '2025-03-01',
    lastActive: '2026-06-30 16:45',
    settings: {
      operatingHours: '7:00 AM - 8:00 PM',
      deliveryRadius: 3,
      deliveryFee: 1.99,
    },
  },
  {
    id: '3',
    name: 'Elegant Decor',
    type: 'decoration',
    status: 'active',
    location: '789 Pine St, City',
    managerId: 'm3',
    managerName: 'Emily Davis',
    staffCount: 5,
    revenue: 1110,
    orders: 33,
    rating: 4.7,
    joinedDate: '2025-06-10',
    lastActive: '2026-06-30 10:20',
    settings: {
      operatingHours: '10:00 AM - 9:00 PM',
      deliveryRadius: 20,
      deliveryFee: 5.99,
    },
  },
  {
    id: '4',
    name: 'Grand Plaza',
    type: 'mixed',
    status: 'active',
    location: '101 Plaza Blvd, City',
    managerId: 'm4',
    managerName: 'Robert Wilson',
    staffCount: 25,
    revenue: 21560,
    orders: 234,
    rating: 4.6,
    joinedDate: '2024-09-01',
    lastActive: '2026-06-30 12:10',
    settings: {
      operatingHours: '8:00 AM - 10:00 PM',
      deliveryRadius: 10,
      deliveryFee: 3.99,
    },
  },
  {
    id: '5',
    name: 'Coffee & Pastry',
    type: 'bakery',
    status: 'inactive',
    location: '222 Coffee Ln, City',
    managerId: 'm5',
    managerName: 'Lisa Park',
    staffCount: 0,
    revenue: 0,
    orders: 0,
    rating: 0,
    joinedDate: '2025-11-15',
    lastActive: '2026-05-15 09:00',
    settings: {
      operatingHours: '7:00 AM - 6:00 PM',
      deliveryRadius: 3,
      deliveryFee: 1.99,
    },
  },
];

const MOCK_MANAGERS: Manager[] = [
  {
    id: 'm1',
    name: 'John Smith',
    email: 'john@downtownbistro.com',
    phone: '+1 234-567-8901',
    businessId: '1',
    businessName: 'Downtown Bistro',
    role: 'RESTAURANT_MANAGER',
    status: 'active',
    assignedDate: '2025-01-15',
    lastLogin: '2026-06-30 14:30',
    permissions: ['manage_staff', 'manage_inventory', 'view_reports', 'manage_orders'],
  },
  {
    id: 'm2',
    name: 'Sarah Johnson',
    email: 'sarah@artisanbakery.com',
    phone: '+1 234-567-8902',
    businessId: '2',
    businessName: 'Artisan Bakery',
    role: 'BAKERY_MANAGER',
    status: 'active',
    assignedDate: '2025-03-01',
    lastLogin: '2026-06-30 16:45',
    permissions: ['manage_staff', 'manage_inventory', 'view_reports', 'manage_production'],
  },
  {
    id: 'm3',
    name: 'Emily Davis',
    email: 'emily@elegantdecor.com',
    phone: '+1 234-567-8903',
    businessId: '3',
    businessName: 'Elegant Decor',
    role: 'DECORATION_MANAGER',
    status: 'active',
    assignedDate: '2025-06-10',
    lastLogin: '2026-06-30 10:20',
    permissions: ['manage_staff', 'manage_inventory', 'view_reports', 'manage_showroom'],
  },
  {
    id: 'm4',
    name: 'Robert Wilson',
    email: 'robert@grandplaza.com',
    phone: '+1 234-567-8904',
    businessId: '4',
    businessName: 'Grand Plaza',
    role: 'GENERAL_MANAGER',
    status: 'active',
    assignedDate: '2024-09-01',
    lastLogin: '2026-06-30 12:10',
    permissions: ['manage_all', 'view_reports', 'manage_staff', 'manage_inventory'],
  },
  {
    id: 'm5',
    name: 'Lisa Park',
    email: 'lisa@coffeepastry.com',
    phone: '+1 234-567-8905',
    businessId: '5',
    businessName: 'Coffee & Pastry',
    role: 'BAKERY_MANAGER',
    status: 'inactive',
    assignedDate: '2025-11-15',
    lastLogin: '2026-05-15 09:00',
    permissions: ['manage_staff', 'manage_inventory', 'view_reports'],
  },
];

const MOCK_ROLES: Role[] = ALL_ROLES.map((roleDefn, idx) => ({
  id: roleDefn.id,
  name: roleDefn.name,
  displayName: roleDefn.displayName,
  type: roleDefn.level === 'system' || roleDefn.level === 'general' ? 'system' : 'business',
  level: roleDefn.level,
  department: roleDefn.department,
  description: roleDefn.description,
  responsibilities: roleDefn.responsibilities,
  keyPages: roleDefn.keyPages,
  permissions: roleDefn.permissions,
  canView: roleDefn.canView,
  canCreate: roleDefn.canCreate,
  canEdit: roleDefn.canEdit,
  canDelete: roleDefn.canDelete,
  assignedCount: idx < 4 ? 2 : idx < 8 ? 1 : 0,
  createdAt: '2025-01-01',
}));

const MOCK_ACTIVITY: ActivityLog[] = [
  {
    id: 'a1',
    userId: 'm1',
    userName: 'John Smith',
    userRole: 'RESTAURANT_MANAGER',
    businessId: '1',
    businessName: 'Downtown Bistro',
    action: 'Staff Added',
    details: 'Added new waiter: Michael Johnson',
    timestamp: '2026-06-30 14:30:00',
    type: 'business',
  },
  {
    id: 'a2',
    userId: 'm2',
    userName: 'Sarah Johnson',
    userRole: 'BAKERY_MANAGER',
    businessId: '2',
    businessName: 'Artisan Bakery',
    action: 'Production Batch',
    details: 'Created croissant batch #CROISSANT-20260630-MORNING',
    timestamp: '2026-06-30 14:20:00',
    type: 'business',
  },
  {
    id: 'a3',
    userId: 'gm1',
    userName: 'Robert Chen',
    userRole: 'SUPER_ADMIN',
    businessId: '4',
    businessName: 'Grand Plaza',
    action: 'Manager Assigned',
    details: 'Assigned Robert Wilson as General Manager',
    timestamp: '2026-06-30 13:45:00',
    type: 'manager',
  },
  {
    id: 'a4',
    userId: 'm3',
    userName: 'Emily Davis',
    userRole: 'DECORATION_MANAGER',
    businessId: '3',
    businessName: 'Elegant Decor',
    action: 'Inventory Update',
    details: 'Added 15 new decorative vases to inventory',
    timestamp: '2026-06-30 12:30:00',
    type: 'business',
  },
  {
    id: 'a5',
    userId: 'gm1',
    userName: 'Robert Chen',
    userRole: 'SUPER_ADMIN',
    businessId: '1',
    businessName: 'Downtown Bistro',
    action: 'Role Updated',
    details: 'Updated permissions for Restaurant Manager role',
    timestamp: '2026-06-30 11:15:00',
    type: 'role',
  },
];

export const useGeneralManager = () => {
  const [businesses, setBusinesses] = useState<Business[]>(MOCK_BUSINESSES);
  const [managers, setManagers] = useState<Manager[]>(MOCK_MANAGERS);
  const [roles, setRoles] = useState<Role[]>(MOCK_ROLES);
  const [_activity] = useState<ActivityLog[]>(MOCK_ACTIVITY);
  const [isLoading, setIsLoading] = useState(false);

  const stats = useMemo<GeneralStats>(() => {
    const activeBusinesses = businesses.filter(b => b.status === 'active').length;
    const activeManagers = managers.filter(m => m.status === 'active').length;
    const totalRevenue = businesses.reduce((sum, b) => sum + b.revenue, 0);
    const totalOrders = businesses.reduce((sum, b) => sum + b.orders, 0);
    
    const avgRating = businesses
      .filter(b => b.rating > 0)
      .reduce((sum, b) => sum + b.rating, 0) / businesses.filter(b => b.rating > 0).length || 0;

    return {
      totalBusinesses: businesses.length,
      activeBusinesses,
      totalManagers: managers.length,
      activeManagers,
      totalRevenue,
      totalOrders,
      growthRate: 15.2,
      businesses,
      recentActivity: _activity.slice(0, 10),
      performance: {
        avgRating,
        completionRate: 92.4,
        growthRate: 15.2,
      },
    };
  }, [businesses, managers, _activity]);

  // Business Management
  const createBusiness = async (data: Partial<Business>) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newBusiness: Business = {
        id: String(businesses.length + 1),
        name: data.name || '',
        type: data.type || 'restaurant',
        status: data.status || 'active',
        location: data.location || '',
        managerId: data.managerId,
        managerName: managers.find(m => m.id === data.managerId)?.name,
        staffCount: 0,
        revenue: 0,
        orders: 0,
        rating: 0,
        joinedDate: new Date().toISOString().split('T')[0],
        lastActive: new Date().toISOString(),
        settings: {
          operatingHours: data.settings?.operatingHours || '9:00 AM - 9:00 PM',
          deliveryRadius: data.settings?.deliveryRadius || 5,
          deliveryFee: data.settings?.deliveryFee || 2.99,
        },
      };
      setBusinesses([...businesses, newBusiness]);
      return { success: true, business: newBusiness };
    } catch (error) {
      return { success: false, error: 'Failed to create business' };
    } finally {
      setIsLoading(false);
    }
  };

  const updateBusiness = async (id: string, data: Partial<Business>) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setBusinesses(businesses.map(b => 
        b.id === id ? { ...b, ...data, managerName: data.managerId ? managers.find(m => m.id === data.managerId)?.name : b.managerName } : b
      ));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to update business' };
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBusiness = async (id: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setBusinesses(businesses.filter(b => b.id !== id));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to delete business' };
    } finally {
      setIsLoading(false);
    }
  };

  // Manager Management
  const createManager = async (data: Partial<Manager>) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newManager: Manager = {
        id: String(managers.length + 1),
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
        businessId: data.businessId || '',
        businessName: businesses.find(b => b.id === data.businessId)?.name || '',
        role: data.role || '',
        status: data.status || 'active',
        assignedDate: new Date().toISOString().split('T')[0],
        permissions: data.permissions || [],
      };
      setManagers([...managers, newManager]);
      
      // Update business with manager
      if (data.businessId) {
        await updateBusiness(data.businessId, { managerId: newManager.id });
      }
      
      return { success: true, manager: newManager };
    } catch (error) {
      return { success: false, error: 'Failed to create manager' };
    } finally {
      setIsLoading(false);
    }
  };

  const updateManager = async (id: string, data: Partial<Manager>) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setManagers(managers.map(m => 
        m.id === id ? { ...m, ...data, businessName: data.businessId ? (businesses.find(b => b.id === data.businessId)?.name || m.businessName) : m.businessName } : m
      ));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to update manager' };
    } finally {
      setIsLoading(false);
    }
  };

  const deleteManager = async (id: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setManagers(managers.filter(m => m.id !== id));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to delete manager' };
    } finally {
      setIsLoading(false);
    }
  };

  // Role Management
  const createRole = async (data: Partial<Role>) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newRole: Role = {
        id: String(roles.length + 1),
        name: data.name || '',
        displayName: data.displayName || data.name || '',
        type: data.type || 'department',
        level: data.level || 'department',
        department: data.department,
        description: data.description || '',
        responsibilities: data.responsibilities || [],
        keyPages: data.keyPages || [],
        permissions: data.permissions || [],
        canView: data.canView || [],
        canCreate: data.canCreate || [],
        canEdit: data.canEdit || [],
        canDelete: data.canDelete || [],
        businessId: data.businessId,
        assignedCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setRoles([...roles, newRole]);
      return { success: true, role: newRole };
    } catch (error) {
      return { success: false, error: 'Failed to create role' };
    } finally {
      setIsLoading(false);
    }
  };

  const updateRole = async (id: string, data: Partial<Role>) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRoles(roles.map(r => r.id === id ? { ...r, ...data } : r));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to update role' };
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRole = async (id: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRoles(roles.filter(r => r.id !== id));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to delete role' };
    } finally {
      setIsLoading(false);
    }
  };

  const assignRoleToManager = async (managerId: string, roleId: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const role = roles.find(r => r.id === roleId);
      if (!role) throw new Error('Role not found');
      
      setManagers(managers.map(m => 
        m.id === managerId ? { ...m, role: role.name, permissions: role.permissions } : m
      ));
      
      setRoles(roles.map(r => 
        r.id === roleId ? { ...r, assignedCount: r.assignedCount + 1 } : r
      ));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to assign role' };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    businesses,
    managers,
    roles,
    stats,
    isLoading,
    createBusiness,
    updateBusiness,
    deleteBusiness,
    createManager,
    updateManager,
    deleteManager,
    createRole,
    updateRole,
    deleteRole,
    assignRoleToManager,
  };
};