import { useState, useCallback } from 'react';
import type { RoleAssignment, RoleAssignmentLog, User } from '@/types/general.types';
import { useAuth } from './useAuth';
import { getRoleById, getRolesByDepartment } from '@/constants/roles.constant';

// Mock data
const MOCK_ROLE_ASSIGNMENTS: RoleAssignment[] = [
  {
    id: 'ra1',
    userId: 'u1',
    userName: 'John Smith',
    userEmail: 'john@example.com',
    businessId: 'b1',
    businessName: 'Downtown Bistro',
    roleId: 'RESTAURANT_CHEF_LEADER',
    roleName: 'Chef Leader',
    roleLevel: 'department',
    department: 'restaurant',
    assignedBy: 'admin@npgroup.com',
    assignedDate: '2026-01-15',
    status: 'active',
    canAssignRoles: true,
    assignableRoles: [
      'RESTAURANT_CHEF',
      'RESTAURANT_WAITER',
      'RESTAURANT_WAITER_LEADER',
      'RESTAURANT_CASHIER',
      'RESTAURANT_BARISTA',
      'RESTAURANT_STOCK_MANAGER',
    ],
  },
  {
    id: 'ra2',
    userId: 'u2',
    userName: 'Sarah Johnson',
    userEmail: 'sarah@example.com',
    businessId: 'b2',
    businessName: 'Artisan Bakery',
    roleId: 'BAKERY_MANAGER',
    roleName: 'Bakery Manager',
    roleLevel: 'department',
    department: 'bakery',
    assignedBy: 'admin@npgroup.com',
    assignedDate: '2025-03-01',
    status: 'active',
    canAssignRoles: true,
    assignableRoles: [
      'BAKERY_CHEF',
      'BAKERY_CHEF_LEADER',
      'BAKERY_STOCK_MANAGER',
      'BAKERY_CASHIER',
      'BAKERY_BARISTA',
    ],
  },
];

const MOCK_ASSIGNMENT_LOG: RoleAssignmentLog[] = [
  {
    id: 'log1',
    assignmentId: 'ra1',
    action: 'created',
    performedBy: 'admin@npgroup.com',
    performedByRole: 'SUPER_ADMIN',
    timestamp: '2026-01-15 10:30:00',
    changes: 'Role assigned: RESTAURANT_CHEF_LEADER to John Smith',
  },
];

const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1-555-0101',
    status: 'active',
    joinedDate: '2025-01-10',
    lastLogin: '2026-06-30 14:30',
    job: 'Chef',
  },
  {
    id: 'u2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1-555-0102',
    status: 'active',
    joinedDate: '2025-03-01',
    lastLogin: '2026-06-30 15:45',
    job: 'Baker',
  },
  {
    id: 'u3',
    name: 'Michael Davis',
    email: 'michael@example.com',
    phone: '+1-555-0103',
    status: 'active',
    joinedDate: '2025-06-15',
    lastLogin: '2026-06-30 13:20',
    job: 'Waiter',
  },
  {
    id: 'u4',
    name: 'Emily Wilson',
    email: 'emily@example.com',
    phone: '+1-555-0104',
    status: 'active',
    joinedDate: '2026-01-20',
    lastLogin: '2026-06-30 16:00',
    job: 'Pastry Chef',
  },
];

export const useRoleAssignment = () => {
  const { user } = useAuth();
  const [roleAssignments, setRoleAssignments] = useState<RoleAssignment[]>(MOCK_ROLE_ASSIGNMENTS);
  const [assignmentLog, setAssignmentLog] = useState<RoleAssignmentLog[]>(MOCK_ASSIGNMENT_LOG);
  const [users] = useState<User[]>(MOCK_USERS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if current user can assign a specific role
  const canAssignRole = useCallback(
    (roleId: string, targetBusinessId?: string): boolean => {
      if (!user) return false;

      // Super Admin can assign all roles
      if (user.role === 'SUPER_ADMIN') return true;

      // General Manager can assign manager/owner roles to businesses
      if (user.role === 'GENERAL_MANAGER') {
        const role = getRoleById(roleId);
        return role?.level === 'general' || role?.level === 'department';
      }

      // Business managers can assign roles within their business
      const userAssignment = roleAssignments.find(
        (ra) => ra.userId === user.id && ra.businessId === targetBusinessId
      );

      if (!userAssignment || !userAssignment.canAssignRoles) return false;

      return userAssignment.assignableRoles.includes(roleId);
    },
    [user, roleAssignments]
  );

  // Get assignable roles based on user level
  const getAssignableRoles = useCallback(
    (targetBusinessId?: string): string[] => {
      if (!user) return [];

      if (user.role === 'SUPER_ADMIN') {
        // Super Admin can assign manager roles
        return [
          'RESTAURANT_MANAGER',
          'BAKERY_MANAGER',
          'DECORATION_MANAGER',
          'GENERAL_MANAGER',
        ];
      }

      if (user.role === 'GENERAL_MANAGER') {
        // General Manager can assign manager roles for each department
        return [
          'RESTAURANT_MANAGER',
          'BAKERY_MANAGER',
          'DECORATION_MANAGER',
        ];
      }

      // Get roles assignable by business manager
      const userAssignment = roleAssignments.find(
        (ra) => ra.userId === user.id && ra.businessId === targetBusinessId
      );

      return userAssignment?.assignableRoles || [];
    },
    [user, roleAssignments]
  );

  // CREATE: Assign role to user
  const assignRoleToUser = useCallback(
    async (data: {
      userId: string;
      businessId: string;
      roleId: string;
    }): Promise<{ success: boolean; assignment?: RoleAssignment; error?: string }> => {
      setIsLoading(true);
      setError(null);

      try {
        if (!user) throw new Error('User not authenticated');
        if (!canAssignRole(data.roleId, data.businessId)) {
          throw new Error('You do not have permission to assign this role');
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const targetUser = users.find((u) => u.id === data.userId);
        const role = getRoleById(data.roleId);

        if (!targetUser || !role) {
          throw new Error('User or role not found');
        }

        const newAssignment: RoleAssignment = {
          id: `ra${roleAssignments.length + 1}`,
          userId: data.userId,
          userName: targetUser.name,
          userEmail: targetUser.email,
          businessId: data.businessId,
          businessName: `Business ${data.businessId}`,
          roleId: data.roleId,
          roleName: role.displayName,
          roleLevel: role.level,
          department: role.department,
          assignedBy: user.email || '',
          assignedDate: new Date().toISOString().split('T')[0],
          status: 'active',
          canAssignRoles: role.level === 'department',
          assignableRoles: role.level === 'department' ? getRolesByDepartment(role.department || '').map((r) => r.id) : [],
        };

        setRoleAssignments([...roleAssignments, newAssignment]);

        // Log the assignment
        const logEntry: RoleAssignmentLog = {
          id: `log${assignmentLog.length + 1}`,
          assignmentId: newAssignment.id,
          action: 'created',
          performedBy: user.email || 'system',
          performedByRole: user.role || 'UNKNOWN',
          timestamp: new Date().toISOString().replace('T', ' ').split('.')[0],
          changes: `Assigned ${role.displayName} to ${targetUser.name}`,
        };
        setAssignmentLog([...assignmentLog, logEntry]);

        return { success: true, assignment: newAssignment };
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to assign role';
        setError(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setIsLoading(false);
      }
    },
    [user, canAssignRole, users, roleAssignments, assignmentLog]
  );

  // READ: Get assignments by business
  const getAssignmentsByBusiness = useCallback(
    (businessId: string): RoleAssignment[] => {
      return roleAssignments.filter((ra) => ra.businessId === businessId);
    },
    [roleAssignments]
  );

  // READ: Get assignments by user
  const getAssignmentsByUser = useCallback(
    (userId: string): RoleAssignment[] => {
      return roleAssignments.filter((ra) => ra.userId === userId);
    },
    [roleAssignments]
  );

  // UPDATE: Update role assignment
  const updateRoleAssignment = useCallback(
    async (id: string, data: Partial<RoleAssignment>): Promise<{ success: boolean; error?: string }> => {
      setIsLoading(true);
      setError(null);

      try {
        if (!user) throw new Error('User not authenticated');

        const assignment = roleAssignments.find((ra) => ra.id === id);
        if (!assignment) throw new Error('Assignment not found');

        if (!canAssignRole(assignment.roleId, assignment.businessId)) {
          throw new Error('You do not have permission to modify this assignment');
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setRoleAssignments(
          roleAssignments.map((ra) =>
            ra.id === id ? { ...ra, ...data } : ra
          )
        );

        const logEntry: RoleAssignmentLog = {
          id: `log${assignmentLog.length + 1}`,
          assignmentId: id,
          action: 'updated',
          performedBy: user.email || 'system',
          performedByRole: user.role || 'UNKNOWN',
          timestamp: new Date().toISOString().replace('T', ' ').split('.')[0],
          changes: JSON.stringify(data),
        };
        setAssignmentLog([...assignmentLog, logEntry]);

        return { success: true };
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to update assignment';
        setError(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setIsLoading(false);
      }
    },
    [user, canAssignRole, roleAssignments, assignmentLog]
  );

  // DELETE: Revoke role assignment
  const revokeRoleAssignment = useCallback(
    async (id: string): Promise<{ success: boolean; error?: string }> => {
      setIsLoading(true);
      setError(null);

      try {
        if (!user) throw new Error('User not authenticated');

        const assignment = roleAssignments.find((ra) => ra.id === id);
        if (!assignment) throw new Error('Assignment not found');

        if (!canAssignRole(assignment.roleId, assignment.businessId)) {
          throw new Error('You do not have permission to revoke this role');
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setRoleAssignments(roleAssignments.filter((ra) => ra.id !== id));

        const logEntry: RoleAssignmentLog = {
          id: `log${assignmentLog.length + 1}`,
          assignmentId: id,
          action: 'deleted',
          performedBy: user.email || 'system',
          performedByRole: user.role || 'UNKNOWN',
          timestamp: new Date().toISOString().replace('T', ' ').split('.')[0],
          changes: `Revoked ${assignment.roleName} from ${assignment.userName}`,
        };
        setAssignmentLog([...assignmentLog, logEntry]);

        return { success: true };
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to revoke role';
        setError(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setIsLoading(false);
      }
    },
    [user, canAssignRole, roleAssignments, assignmentLog]
  );

  // SUSPEND: Suspend role assignment
  const suspendRoleAssignment = useCallback(
    async (id: string): Promise<{ success: boolean; error?: string }> => {
      setIsLoading(true);
      setError(null);

      try {
        if (!user) throw new Error('User not authenticated');

        const assignment = roleAssignments.find((ra) => ra.id === id);
        if (!assignment) throw new Error('Assignment not found');

        if (!canAssignRole(assignment.roleId, assignment.businessId)) {
          throw new Error('You do not have permission to suspend this assignment');
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setRoleAssignments(
          roleAssignments.map((ra) =>
            ra.id === id ? { ...ra, status: 'inactive' } : ra
          )
        );

        const logEntry: RoleAssignmentLog = {
          id: `log${assignmentLog.length + 1}`,
          assignmentId: id,
          action: 'suspended',
          performedBy: user.email || 'system',
          performedByRole: user.role || 'UNKNOWN',
          timestamp: new Date().toISOString().replace('T', ' ').split('.')[0],
          changes: `Suspended ${assignment.roleName}`,
        };
        setAssignmentLog([...assignmentLog, logEntry]);

        return { success: true };
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to suspend assignment';
        setError(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setIsLoading(false);
      }
    },
    [user, canAssignRole, roleAssignments, assignmentLog]
  );

  return {
    roleAssignments,
    assignmentLog,
    users,
    isLoading,
    error,
    canAssignRole,
    getAssignableRoles,
    assignRoleToUser,
    getAssignmentsByBusiness,
    getAssignmentsByUser,
    updateRoleAssignment,
    revokeRoleAssignment,
    suspendRoleAssignment,
  };
};
