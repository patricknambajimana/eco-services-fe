import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AlertCircle } from 'lucide-react';

interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  managerName?: string;
  isLoading?: boolean;
}

export const DeleteConfirmDialog = ({
  open,
  onOpenChange,
  onConfirm,
  managerName,
  isLoading = false,
}: DeleteConfirmDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Manager</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this manager?
            {managerName && ` (${managerName})`}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center gap-3 py-4">
          <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
          <p className="text-sm text-gray-600">
            This action cannot be undone. All associated data will be permanently removed.
          </p>
        </div>
        
        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            type="button" 
            variant="destructive" 
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete Manager'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};