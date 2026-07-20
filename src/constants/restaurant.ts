import type { RestaurantRole, RestaurantPage } from '@/types/restaurant';

export const RESTAURANT_ROLE_LABELS: Record<RestaurantRole, string> = {
  RESTAURANT_MANAGER: 'Manager',
  RESTAURANT_STOCK_MANAGER: 'Inventory Manager',
  RESTAURANT_CHEF_LEADER: 'Chef Leader',
  RESTAURANT_CHEF: 'Chef',
  RESTAURANT_WAITER_LEADER: 'Supervisor',
  RESTAURANT_WAITER: 'Waiter',
  RESTAURANT_CASHIER: 'Cashier',
  RESTAURANT_BARISTA: 'Barista',
};

// Directly from your doc: exactly which pages each role can access.
// This is the single source of truth for both nav rendering AND route guarding.
export const RESTAURANT_ROLE_PAGES: Record<RestaurantRole, RestaurantPage[]> = {
  RESTAURANT_MANAGER: [
    'DASHBOARD', 'ORDERS', 'TABLES', 'KITCHEN_DASHBOARD', 'RECIPES',
    'PREPARATION_SCHEDULE', 'COFFEE_STATION', 'PAYMENTS', 'REFUNDS',
    'CASH_MANAGEMENT', 'INVENTORY', 'STOCK_MOVEMENTS', 'REQUISITIONS',
    'REPORTS', 'STAFF_MANAGEMENT', 'MENU_MANAGEMENT', 'SETTINGS',
  ],
  RESTAURANT_STOCK_MANAGER: ['DASHBOARD', 'INVENTORY', 'STOCK_MOVEMENTS', 'REQUISITIONS', 'REPORTS'],
  RESTAURANT_CHEF_LEADER: ['DASHBOARD', 'KITCHEN_DASHBOARD', 'RECIPES', 'PREPARATION_SCHEDULE'],
  RESTAURANT_CHEF: ['DASHBOARD', 'KITCHEN_TASKS', 'STATION_INVENTORY'],
  RESTAURANT_WAITER_LEADER: ['DASHBOARD', 'ORDERS', 'TABLES', 'STAFF_MANAGEMENT'],
  RESTAURANT_WAITER: ['DASHBOARD', 'ORDERS', 'TABLES', 'PAYMENTS'],
  RESTAURANT_CASHIER: ['DASHBOARD', 'PAYMENTS', 'REFUNDS', 'CASH_MANAGEMENT'],
  RESTAURANT_BARISTA: ['DASHBOARD', 'COFFEE_STATION', 'BEVERAGE_ORDERS'],
};

export const hasRestaurantPageAccess = (role: RestaurantRole, page: RestaurantPage): boolean =>
  RESTAURANT_ROLE_PAGES[role]?.includes(page) ?? false;

// Nav item definitions — path + which page enum it maps to (for the access check)
export const RESTAURANT_NAV_ITEMS: { page: RestaurantPage; path: string; label: string }[] = [
  { page: 'DASHBOARD', path: '/restaurant', label: 'Dashboard' },
  { page: 'ORDERS', path: '/restaurant/orders', label: 'Orders' },
  { page: 'TABLES', path: '/restaurant/tables', label: 'Tables' },
  { page: 'KITCHEN_DASHBOARD', path: '/restaurant/kitchen', label: 'Kitchen Dashboard' },
  { page: 'KITCHEN_TASKS', path: '/restaurant/kitchen/tasks', label: 'Kitchen Tasks' },
  { page: 'STATION_INVENTORY', path: '/restaurant/kitchen/station-inventory', label: 'Station Inventory' },
  { page: 'RECIPES', path: '/restaurant/recipes', label: 'Recipes' },
  { page: 'PREPARATION_SCHEDULE', path: '/restaurant/schedule', label: 'Preparation Schedule' },
  { page: 'COFFEE_STATION', path: '/restaurant/coffee-station', label: 'Coffee Station' },
  { page: 'BEVERAGE_ORDERS', path: '/restaurant/beverage-orders', label: 'Beverage Orders' },
  { page: 'PAYMENTS', path: '/restaurant/payments', label: 'Payments' },
  { page: 'REFUNDS', path: '/restaurant/refunds', label: 'Refunds' },
  { page: 'CASH_MANAGEMENT', path: '/restaurant/cash', label: 'Cash Management' },
  { page: 'INVENTORY', path: '/restaurant/inventory', label: 'Inventory' },
  { page: 'STOCK_MOVEMENTS', path: '/restaurant/inventory/movements', label: 'Stock Movements' },
  { page: 'REQUISITIONS', path: '/restaurant/inventory/requisitions', label: 'Requisitions' },
  { page: 'REPORTS', path: '/restaurant/reports', label: 'Reports' },
  { page: 'STAFF_MANAGEMENT', path: '/restaurant/staff', label: 'Staff' },
  { page: 'MENU_MANAGEMENT', path: '/restaurant/menu', label: 'Menu' },
  { page: 'SETTINGS', path: '/restaurant/settings', label: 'Settings' },
];

// Add to existing file

// ============================================================
// KITCHEN CONSTANTS
// ============================================================

export const KITCHEN_STATION_LABELS: Record<KitchenStationType, string> = {
  GRILL: 'Grill',
  PREP: 'Prep',
  PLATING: 'Plating',
  PIZZA: 'Pizza',
  PASTA: 'Pasta',
  DESSERT: 'Dessert',
  BARISTA: 'Barista',
  EXPO: 'Expo',
};

export const KITCHEN_STATION_COLORS: Record<KitchenStationType, string> = {
  GRILL: 'bg-red-500',
  PREP: 'bg-blue-500',
  PLATING: 'bg-green-500',
  PIZZA: 'bg-orange-500',
  PASTA: 'bg-yellow-500',
  DESSERT: 'bg-purple-500',
  BARISTA: 'bg-amber-500',
  EXPO: 'bg-gray-500',
};

export const KITCHEN_TASK_STATUS_LABELS: Record<KitchenTask['status'], string> = {
  NEW: 'New',
  PREPARING: 'Preparing',
  READY: 'Ready',
  SERVED: 'Served',
};

export const KITCHEN_TASK_PRIORITY_LABELS: Record<KitchenTask['priority'], string> = {
  NORMAL: 'Normal',
  RUSH: 'Rush',
  VIP: 'VIP',
};

export const RECIPE_CATEGORY_LABELS: Record<Recipe['category'], string> = {
  APPETIZER: 'Appetizer',
  MAIN_COURSE: 'Main Course',
  DESSERT: 'Dessert',
  BEVERAGE: 'Beverage',
  SAUCE: 'Sauce',
  BREAD: 'Bread',
  PASTA: 'Pasta',
};

export const SHIFT_LABELS: Record<ShiftType, string> = {
  MORNING: 'Morning (6:00 - 14:00)',
  AFTERNOON: 'Afternoon (14:00 - 22:00)',
  EVENING: 'Evening (18:00 - 02:00)',
  NIGHT: 'Night (22:00 - 06:00)',
};

export const KITCHEN_NAV_ITEMS = [
  { page: 'KITCHEN_DASHBOARD', path: '/restaurant/kitchen', label: 'Kitchen Dashboard', icon: '🔪' },
  { page: 'KITCHEN_TASKS', path: '/restaurant/kitchen/tasks', label: 'Kitchen Tasks', icon: '📋' },
  { page: 'STATION_INVENTORY', path: '/restaurant/kitchen/station-inventory', label: 'Station Inventory', icon: '📦' },
  { page: 'RECIPES', path: '/restaurant/kitchen/recipes', label: 'Recipes', icon: '📖' },
  { page: 'PREPARATION_SCHEDULE', path: '/restaurant/kitchen/schedule', label: 'Prep Schedule', icon: '📅' },
];