// Complete Role Structure for All Departments

export interface RoleDefinition {
  id: string;
  name: string;
  displayName: string;
  level: 'system' | 'general' | 'department';
  department?: 'restaurant' | 'bakery' | 'decoration';
  description: string;
  responsibilities: string[];
  keyPages: string[];
  permissions: string[];
  canView: string[];
  canCreate: string[];
  canEdit: string[];
  canDelete: string[];
}

// SYSTEM LEVEL ROLES
export const SUPER_ADMIN_ROLE: RoleDefinition = {
  id: 'SUPER_ADMIN',
  name: 'SUPER_ADMIN',
  displayName: 'Super Admin',
  level: 'system',
  description: 'Full system access across all departments and locations',
  responsibilities: [
    'System-wide configuration',
    'User management',
    'Business management',
    'Role administration',
    'Financial oversight',
    'Activity monitoring',
  ],
  keyPages: [
    'Dashboard',
    'Businesses',
    'Managers',
    'Users',
    'Roles & Permissions',
    'Activity Log',
    'Reports',
    'Settings',
  ],
  permissions: [
    'view:all',
    'create:all',
    'edit:all',
    'delete:all',
    'manage:users',
    'manage:businesses',
    'manage:roles',
    'view:reports',
    'view:activity',
    'system:settings',
  ],
  canView: ['all'],
  canCreate: ['user', 'business', 'role', 'report'],
  canEdit: ['user', 'business', 'role', 'settings'],
  canDelete: ['user', 'business', 'role'],
};

// GENERAL MANAGEMENT ROLES
export const GENERAL_MANAGER_ROLE: RoleDefinition = {
  id: 'GENERAL_MANAGER',
  name: 'GENERAL_MANAGER',
  displayName: 'General Manager',
  level: 'general',
  description: 'View consolidated reports, manage pricing strategy',
  responsibilities: [
    'Oversee all departments',
    'Manage pricing strategy',
    'View consolidated reports',
    'Staff management',
    'Performance monitoring',
    'Approve requests',
  ],
  keyPages: [
    'Dashboard',
    'My Businesses',
    'All Departments Overview',
    'Staff Management',
    'Reports',
    'Pricing Strategy',
    'Activity Log',
  ],
  permissions: [
    'view:all_departments',
    'view:reports',
    'manage:staff',
    'manage:pricing',
    'approve:requests',
    'view:activity',
  ],
  canView: ['reports', 'staff', 'businesses', 'inventory'],
  canCreate: ['request', 'report'],
  canEdit: ['pricing', 'staff', 'schedule'],
  canDelete: [],
};

export const ACCOUNTANT_ROLE: RoleDefinition = {
  id: 'ACCOUNTANT',
  name: 'ACCOUNTANT',
  displayName: 'Accountant',
  level: 'general',
  description: 'Financial reporting, tax calculations, payroll',
  responsibilities: [
    'Financial reporting',
    'Tax calculations',
    'Payroll management',
    'Invoice management',
    'Budget tracking',
    'Financial reconciliation',
  ],
  keyPages: [
    'Financial Dashboard',
    'Reports',
    'Payroll',
    'Invoices',
    'Budget Tracking',
    'Tax Reports',
  ],
  permissions: [
    'view:financial',
    'create:report',
    'manage:payroll',
    'manage:invoices',
    'manage:budget',
  ],
  canView: ['reports', 'payroll', 'invoices', 'financial'],
  canCreate: ['report', 'invoice'],
  canEdit: ['report', 'budget'],
  canDelete: [],
};

// RESTAURANT DEPARTMENT ROLES (8 Roles)
export const RESTAURANT_STOCK_MANAGER_ROLE: RoleDefinition = {
  id: 'RESTAURANT_STOCK_MANAGER',
  name: 'RESTAURANT_STOCK_MANAGER',
  displayName: 'Stock Manager',
  level: 'department',
  department: 'restaurant',
  description: 'Manages food ingredients, tracks perishables, sets reorder points',
  responsibilities: [
    'Manage food ingredients',
    'Track perishables',
    'Set reorder points',
    'Monitor stock levels',
    'Handle requisitions',
    'Generate inventory reports',
  ],
  keyPages: ['Inventory', 'Requisitions', 'Reports', 'Stock Dashboard'],
  permissions: [
    'view:inventory',
    'manage:stock',
    'manage:reorder',
    'view:requisitions',
    'create:requisition',
    'edit:inventory',
  ],
  canView: ['inventory', 'stock', 'reports'],
  canCreate: ['requisition', 'reorder'],
  canEdit: ['inventory', 'reorder_points'],
  canDelete: [],
};

export const RESTAURANT_CHEF_LEADER_ROLE: RoleDefinition = {
  id: 'RESTAURANT_CHEF_LEADER',
  name: 'RESTAURANT_CHEF_LEADER',
  displayName: 'Chef Leader',
  level: 'department',
  department: 'restaurant',
  description: 'Supervises chefs, creates recipes, manages prep schedule',
  responsibilities: [
    'Supervise kitchen staff',
    'Create and modify recipes',
    'Manage prep schedules',
    'Quality control',
    'Staff training',
    'Inventory oversight',
  ],
  keyPages: [
    'Kitchen Dashboard',
    'Recipes',
    'Prep Schedule',
    'Staff Management',
    'Quality Control',
  ],
  permissions: [
    'view:kitchen',
    'manage:recipes',
    'manage:schedule',
    'manage:staff',
    'create:recipe',
    'edit:recipe',
  ],
  canView: ['kitchen', 'recipes', 'schedule', 'staff'],
  canCreate: ['recipe', 'schedule'],
  canEdit: ['recipe', 'schedule', 'staff'],
  canDelete: [],
};

export const RESTAURANT_CHEF_ROLE: RoleDefinition = {
  id: 'RESTAURANT_CHEF',
  name: 'RESTAURANT_CHEF',
  displayName: 'Chef',
  level: 'department',
  department: 'restaurant',
  description: 'Prepares food items, marks kitchen tasks complete',
  responsibilities: [
    'Prepare food items',
    'Mark tasks complete',
    'Maintain station inventory',
    'Follow recipes',
    'Report issues',
    'Assist other chefs',
  ],
  keyPages: ['Kitchen Tasks', 'Station Inventory', 'Recipes', 'Schedule'],
  permissions: [
    'view:kitchen_tasks',
    'view:recipes',
    'manage:station',
    'mark:tasks_complete',
    'view:inventory',
  ],
  canView: ['tasks', 'recipes', 'inventory'],
  canCreate: [],
  canEdit: ['task_status'],
  canDelete: [],
};

export const RESTAURANT_WAITER_LEADER_ROLE: RoleDefinition = {
  id: 'RESTAURANT_WAITER_LEADER',
  name: 'RESTAURANT_WAITER_LEADER',
  displayName: 'Waiter Leader',
  level: 'department',
  department: 'restaurant',
  description: 'Manages waitstaff, handles complaints, assigns table sections',
  responsibilities: [
    'Manage waitstaff',
    'Assign table sections',
    'Handle customer complaints',
    'Process payments',
    'Staff scheduling',
    'Performance monitoring',
  ],
  keyPages: ['Orders', 'Table Management', 'Staff', 'Complaints', 'Payments'],
  permissions: [
    'view:orders',
    'manage:tables',
    'manage:staff',
    'handle:complaints',
    'process:payment',
    'view:reports',
  ],
  canView: ['orders', 'tables', 'staff', 'payments'],
  canCreate: ['complaint_resolution'],
  canEdit: ['order', 'table_assignment'],
  canDelete: [],
};

export const RESTAURANT_WAITER_ROLE: RoleDefinition = {
  id: 'RESTAURANT_WAITER',
  name: 'RESTAURANT_WAITER',
  displayName: 'Waiter',
  level: 'department',
  department: 'restaurant',
  description: 'Takes orders, serves food, processes table payments',
  responsibilities: [
    'Take customer orders',
    'Serve food and beverages',
    'Process table payments',
    'Clear tables',
    'Upsell items',
    'Customer service',
  ],
  keyPages: ['Orders', 'Tables', 'Payments', 'Menu'],
  permissions: [
    'view:orders',
    'create:order',
    'view:tables',
    'process:payment',
    'view:menu',
  ],
  canView: ['orders', 'tables', 'menu'],
  canCreate: ['order'],
  canEdit: ['order'],
  canDelete: [],
};

export const RESTAURANT_CASHIER_ROLE: RoleDefinition = {
  id: 'RESTAURANT_CASHIER',
  name: 'RESTAURANT_CASHIER',
  displayName: 'Cashier',
  level: 'department',
  department: 'restaurant',
  description: 'Processes payments, handles refunds, manages cash drawer',
  responsibilities: [
    'Process payments',
    'Handle refunds',
    'Manage cash drawer',
    'Generate reports',
    'Balance cash',
    'Issue receipts',
  ],
  keyPages: ['Payments', 'Refunds', 'Cash Drawer', 'Reports'],
  permissions: [
    'process:payment',
    'manage:refunds',
    'manage:cash_drawer',
    'view:reports',
    'create:report',
  ],
  canView: ['payments', 'cash_drawer', 'reports'],
  canCreate: ['report', 'refund'],
  canEdit: ['cash_drawer'],
  canDelete: [],
};

export const RESTAURANT_BARISTA_ROLE: RoleDefinition = {
  id: 'RESTAURANT_BARISTA',
  name: 'RESTAURANT_BARISTA',
  displayName: 'Barista',
  level: 'department',
  department: 'restaurant',
  description: 'Makes coffee, espresso drinks, smoothies',
  responsibilities: [
    'Prepare coffee drinks',
    'Make espresso drinks',
    'Prepare smoothies',
    'Stock beverage station',
    'Maintain equipment',
    'Follow recipes',
  ],
  keyPages: [
    'Beverage Station',
    'Coffee Orders',
    'Recipes',
    'Station Inventory',
  ],
  permissions: [
    'view:beverage_orders',
    'view:recipes',
    'manage:station',
    'mark:orders_complete',
  ],
  canView: ['orders', 'recipes', 'inventory'],
  canCreate: [],
  canEdit: ['order_status'],
  canDelete: [],
};

// BAKERY DEPARTMENT ROLES (6 Roles)
export const BAKERY_MANAGER_ROLE: RoleDefinition = {
  id: 'BAKERY_MANAGER',
  name: 'BAKERY_MANAGER',
  displayName: 'Bakery Manager',
  level: 'department',
  department: 'bakery',
  description: 'Oversees operations, manages production schedules, controls inventory',
  responsibilities: [
    'Oversee bakery operations',
    'Manage production schedules',
    'Control inventory',
    'Manage staff',
    'Quality assurance',
    'Generate reports',
  ],
  keyPages: [
    'Bakery Dashboard',
    'Production',
    'Inventory',
    'Staff Management',
    'Reports',
  ],
  permissions: [
    'view:all',
    'manage:production',
    'manage:inventory',
    'manage:staff',
    'create:report',
    'view:reports',
  ],
  canView: ['all'],
  canCreate: ['production', 'schedule', 'report'],
  canEdit: ['production', 'inventory', 'staff'],
  canDelete: [],
};

export const BAKERY_STOCK_MANAGER_ROLE: RoleDefinition = {
  id: 'BAKERY_STOCK_MANAGER',
  name: 'BAKERY_STOCK_MANAGER',
  displayName: 'Bakery Stock Manager',
  level: 'department',
  department: 'bakery',
  description: 'Manages flour, sugar, butter, coffee beans',
  responsibilities: [
    'Manage flour inventory',
    'Manage sugar inventory',
    'Manage butter inventory',
    'Track coffee beans',
    'Monitor stock levels',
    'Handle orders',
  ],
  keyPages: ['Bakery Inventory', 'Stock Movements', 'Orders', 'Reports'],
  permissions: [
    'view:inventory',
    'manage:stock',
    'create:order',
    'view:stock_movements',
    'edit:inventory',
  ],
  canView: ['inventory', 'stock', 'orders'],
  canCreate: ['order', 'stock_movement'],
  canEdit: ['inventory'],
  canDelete: [],
};

export const BAKERY_CASHIER_ROLE: RoleDefinition = {
  id: 'BAKERY_CASHIER',
  name: 'BAKERY_CASHIER',
  displayName: 'Bakery Cashier',
  level: 'department',
  department: 'bakery',
  description: 'Processes counter sales, handles pickup orders',
  responsibilities: [
    'Process sales',
    'Handle payments',
    'Manage pickup orders',
    'Process refunds',
    'Package items',
    'Customer service',
  ],
  keyPages: ['Bakery Orders', 'Payments', 'Pickups', 'Refunds'],
  permissions: [
    'view:orders',
    'create:order',
    'process:payment',
    'manage:refunds',
    'view:pickups',
  ],
  canView: ['orders', 'payments', 'pickups'],
  canCreate: ['order', 'refund'],
  canEdit: ['order'],
  canDelete: [],
};

export const BAKERY_CHEF_LEADER_ROLE: RoleDefinition = {
  id: 'BAKERY_CHEF_LEADER',
  name: 'BAKERY_CHEF_LEADER',
  displayName: 'Bakery Chef Leader',
  level: 'department',
  department: 'bakery',
  description: 'Supervises bakers, creates recipes, manages batch production',
  responsibilities: [
    'Supervise bakers',
    'Create recipes',
    'Manage batch production',
    'Quality control',
    'Staff training',
    'Schedule management',
  ],
  keyPages: [
    'Bakery Production',
    'Recipes',
    'Batch Management',
    'Staff',
    'Schedule',
  ],
  permissions: [
    'view:production',
    'manage:recipes',
    'manage:batch',
    'manage:staff',
    'create:recipe',
    'edit:recipe',
  ],
  canView: ['production', 'recipes', 'batch', 'staff'],
  canCreate: ['recipe', 'batch', 'schedule'],
  canEdit: ['recipe', 'batch', 'schedule'],
  canDelete: [],
};

export const BAKERY_CHEF_ROLE: RoleDefinition = {
  id: 'BAKERY_CHEF',
  name: 'BAKERY_CHEF',
  displayName: 'Bakery Chef',
  level: 'department',
  department: 'bakery',
  description: 'Bakes breads, pastries, cakes; tracks batch expiry',
  responsibilities: [
    'Bake breads',
    'Make pastries',
    'Bake cakes',
    'Track batch expiry',
    'Follow recipes',
    'Report issues',
  ],
  keyPages: ['Production Batches', 'Baking Tasks', 'Recipes', 'Schedule'],
  permissions: [
    'view:production',
    'view:recipes',
    'manage:batch',
    'mark:tasks_complete',
    'view:schedule',
  ],
  canView: ['production', 'recipes', 'batch'],
  canCreate: [],
  canEdit: ['batch_status'],
  canDelete: [],
};

export const BAKERY_BARISTA_ROLE: RoleDefinition = {
  id: 'BAKERY_BARISTA',
  name: 'BAKERY_BARISTA',
  displayName: 'Bakery Barista',
  level: 'department',
  department: 'bakery',
  description: 'Makes specialty coffee drinks',
  responsibilities: [
    'Prepare specialty coffee',
    'Make espresso drinks',
    'Create signature blends',
    'Stock coffee station',
    'Maintain equipment',
    'Customer service',
  ],
  keyPages: [
    'Coffee Station',
    'Beverage Orders',
    'Recipes',
    'Station Inventory',
  ],
  permissions: [
    'view:beverage_orders',
    'view:recipes',
    'manage:station',
    'mark:orders_complete',
  ],
  canView: ['orders', 'recipes', 'inventory'],
  canCreate: [],
  canEdit: ['order_status'],
  canDelete: [],
};

// DECORATION DEPARTMENT ROLES (3 Roles)
export const DECORATION_MANAGER_ROLE: RoleDefinition = {
  id: 'DECORATION_MANAGER',
  name: 'DECORATION_MANAGER',
  displayName: 'Decoration Manager',
  level: 'department',
  department: 'decoration',
  description: 'Controls inventory, manages showroom displays, sets pricing',
  responsibilities: [
    'Control inventory',
    'Manage showroom displays',
    'Set pricing',
    'Manage staff',
    'Track sales',
    'Generate reports',
  ],
  keyPages: [
    'Decoration Dashboard',
    'Showroom',
    'Inventory',
    'Pricing',
    'Reports',
  ],
  permissions: [
    'view:all',
    'manage:showroom',
    'manage:inventory',
    'manage:pricing',
    'manage:staff',
    'create:report',
  ],
  canView: ['all'],
  canCreate: ['display', 'price', 'report'],
  canEdit: ['showroom', 'inventory', 'pricing'],
  canDelete: [],
};

export const DECORATION_CASHIER_ROLE: RoleDefinition = {
  id: 'DECORATION_CASHIER',
  name: 'DECORATION_CASHIER',
  displayName: 'Decoration Cashier',
  level: 'department',
  department: 'decoration',
  description: 'Processes sales, handles gift wrapping',
  responsibilities: [
    'Process sales',
    'Handle payments',
    'Wrap gifts',
    'Process refunds',
    'Package items',
    'Customer service',
  ],
  keyPages: [
    'Decoration Sales',
    'Payments',
    'Gift Wrapping',
    'Refunds',
    'Inventory',
  ],
  permissions: [
    'view:sales',
    'create:sale',
    'process:payment',
    'manage:refunds',
    'view:inventory',
  ],
  canView: ['sales', 'payments', 'inventory'],
  canCreate: ['sale', 'refund'],
  canEdit: ['sale'],
  canDelete: [],
};

export const DECORATION_STAFF_ROLE: RoleDefinition = {
  id: 'DECORATION_STAFF',
  name: 'DECORATION_STAFF',
  displayName: 'Decoration Staff',
  level: 'department',
  department: 'decoration',
  description: 'Assists customers, restocks displays',
  responsibilities: [
    'Assist customers',
    'Restock displays',
    'Arrange items',
    'Provide recommendations',
    'Report stock issues',
    'Maintain showroom',
  ],
  keyPages: ['Showroom', 'Inventory Display', 'Sales', 'Customer Service'],
  permissions: [
    'view:showroom',
    'view:inventory',
    'report:stock_issue',
    'assist:sales',
  ],
  canView: ['showroom', 'inventory'],
  canCreate: [],
  canEdit: [],
  canDelete: [],
};

// All Roles Array
export const ALL_ROLES: RoleDefinition[] = [
  // System
  SUPER_ADMIN_ROLE,
  // General Management
  GENERAL_MANAGER_ROLE,
  ACCOUNTANT_ROLE,
  // Restaurant
  RESTAURANT_STOCK_MANAGER_ROLE,
  RESTAURANT_CHEF_LEADER_ROLE,
  RESTAURANT_CHEF_ROLE,
  RESTAURANT_WAITER_LEADER_ROLE,
  RESTAURANT_WAITER_ROLE,
  RESTAURANT_CASHIER_ROLE,
  RESTAURANT_BARISTA_ROLE,
  // Bakery
  BAKERY_MANAGER_ROLE,
  BAKERY_STOCK_MANAGER_ROLE,
  BAKERY_CASHIER_ROLE,
  BAKERY_CHEF_LEADER_ROLE,
  BAKERY_CHEF_ROLE,
  BAKERY_BARISTA_ROLE,
  // Decoration
  DECORATION_MANAGER_ROLE,
  DECORATION_CASHIER_ROLE,
  DECORATION_STAFF_ROLE,
];

// Get role by ID
export const getRoleById = (roleId: string): RoleDefinition | undefined => {
  return ALL_ROLES.find(role => role.id === roleId);
};

// Get roles by department
export const getRolesByDepartment = (department: string): RoleDefinition[] => {
  return ALL_ROLES.filter(role => role.department === department);
};

// Get roles by level
export const getRolesByLevel = (level: 'system' | 'general' | 'department'): RoleDefinition[] => {
  return ALL_ROLES.filter(role => role.level === level);
};
