import { Users, Building2, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

const mockBusinesses = [
  { id: 1, name: 'Downtown Bistro', type: 'restaurant', status: 'active', revenue: 12430, orders: 156, manager: 'John Smith' },
  { id: 2, name: 'Artisan Bakery', type: 'bakery', status: 'active', revenue: 2890, orders: 78, manager: 'Sarah Johnson' },
  { id: 3, name: 'Elegant Decor', type: 'decoration', status: 'active', revenue: 1110, orders: 33, manager: 'Emily Davis' },
  { id: 4, name: 'Grand Plaza', type: 'mixed', status: 'active', revenue: 21560, orders: 234, manager: 'Robert Wilson' },
  { id: 5, name: 'Coffee & Pastry', type: 'bakery', status: 'inactive', revenue: 0, orders: 0, manager: 'Lisa Park' },
];

// This component is kept for reference but not currently used in App.tsx
// The dashboard content is now rendered directly via App.tsx nested routes with AdminLayout
export const SuperAdminDashboardPage = () => {
  const statsCards = [
    { title: 'Total Users', value: mockStats.totalUsers, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Active Users', value: mockStats.activeUsers, icon: Users, color: 'text-green-500', bg: 'bg-green-50' },
    { title: 'Businesses', value: mockStats.totalBusinesses, icon: Building2, color: 'text-restaurant-500', bg: 'bg-restaurant-50' },
    { title: 'Total Revenue', value: `$${mockStats.totalRevenue.toLocaleString()}`, icon: FileText, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <div className={`${stat.bg} p-2 rounded-lg`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <p className="text-xs text-green-600 mt-1">↑ 15.2% from last month</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Businesses Overview */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Businesses Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockBusinesses.map((business) => (
                <div key={business.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{business.name}</h3>
                      <p className="text-xs text-gray-600 capitalize">{business.type}</p>
                    </div>
                    <Badge className={business.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}>
                      {business.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-600">Revenue</p>
                      <p className="font-semibold text-gray-900">${business.revenue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Orders</p>
                      <p className="font-semibold text-gray-900">{business.orders}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Manager</p>
                      <p className="font-semibold text-gray-900 truncate">{business.manager}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Active Businesses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-restaurant-600">{mockStats.activeBusinesses}</div>
              <p className="text-xs text-gray-600 mt-2">Out of {mockStats.totalBusinesses} total</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{mockStats.totalOrders}</div>
              <p className="text-xs text-gray-600 mt-2">This month</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Growth Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{mockStats.growth}%</div>
              <p className="text-xs text-gray-600 mt-2">Month over month</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };
