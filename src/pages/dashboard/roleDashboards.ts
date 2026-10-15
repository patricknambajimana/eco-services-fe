import type { ComponentType } from 'react';
import type { Role } from '@/types';
import SuperAdminDashboard from './roles/SuperAdminDashboard';
import GeneralManagerDashboard from './roles/GeneralManagerDashboard';
import AccountantDashboard from './roles/AccountantDashboard';
import DepartmentManagerDashboard from './roles/DepartmentManagerDashboard';
import StockManagerDashboard from './roles/StockManagerDashboard';
import CashierDashboard from './roles/CashierDashboard';
import ChefLeaderDashboard from './roles/ChefLeaderDashboard';
import ChefDashboard from './roles/ChefDashboard';
import WaiterLeaderDashboard from './roles/WaiterLeaderDashboard';
import WaiterDashboard from './roles/WaiterDashboard';
import BaristaDashboard from './roles/BaristaDashboard';
import DecorationStaffDashboard from './roles/DecorationStaffDashboard';

export const ROLE_DASHBOARDS: Partial<Record<Role, ComponentType>> = {
    SUPER_ADMIN: SuperAdminDashboard,
    GENERAL_MANAGER: GeneralManagerDashboard,
    ACCOUNTANT: AccountantDashboard,

    RESTAURANT_MANAGER: DepartmentManagerDashboard,
    RESTAURANT_STOCK_MANAGER: StockManagerDashboard,
    RESTAURANT_CHEF_LEADER: ChefLeaderDashboard,
    RESTAURANT_CHEF: ChefDashboard,
    RESTAURANT_WAITER_LEADER: WaiterLeaderDashboard,
    RESTAURANT_WAITER: WaiterDashboard,
    RESTAURANT_CASHIER: CashierDashboard,
    RESTAURANT_BARISTA: BaristaDashboard,

    BAKERY_MANAGER: DepartmentManagerDashboard,
    BAKERY_STOCK_MANAGER: StockManagerDashboard,
    BAKERY_CASHIER: CashierDashboard,
    BAKERY_CHEF_LEADER: ChefLeaderDashboard,
    BAKERY_CHEF: ChefDashboard,
    BAKERY_BARISTA: BaristaDashboard,

    DECORATION_MANAGER: DepartmentManagerDashboard,
    DECORATION_CASHIER: CashierDashboard,
    DECORATION_STAFF: DecorationStaffDashboard,
};