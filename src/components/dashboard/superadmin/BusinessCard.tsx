// components/dashboard/superadmin/BusinessCard.tsx
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Users, 
  Star,
  TrendingUp
} from 'lucide-react';
import { type Business } from '@/types/superAdmin';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface BusinessCardProps {
  business: Business;
  onViewDetails?: (id: string) => void;
  onManage?: (id: string) => void;
}

const statusColors: Record<string, string> = {
  active: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
  inactive: 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20',
  pending: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20',
};

const statusLabels: Record<string, string> = {
  active: 'Active',
  inactive: 'Inactive',
  pending: 'Pending Approval',
};

export const BusinessCard = ({ 
  business, 
  onViewDetails, 
  onManage 
}: BusinessCardProps) => {
  const status = business.status ?? 'pending';
  const rating = business.performance?.rating ?? 0;
  const growthRate = business.performance?.growthRate ?? 0;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm overflow-hidden">
      <div className="relative">
        {/* Status Badge */}
        <div className="absolute top-3 right-3 z-10">
          <Badge className={cn("px-2 py-1 border", statusColors[status] ?? statusColors.pending)}>
            {statusLabels[status] ?? 'Unknown'}
          </Badge>
        </div>

        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-restaurant-50 dark:bg-restaurant-900/30">
                  <Building2 className="h-5 w-5 text-restaurant-500" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-slate-900 dark:text-gray-100 truncate">
                    {business.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 dark:text-gray-400 capitalize">
                      {business.type}
                    </span>
                    <span className="text-xs text-slate-300 dark:text-gray-600">•</span>
                    <span className="text-xs text-slate-500 dark:text-gray-400">
                      {business.createdAt ? new Date(business.createdAt).toLocaleDateString() : '—'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mt-4 pt-3 border-t border-slate-100 dark:border-gray-800">
            <div className="text-center">
              <p className="text-xs text-slate-500 dark:text-gray-400">Revenue</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-gray-100">
                ${(business.revenue ?? 0).toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-500 dark:text-gray-400">Orders</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-gray-100">
                {business.orders ?? 0}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-500 dark:text-gray-400">Rating</p>
              <div className="flex items-center justify-center gap-0.5">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold text-slate-900 dark:text-gray-100">
                  {rating}
                </span>
              </div>
            </div>
          </div>

          {/* Manager & Performance */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-gray-800 flex items-center justify-center">
                <Users className="h-3.5 w-3.5 text-slate-500 dark:text-gray-400" />
              </div>
              <span className="text-sm text-slate-600 dark:text-gray-300">
                {business.manager ?? 'Unassigned'}
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className={cn(
                "h-4 w-4",
                growthRate > 0 ? "text-green-500" : "text-red-500"
              )} />
              <span className={cn(
                "font-medium",
                growthRate > 0 ? "text-green-600" : "text-red-600"
              )}>
                {growthRate}%
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-gray-800">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-sm hover:bg-restaurant-50 dark:hover:bg-restaurant-900/20"
              onClick={() => onViewDetails?.(business.id)}
            >
              View Details
            </Button>
            <Button
              size="sm"
              className="flex-1 text-sm bg-restaurant-500 hover:bg-restaurant-600"
              onClick={() => onManage?.(business.id)}
            >
              Manage
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};