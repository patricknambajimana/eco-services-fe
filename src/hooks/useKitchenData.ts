import { useState, useEffect, useMemo } from 'react';
import { 
  KitchenTask, 
  KitchenStation, 
  KitchenDashboardData, 
  Recipe, 
  Shift,
  StationInventoryItem,
  KitchenStationType 
} from '@/types/restaurant.types';

// Mock data - replace with actual API calls
const mockTasks: KitchenTask[] = [
  {
    id: '1',
    orderId: 'ORD-123',
    orderItemId: 'OI-1',
    itemName: 'Grilled Salmon',
    quantity: 2,
    tableNumber: '5',
    station: 'GRILL',
    assignedChefId: 'chf-1',
    assignedChefName: 'Chef Marco',
    status: 'NEW',
    priority: 'VIP',
    estimatedMinutes: 15,
    notes: 'Medium rare',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    orderId: 'ORD-123',
    orderItemId: 'OI-2',
    itemName: 'Caesar Salad',
    quantity: 1,
    tableNumber: '5',
    station: 'PREP',
    assignedChefId: 'chf-2',
    assignedChefName: 'Chef Lisa',
    status: 'PREPARING',
    priority: 'NORMAL',
    estimatedMinutes: 10,
    startedAt: new Date(Date.now() - 300000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    orderId: 'ORD-124',
    orderItemId: 'OI-3',
    itemName: 'Margherita Pizza',
    quantity: 3,
    tableNumber: '8',
    station: 'PIZZA',
    status: 'READY',
    priority: 'RUSH',
    estimatedMinutes: 12,
    completedAt: new Date(Date.now() - 60000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const mockStations: KitchenStation[] = [
  { id: 'st-1', name: 'Grill Station', type: 'GRILL', chefId: 'chf-1', chefName: 'Chef Marco', status: 'ACTIVE', currentOrders: 3, capacity: 8 },
  { id: 'st-2', name: 'Prep Station', type: 'PREP', chefId: 'chf-2', chefName: 'Chef Lisa', status: 'ACTIVE', currentOrders: 2, capacity: 6 },
  { id: 'st-3', name: 'Pizza Station', type: 'PIZZA', chefId: 'chf-3', chefName: 'Chef Antonio', status: 'ACTIVE', currentOrders: 4, capacity: 10 },
  { id: 'st-4', name: 'Plating Station', type: 'PLATING', status: 'CLOSED', currentOrders: 0, capacity: 4 },
];

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
];

const mockInventoryAlerts = [
  {
    id: 'al-1',
    stationId: 'st-1',
    stationName: 'Grill Station',
    itemName: 'Beef Strips',
    currentQuantity: 2,
    threshold: 5,
    severity: 'CRITICAL',
    createdAt: new Date().toISOString(),
    isResolved: false,
  },
  {
    id: 'al-2',
    stationId: 'st-2',
    stationName: 'Prep Station',
    itemName: 'Lettuce',
    currentQuantity: 3,
    threshold: 4,
    severity: 'LOW',
    createdAt: new Date().toISOString(),
    isResolved: false,
  },
];

export const useKitchenData = () => {
  const [tasks, setTasks] = useState<KitchenTask[]>(mockTasks);
  const [stations, setStations] = useState<KitchenStation[]>(mockStations);
  const [shifts, setShifts] = useState<Shift[]>(mockShifts);
  const [isLoading, setIsLoading] = useState(false);

  const taskStats = useMemo(() => {
    return {
      new: tasks.filter(t => t.status === 'NEW').length,
      preparing: tasks.filter(t => t.status === 'PREPARING').length,
      ready: tasks.filter(t => t.status === 'READY').length,
      delayed: tasks.filter(t => 
        t.status === 'PREPARING' && 
        t.startedAt && 
        (Date.now() - new Date(t.startedAt).getTime() > t.estimatedMinutes * 60000)
      ).length,
    };
  }, [tasks]);

  const getTasksByStation = (station: KitchenStationType) => {
    return tasks.filter(t => t.station === station);
  };

  const getTasksByStatus = (status: KitchenTask['status']) => {
    return tasks.filter(t => t.status === status);
  };

  const getStationStatus = (stationId: string) => {
    return stations.find(s => s.id === stationId);
  };

  const updateTaskStatus = async (taskId: string, status: KitchenTask['status']) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setTasks(prev => prev.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              status, 
              ...(status === 'PREPARING' && !task.startedAt ? { startedAt: new Date().toISOString() } : {}),
              ...(status === 'READY' ? { completedAt: new Date().toISOString() } : {})
            } 
          : task
      ));
      return { success: true };
    } catch (error) {
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const assignTaskToChef = async (taskId: string, chefId: string, chefName: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setTasks(prev => prev.map(task => 
        task.id === taskId 
          ? { ...task, assignedChefId: chefId, assignedChefName: chefName }
          : task
      ));
      return { success: true };
    } catch (error) {
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    tasks,
    stations,
    shifts,
    taskStats,
    isLoading,
    getTasksByStation,
    getTasksByStatus,
    getStationStatus,
    updateTaskStatus,
    assignTaskToChef,
  };
};