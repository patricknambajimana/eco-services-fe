import { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Package,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { KITCHEN_STATION_LABELS } from '@/constants/restaurant';
import { StationInventoryItem, KitchenStationType } from '@/types/restaurant.types';
import { cn } from '@/lib/utils';

// Mock data
const mockInventoryItems: StationInventoryItem[] = [
  {
    id: 'inv-1',
    stationId: 'st-1',
    stationName: 'Grill Station',
    itemId: 'itm-1',
    itemName: 'Beef Strips',
    quantity: 15,
    unit: 'kg',
    minThreshold: 5,
    maxThreshold: 30,
    reorderPoint: 8,
    lastRestocked: '2026-06-28',
    supplier: 'Premium Meats',
    costPerUnit: 12.50,
  },
  {
    id: 'inv-2',
    stationId: 'st-1',
    stationName: 'Grill Station',
    itemId: 'itm-2',
    itemName: 'Chicken Breast',
    quantity: 2,
    unit: 'kg',
    minThreshold: 5,
    maxThreshold: 25,
    reorderPoint: 8,
    lastRestocked: '2026-06-25',
    supplier: 'Premium Meats',
    costPerUnit: 8.75,
  },
  {
    id: 'inv-3',
    stationId: 'st-2',
    stationName: 'Prep Station',
    itemId: 'itm-3',
    itemName: 'Lettuce',
    quantity: 3,
    unit: 'cases',
    minThreshold: 4,
    maxThreshold: 15,
    reorderPoint: 6,
    lastRestocked: '2026-06-29',
    supplier: 'Fresh Produce Co',
    costPerUnit: 15.00,
  },
  {
    id: 'inv-4',
    stationId: 'st-3',
    stationName: 'Pizza Station',
    itemId: 'itm-4',
    itemName: 'Mozzarella Cheese',
    quantity: 8,
    unit: 'kg',
    minThreshold: 3,
    maxThreshold: 20,
    reorderPoint: 5,
    lastRestocked: '2026-06-27',
    supplier: 'Dairy Best',
    costPerUnit: 6.50,
  },
];

export const StationInventoryPage = () => {
  const [inventory, setInventory] = useState<StationInventoryItem[]>(mockInventoryItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [stationFilter, setStationFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<StationInventoryItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const filteredItems = inventory.filter(item => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.stationName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStation = stationFilter === 'all' || item.stationId === stationFilter;
    return matchesSearch && matchesStation;
  });

  // Get unique stations for filter
  const stations = Array.from(new Set(inventory.map(i => i.stationId)));

  const getStatus = (item: StationInventoryItem) => {
    if (item.quantity <= 0) return { label: 'Out of Stock', color: 'bg-red-500', severity: 'critical' };
    if (item.quantity <= item.reorderPoint) return { label: 'Reorder', color: 'bg-orange-500', severity: 'low' };
    if (item.quantity <= item.minThreshold) return { label: 'Low Stock', color: 'bg-amber-500', severity: 'low' };
    return { label: 'In Stock', color: 'bg-green-500', severity: 'ok' };
  };

  const getStockLevel = (item: StationInventoryItem) => {
    const percentage = (item.quantity / item.maxThreshold) * 100;
    if (percentage <= 20) return 'critical';
    if (percentage <= 50) return 'low';
    return 'ok';
  };

  const handleEdit = (item: StationInventoryItem) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsDialogOpen(false);
      setSelectedItem(null);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Station Inventory</h1>
          <p className="text-gray-500">Manage inventory across all kitchen stations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button className="bg-restaurant-600 hover:bg-restaurant-700" onClick={() => { setSelectedItem(null); setIsDialogOpen(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Items</p>
                <p className="text-2xl font-bold">{inventory.length}</p>
              </div>
              <Package className="h-8 w-8 text-restaurant-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Low Stock</p>
                <p className="text-2xl font-bold text-amber-600">
                  {inventory.filter(i => getStatus(i).severity === 'low').length}
                </p>
              </div>
              <TrendingDown className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Critical</p>
                <p className="text-2xl font-bold text-red-600">
                  {inventory.filter(i => getStatus(i).severity === 'critical').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">In Stock</p>
                <p className="text-2xl font-bold text-green-600">
                  {inventory.filter(i => getStatus(i).severity === 'ok').length}
                </p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search inventory..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={stationFilter} onValueChange={setStationFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Station" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stations</SelectItem>
                {stations.map((stationId) => {
                  const station = inventory.find(i => i.stationId === stationId);
                  return (
                    <SelectItem key={stationId} value={stationId}>
                      {station?.stationName || stationId}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Station</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Stock Level</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => {
                const status = getStatus(item);
                const stockLevel = getStockLevel(item);
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">{item.itemName}</p>
                        <p className="text-xs text-gray-500">SKU: {item.itemId}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.stationName}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        {item.quantity} {item.unit}
                      </span>
                      <p className="text-xs text-gray-500">
                        Min: {item.minThreshold} • Max: {item.maxThreshold}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge className={status.color}>
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div 
                          className={cn(
                            "h-2 rounded-full",
                            stockLevel === 'critical' && "bg-red-500",
                            stockLevel === 'low' && "bg-amber-500",
                            stockLevel === 'ok' && "bg-green-500",
                          )}
                          style={{ width: `${Math.min((item.quantity / item.maxThreshold) * 100, 100)}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {Math.round((item.quantity / item.maxThreshold) * 100)}%
                      </p>
                    </TableCell>
                    <TableCell>{item.supplier || '—'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredItems.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No inventory items found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedItem ? 'Edit Inventory Item' : 'Add Inventory Item'}</DialogTitle>
            <DialogDescription>
              {selectedItem ? 'Update inventory details' : 'Add a new item to station inventory'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="itemName">Item Name</Label>
                <Input id="itemName" placeholder="Item name" defaultValue={selectedItem?.itemName} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="station">Station</Label>
                <Select defaultValue={selectedItem?.stationId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select station" />
                  </SelectTrigger>
                  <SelectContent>
                    {stations.map((stationId) => {
                      const station = inventory.find(i => i.stationId === stationId);
                      return (
                        <SelectItem key={stationId} value={stationId}>
                          {station?.stationName || stationId}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input id="quantity" type="number" placeholder="0" defaultValue={selectedItem?.quantity} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Input id="unit" placeholder="kg, cases, etc" defaultValue={selectedItem?.unit} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minThreshold">Minimum Threshold</Label>
                <Input id="minThreshold" type="number" placeholder="0" defaultValue={selectedItem?.minThreshold} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reorderPoint">Reorder Point</Label>
                <Input id="reorderPoint" type="number" placeholder="0" defaultValue={selectedItem?.reorderPoint} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxThreshold">Maximum Threshold</Label>
                <Input id="maxThreshold" type="number" placeholder="0" defaultValue={selectedItem?.maxThreshold} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier</Label>
                <Input id="supplier" placeholder="Supplier name" defaultValue={selectedItem?.supplier} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-restaurant-600 hover:bg-restaurant-700" disabled={isLoading}>
                {isLoading ? 'Saving...' : selectedItem ? 'Update' : 'Add'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};