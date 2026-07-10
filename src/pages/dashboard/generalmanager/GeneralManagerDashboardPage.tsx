import { LayoutDashboard, Building2, Users, BarChart3, Settings, FileText } from 'lucide-react';
import { AdminLayout } from '@/components/dashboard/superadmin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock data for General Manager
const mockManagerStats = {
  assignedBusinesses: 3,
  activeStaff: 28,
  revenue: 16430,
  orders: 267,
  avgRating: 4.7,
};

const mockManagedBusinesses = [
  { id: '1', name: 'Downtown Bistro', type: 'restaurant', status: 'active', revenue: 12430, orders: 156, staff: 15 },
  { id: '2', name: 'Coffee & Pastry', type: 'bakery', status: 'active', revenue: 2890, orders: 78, staff: 8 },
  { id: '3', name: 'Elegant Decor', type: 'decoration', status: 'active', revenue: 1110, orders: 33, staff: 5 },
];

const generalManagerNavItems = [
  { path: '/general-manager', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/general-manager/businesses', label: 'My Businesses', icon: Building2 },
  { path: '/general-manager/staff', label: 'Staff Management', icon: Users },
  { path: '/general-manager/reports', label: 'Reports', icon: BarChart3 },
  { path: '/general-manager/settings', label: 'Settings', icon: Settings },
];

export const GeneralManagerDashboardPage = () => {
  const statsCards = [
    { title: 'Managed Businesses', value: mockManagerStats.assignedBusinesses, icon: Building2, color: 'text-restaurant-500', bg: 'bg-restaurant-50' },
    { title: 'Active Staff', value: mockManagerStats.activeStaff, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Total Revenue', value: `$${mockManagerStats.revenue.toLocaleString()}`, icon: FileText, color: 'text-green-500', bg: 'bg-green-50' },
    { title: 'Avg Rating', value: `${mockManagerStats.avgRating}★`, icon: BarChart3, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  ];

  return (
    <AdminLayout
      title="General Manager Dashboard"
      subtitle="Manage your assigned businesses and staff"
      navItems={generalManagerNavItems}
    >
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
                  <p className="text-xs text-green-600 mt-1">↑ Updated today</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* My Businesses */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">My Businesses</CardTitle>
                <p className="text-sm text-gray-600 mt-1">Businesses assigned to you</p>
              </div>
              <button className="px-4 py-2 bg-restaurant-600 text-white rounded-lg hover:bg-restaurant-700 transition-colors text-sm font-medium">
                Add Business
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-900">Business Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-900">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-900">Revenue</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-900">Orders</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-900">Staff</th>
                  </tr>
                </thead>
                <tbody>
                  {mockManagedBusinesses.map((business) => (
                    <tr key={business.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{business.name}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="capitalize text-sm text-gray-600">{business.type}</span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={business.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}>
                          {business.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-gray-900">${business.revenue.toLocaleString()}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-600">{business.orders}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-600">{business.staff}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-restaurant-50 rounded-lg">
                  <Building2 className="h-6 w-6 text-restaurant-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">View All Businesses</p>
                  <p className="text-sm text-gray-600">Manage business details</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Manage Staff</p>
                  <p className="text-sm text-gray-600">28 staff members</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">View Reports</p>
                  <p className="text-sm text-gray-600">Performance analytics</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};
