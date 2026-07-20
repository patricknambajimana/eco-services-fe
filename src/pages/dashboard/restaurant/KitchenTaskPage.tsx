import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical,
  Clock,
  ChefHat,
  Flame,
  CheckCircle2,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { KitchenTaskCard } from '@/components/kitchen/KitchenTaskCard';
import { useKitchenData } from '@/hooks/kitchen/useKitchenData';
import { KITCHEN_STATION_LABELS, KITCHEN_TASK_STATUS_LABELS, KITCHEN_TASK_PRIORITY_LABELS } from '@/constants/restaurant';
import { KitchenTask, KitchenStationType } from '@/types/restaurant.types';
import { cn } from '@/lib/utils';

export const KitchenTasksPage = () => {
  const { tasks, taskStats, updateTaskStatus, assignTaskToChef, isLoading } = useKitchenData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [stationFilter, setStationFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedTask, setSelectedTask] = useState<KitchenTask | null>(null);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesStation = stationFilter === 'all' || task.station === stationFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesStation && matchesPriority;
  });

  const handleAssign = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setSelectedTask(task);
      setIsAssignDialogOpen(true);
    }
  };

  const handleAssignConfirm = () => {
    if (selectedTask) {
      // In real app, this would open a chef selection dialog
      assignTaskToChef(selectedTask.id, 'chf-1', 'Chef Marco');
      setIsAssignDialogOpen(false);
      setSelectedTask(null);
    }
  };

  const handleStart = (taskId: string) => {
    updateTaskStatus(taskId, 'PREPARING');
  };

  const handleComplete = (taskId: string) => {
    updateTaskStatus(taskId, 'READY');
  };

  const handleServe = (taskId: string) => {
    updateTaskStatus(taskId, 'SERVED');
  };

  // Get unique stations for filter
  const stations = Array.from(new Set(tasks.map(t => t.station)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kitchen Tasks</h1>
          <p className="text-gray-500">Manage and track all kitchen tasks</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button className="bg-restaurant-600 hover:bg-restaurant-700">
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total</p>
              <p className="text-xl font-bold">{tasks.length}</p>
            </div>
            <Badge variant="outline">All</Badge>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">New</p>
              <p className="text-xl font-bold text-blue-600">{taskStats.new}</p>
            </div>
            <Badge className="bg-blue-100 text-blue-700">New</Badge>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Preparing</p>
              <p className="text-xl font-bold text-amber-600">{taskStats.preparing}</p>
            </div>
            <Badge className="bg-amber-100 text-amber-700">Prep</Badge>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Ready</p>
              <p className="text-xl font-bold text-green-600">{taskStats.ready}</p>
            </div>
            <Badge className="bg-green-100 text-green-700">Ready</Badge>
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
                  placeholder="Search by item or order..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {Object.entries(KITCHEN_TASK_STATUS_LABELS).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={stationFilter} onValueChange={setStationFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Station" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stations</SelectItem>
                {stations.map((station) => (
                  <SelectItem key={station} value={station}>
                    {KITCHEN_STATION_LABELS[station as KitchenStationType]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                {Object.entries(KITCHEN_TASK_PRIORITY_LABELS).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-1">
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'outline'} 
                size="sm"
                className={viewMode === 'grid' ? 'bg-restaurant-600' : ''}
                onClick={() => setViewMode('grid')}
              >
                Grid
              </Button>
              <Button 
                variant={viewMode === 'table' ? 'default' : 'outline'} 
                size="sm"
                className={viewMode === 'table' ? 'bg-restaurant-600' : ''}
                onClick={() => setViewMode('table')}
              >
                Table
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTasks.map((task) => (
            <KitchenTaskCard
              key={task.id}
              task={task}
              onAssign={handleAssign}
              onStart={handleStart}
              onComplete={handleComplete}
              onServe={handleServe}
            />
          ))}
          {filteredTasks.length === 0 && (
            <div className="col-span-2 text-center py-12 text-gray-500">
              No tasks found matching your filters
            </div>
          )}
        </div>
      ) : (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Station</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Chef</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{task.itemName}</p>
                        <p className="text-xs text-gray-500">Qty: {task.quantity}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">#{task.orderId}</span>
                      {task.tableNumber && (
                        <p className="text-xs text-gray-500">Table {task.tableNumber}</p>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {KITCHEN_STATION_LABELS[task.station as KitchenStationType]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(
                        task.status === 'NEW' && 'bg-blue-100 text-blue-700',
                        task.status === 'PREPARING' && 'bg-amber-100 text-amber-700',
                        task.status === 'READY' && 'bg-green-100 text-green-700',
                        task.status === 'SERVED' && 'bg-gray-100 text-gray-700',
                      )}>
                        {KITCHEN_TASK_STATUS_LABELS[task.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={cn(
                        'text-sm font-medium',
                        task.priority === 'VIP' && 'text-purple-600',
                        task.priority === 'RUSH' && 'text-orange-600',
                        task.priority === 'NORMAL' && 'text-gray-600',
                      )}>
                        {KITCHEN_TASK_PRIORITY_LABELS[task.priority]}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-3 w-3 text-gray-400" />
                        {task.estimatedMinutes}m
                        {task.status === 'PREPARING' && task.startedAt && (
                          <span className="text-xs text-gray-400 ml-1">
                            ({Math.round((Date.now() - new Date(task.startedAt).getTime()) / 60000)}m ago)
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {task.assignedChefName || '—'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {task.status === 'NEW' && (
                            <>
                              <DropdownMenuItem onClick={() => handleAssign(task.id)}>
                                <ChefHat className="h-4 w-4 mr-2" />
                                Assign Chef
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStart(task.id)}>
                                <Clock className="h-4 w-4 mr-2" />
                                Start Prep
                              </DropdownMenuItem>
                            </>
                          )}
                          {task.status === 'PREPARING' && (
                            <DropdownMenuItem onClick={() => handleComplete(task.id)}>
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Mark Ready
                            </DropdownMenuItem>
                          )}
                          {task.status === 'READY' && (
                            <DropdownMenuItem onClick={() => handleServe(task.id)}>
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Serve
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredTasks.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No tasks found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Assign Chef Dialog */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Chef</DialogTitle>
            <DialogDescription>
              Select a chef to assign to this task
            </DialogDescription>
          </DialogHeader>
          {selectedTask && (
            <div className="py-4">
              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <p className="font-medium">{selectedTask.itemName}</p>
                <p className="text-sm text-gray-500">Order #{selectedTask.orderId}</p>
                <p className="text-sm text-gray-500">Station: {KITCHEN_STATION_LABELS[selectedTask.station as KitchenStationType]}</p>
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a chef" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chf-1">Chef Marco - Grill</SelectItem>
                  <SelectItem value="chf-2">Chef Lisa - Prep</SelectItem>
                  <SelectItem value="chf-3">Chef Antonio - Pizza</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssignConfirm} className="bg-restaurant-600 hover:bg-restaurant-700">
              Assign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};