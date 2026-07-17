// ============================================================
// SHARED ENUMS
// ============================================================

export type Department = 'RESTAURANT' | 'BAKERY' | 'DECORATION';

export type EntityStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'ON_LEAVE';

export type RoleLevel = 'SYSTEM' | 'GENERAL' | 'DEPARTMENT';

export type AnyRole =
  | 'SUPER_ADMIN'
  | 'GENERAL_MANAGER'
  | 'ACCOUNTANT'
  // Restaurant
  | 'RESTAURANT_MANAGER'
  | 'RESTAURANT_CHEF_LEADER'
  | 'RESTAURANT_CHEF'
  | 'RESTAURANT_WAITER_LEADER'
  | 'RESTAURANT_WAITER'
  | 'RESTAURANT_CASHIER'
  | 'RESTAURANT_BARISTA'
  | 'RESTAURANT_STOCK_MANAGER'
  // Bakery
  | 'BAKERY_MANAGER'
  | 'BAKERY_STOCK_MANAGER'
  | 'BAKERY_CASHIER'
  | 'BAKERY_CHEF_LEADER'
  | 'BAKERY_CHEF'
  | 'BAKERY_BARISTA'
  // Decoration
  | 'DECORATION_MANAGER'
  | 'DECORATION_CASHIER'
  | 'DECORATION_STAFF';

// ============================================================
// CORE IDENTITY — single source of truth for a person.
// Manager / RoleAssignment / ActivityLog all reference userId,
// never duplicate name/email — join at query/display time.
// ============================================================

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  status: EntityStatus;
  joinedDate: string;
  lastLogin?: string;
}

// ============================================================
// DEPARTMENT — replaces "Business". One row per fixed department.
// If you later need multiple physical locations per department,
// add a separate `Location { id, departmentId, name, address }`
// entity rather than duplicating fields here.
// ============================================================

export interface DepartmentInfo {
  id: string;
  type: Department;
  name: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  managerId?: string; // -> User.id
  staffCount: number;
  revenue: number;
  orders: number;
  rating: number;
  lastActive: string;
  settings: {
    operatingHours: string;
    deliveryRadius?: number;
    deliveryFee?: number;
  };
}

// ============================================================
// ROLE — one permission model (flat strings), one taxonomy field.
// ============================================================

export interface Role {
  id: string;
  name: AnyRole;
  displayName: string;
  level: RoleLevel;               // replaces both old `type` + `level`
  department?: Department;        // only set when level === 'DEPARTMENT'
  description: string;
  responsibilities: string[];
  keyPages: string[];
  // flat permission strings, e.g. "orders:view", "orders:create",
  // "inventory:edit", "staff:delete" — one system, easy to check:
  // hasPermission(user, "orders:create")
  permissions: string[];
  assignedCount: number;
  createdAt: string;
}

// ============================================================
// MANAGER — a User currently occupying a management role.
// References User by id; does not duplicate name/email.
// ============================================================

export interface Manager {
  id: string;
  userId: string;              // -> User.id
  departmentId: string;        // -> DepartmentInfo.id
  department: Department;
  role: AnyRole;
  status: EntityStatus;
  assignedDate: string;
  permissions: string[];
}

// ============================================================
// ROLE ASSIGNMENT — GM assigns dept + role to a user.
// This is what login routing reads to send a user straight
// into their department UI (DepartmentGate).
// ============================================================

export interface RoleAssignment {
  id: string;
  userId: string;               // -> User.id
  departmentId: string;         // -> DepartmentInfo.id
  department: Department;
  roleId: string;               // -> Role.id
  role: AnyRole;
  roleLevel: RoleLevel;
  assignedBy: string;           // -> User.id of the assigner
  assignedDate: string;
  status: EntityStatus;
  canAssignRoles: boolean;      // e.g. Dept Manager can assign sub-roles
  assignableRoles: AnyRole[];   // roles this user is allowed to hand out
}

export interface RoleAssignmentLog {
  id: string;
  assignmentId: string;         // -> RoleAssignment.id
  action: 'CREATED' | 'UPDATED' | 'DELETED' | 'SUSPENDED' | 'REACTIVATED';
  performedBy: string;          // -> User.id
  performedByRole: AnyRole;
  timestamp: string;
  changes: string;
}

// ============================================================
// REPORTS
// ============================================================

export interface DepartmentReport {
  id: string;
  departmentId: string;         // -> DepartmentInfo.id
  department: Department;
  period: string;
  revenue: {
    total: number;
    growth: number;
    breakdown: Record<string, number>;
  };
  orders: {
    total: number;
    growth: number;
    average: number;
  };
  staff: {
    total: number;
    active: number;
    turnover: number;
  };
  performance: {
    rating: number;
    completedOrders: number;
    cancelledOrders: number;
    avgPreparationTime: number;
  };
}

// ============================================================
// ACTIVITY LOG — references User by id, not a duplicated name.
// ============================================================

export interface ActivityLog {
  id: string;
  userId: string;                // -> User.id
  userRole: AnyRole;
  departmentId: string;          // -> DepartmentInfo.id
  department: Department;
  action: string;
  details: string;
  timestamp: string;
  type: 'DEPARTMENT' | 'MANAGER' | 'ROLE' | 'REPORT' | 'SYSTEM';
}

// ============================================================
// GENERAL STATS — pure aggregate numbers only.
// Fetch DepartmentInfo[] / ActivityLog[] via separate queries
// (e.g. useDepartments(), useRecentActivity()) so this stays light.
// ============================================================

export interface GeneralStats {
  totalDepartments: number;
  activeDepartments: number;
  totalManagers: number;
  activeManagers: number;
  totalRevenue: number;
  totalOrders: number;
  growthRate: number;
  performance: {
    avgRating: number;
    completionRate: number;
    growthRate: number;
  };
}

// ============================================================
// FILTERS (used by UsersTable / ManagersFilters / etc.)
// ============================================================

export interface UserFilters {
  search: string;
  department: Department | 'all';
  status: EntityStatus | 'all';
}

export interface ManagerFilters {
  search: string;
  status: EntityStatus | 'all';
  role: AnyRole | 'all';
  department: Department | 'all';
}
export interface ManagerFormData {
  name: string;
  email: string;
  phone: string;
  departmentId: string;
  role: AnyRole | '';
  status: EntityStatus;
}