import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Clock, ChefHat, Flame, AlertCircle, CheckCircle2, User } from 'lucide-react';
import { KitchenTask } from '@/types/restaurant.types';
import { KITCHEN_STATION_COLORS, KITCHEN_TASK_PRIORITY_LABELS, KITCHEN_TASK_STATUS_LABELS } from '@/constants/restaurant';
import { cn } from '@/lib/utils';

interface KitchenTaskCardProps {
  task: KitchenTask;
  onAssign?: (taskId: string) => void;
  onStart?: (taskId: string) => void;
  onComplete?: (taskId: string) => void;
  onServe?: (taskId: string) => void;
  showActions?: boolean;
}

export const KitchenTaskCard = ({ 
  task, 
  onAssign, 
  onStart, 
  onComplete, 
  onServe, 
  showActions = true 
}: KitchenTaskCardProps) => {
  const statusColors = {
    NEW: 'bg-blue-100 text-blue-700',
    PREPARING: 'bg-amber-100 text-amber-700',
    READY: 'bg-green-100 text-green-700',
    SERVED: 'bg-gray-100 text-gray-700',
  };

  const priorityColors = {
    NORMAL: 'text-gray-500',
    RUSH: 'text-orange-500',
    VIP: 'text-purple-500',
  };

  const isDelayed = task.status === 'PREPARING' && 
    task.startedAt && 
    (Date.now() - new Date(task.startedAt).getTime() > task.estimatedMinutes * 60000);

  return (
    <Card className={cn(
      "border-l-4 shadow-sm hover:shadow-md transition-shadow",
      task.status === 'NEW' && "border-l-blue-500",
      task.status === 'PREPARING' && "border-l-amber-500",
      task.status === 'READY' && "border-l-green-500",
      task.status === 'SERVED' && "border-l-gray-300",
    )}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">{task.itemName}</span>
              <Badge variant="outline" className="text-xs">
                {task.quantity}x
              </Badge>
            </div>
            <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
              <span>Order #{task.orderId}</span>
              <span>Table {task.tableNumber || '—'}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={statusColors[task.status]}>
              {KITCHEN_TASK_STATUS_LABELS[task.status]}
            </Badge>
            {isDelayed && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Delayed
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="flex items-center gap-1 text-gray-500">
            <ChefHat className="h-4 w-4" />
            <span>{task.assignedChefName || 'Unassigned'}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <Flame className="h-4 w-4" />
            <span>{KITCHEN_TASK_PRIORITY_LABELS[task.priority]}</span>
          </div>
          <div className={cn("flex items-center gap-1", priorityColors[task.priority])}>
            <Clock className="h-4 w-4" />
            <span>{task.estimatedMinutes} min</span>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <div className={cn("w-2 h-2 rounded-full", KITCHEN_STATION_COLORS[task.station])} />
          <span className="text-xs text-gray-500">{task.station}</span>
          {task.notes && (
            <span className="text-xs text-gray-400 ml-2">📝 {task.notes}</span>
          )}
        </div>
      </CardContent>

      {showActions && (
        <CardFooter className="pt-2 flex gap-2 flex-wrap">
          {task.status === 'NEW' && (
            <>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => onAssign?.(task.id)}
              >
                <User className="h-3 w-3 mr-1" />
                Assign
              </Button>
              <Button 
                size="sm" 
                className="bg-amber-500 hover:bg-amber-600"
                onClick={() => onStart?.(task.id)}
              >
                <Clock className="h-3 w-3 mr-1" />
                Start
              </Button>
            </>
          )}
          {task.status === 'PREPARING' && (
            <Button 
              size="sm" 
              className="bg-green-500 hover:bg-green-600"
              onClick={() => onComplete?.(task.id)}
            >
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Complete
            </Button>
          )}
          {task.status === 'READY' && (
            <Button 
              size="sm" 
              className="bg-purple-500 hover:bg-purple-600"
              onClick={() => onServe?.(task.id)}
            >
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Serve
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};