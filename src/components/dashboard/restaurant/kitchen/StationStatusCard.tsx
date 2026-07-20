import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { KitchenStation } from '@/types/restaurant.types';
import { KITCHEN_STATION_LABELS } from '@/constants/restaurant';
import { cn } from '@/lib/utils';

interface StationStatusCardProps {
  station: KitchenStation;
  taskCount: number;
  onSelect: (station: KitchenStation) => void;
}

export const StationStatusCard = ({ station, taskCount, onSelect }: StationStatusCardProps) => {
  const statusColors = {
    ACTIVE: 'bg-green-500',
    INACTIVE: 'bg-gray-400',
    CLOSED: 'bg-red-500',
  };

  const loadColor = station.capacity > 0 
    ? station.currentOrders / station.capacity > 0.8 ? 'text-red-600' 
    : station.currentOrders / station.capacity > 0.5 ? 'text-amber-600' 
    : 'text-green-600'
    : 'text-gray-400';

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow border-0 shadow-sm"
      onClick={() => onSelect(station)}
    >
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium text-gray-700">
          {KITCHEN_STATION_LABELS[station.type]}
        </CardTitle>
        <div className={cn("w-2.5 h-2.5 rounded-full", statusColors[station.status])} />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Orders</span>
            <span className="font-bold">{station.currentOrders}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Capacity</span>
            <span className={cn("font-bold", loadColor)}>
              {station.currentOrders}/{station.capacity}
            </span>
          </div>
          {station.chefName && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Chef</span>
              <span className="font-medium">{station.chefName}</span>
            </div>
          )}
          <Badge variant="outline" className="w-full justify-center text-xs">
            {taskCount} pending tasks
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};