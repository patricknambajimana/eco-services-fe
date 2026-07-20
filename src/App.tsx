// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { LandingPage } from './pages/landingPage';
import { LoginPage } from '@/pages/auth/loginPage';
import { RegisterPage } from '@/pages/auth/registerPage';
import { HomePage } from '@/pages/Home/HomePage';
import { AdminLayout } from '@/components/dashboard/superadmin/AdminLayout';
import { SettingsPage } from './pages/dashboard/superadmin/SettingPage';
import ActivityLogPage from './pages/dashboard/superadmin/ActivityLogPage';
import { BusinessesPage } from '@/pages/business/businessPage';
import { ManagersPage } from '@/pages/dashboard/managers/managerPage';
import { UsersPage } from '@/pages/users/usersPage';
import { RolesPage } from '@/pages/roles/rolesPage';

import { LayoutDashboard, Users, Building2, Shield, Activity, Settings } from 'lucide-react';
import DashboardOverview from './pages/dashboard/superadmin/DashboardOverview';
import { RestaurantLayout } from '@/components/dashboard/restaurant/restaurantLayout';
import { RestaurantDashboardPage } from '@/pages/dashboard/restaurant/restaurantDashboardPage';
import { RestaurantPageGuard } from '@/components/auth/restaurantPageGuard';
import { TablesPage } from '@/pages/dashboard/restaurant/TablesPage';
import { OrdersPage } from '@/pages/dashboard/restaurant/OrdersPage';
import { RestaurantStaffPage } from '@/pages/dashboard/restaurant/RestaurantStaffPage';
import { KitchenDashboardPage } from '@/pages/dashboard/restaurant/KitchenDashboardPage';
import { KitchenTasksPage } from '@/pages/kitchen/KitchenTasksPage';
import { StationInventoryPage } from '@/pages/kitchen/StationInventoryPage';
import { RecipesPage } from '@/pages/kitchen/RecipesPage';
import { PreparationSchedulePage } from '@/pages/kitchen/PreparationSchedulePage';




const superAdminNavItems = [
  { path: '/superadmin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/superadmin/businesses', label: 'Businesses', icon: Building2 },
  { path: '/superadmin/managers', label: 'Managers', icon: Users },
  { path: '/superadmin/users', label: 'Users', icon: Users },
  { path: '/superadmin/roles', label: 'Roles & Permissions', icon: Shield },
  { path: '/superadmin/activity', label: 'Activity Log', icon: Activity },
  { path: '/superadmin/settings', label: 'Settings', icon: Settings },
];

const generalManagerNavItems = [
  { path: '/generalmanager', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/generalmanager/businesses', label: 'My Businesses', icon: Building2 },
  { path: '/generalmanager/staff', label: 'Staff Management', icon: Users },
  { path: '/generalmanager/settings', label: 'Settings', icon: Settings },
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login/home" element={<HomePage />} />

        <Route
          path="/superadmin"
          element={<AdminLayout navItems={superAdminNavItems} title="Dashboard" subtitle="Welcome back! Here's an overview of your system" />}
        >
          <Route index element={<DashboardOverview />} />
          <Route path="businesses" element={<BusinessesPage />} />
          <Route path="managers" element={<ManagersPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="roles" element={<RolesPage />} />
          <Route path="activity" element={<ActivityLogPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
 

        <Route
          path="/generalmanager"
          element={<AdminLayout navItems={generalManagerNavItems} title="Dashboard" subtitle="Welcome! Here's your business overview" />}
        >
          <Route index element={<DashboardOverview />} />
          <Route path="businesses" element={<BusinessesPage />} />
          <Route path="staff" element={<UsersPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
     {/* //restaurant  */}
      <Route path="/restaurant" element={<RestaurantLayout />}>
        <Route index element={<RestaurantDashboardPage />} />
        <Route element={<RestaurantPageGuard page="ORDERS" />}>
          <Route path="orders" element={<OrdersPage />} />
        </Route>
        <Route element={<RestaurantPageGuard page="TABLES" />}>
          <Route path="tables" element={<TablesPage />} />
        </Route>
        <Route element={<RestaurantPageGuard page="STAFF_MANAGEMENT" />}>
          <Route path="staff" element={<RestaurantStaffPage />} />
        </Route>
         <Route element={<RestaurantPageGuard page="KITCHEN_DASHBOARD" />}>
          <Route path="kitchen" element={<KitchenDashboardPage />} />
          
        </Route>
        <Route element={<RestaurantPageGuard page="KITCHEN_TASKS" />}>
    <Route path="kitchen/tasks" element={<KitchenTasksPage />} />
  </Route>
  
  <Route element={<RestaurantPageGuard page="STATION_INVENTORY" />}>
    <Route path="kitchen/station-inventory" element={<StationInventoryPage />} />
  </Route>
  
  <Route element={<RestaurantPageGuard page="RECIPES" />}>
    <Route path="kitchen/recipes" element={<RecipesPage />} />
  </Route>
  
  <Route element={<RestaurantPageGuard page="PREPARATION_SCHEDULE" />}>
    <Route path="kitchen/schedule" element={<PreparationSchedulePage />} />
  </Route>
  
 {/* Add more kitchen routes as we build them */}
  {/* <Route element={<RestaurantPageGuard page="KITCHEN_TASKS" />}>
    <Route path="kitchen/tasks" element={<KitchenTasksPage />} />
  </Route> */}
        
</Route>

Flagged, not glossed over: CreateOrderDialog currently hardcodes every item's station: 'KITCHEN' — but your doc splits food (Kitchen) from drinks (Barista), and a real order will have both. Once your MenuItem type/backend has a category or station field per item, that line needs to derive the correct station instead of hardcoding it — otherwise beverage orders will never route to the Barista's BEVERAGE_ORDERS page. Want me to add a category/station field to MenuItem now, or hold off until we build the Kitchen/Barista groups next (which is probably the more natural time to fix it)?

You are out of free me
    </BrowserRouter>
  );
}

export default App;