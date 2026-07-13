import { useState } from 'react';
import { useManagers } from './hooks';
import { 
  ManagersHeader,
  ManagersFilters,
  ManagersTable,
  ManagerFormDialog,
  DeleteConfirmDialog,
} from './components';
import { Manager, ManagerFormData } from './types';

export const ManagersPage = () => {
  const {
    filteredManagers,
    filters,
    isLoading,
    updateFilters,
    addManager,
    updateManager,
    deleteManager,
  } = useManagers();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState<Manager | null>(null);
  const [managerToDelete, setManagerToDelete] = useState<string | null>(null);

  const handleAddClick = () => {
    setSelectedManager(null);
    setIsFormOpen(true);
  };

  const handleEdit = (manager: Manager) => {
    setSelectedManager(manager);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setManagerToDelete(id);
    setIsDeleteOpen(true);
  };

  const handleView = (manager: Manager) => {
    // Navigate to manager details or show modal
    console.log('View manager:', manager);
  };

  const handleFormSave = async (data: ManagerFormData) => {
    if (selectedManager) {
      await updateManager(selectedManager.id, data);
    } else {
      await addManager(data);
    }
    setIsFormOpen(false);
    setSelectedManager(null);
  };

  const handleDeleteConfirm = async () => {
    if (managerToDelete) {
      await deleteManager(managerToDelete);
      setIsDeleteOpen(false);
      setManagerToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <ManagersHeader onAddClick={handleAddClick} />

      {/* Filters */}
      <ManagersFilters 
        filters={filters} 
        onFilterChange={updateFilters} 
      />

      {/* Table */}
      <ManagersTable 
        managers={filteredManagers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />

      {/* Form Dialog */}
      <ManagerFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        manager={selectedManager}
        onSave={handleFormSave}
        isLoading={isLoading}
      />

      {/* Delete Dialog */}
      <DeleteConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDeleteConfirm}
        managerName={filteredManagers.find(m => m.id === managerToDelete)?.name}
        isLoading={isLoading}
      />
    </div>
  );
};