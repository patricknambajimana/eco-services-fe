import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';
import type { RestaurantTable, TableStatus } from '@/types/restaurant.ts';

const STATUS_STYLES: Record<TableStatus, string> = {
  AVAILABLE: 'bg-green-100 text-green-700 border-green-200',
  OCCUPIED: 'bg-red-100 text-red-700 border-red-200',
  RESERVED: 'bg-amber-100 text-amber-700 border-amber-200',
  CLEANING: 'bg-gray-100 text-gray-600 border-gray-200',
};

interface Props {
  table: RestaurantTable;
  onClick: (table: RestaurantTable) => void;
}

export const tableCard = ({ table, onClick }: Props) => {
  return (
    <Card
      className={`cursor-pointer hover:shadow-md transition-shadow border-2 ${STATUS_STYLES[table.status]}`}
      onClick={() => onClick(table)}
    >
      <CardContent className="p-4 text-center space-y-2">
        <p className="text-2xl font-bold">{table.number}</p>
        <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
          <Users className="h-3 w-3" />
          {table.seats} seats
        </div>
        <Badge className={`${STATUS_STYLES[table.status]} capitalize`} variant="outline">
          {table.status.toLowerCase()}
        </Badge>
        {table.status === 'RESERVED' && table.reservedFor && (
          <p className="text-xs text-gray-500">{table.reservedFor} · {table.reservedTime}</p>
        )}
      </CardContent>
    </Card>
  );
};