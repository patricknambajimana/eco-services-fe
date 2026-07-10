import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Shield, 
  FileText, 
  Activity, 
  Settings,
  Home,
  Bell,
  ChevronDown,
  Menu,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';

// Mock Data
const mockStats = {
  totalUsers: 156,
  activeUsers: 142,
  totalBusinesses: 12,
  activeBusinesses: 10,
  totalRevenue: 28450,
  totalOrders: 234,
  growth: 15.2,
};

const mockRecentActivity = [
  { id: 1, user: 'John Doe', action: 'Created new user', time: '2 min ago', type: 'user' },
  { id: 2, user: 'Sarah Johnson', action: 'Updated business settings', time: '15 min ago', type: 'business' },
  { id: 3, user: 'Robert Chen', action: 'Assigned new role', time: '1 hour ago', type: 'role' },
  { id: 4, user: 'Emily Davis', action: 'Generated revenue report', time: '3 hours ago', type: 'report' },
  { id: 5, user: 'Michael Park', action: 'Logged in from new device', time: '5 hours ago', type: 'system' },
];

const mockBusinesses = [
  { id: 1, name: 'Downtown Bistro', type: 'restaurant', status: 'active', revenue: 12430, orders: 156, manager: 'John Smith' },
  { id: 2, name: 'Artisan Bakery', type: 'bakery', status: 'active', revenue: 2890, orders: 78, manager: 'Sarah Johnson' },
  { id: 3, name: 'Elegant Decor', type: 'decoration', status: 'active', revenue: 1110, orders: 33, manager: 'Emily Davis' },
  { id: 4, name: 'Grand Plaza', type: 'mixed', status: 'active', revenue: 21560, orders: 234, manager: 'Robert Wilson' },
  { id: 5, name: 'Coffee & Pastry', type: 'bakery', status: 'inactive', revenue: 0, orders: 0, manager: 'Lisa Park' },
];

export const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const statsCards = [
    { title: 'Total Users', value: mockStats.totalUsers, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Active Users', value: mockStats.activeUsers, icon: Users, color: 'text-green-500', bg: 'bg-green-50' },
    { title: 'Businesses', value: mockStats.totalBusinesses, icon: Building2, color: 'text-restaurant-500', bg: 'bg-restaurant-50' },
    { title: 'Total Revenue', value: `$${mockStats.totalRevenue.toLocaleString()}`, icon: FileText, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  const navItems = [
    { path: '/super-admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/super-admin/users', label: 'Users', icon: Users },
    { path: '/super-admin/businesses', label: 'Businesses', icon: Building2 },
    { path: '/super-admin/roles', label: 'Roles & Permissions', icon: Shield },
    { path: '/super-admin/reports', label: 'Reports', icon: FileText },
    { path: '/super-admin/activity', label: 'Activity Log', icon: Activity },
    { path: '/super-admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-50
        w-64 h-screen bg-gradient-to-b from-restaurant-900 to-restaurant-800
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex flex-col h-full text-white">
          {/* Brand */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <div>
                <span className="text-xl font-bold">NPGROUP</span>
                <span className="block text-xs text-white/60">Super Admin</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.path}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors">
              <Home className="h-5 w-5" />
              <span className="font-medium">Back to Store</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <header className="bg-white/95 backdrop-blur border-b sticky top-0 z-40">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">3</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-restaurant-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-restaurant-600" />
                    </div>
                    <span className="hidden sm:inline text-sm font-medium">{user?.name || 'Admin'}</span>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 md:p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
            {statsCards.map((stat, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
                  <div className={`${stat.bg} p-2 rounded-lg`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <p className="text-xs text-green-600 mt-1">↑ {mockStats.growth}% from last month</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Businesses Overview */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Businesses Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockBusinesses.map((business) => (
                  <div key={business.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{business.name}</h4>
                        <p className="text-sm text-gray-500 capitalize">{business.type}</p>
                      </div>
                      <Badge className={business.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}>
                        {business.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t">
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Revenue</p>
                        <p className="text-sm font-semibold">${business.revenue}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Orders</p>
                        <p className="text-sm font-semibold">{business.orders}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Manager</p>
                        <p className="text-sm font-semibold truncate">{business.manager}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                    <div className="w-8 h-8 bg-restaurant-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Activity className="h-4 w-4 text-restaurant-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">by {activity.user} • {activity.time}</p>
                    </div>
                    <Badge variant="outline" className="capitalize">{activity.type}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};