import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RestaurantOrder, OrderStatus } from '@/types/restaurant.ts';
import { Clock } from 'lucide-react';

const STATUS_COLORS: Record<OrderStatus, string> = {
  PENDING: 'bg-gray-100 text-gray-700',
  CONFIRMED: 'bg-blue-100 text-blue-700',
  PREPARING: 'bg-amber-100 text-amber-700',
  READY: 'bg-purple-100 text-purple-700',
  DELIVERING: 'bg-indigo-100 text-indigo-700',
  COMPLETED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
};

interface Props {
  order: RestaurantOrder;
  onClick: (order: RestaurantOrder) => void;
}

export const OrderCard = ({ order, onClick }: Props) => {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onClick(order)}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div>
          <p className="font-bold">{order.tableNumber ? `Table ${order.tableNumber}` : 'Takeaway'}</p>
          <p className="text-xs text-gray-500">{order.customerName ?? 'Walk-in'}</p>
        </div>
        <Badge className={STATUS_COLORS[order.status]}>{order.status.toLowerCase()}</Badge>
      </CardHeader>
      <CardContent className="space-y-1">
        {order.items.slice(0, 3).map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="text-gray-700">{item.quantity}× {item.name}</span>
          </div>
        ))}
        {order.items.length > 3 && <p className="text-xs text-gray-400">+{order.items.length - 3} more</p>}
        <div className="flex items-center justify-between pt-2 border-t mt-2">
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <span className="font-bold">${order.total.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
};