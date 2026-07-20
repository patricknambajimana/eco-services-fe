import { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  Plus, 
  Edit, 
  Trash2,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { KITCHEN_STATION_LABELS, SHIFT_LABELS } from '@/constants/restaurant';
import { Shift, KitchenStationType, ShiftType } from '@/types/restaurant.types';
import { cn } from '@/lib/utils';

// Mock data
const mockShifts: Shift[] = [
  {
    id: 'sh-1',
    name: 'MORNING',
    startTime: '06:00',
    endTime: '14:00',
    station: 'GRILL',
    chefId: 'chf-1',
    chefName: 'Chef Marco',
    role: 'LEAD',
    isActive: true,
  },
  {
    id: 'sh-2',
    name: 'MORNING',
    startTime: '06:00',
    endTime: '14:00',
    station: 'PREP',
    chefId: 'chf-2',
    chefName: 'Chef Lisa',
    role: 'ASSISTANT',
    isActive: true,
  },
  {
    id: 'sh-3',
    name: 'AFTERNOON',
    startTime: '14:00',
    endTime: '22:00',
    station: 'GRILL',
    chefId: 'chf-3',
    chefName: 'Chef Antonio',
    role: 'LEAD',
    isActive: true,
  },
  {
    id: 'sh-4',
    name: 'AFTERNOON',
    startTime: '14:00',
    endTime: '22:00',
    station: 'PIZZA',
    chefId: 'chf-4',
    chefName: 'Chef Maria',
    role: 'LEAD',
    isActive: true,
  },
  {
    id: 'sh-5',
    name: 'EVENING',
    startTime: '18:00',
    endTime: '02:00',
    station: 'PLATING',
    chefId: 'chf-5',
    chefName: 'Chef David',
    role: 'ASSISTANT',
    isActive: false,
  },
];

const availableChefs = [
  { id: 'chf-1', name: 'Chef Marco', station: 'GRILL' },
  { id: 'chf-2', name: 'Chef Lisa', station: 'PREP' },
  { id: 'chf-3', name: 'Chef Antonio', station: 'GRILL' },
  { id: 'chf-4', name: 'Chef Maria', station: 'PIZZA' },
  { id: 'chf-5', name: 'Chef David', station: 'PLATING' },
  { id: 'chf-6', name: 'Chef Sarah', station: 'DESSERT' },
];

export const PreparationSchedulePage = () => {
  const [shifts, setShifts] = useState<Shift[]>(mockShifts);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<Partial<Shift>>({
    name: 'MORNING',
    startTime: '06:00',
    endTime: '14:00',
    station: 'GRILL',
    chefId: '',
    chefName: '',
    role: 'ASSISTANT',
    isActive: true,
  });

  const getDateRange = () => {
    const start = new Date(selectedDate);
    start.setDate(start.getDate() - start.getDay());
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    return { start, end };
  };

  const getWeekDays = () => {
    const { start } = getDateRange();
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(day.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getShiftsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    // In real app, filter by date
    return shifts;
  };

  const handleEdit = (shift: Shift) => {
    setSelectedShift(shift);
    setFormData(shift);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (selectedShift) {
        setShifts(shifts.map(s => s.id === selectedShift.id ? { ...s, ...formData } as Shift : s));
      } else {
        const newShift: Shift = {
          id: `sh-${Date.now()}`,
          name: formData.name as ShiftType,
          startTime: formData.startTime || '06:00',
          endTime: formData.endTime || '14:00',
          station: formData.station as KitchenStationType,
          chefId: formData.chefId || '',
          chefName: formData.chefName || '',
          role: formData.role as 'LEAD' | 'ASSISTANT' | 'SOUS' | 'PREP',
          isActive: formData.isActive || true,
        };
        setShifts([...shifts, newShift]);
      }
      setIsLoading(false);
      setIsDialogOpen(false);
      setSelectedShift(null);
      setFormData({
        name: 'MORNING',
        startTime: '06:00',
        endTime: '14:00',
        station: 'GRILL',
        chefId: '',
        chefName: '',
        role: 'ASSISTANT',
        isActive: true,
      });
    }, 1000);
  };

  const handleDelete = (id: string) => {
    setShifts(shifts.filter(s => s.id !== id));
  };

  const toggleShiftActive = (id: string) => {
    setShifts(shifts.map(s => 
      s.id === id ? { ...s, isActive: !s.isActive } : s
    ));
  };

  const weekDays = getWeekDays();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Preparation Schedule</h1>
          <p className="text-gray-500">Manage kitchen staff schedules and shifts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button className="bg-restaurant-600 hover:bg-restaurant-700" onClick={() => { setSelectedShift(null); setIsDialogOpen(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Shift
          </Button>
        </div>
      </div>

      {/* Calendar Navigation */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 7)))}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-semibold">
                {weekDays[0].toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - 
                {weekDays[6].toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 7)))}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date())}>
              Today
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Shifts Table */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[120px]">Day</TableHead>
                <TableHead>Station</TableHead>
                <TableHead>Chef</TableHead>
                <TableHead>Shift</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {weekDays.map((day) => {
                const dayShifts = getShiftsForDate(day);
                return dayShifts.map((shift) => (
                  <TableRow key={shift.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{day.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                        <p className="text-xs text-gray-500">{day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {KITCHEN_STATION_LABELS[shift.station as KitchenStationType]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-restaurant-100 rounded-full flex items-center justify-center text-xs font-medium">
                          {shift.chefName?.[0] || '?'}
                        </div>
                        <span>{shift.chefName || 'Unassigned'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-3 w-3 text-gray-400" />
                        {shift.startTime} - {shift.endTime}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {shift.role.toLowerCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={shift.isActive ? 'bg-green-500' : 'bg-gray-400'}>
                        {shift.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm" onClick={() => toggleShiftActive(shift.id)}>
                          {shift.isActive ? <XCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(shift)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDelete(shift.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ));
              })}
              {shifts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No shifts scheduled for this week
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedShift ? 'Edit Shift' : 'Add New Shift'}</DialogTitle>
            <DialogDescription>
              {selectedShift ? 'Update shift details' : 'Schedule a new shift'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="shiftName">Shift Name</Label>
                <Select 
                  value={formData.name} 
                  onValueChange={(value) => setFormData({ ...formData, name: value as ShiftType })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select shift" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(SHIFT_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input 
                    id="startTime" 
                    type="time" 
                    value={formData.startTime || '06:00'} 
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input 
                    id="endTime" 
                    type="time" 
                    value={formData.endTime || '14:00'} 
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="station">Station</Label>
                <Select 
                  value={formData.station} 
                  onValueChange={(value) => setFormData({ ...formData, station: value as KitchenStationType })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select station" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(KITCHEN_STATION_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="chef">Chef</Label>
                <Select 
                  value={formData.chefId} 
                  onValueChange={(value) => {
                    const chef = availableChefs.find(c => c.id === value);
                    setFormData({ 
                      ...formData, 
                      chefId: value,
                      chefName: chef?.name || ''
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select chef" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableChefs.map((chef) => (
                      <SelectItem key={chef.id} value={chef.id}>
                        {chef.name} ({KITCHEN_STATION_LABELS[chef.station as KitchenStationType]})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select 
                  value={formData.role} 
                  onValueChange={(value) => setFormData({ ...formData, role: value as 'LEAD' | 'ASSISTANT' | 'SOUS' | 'PREP' })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LEAD">Lead</SelectItem>
                    <SelectItem value="ASSISTANT">Assistant</SelectItem>
                    <SelectItem value="SOUS">Sous</SelectItem>
                    <SelectItem value="PREP">Prep</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-restaurant-600 rounded border-gray-300"
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-restaurant-600 hover:bg-restaurant-700" disabled={isLoading}>
                {isLoading ? 'Saving...' : selectedShift ? 'Update' : 'Add'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};