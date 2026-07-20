import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Utensils, ChefHat, Star, Users, TrendingUp } from 'lucide-react';
// import { useRestaurantDashboard } from '@/hooks/...';
import type { RestaurantDashboardData } from '@/types/restaurant';

export const RestaurantDashboardPage = () => {
  // TODO: replace with real data fetching
  const data: RestaurantDashboardData = {
    tableOccupancy: { available: 0, occupied: 0, reserved: 0 },
    kitchenOrders: { pending: 0, preparing: 0, completed: 0 },
    todaysSpecials: [],
    staffSchedule: [],
    analytics: { tableTurnoverRate: 0, popularDishes: [], avgServiceSpeedMinutes: 0, peakHours: [] },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Restaurant Dashboard</h1>
        <p className="text-gray-500">Real-time restaurant operational information.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {/* Table Occupancy */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-500">Table Occupancy</CardTitle>
            <Utensils className="h-4 w-4 text-restaurant-600" />
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="flex justify-between text-sm"><span className="text-gray-500">Available</span><span className="font-bold text-green-600">{data.tableOccupancy.available}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Occupied</span><span className="font-bold text-red-600">{data.tableOccupancy.occupied}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Reserved</span><span className="font-bold text-amber-600">{data.tableOccupancy.reserved}</span></div>
          </CardContent>
        </Card>

        {/* Kitchen Orders */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-500">Kitchen Orders</CardTitle>
            <ChefHat className="h-4 w-4 text-restaurant-600" />
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="flex justify-between text-sm"><span className="text-gray-500">Pending</span><span className="font-bold">{data.kitchenOrders.pending}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Preparing</span><span className="font-bold text-amber-600">{data.kitchenOrders.preparing}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Completed</span><span className="font-bold text-green-600">{data.kitchenOrders.completed}</span></div>
          </CardContent>
        </Card>

        {/* Today's Specials */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-500">Today's Specials</CardTitle>
            <Star className="h-4 w-4 text-restaurant-600" />
          </CardHeader>
          <CardContent>
            {data.todaysSpecials.length === 0 ? (
              <p className="text-sm text-gray-400">No specials set for today.</p>
            ) : (
              <div className="space-y-1">
                {data.todaysSpecials.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-700">{item.name}</span>
                    <span className="font-medium">${item.price}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Staff Schedule */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-500">Staff Schedule</CardTitle>
            <Users className="h-4 w-4 text-restaurant-600" />
          </CardHeader>
          <CardContent>
            {data.staffSchedule.length === 0 ? (
              <p className="text-sm text-gray-400">No shifts scheduled.</p>
            ) : (
              <div className="space-y-1">
                {data.staffSchedule.slice(0, 3).map((s, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-700">{s.staffName}</span>
                    <Badge variant="outline" className="text-xs">{s.shift}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Restaurant Analytics */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center gap-2">
          <TrendingUp className="h-5 w-5 text-restaurant-600" />
          <CardTitle>Restaurant Analytics</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-4">
          <div><p className="text-xs text-gray-500">Table Turnover Rate</p><p className="text-xl font-bold">{data.analytics.tableTurnoverRate}x</p></div>
          <div><p className="text-xs text-gray-500">Avg Service Speed</p><p className="text-xl font-bold">{data.analytics.avgServiceSpeedMinutes} min</p></div>
          <div>
            <p className="text-xs text-gray-500">Popular Dishes</p>
            {data.analytics.popularDishes.length === 0 ? <p className="text-sm text-gray-400">—</p> : (
              data.analytics.popularDishes.slice(0, 2).map((d) => (
                <p key={d.name} className="text-sm">{d.name} ({d.orderCount})</p>
              ))
            )}
          </div>
          <div>
            <p className="text-xs text-gray-500">Peak Hours</p>
            <p className="text-sm">{data.analytics.peakHours.join(', ') || '—'}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};