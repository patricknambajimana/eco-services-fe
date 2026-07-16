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
    </BrowserRouter>
  );
}

export default App;