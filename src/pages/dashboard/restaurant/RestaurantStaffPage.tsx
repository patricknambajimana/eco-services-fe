import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { managerStatusBadge } from '@/components/dashboard/manager/managerStatusBadge';
import { User, RestaurantRole } from '@/types/restaurant.ts';
// import { useRestaurantStaff } from '@/hooks/...';

interface WaiterStaff {
  id: string;
  name: string;
  role: RestaurantRole;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'ON_LEAVE';
  assignedTables: string[];
  shift: string;
}

export const RestaurantStaffPage = () => {
  // TODO: replace with real data fetching, filtered to waiters/leaders only
  const staff: WaiterStaff[] = [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Waiter Staff</h1>
        <p className="text-gray-500">Manage waiters, table assignments, and shifts.</p>
      </div>

      {staff.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-16">No waiters found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {staff.map((s) => (
            <Card key={s.id}>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{s.name}</p>
                  <managerStatusBadge status={s.status} />
                </div>
                <p className="text-xs text-gray-500">Shift: {s.shift}</p>
                <div className="flex flex-wrap gap-1">
                  {s.assignedTables.length === 0 ? (
                    <span className="text-xs text-gray-400">No tables assigned</span>
                  ) : (
                    s.assignedTables.map((t) => <Badge key={t} variant="outline" className="text-xs">Table {t}</Badge>)
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};