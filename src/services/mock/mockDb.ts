import type {
    AppNotification, CatalogProduct, Customer, DashboardData, Department, GiftRequest,
    InventoryItem, KitchenTicket, MenuItem, Order, ProductionBatch, Requisition, RevenueRow,
    Shift, StaffMember, StockMovement, Supplier, TableItem, User,
} from '@/types';

const now = () => new Date().toISOString();
const ago = (days: number) => new Date(Date.now() - days * 86_400_000).toISOString();
const inDays = (n: number) => new Date(Date.now() + n * 86_400_000).toISOString().slice(0, 10);

export const users: (User & { password: string })[] = [
    { id: 'u1', fullName: 'Alice Admin', credentialId: 'ADMIN001', password: 'admin123', role: 'SUPER_ADMIN', department: 'MANAGEMENT' },
    { id: 'u2', fullName: 'Gaston Manager', credentialId: 'GM001', password: '1234', role: 'GENERAL_MANAGER', department: 'MANAGEMENT' },
    { id: 'u3', fullName: 'Aline Accountant', credentialId: 'ACC001', password: '1234', role: 'ACCOUNTANT', department: 'MANAGEMENT' },
    { id: 'u4', fullName: 'Wendy Waiter', credentialId: 'RW001', password: '1234', role: 'RESTAURANT_WAITER', department: 'RESTAURANT' },
    { id: 'u5', fullName: 'Carl Cashier', credentialId: 'RC001', password: '1234', role: 'RESTAURANT_CASHIER', department: 'RESTAURANT' },
    { id: 'u6', fullName: 'Chef Leader Luc', credentialId: 'RCL001', password: '1234', role: 'RESTAURANT_CHEF_LEADER', department: 'RESTAURANT' },
    { id: 'u7', fullName: 'Stella Stock', credentialId: 'RS001', password: '1234', role: 'RESTAURANT_STOCK_MANAGER', department: 'RESTAURANT' },
    { id: 'u8', fullName: 'Bruno Bakery Manager', credentialId: 'BM001', password: '1234', role: 'BAKERY_MANAGER', department: 'BAKERY' },
    { id: 'u9', fullName: 'Betty Baker', credentialId: 'BCH001', password: '1234', role: 'BAKERY_CHEF', department: 'BAKERY' },
    { id: 'u10', fullName: 'Bella Cashier', credentialId: 'BC001', password: '1234', role: 'BAKERY_CASHIER', department: 'BAKERY' },
    { id: 'u11', fullName: 'Diane Deco Manager', credentialId: 'DM001', password: '1234', role: 'DECORATION_MANAGER', department: 'DECORATION' },
    { id: 'u12', fullName: 'Dan Deco Cashier', credentialId: 'DC001', password: '1234', role: 'DECORATION_CASHIER', department: 'DECORATION' },
    { id: 'u13', fullName: 'Desta Deco Staff', credentialId: 'DS001', password: '1234', role: 'DECORATION_STAFF', department: 'DECORATION' },
];

export const staff: StaffMember[] = users.map((u, i) => ({
    id: u.id, fullName: u.fullName, phone: `07880000${10 + i}`,
    email: `${u.credentialId.toLowerCase()}@eco-service.com`,
    department: u.department, role: u.role, status: 'ACTIVE', credentialId: u.credentialId,
}));

export const customers: Customer[] = [
    { id: 'c1', name: 'Jean Mugabo', phone: '0788000001', address: 'KG 11 Ave, Kigali' },
    { id: 'c2', name: 'Grace Uwase', phone: '0788000002', address: 'KN 5 Rd, Kigali' },
    { id: 'c3', name: 'Eric Habimana', phone: '0788000003', address: 'KK 15 St, Kigali' },
];

export const catalog: CatalogProduct[] = [
    { id: 'p1', name: 'Margherita Pizza', department: 'RESTAURANT', category: 'Main', price: 8000 },
    { id: 'p2', name: 'Grilled Chicken', department: 'RESTAURANT', category: 'Main', price: 9500 },
    { id: 'p3', name: 'Cappuccino', department: 'RESTAURANT', category: 'Coffee', price: 2500 },
    { id: 'p4', name: 'Fresh Juice', department: 'RESTAURANT', category: 'Drinks', price: 2000 },
    { id: 'p5', name: 'Croissant', department: 'BAKERY', category: 'Pastry', price: 1500 },
    { id: 'p6', name: 'Whole Wheat Bread', department: 'BAKERY', category: 'Bread', price: 1200 },
    { id: 'p7', name: 'Birthday Cake', department: 'BAKERY', category: 'Cake', price: 25000 },
    { id: 'p8', name: 'Latte', department: 'BAKERY', category: 'Coffee', price: 2800 },
    { id: 'p9', name: 'Wall Painting', department: 'DECORATION', category: 'Wall Art', price: 45000 },
    { id: 'p10', name: 'Table Lamp', department: 'DECORATION', category: 'Lighting', price: 18000 },
    { id: 'p11', name: 'Gift Package', department: 'DECORATION', category: 'Gifts', price: 12000 },
    { id: 'p12', name: 'Decorative Vase', department: 'DECORATION', category: 'Home', price: 15000 },
];

export const orders: Order[] = [
    {
        id: 'ORD-1001', customerName: 'Jean Mugabo', phone: '0788000001', address: 'KG 11 Ave, Kigali',
        department: 'RESTAURANT', status: 'PREPARING', total: 21000, paymentMethod: 'CASH', paymentStatus: 'UNPAID',
        items: [
            { productId: 'p1', name: 'Margherita Pizza', department: 'RESTAURANT', qty: 2, price: 8000 },
            { productId: 'p3', name: 'Cappuccino', department: 'RESTAURANT', qty: 2, price: 2500 },
        ],
        createdBy: 'Wendy Waiter', createdAt: ago(0), customization: { tableNumber: 'T3' },
        history: [
            { at: ago(0), by: 'Wendy Waiter', action: 'Order created' },
            { at: ago(0), by: 'Chef Leader Luc', action: 'Status changed to PREPARING' },
        ],
    },
    {
        id: 'ORD-1002', customerName: 'Grace Uwase', phone: '0788000002', department: 'BAKERY',
        status: 'READY', total: 26500, paymentMethod: 'MOBILE_MONEY', paymentStatus: 'PAID',
        items: [
            { productId: 'p7', name: 'Birthday Cake', department: 'BAKERY', qty: 1, price: 25000 },
            { productId: 'p5', name: 'Croissant', department: 'BAKERY', qty: 1, price: 1500 },
        ],
        createdBy: 'Bella Cashier', createdAt: ago(1), customization: { pickupTime: '17:00' },
        history: [{ at: ago(1), by: 'Bella Cashier', action: 'Order created' }],
    },
    {
        id: 'ORD-1003', customerName: 'Eric Habimana', phone: '0788000003', address: 'KK 15 St, Kigali',
        department: 'MIXED', status: 'COMPLETED', total: 30000, paymentMethod: 'CARD', paymentStatus: 'PAID',
        items: [
            { productId: 'p11', name: 'Gift Package', department: 'DECORATION', qty: 1, price: 12000 },
            { productId: 'p7', name: 'Birthday Cake', department: 'BAKERY', qty: 1, price: 25000 },
        ],
        createdBy: 'Dan Deco Cashier', createdAt: ago(3), customization: { giftWrapping: 'Yes' },
        history: [{ at: ago(3), by: 'Dan Deco Cashier', action: 'Order created' }],
    },
];

export const inventory: InventoryItem[] = [
    { id: 'i1', name: 'Tomatoes', category: 'Vegetables', department: 'RESTAURANT', quantity: 12, unit: 'kg', minStock: 20, expiryDate: inDays(4) },
    { id: 'i2', name: 'Chicken Breast', category: 'Meat', department: 'RESTAURANT', quantity: 40, unit: 'kg', minStock: 15, expiryDate: inDays(6) },
    { id: 'i3', name: 'Coffee Beans', category: 'Coffee', department: 'RESTAURANT', quantity: 4, unit: 'kg', minStock: 10, expiryDate: inDays(90) },
    { id: 'i4', name: 'Flour', category: 'Dry Goods', department: 'BAKERY', quantity: 120, unit: 'kg', minStock: 50, expiryDate: inDays(120) },
    { id: 'i5', name: 'Butter', category: 'Dairy', department: 'BAKERY', quantity: 6, unit: 'kg', minStock: 15, expiryDate: inDays(-2) },
    { id: 'i6', name: 'Sugar', category: 'Dry Goods', department: 'BAKERY', quantity: 0, unit: 'kg', minStock: 20 },
    { id: 'i7', name: 'Coffee Beans (Bakery)', category: 'Coffee', department: 'BAKERY', quantity: 25, unit: 'kg', minStock: 10, expiryDate: inDays(60) },
    { id: 'i8', name: 'Wall Painting', category: 'Wall Art', department: 'DECORATION', quantity: 8, unit: 'pcs', minStock: 3, displayLocation: 'Hall A' },
    { id: 'i9', name: 'Table Lamp', category: 'Lighting', department: 'DECORATION', quantity: 2, unit: 'pcs', minStock: 5, displayLocation: 'Hall B' },
    { id: 'i10', name: 'Gift Package', category: 'Gifts', department: 'DECORATION', quantity: 30, unit: 'pcs', minStock: 10, displayLocation: 'Counter' },
];

export const movements: StockMovement[] = [
    { id: 'MV-1', date: ago(0), product: 'Flour', quantity: 50, type: 'PURCHASE', department: 'BAKERY', user: 'Bruno Bakery Manager' },
    { id: 'MV-2', date: ago(1), product: 'Flour', quantity: 20, type: 'PRODUCTION_USAGE', department: 'BAKERY', user: 'Betty Baker' },
    { id: 'MV-3', date: ago(2), product: 'Tomatoes', quantity: 5, type: 'WASTED', department: 'RESTAURANT', user: 'Stella Stock' },
    { id: 'MV-4', date: ago(3), product: 'Coffee Beans', quantity: 10, type: 'TRANSFER_IN', department: 'RESTAURANT', user: 'Stella Stock' },
];

export const requisitions: Requisition[] = [
    { id: 'RQ-1', department: 'BAKERY', item: 'Butter', quantity: 20, priority: 'HIGH', reason: 'Below minimum stock', requiredDate: inDays(2), status: 'PENDING' },
    { id: 'RQ-2', department: 'RESTAURANT', item: 'Coffee Beans', quantity: 15, priority: 'MEDIUM', reason: 'Weekend demand', requiredDate: inDays(5), status: 'PENDING' },
    { id: 'RQ-3', department: 'DECORATION', item: 'Table Lamp', quantity: 10, priority: 'LOW', reason: 'Seasonal display', requiredDate: inDays(10), status: 'APPROVED' },
];

export const suppliers: Supplier[] = [
    { id: 's1', name: 'Kigali Fresh Farms', contact: '0788111111', products: 'Vegetables, Dairy', lastPurchase: ago(2), paymentStatus: 'PAID' },
    { id: 's2', name: 'Rwanda Coffee Co.', contact: '0788222222', products: 'Coffee Beans', lastPurchase: ago(7), paymentStatus: 'UNPAID' },
    { id: 's3', name: 'HomeStyle Imports', contact: '0788333333', products: 'Decor, Lighting', lastPurchase: ago(14), paymentStatus: 'PAID' },
];

export const schedule: Shift[] = [
    { id: 'sh1', staffId: 'u4', staffName: 'Wendy Waiter', department: 'RESTAURANT', day: 0, start: '08:00', end: '16:00' },
    { id: 'sh2', staffId: 'u9', staffName: 'Betty Baker', department: 'BAKERY', day: 1, start: '05:00', end: '13:00' },
    { id: 'sh3', staffId: 'u13', staffName: 'Desta Deco Staff', department: 'DECORATION', day: 2, start: '09:00', end: '17:00' },
];

export const batches: ProductionBatch[] = [
    { id: 'BT-101', product: 'Whole Wheat Bread', quantity: 80, ingredients: 'Flour, Yeast, Salt', producedAt: ago(0), expiresAt: inDays(2), status: 'IN_PROGRESS' },
    { id: 'BT-102', product: 'Croissant', quantity: 120, ingredients: 'Flour, Butter, Sugar', producedAt: ago(0), expiresAt: inDays(1), status: 'PLANNED' },
    { id: 'BT-103', product: 'Birthday Cake', quantity: 6, ingredients: 'Flour, Sugar, Eggs', producedAt: ago(1), expiresAt: inDays(3), status: 'COMPLETED' },
    { id: 'BT-104', product: 'Doughnut', quantity: 60, ingredients: 'Flour, Sugar, Oil', producedAt: ago(4), expiresAt: inDays(-1), status: 'EXPIRED' },
];

export const tables: TableItem[] = Array.from({ length: 8 }, (_, i) => ({
    id: `t${i + 1}`, number: `T${i + 1}`, seats: i % 3 === 0 ? 6 : 4,
    status: (['AVAILABLE', 'OCCUPIED', 'RESERVED', 'CLEANING'] as const)[i % 4],
}));

export const kitchen: KitchenTicket[] = [
    { id: 'k1', orderId: 'ORD-1001', table: 'T3', items: ['2x Margherita Pizza', '2x Cappuccino'], status: 'PREPARING', createdAt: ago(0) },
    { id: 'k2', orderId: 'ORD-1004', table: 'T5', items: ['1x Grilled Chicken'], status: 'NEW', createdAt: ago(0) },
    { id: 'k3', orderId: 'ORD-1005', table: 'T1', items: ['3x Fresh Juice'], status: 'READY', createdAt: ago(0) },
];

export const menu: MenuItem[] = catalog
    .filter((p) => p.department === 'RESTAURANT')
    .map((p) => ({ id: p.id, name: p.name, category: p.category, department: 'RESTAURANT' as const, price: p.price, available: true }));

export const gifts: GiftRequest[] = [
    { id: 'g1', customer: 'Grace Uwase', instructions: 'Gold wrapping with ribbon', delivery: 'Deliver Friday 10:00', status: 'PENDING' },
    { id: 'g2', customer: 'Eric Habimana', instructions: 'Add personalised card', delivery: 'Pickup', status: 'IN_PROGRESS' },
    { id: 'g3', customer: 'Jean Mugabo', instructions: 'Birthday theme', delivery: 'Deliver KG 11 Ave', status: 'COMPLETED' },
];

export const revenue: RevenueRow[] = [
    { month: 'May', restaurant: 4200000, bakery: 2100000, decoration: 1800000, expenses: 5200000 },
    { month: 'Jun', restaurant: 4600000, bakery: 2300000, decoration: 1500000, expenses: 5400000 },
    { month: 'Jul', restaurant: 4900000, bakery: 2500000, decoration: 2100000, expenses: 5900000 },
    { month: 'Aug', restaurant: 5100000, bakery: 2400000, decoration: 2600000, expenses: 6100000 },
    { month: 'Sep', restaurant: 5400000, bakery: 2800000, decoration: 2200000, expenses: 6300000 },
    { month: 'Oct', restaurant: 5800000, bakery: 3000000, decoration: 2900000, expenses: 6700000 },
];

export const notifications: AppNotification[] = [
    { id: 'n1', type: 'ORDER', title: 'New order created', message: 'ORD-1001 was created by Wendy Waiter.', createdAt: ago(0) },
    { id: 'n2', type: 'INVENTORY', title: 'Low stock warning', message: 'Coffee Beans is below minimum stock.', createdAt: ago(0) },
    { id: 'n3', type: 'PRODUCTION', title: 'Batch completed', message: 'BT-103 Birthday Cake is complete.', createdAt: ago(1) },
    { id: 'n4', type: 'SYSTEM', title: 'Backup completed', message: 'Nightly backup finished successfully.', createdAt: ago(1) },
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const series = (vals: number[]) => vals.map((value, i) => ({ name: days[i], value }));

export const dashboards: Record<Department, DashboardData> = {
    MANAGEMENT: {
        title: 'Business Overview',
        stats: [
            { label: 'Total Revenue (Oct)', value: 'RWF 11.7M', hint: '+8% vs last month' },
            { label: 'Active Orders', value: '24', hint: '6 awaiting confirmation' },
            { label: 'Inventory Alerts', value: '7', hint: '3 critical' },
            { label: 'Staff On Duty', value: '31', hint: '4 on leave' },
        ],
        trend: { title: 'Orders this week', data: series([32, 41, 38, 45, 52, 61, 44]) },
        breakdown: {
            title: 'Department performance (RWF M)', data: [
                { name: 'Restaurant', value: 5.8 }, { name: 'Bakery', value: 3.0 }, { name: 'Decoration', value: 2.9 }]
        },
        alerts: ['Butter is expired in Bakery', 'Sugar is out of stock', 'Table Lamp is below minimum stock'],
        analysis: [
            { label: 'Profit margin', value: '37.4%', detail: 'Across separately tracked departments' },
            { label: 'Order completion', value: '86%', detail: 'Completed within expected service time' },
            { label: 'Revenue per user', value: 'RWF 426K', detail: 'Average monthly contribution' },
            { label: 'Expense coverage', value: '2.2×', detail: 'Revenue compared with expenses' },
        ],
        departmentPerformance: [
            { department: 'RESTAURANT', revenue: 5800000, users: 12, profit: 2140000, expenses: 3660000 },
            { department: 'BAKERY', revenue: 3000000, users: 9, profit: 1250000, expenses: 1750000 },
            { department: 'DECORATION', revenue: 2900000, users: 4, profit: 980000, expenses: 1920000 },
        ],
    },
    RESTAURANT: {
        title: 'Restaurant Dashboard',
        stats: [
            { label: 'Tables Occupied', value: '4 / 8', hint: '2 reserved' },
            { label: 'Kitchen Orders', value: '9', hint: '3 preparing' },
            { label: "Today's Special", value: 'Grilled Chicken', hint: 'Best seller' },
            { label: 'Staff On Shift', value: '12' },
        ],
        trend: { title: 'Orders this week', data: series([18, 22, 20, 25, 31, 38, 27]) },
        breakdown: {
            title: 'Popular dishes', data: [
                { name: 'Pizza', value: 42 }, { name: 'Chicken', value: 36 }, { name: 'Coffee', value: 58 }, { name: 'Juice', value: 24 }]
        },
        alerts: ['Tomatoes below minimum stock', 'Coffee Beans critical'],
        analysis: [
            { label: 'Average order', value: 'RWF 8,450', detail: 'Based on recent restaurant orders' },
            { label: 'Table utilization', value: '68%', detail: 'Current occupied and reserved capacity' },
            { label: 'Kitchen completion', value: '91%', detail: 'Tickets completed on schedule' },
            { label: 'Ingredient variance', value: '4.8%', detail: 'Usage compared with planned portions' },
        ],
        departmentPerformance: [
            { department: 'RESTAURANT', revenue: 5800000, users: 12, profit: 2140000, expenses: 3660000 },
        ],
    },
    BAKERY: {
        title: 'Bakery Dashboard',
        stats: [
            { label: 'Active Batches', value: '2', hint: '1 planned' },
            { label: 'Coffee Used Today', value: '3.2 kg', hint: '25 kg remaining' },
            { label: 'Product Waste', value: '4.1%', hint: '12 unsold items' },
            { label: 'Oven Usage', value: '68%' },
        ],
        trend: { title: 'Production this week', data: series([210, 190, 240, 260, 280, 320, 250]) },
        breakdown: {
            title: 'Product popularity', data: [
                { name: 'Bread', value: 120 }, { name: 'Croissant', value: 95 }, { name: 'Cake', value: 40 }, { name: 'Coffee', value: 150 }]
        },
        alerts: ['Butter expired', 'Sugar out of stock'],
        analysis: [
            { label: 'Production yield', value: '94.2%', detail: 'Good output from planned batches' },
            { label: 'Waste rate', value: '4.1%', detail: 'Unsold or expired product share' },
            { label: 'Best category', value: 'Coffee', detail: 'Highest weekly product movement' },
            { label: 'Stock cover', value: '12 days', detail: 'Estimated supply at current usage' },
        ],
        departmentPerformance: [
            { department: 'BAKERY', revenue: 3000000, users: 9, profit: 1250000, expenses: 1750000 },
        ],
    },
    DECORATION: {
        title: 'Decoration Dashboard',
        stats: [
            { label: 'Showroom Items', value: '40', hint: '3 in storage' },
            { label: 'Gift Orders', value: '3', hint: '1 pending' },
            { label: 'Slow Movers', value: '5', hint: 'Review pricing' },
            { label: 'Staff On Floor', value: '4' },
        ],
        trend: { title: 'Customer traffic', data: series([14, 18, 16, 22, 30, 41, 33]) },
        breakdown: {
            title: 'Sales by category', data: [
                { name: 'Wall Art', value: 18 }, { name: 'Lighting', value: 12 }, { name: 'Gifts', value: 26 }, { name: 'Home', value: 9 }]
        },
        alerts: ['Table Lamp below minimum stock'],
        analysis: [
            { label: 'Average order', value: 'RWF 32K', detail: 'Average decoration order value' },
            { label: 'Showroom conversion', value: '41%', detail: 'Visitors converted to customers' },
            { label: 'Gift fulfilment', value: '93%', detail: 'Requests completed on time' },
            { label: 'Slow movers', value: '5 items', detail: 'Products needing pricing review' },
        ],
        departmentPerformance: [
            { department: 'DECORATION', revenue: 2900000, users: 4, profit: 980000, expenses: 1920000 },
        ],
    },
};