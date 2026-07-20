import { useState, useEffect } from 'react';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RestaurantTable, TableStatus } from '@/types/restaurant.ts';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  table: RestaurantTable | null;
  onUpdateStatus: (tableId: string, status: TableStatus, reservedFor?: string, reservedTime?: string) => Promise<void>;
  onCreateOrder: (tableId: string) => void;
}

export const TableActionDialog = ({ open, onOpenChange, table, onUpdateStatus, onCreateOrder }: Props) => {
  const [reservedFor, setReservedFor] = useState('');
  const [reservedTime, setReservedTime] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setReservedFor(table?.reservedFor ?? '');
    setReservedTime(table?.reservedTime ?? '');
  }, [table, open]);

  if (!table) return null;

  const handleStatusChange = async (status: TableStatus) => {
    setIsSaving(true);
    await onUpdateStatus(table.id, status, status === 'RESERVED' ? reservedFor : undefined, status === 'RESERVED' ? reservedTime : undefined);
    setIsSaving(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Table {table.number}</DialogTitle>
          <DialogDescription>{table.seats} seats · currently {table.status.toLowerCase()}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {table.status === 'AVAILABLE' && (
            <div className="grid gap-3">
              <Button onClick={() => { onCreateOrder(table.id); onOpenChange(false); }}>
                Seat Customer & Start Order
              </Button>
              <div className="space-y-2 border-t pt-3">
                <Label>Reserve for</Label>
                <Input placeholder="Customer name" value={reservedFor} onChange={(e) => setReservedFor(e.target.value)} />
                <Input type="time" value={reservedTime} onChange={(e) => setReservedTime(e.target.value)} />
                <Button variant="outline" className="w-full" disabled={!reservedFor || isSaving} onClick={() => handleStatusChange('RESERVED')}>
                  Reserve Table
                </Button>
              </div>
            </div>
          )}

          {table.status === 'OCCUPIED' && (
            <Button variant="outline" className="w-full" disabled={isSaving} onClick={() => handleStatusChange('CLEANING')}>
              Mark for Cleaning
            </Button>
          )}

          {(table.status === 'RESERVED' || table.status === 'CLEANING') && (
            <Button variant="outline" className="w-full" disabled={isSaving} onClick={() => handleStatusChange('AVAILABLE')}>
              Mark Available
            </Button>
          )}
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};