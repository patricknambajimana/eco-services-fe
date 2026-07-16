// pages/dashboard/superadmin/ActivityLogPage.tsx
import { useMemo, useState } from 'react';
import { 
  UserPlus, 
  Building2, 
  AlertTriangle, 
  ShoppingBag,
  Search,
  Activity as ActivityIcon
} from 'lucide-react';
import { activities as allActivities } from '@/data/adminMockData';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type ActivityType = 'user' | 'business' | 'system' | 'order';

const typeConfig: Record<ActivityType, { icon: any; color: string; bg: string; label: string }> = {
  user: { icon: UserPlus, color: 'text-blue-600', bg: 'bg-blue-100', label: 'User' },
  business: { icon: Building2, color: 'text-restaurant-600', bg: 'bg-restaurant-100', label: 'Business' },
  system: { icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-100', label: 'System' },
  order: { icon: ShoppingBag, color: 'text-purple-600', bg: 'bg-purple-100', label: 'Order' },
};

const filters: { value: ActivityType | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'user', label: 'Users' },
  { value: 'business', label: 'Businesses' },
  { value: 'order', label: 'Orders' },
  { value: 'system', label: 'System' },
];

export default function ActivityLogPage() {
  const [activeFilter, setActiveFilter] = useState<ActivityType | 'all'>('all');
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(20);

  const filtered = useMemo(() => {
    return allActivities.filter((a: any) => {
      const matchesType = activeFilter === 'all' || a.type === activeFilter;
      const matchesQuery =
        query.trim() === '' ||
        (a.title ?? a.description ?? '').toLowerCase().includes(query.toLowerCase()) ||
        (a.actor ?? a.user ?? '').toLowerCase().includes(query.toLowerCase());
      return matchesType && matchesQuery;
    });
  }, [activeFilter, query]);

  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Activity Log</h2>
        <p className="text-sm text-gray-600 mt-1">
          Full history of system, user, and business events
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search activity..."
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-sm overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                activeFilter === f.value
                  ? "bg-restaurant-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <Card className="border-0 shadow-sm bg-white">
        <CardContent className="p-0">
          {visible.length === 0 ? (
            <div className="py-16 text-center">
              <ActivityIcon className="h-8 w-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No activity matches your search</p>
            </div>
          ) : (
            <div>
              {visible.map((activity: any, index: number) => {
                const type: ActivityType = activity.type ?? 'system';
                const config = typeConfig[type] ?? typeConfig.system;
                const Icon = config.icon;

                return (
                  <div
                    key={activity.id ?? index}
                    className="flex items-start gap-3 px-5 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50/80 transition-colors"
                  >
                    <div className={cn("p-2 rounded-xl flex-shrink-0", config.bg)}>
                      <Icon className={cn("h-4 w-4", config.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.title ?? activity.description ?? 'Activity event'}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {(activity.actor ?? activity.user) && (
                          <span className="text-xs text-gray-500">{activity.actor ?? activity.user}</span>
                        )}
                        {(activity.actor ?? activity.user) && (
                          <span className="text-xs text-gray-300">•</span>
                        )}
                        <span className="text-xs text-gray-400">
                          {activity.timestamp
                            ? new Date(activity.timestamp).toLocaleString()
                            : activity.time ?? ''}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Load more */}
      {visibleCount < filtered.length && (
        <div className="flex justify-center mt-5">
          <button
            onClick={() => setVisibleCount((c) => c + 20)}
            className="px-4 py-2 text-sm font-medium text-restaurant-600 hover:text-restaurant-700 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}