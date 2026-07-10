import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
import {
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Building2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';

// Mock data for managers
const mockManagers = [
  {
    id: 'm1',
    name: 'John Smith',
    email: 'john@downtownbistro.com',
    phone: '+1 234-567-8901',
    businessId: '1',
    businessName: 'Downtown Bistro',
    role: 'RESTAURANT_MANAGER',
    status: 'active',
    assignedDate: '2025-01-15',
    lastLogin: '2026-06-30 14:30',
    permissions: ['manage_staff', 'manage_inventory', 'view_reports', 'manage_orders'],
  },
  {
    id: 'm2',
    name: 'Sarah Johnson',
    email: 'sarah@artisanbakery.com',
    phone: '+1 234-567-8902',
    businessId: '2',
    businessName: 'Artisan Bakery',
    role: 'BAKERY_MANAGER',
    status: 'active',
    assignedDate: '2025-03-01',
    lastLogin: '2026-06-30 16:45',
    permissions: ['manage_staff', 'manage_inventory', 'view_reports', 'manage_production'],
  },
  {
    id: 'm3',
    name: 'Emily Davis',
    email: 'emily@elegantdecor.com',
    phone: '+1 234-567-8903',
    businessId: '3',
    businessName: 'Elegant Decor',
    role: 'DECORATION_MANAGER',
    status: 'active',
    assignedDate: '2025-06-10',
    lastLogin: '2026-06-30 10:20',
    permissions: ['manage_staff', 'manage_inventory', 'view_reports', 'manage_showroom'],
  },
  {
    id: 'm4',
    name: 'Robert Wilson',
    email: 'robert@grandplaza.com',
    phone: '+1 234-567-8904',
    businessId: '4',
    businessName: 'Grand Plaza',
    role: 'GENERAL_MANAGER',
    status: 'active',
    assignedDate: '2024-09-01',
    lastLogin: '2026-06-30 12:10',
    permissions: ['manage_all', 'view_reports', 'manage_staff', 'manage_inventory'],
  },
  {
    id: 'm5',
    name: 'Lisa Park',
    email: 'lisa@coffeepastry.com',
    phone: '+1 234-567-8905',
    businessId: '5',
    businessName: 'Coffee & Pastry',
    role: 'BAKERY_MANAGER',
    status: 'inactive',
    assignedDate: '2025-11-15',
    lastLogin: '2026-05-15 09:00',
    permissions: ['manage_staff', 'manage_inventory', 'view_reports'],
  },
];

// Available roles for assignment
const availableRoles = [
  { value: 'RESTAURANT_MANAGER', label: 'Restaurant Manager' },
  { value: 'BAKERY_MANAGER', label: 'Bakery Manager' },
  { value: 'DECORATION_MANAGER', label: 'Decoration Manager' },
  { value: 'GENERAL_MANAGER', label: 'General Manager' },
  { value: 'STORE_MANAGER', label: 'Store Manager' },
];

export const ManagersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [managerToDelete, setManagerToDelete] = useState<string | null>(null);

  const filteredManagers = mockManagers.filter(manager => {
    const matchesSearch = 
      manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manager.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manager.businessName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || manager.status === statusFilter;
    const matchesRole = roleFilter === 'all' || manager.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleDelete = (id: string) => {
    setManagerToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    console.log('Deleting manager:', managerToDelete);
    setIsDeleteDialogOpen(false);
    setManagerToDelete(null);
  };

  const handleEdit = (manager: any) => {
    setSelectedManager(manager);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving manager:', selectedManager);
    setIsDialogOpen(false);
    setSelectedManager(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-400';
      case 'suspended': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getRoleLabel = (role: string) => {
    const found = availableRoles.find(r => r.value === role);
    return found ? found.label : role.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Managers</h1>
          <p className="text-gray-500">Manage business managers and their assignments</p>
        </div>
        <Button className="bg-restaurant-600 hover:bg-restaurant-700" onClick={() => { setSelectedManager(null); setIsDialogOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Manager
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search managers..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {availableRoles.map(role => (
                  <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Business</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredManagers.map((manager) => (
                <TableRow key={manager.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">{manager.name}</p>
                      <p className="text-xs text-gray-500">{manager.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-gray-400" />
                      <span>{manager.businessName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {getRoleLabel(manager.role)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(manager.status)} text-white capitalize`}>
                      {manager.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {manager.lastLogin}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(manager)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(manager.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit/Add Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedManager ? 'Edit Manager' : 'Add New Manager'}</DialogTitle>
            <DialogDescription>
              {selectedManager ? 'Update manager details' : 'Add a new manager to the system'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Manager name"
                value={selectedManager?.name || ''}
                onChange={(e) => setSelectedManager({ ...selectedManager, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="manager@example.com"
                value={selectedManager?.email || ''}
                onChange={(e) => setSelectedManager({ ...selectedManager, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={selectedManager?.role || ''} onValueChange={(role) => setSelectedManager({ ...selectedManager, role })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {availableRoles.map(role => (
                    <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-restaurant-600 hover:bg-restaurant-700">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Manager</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this manager? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button type="submit" variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};