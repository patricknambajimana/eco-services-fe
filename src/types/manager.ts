export interface Manager {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessId: string;
  businessName: string;
  role: string;
  status: string;
  assignedDate: string;
  lastLogin: string;
  permissions: string[];
}
interface ManagerFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  roleFilter: string;
  setRoleFilter: (value: string) => void;
}
interface ManagersTableProps {
  managers: Manager[];
  onEdit: (manager: Manager) => void;
  onDelete: (id: string) => void;
}