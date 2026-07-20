import { useState } from 'react';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { MenuItem, OrderItem } from '@/types/restaurant.types';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tableId?: string;
  tableNumber?: string;
  menuItems: MenuItem[];
  onSubmit: (data: { tableId?: string; customerName?: string; items: Omit<OrderItem, 'id' | 'status'>[]; specialRequests?: string }) => Promise<void>;
  isLoading?: boolean;
}

interface CartLine {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}

export const CreateOrderDialog = ({ open, onOpenChange, tableId, tableNumber, menuItems, onSubmit, isLoading }: Props) => {
  const [customerName, setCustomerName] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [cart, setCart] = useState<CartLine[]>([]);
  const [search, setSearch] = useState('');

  const filteredMenu = menuItems.filter((m) => m.isAvailable && m.name.toLowerCase().includes(search.toLowerCase()));

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((l) => l.menuItem.id === item.id);
      if (existing) {
        return prev.map((l) => (l.menuItem.id === item.id ? { ...l, quantity: l.quantity + 1 } : l));
      }
      return [...prev, { menuItem: item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((l) => (l.menuItem.id === itemId ? { ...l, quantity: l.quantity + delta } : l))
        .filter((l) => l.quantity > 0)
    );
  };

  const removeFromCart = (itemId: string) => setCart((prev) => prev.filter((l) => l.menuItem.id !== itemId));

  const total = cart.reduce((sum, l) => sum + l.menuItem.price * l.quantity, 0);

  const handleSubmit = async () => {
    const items: Omit<OrderItem, 'id' | 'status'>[] = cart.map((l) => ({
      menuItemId: l.menuItem.id,
      name: l.menuItem.name,
      quantity: l.quantity,
      price: l.menuItem.price,
      station: 'KITCHEN', // TODO: derive from menu item category once backend supports it
    }));
    await onSubmit({ tableId, customerName: customerName || undefined, items, specialRequests: specialRequests || undefined });
    setCart([]);
    setCustomerName('');
    setSpecialRequests('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Order{tableNumber ? ` — Table ${tableNumber}` : ''}</DialogTitle>
          <DialogDescription>Select items and confirm to send this order to the kitchen.</DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <Input placeholder="Search menu..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <div className="max-h-72 overflow-y-auto space-y-1 border rounded-lg p-2">
              {filteredMenu.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">No menu items found.</p>
              ) : (
                filteredMenu.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => addToCart(item)}
                    className="w-full flex justify-between items-center px-3 py-2 rounded hover:bg-gray-100 text-sm text-left"
                  >
                    <span>{item.name}</span>
                    <span className="font-medium">${item.price.toFixed(2)}</span>
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <Label>Customer name (optional)</Label>
              <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Walk-in" />
            </div>

            <div className="border rounded-lg p-2 max-h-48 overflow-y-auto">
              {cart.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">No items added yet.</p>
              ) : (
                cart.map((l) => (
                  <div key={l.menuItem.id} className="flex items-center justify-between py-1.5 border-b last:border-0 text-sm">
                    <span className="flex-1">{l.menuItem.name}</span>
                    <div className="flex items-center gap-1">
                      <Button type="button" size="icon" variant="ghost" className="h-6 w-6" onClick={() => updateQuantity(l.menuItem.id, -1)}><Minus className="h-3 w-3" /></Button>
                      <span className="w-5 text-center">{l.quantity}</span>
                      <Button type="button" size="icon" variant="ghost" className="h-6 w-6" onClick={() => updateQuantity(l.menuItem.id, 1)}><Plus className="h-3 w-3" /></Button>
                      <Button type="button" size="icon" variant="ghost" className="h-6 w-6 text-red-500" onClick={() => removeFromCart(l.menuItem.id)}><Trash2 className="h-3 w-3" /></Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="space-y-2">
              <Label>Special requests</Label>
              <Textarea value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} rows={2} />
            </div>

            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={cart.length === 0 || isLoading} className="bg-restaurant-600 hover:bg-restaurant-700">
            {isLoading ? 'Sending...' : 'Send to Kitchen'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};