import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableGrid } from '@/components/dashboard/restaurant/waiter/TableGrid';
import { TableActionDialog } from '@/components/dashboard/restaurant/waiter/TableActionDialog';
import { RestaurantTable, TableStatus } from '@/types/restaurant.types';
// import { useTables } from '@/hooks/...';

export const TablesPage = () => {
  const navigate = useNavigate();

  // TODO: replace with real data fetching
  const tables: RestaurantTable[] = [];

  const [selectedTable, setSelectedTable] = useState<RestaurantTable | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleTableClick = (table: RestaurantTable) => {
    setSelectedTable(table);
    setDialogOpen(true);
  };

  const handleUpdateStatus = async (tableId: string, status: TableStatus, reservedFor?: string, reservedTime?: string) => {
    // TODO: PATCH /tables/:id, then refetch
  };

  const handleCreateOrder = (tableId: string) => {
    navigate(`/restaurant/orders?tableId=${tableId}`);
  };

  const counts = {
    available: tables.filter((t) => t.status === 'AVAILABLE').length,
    occupied: tables.filter((t) => t.status === 'OCCUPIED').length,
    reserved: tables.filter((t) => t.status === 'RESERVED').length,
    cleaning: tables.filter((t) => t.status === 'CLEANING').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tables</h1>
        <p className="text-gray-500">Floor layout, reservations, and table status.</p>
      </div>

      <div className="flex gap-4 text-sm">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500" /> {counts.available} Available</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-500" /> {counts.occupied} Occupied</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-500" /> {counts.reserved} Reserved</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-gray-400" /> {counts.cleaning} Cleaning</span>
      </div>

      <TableGrid tables={tables} onTableClick={handleTableClick} />

      <TableActionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        table={selectedTable}
        onUpdateStatus={handleUpdateStatus}
        onCreateOrder={handleCreateOrder}
      />
    </div>
  );
};