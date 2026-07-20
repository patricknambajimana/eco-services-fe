import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Plus, Search } from 'lucide-react';
import { OrderCard } from '@/components/dashboard/restaurant/waiter/OrderCard';
import { CreateOrderDialog } from '@/components/dashboard/restaurant/waiter/CreateOrderDialog';
import type { RestaurantOrder, OrderStatus, MenuItem } from '@/types/restaurant.ts';
// import { useOrders, useMenu } from '@/hooks/...';

export const OrdersPage = () => {
  const [searchParams] = useSearchParams();
  const tableIdFromQuery = searchParams.get('tableId');

  // TODO: replace with real data fetching
  const orders: RestaurantOrder[] = [];
  const menuItems: MenuItem[] = [];

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [createOpen, setCreateOpen] = useState(!!tableIdFromQuery);
  const [isSaving, setIsSaving] = useState(false);

  const filtered = orders.filter((o) => {
    const matchesSearch =
      !search ||
      o.tableNumber?.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateOrder = async (data: any) => {
    setIsSaving(true);
    // TODO: POST /orders, then refetch
    setIsSaving(false);
    setCreateOpen(false);
  };

  const handleOrderClick = (order: RestaurantOrder) => {
    // TODO: open order details dialog / navigate to detail view
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-500">Take, track, and manage customer orders.</p>
        </div>
        <Button className="bg-restaurant-600 hover:bg-restaurant-700" onClick={() => setCreateOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Order
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search by table or customer..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as OrderStatus | 'all')}>
          <SelectTrigger className="w-[180px]"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="CONFIRMED">Confirmed</SelectItem>
            <SelectItem value="PREPARING">Preparing</SelectItem>
            <SelectItem value="READY">Ready</SelectItem>
            <SelectItem value="DELIVERING">Delivering</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-16">No orders found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((order) => (
            <OrderCard key={order.id} order={order} onClick={handleOrderClick} />
          ))}
        </div>
      )}

      <CreateOrderDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        tableId={tableIdFromQuery ?? undefined}
        menuItems={menuItems}
        onSubmit={handleCreateOrder}
        isLoading={isSaving}
      />
    </div>
  );
};