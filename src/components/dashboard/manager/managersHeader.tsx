import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ManagersHeaderProps {
  onAddClick: () => void;
}

export const ManagersHeader = ({ onAddClick }: ManagersHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Managers</h1>
        <p className="text-gray-500">Manage business managers and their assignments</p>
      </div>
      <Button 
        className="bg-restaurant-600 hover:bg-restaurant-700" 
        onClick={onAddClick}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Manager
      </Button>
    </div>
  );
};