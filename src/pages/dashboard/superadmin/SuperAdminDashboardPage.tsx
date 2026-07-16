// pages/SuperAdminDashboard.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminSidebar } from "@/components/dashboard/superadmin/AdminSidebar";
import AdminHeader from "@/components/dashboard/superadmin/AdminHeader";
import { StatsCard } from "@/components/dashboard/superadmin/StatsCard";
import { BusinessCard } from "@/components/dashboard/superadmin/BusinessCard";
import { RecentActivity } from "@/components/dashboard/superadmin/RecentActivity";
import { 
  Users, 
  Building2, 
  DollarSign, 
  ShoppingBag,
  TrendingUp,
  Clock,
  CheckCircle,
  Activity,
  ArrowUp,
  LayoutDashboard,
  Shield,
  FileText,
  Settings
} from "lucide-react";
import { statsCards, businesses, activities } from "@/data/adminMockData";
import { useAuth } from "@/hooks/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const superAdminNavItems = [
  { path: '/superadmin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/superadmin/users', label: 'Users', icon: Users },
  { path: '/superadmin/businesses', label: 'Businesses', icon: Building2 },
  { path: '/superadmin/roles', label: 'Roles & Permissions', icon: Shield },
  { path: '/superadmin/reports', label: 'Reports', icon: FileText },
  { path: '/superadmin/activity', label: 'Activity Log', icon: Activity },
  { path: '/superadmin/settings', label: 'Settings', icon: Settings },
];

export default function SuperAdminDashboard() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleViewBusiness = (id: string) => {
    console.log('View business:', id);
  };

  const handleManageBusiness = (id: string) => {
    navigate(`/superadmin/businesses/${id}`);
  };

  const handleViewAllActivity = () => {
    navigate('/superadmin/activity');
  };

  // Stats with icons and colors
  const statsWithIcons = [
    {
      title: 'Total Users',
      value: statsCards.totalUsers,
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      change: '+12.5%',
      subtitle: `${statsCards.activeUsers} active`
    },
    {
      title: 'Total Businesses',
      value: statsCards.totalBusinesses,
      icon: Building2,
      color: 'text-indigo-600',
      bg: 'bg-indigo-100',
      change: '+8.3%',
      subtitle: `${statsCards.activeBusinesses} active`
    },
    {
      title: 'Total Revenue',
      value: `$${statsCards.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-emerald-600',
      bg: 'bg-emerald-100',
      change: `+${statsCards.growth}%`,
      subtitle: `${statsCards.totalOrders} orders`
    },
    {
      title: 'Total Orders',
      value: statsCards.totalOrders,
      icon: ShoppingBag,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
      change: '+15.7%',
      subtitle: '↑ 12% from last month'
    },
  ];

  // Quick stats
  const quickStats = [
    { 
      label: 'Pending Approvals', 
      value: statsCards.pendingApprovals, 
      icon: Clock,
      color: 'text-amber-600',
      bg: 'bg-amber-100'
    },
    { 
      label: 'Recent Signups', 
      value: statsCards.recentSignups, 
      icon: CheckCircle,
      color: 'text-emerald-600',
      bg: 'bg-emerald-100'
    },
    { 
      label: 'Active Users', 
      value: `${Math.round((statsCards.activeUsers / statsCards.totalUsers) * 100)}%`,
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      <AdminSidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        navItems={superAdminNavItems}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        onLogout={handleLogout}
      />

      <div
        className={cn(
          "flex-1 min-h-screen transition-all duration-300",
          collapsed ? "lg:ml-20" : "lg:ml-64"
        )}
      >
        <AdminHeader
          openMenu={() => setSidebarOpen(true)}
          logout={handleLogout}
          settingsPath="/superadmin/settings"
        />

        <main className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Welcome back, {user?.name || 'Admin'} 👋
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Here's what's happening with your business today.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 border-gray-200 hover:bg-gray-100"
              >
                <TrendingUp className="h-4 w-4" />
                Export Report
              </Button>
              <Button 
                size="sm" 
                className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-600/20"
              >
                <Building2 className="h-4 w-4" />
                Add Business
              </Button>
            </div>
          </div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickStats.map((stat, index) => (
              <Card 
                key={index} 
                className="border-0 shadow-sm hover:shadow-md transition-shadow bg-white"
              >
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div className={cn("p-3 rounded-xl", stat.bg)}>
                    <stat.icon className={cn("h-5 w-5", stat.color)} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Stats Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {statsWithIcons.map((item, index) => (
              <Card 
                key={index} 
                className="border-0 shadow-sm hover:shadow-md transition-all duration-200 bg-white"
              >
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-gray-500">
                      {item.title}
                    </p>
                    <div className={cn("p-2.5 rounded-xl", item.bg)}>
                      <item.icon className={cn("h-5 w-5", item.color)} />
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {item.value}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.subtitle}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                      <ArrowUp className="h-3 w-3" />
                      <span>{item.change}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>

          {/* Tabs Section */}
          <Tabs defaultValue="businesses" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <TabsList className="bg-white border border-gray-200 p-1 rounded-xl shadow-sm">
                <TabsTrigger 
                  value="businesses" 
                  className="gap-2 px-4 py-2 rounded-lg data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-indigo-600/20"
                >
                  <Building2 className="h-4 w-4" />
                  Businesses
                </TabsTrigger>
                <TabsTrigger 
                  value="activity" 
                  className="gap-2 px-4 py-2 rounded-lg data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-indigo-600/20"
                >
                  <Activity className="h-4 w-4" />
                  Activity
                </TabsTrigger>
                <TabsTrigger 
                  value="analytics" 
                  className="gap-2 px-4 py-2 rounded-lg data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-indigo-600/20"
                >
                  <TrendingUp className="h-4 w-4" />
                  Analytics
                </TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2 border-gray-200 hover:bg-gray-100"
                >
                  Filter
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2 border-gray-200 hover:bg-gray-100"
                >
                  Sort
                </Button>
              </div>
            </div>

            {/* Businesses Tab */}
            <TabsContent value="businesses" className="space-y-6">
              <section>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-bold text-gray-900">
                    Businesses Overview
                  </h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                  >
                    View All →
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {businesses.map((business) => (
                    <BusinessCard
                      key={business.id}
                      business={business}
                      onViewDetails={handleViewBusiness}
                      onManage={handleManageBusiness}
                    />
                  ))}
                </div>
              </section>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-6">
              <RecentActivity 
                activities={activities} 
                limit={8}
                onViewAll={handleViewAllActivity}
              />
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-sm bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      Revenue Overview
                    </CardTitle>
                    <p className="text-sm text-gray-500">
                      Monthly revenue breakdown
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Chart Coming Soon</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      Business Growth
                    </CardTitle>
                    <p className="text-sm text-gray-500">
                      Business performance trends
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <Building2 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Chart Coming Soon</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}