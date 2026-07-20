import type { AnyRole } from './general.types';

// ============================================================
// ROLES & PAGE ACCESS
// ============================================================

export type RestaurantRole =
  | 'RESTAURANT_MANAGER'
  | 'RESTAURANT_STOCK_MANAGER'
  | 'RESTAURANT_CHEF_LEADER'
  | 'RESTAURANT_CHEF'
  | 'RESTAURANT_WAITER_LEADER'
  | 'RESTAURANT_WAITER'
  | 'RESTAURANT_CASHIER'
  | 'RESTAURANT_BARISTA';

export type RestaurantPage =
  | 'DASHBOARD'
  | 'ORDERS'
  | 'TABLES'
  | 'KITCHEN_DASHBOARD'
  | 'KITCHEN_TASKS'
  | 'STATION_INVENTORY'
  | 'RECIPES'
  | 'PREPARATION_SCHEDULE'
  | 'COFFEE_STATION'
  | 'BEVERAGE_ORDERS'
  | 'PAYMENTS'
  | 'REFUNDS'
  | 'CASH_MANAGEMENT'
  | 'INVENTORY'
  | 'STOCK_MOVEMENTS'
  | 'REQUISITIONS'
  | 'REPORTS'
  | 'STAFF_MANAGEMENT'
  | 'MENU_MANAGEMENT'
  | 'SETTINGS';

// ============================================================
// TABLES
// ============================================================

export type TableStatus = 'AVAILABLE' | 'OCCUPIED' | 'RESERVED' | 'CLEANING';

export interface RestaurantTable {
  id: string;
  number: string;
  seats: number;
  status: TableStatus;
  assignedWaiterId?: string;
  currentOrderId?: string;
  reservedFor?: string;
  reservedTime?: string;
}

// ============================================================
// ORDERS
// ============================================================

export type OrderStatus =
  | 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERING' | 'COMPLETED' | 'CANCELLED';

export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
  station: 'KITCHEN' | 'BARISTA';
  status: 'PENDING' | 'PREPARING' | 'READY' | 'SERVED';
}

export interface RestaurantOrder {
  id: string;
  tableId?: string;
  tableNumber?: string;
  customerId?: string;
  customerName?: string;
  waiterId: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================================
// KITCHEN
// ============================================================
// Add to existing file - these are the kitchen-specific types

// ============================================================
// KITCHEN STATIONS
// ============================================================

export type KitchenStationType = 'GRILL' | 'PREP' | 'PLATING' | 'PIZZA' | 'PASTA' | 'DESSERT' | 'BARISTA' | 'EXPO';

export interface KitchenStation {
  id: string;
  name: string;
  type: KitchenStationType;
  chefId?: string;
  chefName?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'CLOSED';
  currentOrders: number;
  capacity: number;
}

// ============================================================
// KITCHEN TASKS (Extended)
// ============================================================

export interface KitchenTask {
  id: string;
  orderId: string;
  orderItemId: string;
  itemName: string;
  quantity: number;
  tableNumber?: string;
  station: KitchenStationType;
  assignedChefId?: string;
  assignedChefName?: string;
  status: 'NEW' | 'PREPARING' | 'READY' | 'SERVED';
  priority: 'NORMAL' | 'RUSH' | 'VIP';
  startedAt?: string;
  completedAt?: string;
  estimatedMinutes: number;
  actualMinutes?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================================
// RECIPES (Extended)
// ============================================================

export interface RecipeIngredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  substitute?: string;
  prepInstructions?: string;
}

export interface RecipeStep {
  id: string;
  order: number;
  instruction: string;
  durationMinutes?: number;
  station?: KitchenStationType;
  equipmentNeeded?: string[];
  imageUrl?: string;
}

export interface Recipe {
  id: string;
  name: string;
  category: 'APPETIZER' | 'MAIN_COURSE' | 'DESSERT' | 'BEVERAGE' | 'SAUCE' | 'BREAD' | 'PASTA';
  description?: string;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  cookingTimeMinutes: number;
  prepTimeMinutes: number;
  totalTimeMinutes: number;
  requiredEquipment: string[];
  yield: number;
  yieldUnit: 'SERVINGS' | 'PIECES' | 'BATCHES';
  dietaryTags: ('VEGETARIAN' | 'VEGAN' | 'GLUTEN_FREE' | 'DAIRY_FREE' | 'NUT_FREE' | 'KETO')[];
  costPerServing: number;
  profitMargin: number;
  createdBy: string;
  createdByName: string;
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
}

// ============================================================
// PREPARATION SCHEDULE
// ============================================================

export type ShiftType = 'MORNING' | 'AFTERNOON' | 'EVENING' | 'NIGHT';

export interface Shift {
  id: string;
  name: ShiftType;
  startTime: string; // e.g., "06:00"
  endTime: string; // e.g., "14:00"
  station: KitchenStationType;
  chefId: string;
  chefName: string;
  role: 'LEAD' | 'ASSISTANT' | 'SOUS' | 'PREP';
  isActive: boolean;
  notes?: string;
}

export interface PreparationSchedule {
  id: string;
  date: string; // YYYY-MM-DD
  shifts: Shift[];
  specialEvents?: string[];
  expectedOrderVolume: 'LOW' | 'MEDIUM' | 'HIGH' | 'PEEK';
  projectedStaffing: {
    totalChefs: number;
    stationsCovered: number;
    gaps: KitchenStationType[];
  };
  createdBy: string;
  updatedAt: string;
}

// ============================================================
// STATION INVENTORY (Extended)
// ============================================================

export interface StationInventoryItem {
  id: string;
  stationId: string;
  stationName: string;
  itemId: string;
  itemName: string;
  quantity: number;
  unit: string;
  minThreshold: number;
  maxThreshold: number;
  reorderPoint: number;
  lastRestocked: string;
  expiryDate?: string;
  supplier?: string;
  costPerUnit: number;
}

export interface StationInventoryAlert {
  id: string;
  stationId: string;
  stationName: string;
  itemName: string;
  currentQuantity: number;
  threshold: number;
  severity: 'LOW' | 'CRITICAL' | 'OUT_OF_STOCK' | 'EXPIRING';
  createdAt: string;
  isResolved: boolean;
}

// ============================================================
// KITCHEN DASHBOARD DATA
// ============================================================

export interface KitchenDashboardData {
  stationStatus: KitchenStation[];
  taskStats: {
    new: number;
    preparing: number;
    ready: number;
    delayed: number;
  };
  todayShifts: Shift[];
  inventoryAlerts: StationInventoryAlert[];
  performance: {
    avgPrepTime: number;
    ordersThroughput: number;
    stationLoad: Record<KitchenStationType, number>;
  };
}
export type KitchenTaskStatus = 'NEW' | 'PREPARING' | 'READY' | 'SERVED';

export interface KitchenTask {
  id: string;
  orderId: string;
  orderItemId: string;
  itemName: string;
  quantity: number;
  tableNumber?: string;
  assignedChefId?: string;
  status: KitchenTaskStatus;
  priority: 'NORMAL' | 'RUSH';
  startedAt?: string;
  estimatedMinutes?: number;
}

export interface Recipe {
  id: string;
  name: string;
  category: string;
  ingredients: { name: string; quantity: number; unit: string }[];
  steps: string[];
  cookingTimeMinutes: number;
  requiredEquipment: string[];
  createdBy: string;
  updatedAt: string;
}

export interface PreparationScheduleEntry {
  id: string;
  chefId: string;
  chefName: string;
  shiftStart: string;
  shiftEnd: string;
  station: 'GRILL' | 'PREP' | 'PLATING' | 'BARISTA';
}


// ============================================================
// BARISTA / COFFEE
// ============================================================

export interface BeverageOrder {
  id: string;
  orderId: string;
  orderItemId: string;
  itemName: string;
  quantity: number;
  tableNumber?: string;
  status: 'PENDING' | 'PREPARING' | 'READY' | 'SERVED';
  baristaId?: string;
}

export interface CoffeeInventoryItem {
  id: string;
  beanOrigin: string;
  roastLevel: 'LIGHT' | 'MEDIUM' | 'DARK';
  stockKg: number;
  reorderThresholdKg: number;
  lastRestocked: string;
}

// ============================================================
// CASHIER / PAYMENTS
// ============================================================

export type PaymentMethod = 'CASH' | 'CARD' | 'MOBILE_MONEY';
export type PaymentStatus = 'PENDING' | 'PAID' | 'REFUNDED' | 'PARTIALLY_REFUNDED';

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  cashierId: string;
  processedAt: string;
}

export interface RefundRequest {
  id: string;
  paymentId: string;
  orderId: string;
  amount: number;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  requestedBy: string;
  requestedAt: string;
}

export interface CashDrawerSession {
  id: string;
  cashierId: string;
  openedAt: string;
  closedAt?: string;
  openingBalance: number;
  closingBalance?: number;
  expectedBalance?: number;
  variance?: number;
}

// ============================================================
// INVENTORY (Restaurant-scoped)
// ============================================================

export type InventoryStatus = 'AVAILABLE' | 'LOW_STOCK' | 'CRITICAL' | 'OUT_OF_STOCK' | 'EXPIRED';

export interface RestaurantInventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minStockLevel: number;
  expiryDate?: string;
  status: InventoryStatus;
}

export type StockMovementType =
  | 'PURCHASE' | 'TRANSFER_IN' | 'TRANSFER_OUT' | 'PRODUCTION_USAGE' | 'SOLD' | 'WASTED';

export interface StockMovement {
  id: string;
  itemId: string;
  itemName: string;
  quantity: number;
  type: StockMovementType;
  performedBy: string;
  timestamp: string;
}

export interface Requisition {
  id: string;
  itemName: string;
  quantity: number;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  reason: string;
  requiredDate: string;
  requestedBy: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'FULFILLED';
}

// ============================================================
// MENU
// ============================================================

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  costPrice: number;
  ingredients: string[];
  preparationTimeMinutes: number;
  isSpecial: boolean;
  isAvailable: boolean;
}

// ============================================================
// DASHBOARD
// ============================================================

export interface RestaurantDashboardData {
  tableOccupancy: { available: number; occupied: number; reserved: number };
  kitchenOrders: { pending: number; preparing: number; completed: number };
  todaysSpecials: MenuItem[];
  staffSchedule: { staffName: string; role: RestaurantRole; shift: string }[];
  analytics: {
    tableTurnoverRate: number;
    popularDishes: { name: string; orderCount: number }[];
    avgServiceSpeedMinutes: number;
    peakHours: string[];
  };
}