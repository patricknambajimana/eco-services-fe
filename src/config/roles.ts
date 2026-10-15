import { ROLES } from '@/types';
import type { Department, OperatingDepartment, Role } from '@/types';

export const ROLES_BY_DEPARTMENT: Record<Department, Role[]> = {
    MANAGEMENT: ['SUPER_ADMIN', 'GENERAL_MANAGER', 'ACCOUNTANT'],
    RESTAURANT: ROLES.filter((r) => r.startsWith('RESTAURANT_')),
    BAKERY: ROLES.filter((r) => r.startsWith('BAKERY_')),
    DECORATION: ROLES.filter((r) => r.startsWith('DECORATION_')),
};

export const DEPARTMENT_OPTIONS: { value: Department; label: string }[] = [
    { value: 'MANAGEMENT', label: 'Management' },
    { value: 'RESTAURANT', label: 'Restaurant' },
    { value: 'BAKERY', label: 'Bakery' },
    { value: 'DECORATION', label: 'Decoration' },
];

export const OPERATING_DEPARTMENTS: OperatingDepartment[] = ['RESTAURANT', 'BAKERY', 'DECORATION'];

export const roleLabel = (role: string) =>
    role.split('_').map((w) => w[0] + w.slice(1).toLowerCase()).join(' ');

/** SUPER_ADMIN can open everything. */
export const canAccess = (role: Role, allowed: Role[]) =>
    role === 'SUPER_ADMIN' || allowed.includes(role);