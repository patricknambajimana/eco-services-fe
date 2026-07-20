import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useKitchenData } from '@/hooks/kitchen/useKitchenData';
import { StationStatusCard } from '@/components/kitchen/StationStatusCard';
import { KitchenTaskCard } from '@/components/kitchen/KitchenTaskCard';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  ChefHat, 
  AlertTriangle,
  CheckCircle2,
  Utensils,
  RefreshCw
} from 'lucide-react';
import { KITCHEN_STATION_LABELS } from '@/constants/restaurant';

export const KitchenDashboardPage = () => {
  const { 
    tasks, 
    stations, 
    shifts, 
    taskStats, 
    isLoading,
    updateTaskStatus,
    assignTaskToChef 
  } = useKitchenData();

  const [selectedStation, setSelectedStation] = useState<string | null>(null);

  const handleAssign = (taskId: string) => {
    // In real app, show assign dialog
    assignTaskToChef(taskId, 'chf-1', 'Chef Marco');
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

  const getTasksForStation = (stationId: string) => {
    const station = stations.find(s => s.id === stationId);
    return station ? tasks.filter(t => t.station === station.type) : [];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kitchen Dashboard</h1>
          <p className="text-gray-500">Real-time kitchen operations and task management</p>
        </div>
        <Button variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">New Orders</p>
              <p className="text-2xl font-bold text-blue-600">{taskStats.new}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <ChefHat className="h-5 w-5 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">In Progress</p>
              <p className="text-2xl font-bold text-amber-600">{taskStats.preparing}</p>
            </div>
            <div className="bg-amber-100 p-3 rounded-lg">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Ready to Serve</p>
              <p className="text-2xl font-bold text-green-600">{taskStats.ready}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Delayed</p>
              <p className="text-2xl font-bold text-red-600">{taskStats.delayed}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Station Grid */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <Utensils className="h-5 w-5 text-restaurant-600" />
          Station Overview
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stations.map((station) => (
            <StationStatusCard
              key={station.id}
              station={station}
              taskCount={getTasksForStation(station.id).length}
              onSelect={(s) => setSelectedStation(s.id)}
            />
          ))}
        </div>
      </div>

      {/* Tasks Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Active Tasks</h2>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="preparing">Preparing</TabsTrigger>
            <TabsTrigger value="ready">Ready</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tasks.filter(t => t.status !== 'SERVED').map((task) => (
                <KitchenTaskCard
                  key={task.id}
                  task={task}
                  onAssign={handleAssign}
                  onStart={handleStart}
                  onComplete={handleComplete}
                  onServe={handleServe}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tasks.filter(t => t.status === 'NEW').map((task) => (
                <KitchenTaskCard
                  key={task.id}
                  task={task}
                  onAssign={handleAssign}
                  onStart={handleStart}
                  onComplete={handleComplete}
                  onServe={handleServe}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="preparing">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tasks.filter(t => t.status === 'PREPARING').map((task) => (
                <KitchenTaskCard
                  key={task.id}
                  task={task}
                  onAssign={handleAssign}
                  onStart={handleStart}
                  onComplete={handleComplete}
                  onServe={handleServe}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ready">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tasks.filter(t => t.status === 'READY').map((task) => (
                <KitchenTaskCard
                  key={task.id}
                  task={task}
                  onAssign={handleAssign}
                  onStart={handleStart}
                  onComplete={handleComplete}
                  onServe={handleServe}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Today's Shifts */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Today's Shifts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {shifts.map((shift) => (
              <div key={shift.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium text-gray-700">{shift.chefName}</p>
                  <p className="text-sm text-gray-500">
                    {KITCHEN_STATION_LABELS[shift.station]} • {shift.role}
                  </p>
                </div>
                <Badge variant="outline" className="text-sm">
                  {shift.startTime} - {shift.endTime}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};