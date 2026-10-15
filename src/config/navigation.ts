import {
    ArrowLeftRight, BarChart3, CalendarDays, ChefHat, ClipboardList, Gift, KeyRound,
    LayoutDashboard, LayoutGrid, Package, PlusCircle, Settings, ShoppingCart, Store,
    Truck, UtensilsCrossed, Users, Wheat,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Role } from '@/types';
import { ACCESS } from './access';

export interface NavItem {
    label: string; path: string; icon: LucideIcon; section: string; roles: Role[] | 'ALL';
}

export const NAV_ITEMS: NavItem[] = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, section: 'Overview', roles: 'ALL' },
    { label: 'Orders', path: '/orders', icon: ShoppingCart, section: 'Operations', roles: ACCESS.orders },
    { label: 'New Order', path: '/orders/new', icon: PlusCircle, section: 'Operations', roles: ACCESS.createOrder },
    { label: 'Kitchen', path: '/restaurant/kitchen', icon: ChefHat, section: 'Operations', roles: ACCESS.kitchen },
    { label: 'Tables', path: '/restaurant/tables', icon: LayoutGrid, section: 'Operations', roles: ACCESS.tables },
    { label: 'Menu', path: '/restaurant/menu', icon: UtensilsCrossed, section: 'Operations', roles: ACCESS.menu },
    { label: 'Production Batches', path: '/bakery/batches', icon: Wheat, section: 'Operations', roles: ACCESS.batches },
    { label: 'Showroom', path: '/decoration/showroom', icon: Store, section: 'Operations', roles: ACCESS.showroom },
    { label: 'Gift Services', path: '/decoration/gifts', icon: Gift, section: 'Operations', roles: ACCESS.gifts },
    { label: 'Inventory', path: '/inventory', icon: Package, section: 'Inventory', roles: ACCESS.inventory },
    { label: 'Stock Movements', path: '/inventory/movements', icon: ArrowLeftRight, section: 'Inventory', roles: ACCESS.movements },
    { label: 'Requisitions', path: '/inventory/requisitions', icon: ClipboardList, section: 'Inventory', roles: ACCESS.requisitions },
    { label: 'Suppliers', path: '/inventory/suppliers', icon: Truck, section: 'Inventory', roles: ACCESS.suppliers },
    { label: 'Staff', path: '/staff', icon: Users, section: 'People', roles: ACCESS.staff },
    { label: 'Credentials', path: '/staff/credentials', icon: KeyRound, section: 'People', roles: ACCESS.credentials },
    { label: 'Schedule', path: '/staff/schedule', icon: CalendarDays, section: 'People', roles: ACCESS.schedule },
    { label: 'Reports', path: '/reports', icon: BarChart3, section: 'Insights', roles: ACCESS.reports },
    { label: 'Settings', path: '/settings', icon: Settings, section: 'System', roles: 'ALL' },
];