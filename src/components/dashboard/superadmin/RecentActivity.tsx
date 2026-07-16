// components/dashboard/superadmin/RecentActivity.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity as ActivityIcon, User, Building2, Shield, FileText, Settings, CreditCard, AlertCircle } from 'lucide-react';
import {type Activity } from '@/types/superAdmin';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {Button} from '@/components/ui/button'
interface RecentActivityProps {
  activities: Activity[];
  limit?: number;
  onViewAll?: () => void;
}

export const RecentActivity = ({ 
  activities, 
  limit = 5,
  onViewAll 
}: RecentActivityProps) => {
  const displayedActivities = activities.slice(0, limit);

  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'user':
        return User;
      case 'business':
        return Building2;
      case 'role':
        return Shield;
      case 'report':
        return FileText;
      case 'system':
        return Settings;
      case 'financial':
        return CreditCard;
      default:
        return ActivityIcon;
    }
  };

  const getStatusColor = (status?: Activity['status']) => {
    switch (status) {
      case 'success':
        return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20';
      case 'warning':
        return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20';
      case 'error':
        return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20';
      case 'info':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      default:
        return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
    }
  };

  const getStatusLabel = (status?: Activity['status']) => {
    switch (status) {
      case 'success':
        return 'Completed';
      case 'warning':
        return 'Warning';
      case 'error':
        return 'Failed';
      case 'info':
        return 'Info';
      default:
        return 'Completed';
    }
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-slate-900 dark:text-gray-100">
          Recent Activity
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {activities.length} total
          </Badge>
          {onViewAll && (
            <Button
              variant="ghost"
              size="sm"
              className="text-restaurant-500 hover:text-restaurant-600"
              onClick={onViewAll}
            >
              View All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayedActivities.length === 0 ? (
            <div className="text-center py-8">
              <ActivityIcon className="h-12 w-12 text-slate-300 dark:text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-slate-500 dark:text-gray-400">No recent activity</p>
            </div>
          ) : (
            displayedActivities.map((activity, index) => {
              const IconComponent = getIcon(activity.type);
              const initials = activity.user
                .split(' ')
                .map(n => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);

              return (
                <div 
                  key={activity.id} 
                  className={cn(
                    "flex items-start gap-3 pb-4",
                    index !== displayedActivities.length - 1 && "border-b border-slate-100 dark:border-gray-800"
                  )}
                >
                  <Avatar className="w-9 h-9 flex-shrink-0">
                    <AvatarFallback className="bg-restaurant-100 dark:bg-restaurant-900/30 text-restaurant-600 dark:text-restaurant-400 text-sm">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-gray-100 truncate">
                          {activity.action}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-gray-400 truncate">
                          by {activity.user}
                        </p>
                      </div>
                      <Badge className={cn(
                        "text-[10px] px-2 py-0.5 border whitespace-nowrap",
                        getStatusColor(activity.status)
                      )}>
                        {getStatusLabel(activity.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <IconComponent className="h-3.5 w-3.5 text-slate-400 dark:text-gray-500" />
                      <span className="text-xs text-slate-400 dark:text-gray-500">
                        {activity.time}
                      </span>
                      <span className="text-xs text-slate-300 dark:text-gray-600">•</span>
                      <span className="text-xs capitalize text-slate-400 dark:text-gray-500">
                        {activity.type}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};