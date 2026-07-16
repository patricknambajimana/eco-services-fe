import { useState, useMemo } from 'react';
import { Manager, ManagerFilters, ManagerFormData } from '../types';
import { MOCK_MANAGERS } from '../constants';

export const useManagers = () => {
  const [managers, setManagers] = useState<Manager[]>(MOCK_MANAGERS);
  const [filters, setFilters] = useState<ManagerFilters>({
    search: '',
    status: 'all',
    role: 'all',
  });
  const [isLoading, setIsLoading] = useState(false);

  const filteredManagers = useMemo(() => {
    return managers.filter(manager => {
      const matchesSearch = 
        manager.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        manager.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        manager.businessName.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesStatus = filters.status === 'all' || manager.status === filters.status;
      const matchesRole = filters.role === 'all' || manager.role === filters.role;
      
      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [managers, filters]);

  const updateFilters = (newFilters: Partial<ManagerFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      role: 'all',
    });
  };

  const addManager = async (data: ManagerFormData): Promise<{ success: boolean; manager?: Manager }> => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newManager: Manager = {
        id: `m${managers.length + 1}`,
        ...data,
        businessName: 'New Business', // This would come from business lookup
        assignedDate: new Date().toISOString().split('T')[0],
        lastLogin: 'Never',
        permissions: [],
      };
      
      setManagers([...managers, newManager]);
      return { success: true, manager: newManager };
    } catch (error) {
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const updateManager = async (id: string, data: Partial<ManagerFormData>): Promise<{ success: boolean }> => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setManagers(managers.map(m => 
        m.id === id ? { ...m, ...data } : m
      ));
      
      return { success: true };
    } catch (error) {
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const deleteManager = async (id: string): Promise<{ success: boolean }> => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setManagers(managers.filter(m => m.id !== id));
      return { success: true };
    } catch (error) {
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const getManagerById = (id: string): Manager | undefined => {
    return managers.find(m => m.id === id);
  };

  return {
    managers,
    filteredManagers,
    filters,
    isLoading,
    updateFilters,
    resetFilters,
    addManager,
    updateManager,
    deleteManager,
    getManagerById,
  };
};
export default useManagers;