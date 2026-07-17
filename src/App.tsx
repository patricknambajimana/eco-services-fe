import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { LandingPage } from './pages/landingPage';
import { LoginPage } from '@/pages/auth/loginPage';
import { RegisterPage } from '@/pages/auth/registerPage';
import { HomePage } from '@/pages/Home/HomePage';
import { AdminLayout } from '@/components/dashboard/superadmin/AdminLayout';
import { SettingsPage } from './pages/dashboard/superadmin/SettingPage';
import ActivityLogPage from './pages/dashboard/superadmin/ActivityLogPage';
import { BusinessesPage } from '@/pages/business/businessPage';
import { ManagersPage } from '@/pages/dashboard/superadmin/managersPage'; // moved from generalmanager/ path
import { UsersPage } from '@/pages/users/usersPage';
import { RolesPage } from '@/pages/roles/rolesPage';
import DashboardOverview from './pages/dashboard/superadmin/DashboardOverview';

import { GeneralManagerDashboardPage } from '@/pages/dashboard/generalmanager/GeneralManagerDashboardPage';
import { ManagersPageContainer } from '@/pages/dashboard/generalmanager/ManagersPageContainer';
import { DepartmentsPage } from '@/pages/dashboard/generalmanager/DepartmentsPage';
import { ReportsPage } from '@/pages/dashboard/generalmanager/ReportsPage';
import { GeneralManagerSettingsPage } from '@/pages/dashboard/generalmanager/GeneralManagerSettingsPage';
import { GeneralManagerActivityPage } from '@/pages/dashboard/generalmanager/GeneralManagerActivityPage';

import { LayoutDashboard, Users, Building2, Shield, Activity, Settings, BarChart3 } from 'lucide-react';

const superAdminNavItems = [
  { path: '/superadmin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/superadmin/businesses', label: 'Businesses', icon: Building2 },
  { path: '/superadmin/managers', label: 'Managers', icon: Users },
  { path: '/superadmin/users', label: 'Users', icon: Users },
  { path: '/superadmin/roles', label: 'Roles & Permissions', icon: Shield },
  { path: '/superadmin/activity', label: 'Activity Log', icon: Activity }, // sees EVERYTHING, incl. GM
  { path: '/superadmin/settings', label: 'Settings', icon: Settings },
];

// GM: manages businesses/departments + assigns roles, sees activity across
// Restaurant/Bakery/Decoration — but no system-level "Activity Log" (that's SuperAdmin-only)
const generalManagerNavItems = [
  { path: '/generalmanager', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/generalmanager/departments', label: 'Businesses', icon: Building2 },
  { path: '/generalmanager/managers', label: 'Managers', icon: Users },
  { path: '/generalmanager/reports', label: 'Reports', icon: BarChart3 },
  { path: '/generalmanager/activity', label: 'Business Activity', icon: Activity },
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

        {/* SUPER ADMIN — sees all departments + system-level activity */}
        <Route
          path="/superadmin"
          element={
            <AdminLayout
              navItems={superAdminNavItems}
              title="Dashboard"
              subtitle="Welcome back! Here's an overview of your system"
            />
          }
        >
          <Route index element={<DashboardOverview />} />
          <Route path="businesses" element={<BusinessesPage />} />
          <Route path="managers" element={<ManagersPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="roles" element={<RolesPage />} />
          <Route path="activity" element={<ActivityLogPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* GENERAL MANAGER — same layout/theme, scoped nav + scoped activity */}
        <Route
          path="/generalmanager"
          element={
            <AdminLayout
              navItems={generalManagerNavItems}
              title="Dashboard"
              subtitle="Welcome! Here's your business overview"
            />
          }
        >
          <Route index element={<GeneralManagerDashboardPage />} />
          <Route path="departments" element={<DepartmentsPage />} />
          <Route path="departments/:department" element={<DepartmentsPage />} />
          <Route path="managers" element={<ManagersPageContainer />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="activity" element={<GeneralManagerActivityPage />} />
          <Route path="settings" element={<GeneralManagerSettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;