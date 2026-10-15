export const ROLES = [
    'SUPER_ADMIN', 'GENERAL_MANAGER', 'ACCOUNTANT',
    'RESTAURANT_MANAGER', 'RESTAURANT_STOCK_MANAGER', 'RESTAURANT_CHEF_LEADER', 'RESTAURANT_CHEF',
    'RESTAURANT_WAITER_LEADER', 'RESTAURANT_WAITER', 'RESTAURANT_CASHIER', 'RESTAURANT_BARISTA',
    'BAKERY_MANAGER', 'BAKERY_STOCK_MANAGER', 'BAKERY_CASHIER', 'BAKERY_CHEF_LEADER',
    'BAKERY_CHEF', 'BAKERY_BARISTA',
    'DECORATION_MANAGER', 'DECORATION_CASHIER', 'DECORATION_STAFF',
] as const;

export type Role = (typeof ROLES)[number];
export type Department = 'MANAGEMENT' | 'RESTAURANT' | 'BAKERY' | 'DECORATION';
export type OperatingDepartment = Exclude<Department, 'MANAGEMENT'>;
export type OrderDepartment = OperatingDepartment | 'MIXED';

export interface User {
    id: string;
    fullName: string;
    credentialId: string;
    role: Role;
    department: Department;
}

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERING' | 'COMPLETED';
export type PaymentMethod = 'CASH' | 'CARD' | 'MOBILE_MONEY';

export interface OrderItem {
    productId: string;
    name: string;
    department: OperatingDepartment;
    qty: number;
    price: number;
}

export interface Order {
    id: string;
    customerName: string;
    phone: string;
    address?: string;
    department: OrderDepartment;
    status: OrderStatus;
    items: OrderItem[];
    total: number;
    paymentMethod: PaymentMethod;
    paymentStatus: 'PAID' | 'UNPAID';
    createdBy: string;
    createdAt: string;
    customization: Record<string, string>;
    history: { at: string; by: string; action: string }[];
}

export interface CreateOrderPayload {
    customerName: string;
    phone: string;
    address?: string;
    items: OrderItem[];
    paymentMethod: PaymentMethod;
    paymentStatus: 'PAID' | 'UNPAID';
    customization: Record<string, string>;
    createdBy: string;
}

export interface Customer { id: string; name: string; phone: string; address: string }
export interface CatalogProduct {
    id: string; name: string; department: OperatingDepartment; category: string; price: number;
}

export type InventoryStatus = 'AVAILABLE' | 'LOW_STOCK' | 'CRITICAL' | 'OUT_OF_STOCK' | 'EXPIRED';

export interface InventoryItem {
    id: string;
    name: string;
    category: string;
    department: OperatingDepartment;
    quantity: number;
    unit: string;
    minStock: number;
    expiryDate?: string;
    displayLocation?: string;
}

export type MovementType = 'PURCHASE' | 'TRANSFER_IN' | 'TRANSFER_OUT' | 'PRODUCTION_USAGE' | 'SOLD' | 'WASTED';

export interface StockMovement {
    id: string; date: string; product: string; quantity: number;
    type: MovementType; department: OperatingDepartment; user: string;
}

export interface Requisition {
    id: string; department: OperatingDepartment; item: string; quantity: number;
    priority: 'LOW' | 'MEDIUM' | 'HIGH'; reason: string; requiredDate: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface Supplier {
    id: string; name: string; contact: string; products: string; lastPurchase: string;
    paymentStatus: 'PAID' | 'UNPAID';
}

export type StaffStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'ON_LEAVE';

export interface StaffMember {
    id: string; fullName: string; phone: string; email: string;
    department: Department; role: Role; status: StaffStatus; credentialId: string;
}

export interface Shift {
    id: string; staffId: string; staffName: string; department: Department;
    day: number; start: string; end: string; shiftDate?: string;
}

export interface CreateShiftPayload {
    userId: string;
    shiftDate: string;
    startTime: string;
    endTime: string;
}

export type BatchStatus = 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'EXPIRED';
export interface ProductionBatch {
    id: string; product: string; quantity: number; ingredients: string;
    producedAt: string; expiresAt: string; status: BatchStatus;
}

export type TableStatus = 'AVAILABLE' | 'OCCUPIED' | 'RESERVED' | 'CLEANING';
export interface TableItem { id: string; number: string; seats: number; status: TableStatus }

export type KitchenStatus = 'NEW' | 'PREPARING' | 'READY' | 'SERVED';
export interface KitchenTicket {
    id: string; orderId: string; table: string; items: string[]; status: KitchenStatus; createdAt: string;
}

export interface MenuItem { id: string; name: string; category: string; price: number; available: boolean }

export interface GiftRequest {
    id: string; customer: string; instructions: string; delivery: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface DashboardData {
    title: string;
    stats: { label: string; value: string; hint?: string }[];
    trend: { title: string; data: { name: string; value: number }[] };
    breakdown: { title: string; data: { name: string; value: number }[] };
    alerts: string[];
}

export interface RevenueRow {
    month: string; restaurant: number; bakery: number; decoration: number; expenses: number;
}

export interface AppNotification {
    id: string; type: 'ORDER' | 'INVENTORY' | 'PRODUCTION' | 'STAFF' | 'SYSTEM';
    title: string; message: string; createdAt: string;
}