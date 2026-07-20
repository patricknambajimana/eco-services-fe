import { TableCard } from './TableCard';
import { RestaurantTable } from '@/types/restaurant.types';

interface Props {
  tables: RestaurantTable[];
  onTableClick: (table: RestaurantTable) => void;
}

export const TableGrid = ({ tables, onTableClick }: Props) => {
  if (tables.length === 0) {
    return <p className="text-sm text-gray-500 text-center py-12">No tables configured yet.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
      {tables.map((table) => (
        <TableCard key={table.id} table={table} onClick={onTableClick} />
      ))}
    </div>
  );
};