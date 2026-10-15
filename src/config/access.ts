import type { OperatingDepartment, Role } from '@/types';
const GM: Role[] = ['GENERAL_MANAGER'];
const MANAGERS: Role[] = ['RESTAURANT_MANAGER', 'BAKERY_MANAGER', 'DECORATION_MANAGER'];
const STOCK: Role[] = ['RESTAURANT_STOCK_MANAGER', 'BAKERY_STOCK_MANAGER'];
const ORDER_CREATORS: Role[] = [
    'RESTAURANT_WAITER', 'RESTAURANT_CASHIER', 'RESTAURANT_BARISTA', 'BAKERY_CASHIER', 'DECORATION_CASHIER',
];
const INVENTORY_USERS: Role[] = [
    ...GM, ...MANAGERS, ...STOCK, 'RESTAURANT_CHEF_LEADER', 'RESTAURANT_CHEF',
    'BAKERY_BARISTA', 'BAKERY_CHEF', 'DECORATION_STAFF',
];

/** Who supervises each department's menu. GM and SUPER_ADMIN can manage all of them. */
export const MENU_SUPERVISORS: Record<OperatingDepartment, Role[]> = {
    RESTAURANT: ['RESTAURANT_MANAGER', 'RESTAURANT_CHEF_LEADER'],
    BAKERY: ['BAKERY_MANAGER', 'BAKERY_CHEF_LEADER'],
    DECORATION: ['DECORATION_MANAGER'],
};

/** Single source of truth for page-level RBAC. SUPER_ADMIN is always allowed. */
export const ACCESS = {
    orders: [...GM, ...MANAGERS, ...ORDER_CREATORS, 'RESTAURANT_WAITER_LEADER'] as Role[],
    createOrder: ORDER_CREATORS,
    inventory: INVENTORY_USERS,
    movements: [...GM, ...MANAGERS, ...STOCK],
    requisitions: INVENTORY_USERS,
    requisitionApprove: [...GM, ...MANAGERS, ...STOCK],
    suppliers: [...GM, ...STOCK, 'BAKERY_MANAGER'] as Role[],
    staff: [...GM, ...MANAGERS, 'RESTAURANT_WAITER_LEADER'] as Role[],
    credentials: GM,
    schedule: [...GM, ...MANAGERS],
    batches: [...GM, 'BAKERY_MANAGER', 'BAKERY_CHEF_LEADER', 'BAKERY_CHEF'] as Role[],
    kitchen: ['RESTAURANT_MANAGER', 'RESTAURANT_CHEF_LEADER', 'RESTAURANT_CHEF'] as Role[],
    tables: ['RESTAURANT_MANAGER', 'RESTAURANT_WAITER_LEADER', 'RESTAURANT_WAITER'] as Role[],
    menu: [...GM, ...Object.values(MENU_SUPERVISORS).flat()] as Role[],
    showroom: ['DECORATION_MANAGER', 'DECORATION_STAFF', 'DECORATION_CASHIER'] as Role[],
    gifts: ['DECORATION_MANAGER', 'DECORATION_STAFF', 'DECORATION_CASHIER'] as Role[],
    reports: [...GM, 'ACCOUNTANT', ...MANAGERS, 'RESTAURANT_STOCK_MANAGER'] as Role[],
    financial: [...GM, 'ACCOUNTANT'] as Role[],
    settingsGeneral: GM,
    settingsDepartment: [...GM, ...MANAGERS],
    communications: ['SUPER_ADMIN', ...GM] as Role[],
};

export const canManageMenu = (role: Role, dept: OperatingDepartment) =>
    role === 'SUPER_ADMIN' || role === 'GENERAL_MANAGER' || MENU_SUPERVISORS[dept].includes(role);