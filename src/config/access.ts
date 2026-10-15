import type { Role } from '@/types';

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
    menu: ['RESTAURANT_MANAGER', 'RESTAURANT_CHEF_LEADER'] as Role[],
    showroom: ['DECORATION_MANAGER', 'DECORATION_STAFF', 'DECORATION_CASHIER'] as Role[],
    gifts: ['DECORATION_MANAGER', 'DECORATION_STAFF', 'DECORATION_CASHIER'] as Role[],
    reports: [...GM, 'ACCOUNTANT', ...MANAGERS, 'RESTAURANT_STOCK_MANAGER'] as Role[],
    financial: [...GM, 'ACCOUNTANT'] as Role[],
    settingsGeneral: GM,
    settingsDepartment: [...GM, ...MANAGERS],
};