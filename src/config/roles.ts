import type { Department, OperatingDepartment, Role } from '@/types';

export const ROLES_BY_DEPARTMENT: Record<Department, Role[]> = {
    MANAGEMENT: ['SUPER_ADMIN', 'GENERAL_MANAGER', 'ACCOUNTANT'],
    // Keep creation options aligned with the backend POST /staff enum.
    RESTAURANT: [
        'RESTAURANT_STOCK_MANAGER', 'RESTAURANT_CHEF_LEADER', 'RESTAURANT_CHEF',
        'RESTAURANT_WAITER_LEADER', 'RESTAURANT_WAITER', 'RESTAURANT_CASHIER', 'RESTAURANT_BARISTA',
    ],
    BAKERY: [
        'BAKERY_STOCK_MANAGER', 'BAKERY_CASHIER', 'BAKERY_CHEF_LEADER',
        'BAKERY_CHEF', 'BAKERY_BARISTA',
    ],
    DECORATION: ['DECORATION_CASHIER', 'DECORATION_STAFF'],
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