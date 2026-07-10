// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Page imports
import { LandingPage } from './pages/landingPage';
import { LoginPage } from '@/pages/auth/loginPage';
import { RegisterPage } from '@/pages/auth/registerPage';
import { HomePage } from '@/pages/Home/HomePage';

// Admin Layout
import { AdminLayout } from '@/components/dashboard/superadmin/AdminLayout';

// Admin panel pages
import { BusinessesPage } from '@/pages/business/businessPage';
import { ManagersPage } from '@/pages/dashboard/managers/managerPage';
import { UsersPage } from '@/pages/users/usersPage';
import { RolesPage } from '@/pages/roles/rolesPage';

// Icons for navigation
import { LayoutDashboard, Users, Building2, Shield, Activity } from 'lucide-react';

// Mock Dashboard component for demo
const SuperAdminDashboard = () => {
  const mockStats = {
    totalUsers: 156,
    activeUsers: 142,
    totalBusinesses: 12,
    activeBusinesses: 10,
    totalRevenue: 28450,
    totalOrders: 234,
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{mockStats.totalUsers}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg"><Users className="h-6 w-6 text-blue-500" /></div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Users</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{mockStats.activeUsers}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg"><Users className="h-6 w-6 text-green-500" /></div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Businesses</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{mockStats.totalBusinesses}</p>
            </div>
            <div className="bg-restaurant-50 p-3 rounded-lg"><Building2 className="h-6 w-6 text-restaurant-500" /></div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">${mockStats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg"><LayoutDashboard className="h-6 w-6 text-purple-500" /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const superAdminNavItems = [
  { path: '/super-admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/super-admin/businesses', label: 'Businesses', icon: Building2 },
  { path: '/super-admin/managers', label: 'Managers', icon: Users },
  { path: '/super-admin/users', label: 'Users', icon: Users },
  { path: '/super-admin/roles', label: 'Roles & Permissions', icon: Shield },
  { path: '/super-admin/activity', label: 'Activity Log', icon: Activity },
];

const generalManagerNavItems = [
  { path: '/general-manager', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/general-manager/businesses', label: 'My Businesses', icon: Building2 },
  { path: '/general-manager/staff', label: 'Staff Management', icon: Users },
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login/home" element={<HomePage />} />

        {/* Super Admin Nested Routes */}
        <Route
          path="/super-admin"
          element={<AdminLayout navItems={superAdminNavItems} title="Dashboard" subtitle="Welcome back! Here's an overview of your system" />}
        >
          <Route index element={<SuperAdminDashboard />} />
          <Route path="businesses" element={<BusinessesPage />} />
          <Route path="managers" element={<ManagersPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="roles" element={<RolesPage />} />
        </Route>

        {/* General Manager Nested Routes */}
        <Route
          path="/general-manager"
          element={<AdminLayout navItems={generalManagerNavItems} title="Dashboard" subtitle="Welcome! Here's your business overview" />}
        >
          <Route index element={<SuperAdminDashboard />} />
          <Route path="businesses" element={<BusinessesPage />} />
          <Route path="staff" element={<UsersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;