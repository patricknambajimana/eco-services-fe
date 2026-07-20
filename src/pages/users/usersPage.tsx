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
  Mail,
  Clock,
  AlertCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';

// Mock data for users
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    credentialId: 'WAITER-001',
    role: 'RESTAURANT_WAITER',
    department: 'restaurant',
    status: 'active',
    createdAt: '2026-01-15',
    lastLogin: '2026-06-30 14:30',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    credentialId: 'CHEF-001',
    role: 'RESTAURANT_CHEF',
    department: 'restaurant',
    status: 'active',
    createdAt: '2026-02-01',
    lastLogin: '2026-06-30 10:15',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    credentialId: 'BAKERY-001',
    role: 'BAKERY_MANAGER',
    department: 'bakery',
    status: 'active',
    createdAt: '2026-03-10',
    lastLogin: '2026-06-29 16:45',
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    credentialId: 'DECOR-001',
    role: 'DECORATION_MANAGER',
    department: 'decoration',
    status: 'inactive',
    createdAt: '2026-04-05',
    lastLogin: '2026-06-20 09:00',
  },
  {
    id: '5',
    name: 'Robert Chen',
    email: 'robert@example.com',
    credentialId: 'ADMIN-001',
    role: 'SUPER_ADMIN',
    department: 'all',
    status: 'active',
    createdAt: '2026-01-01',
    lastLogin: '2026-06-30 08:30',
  },
];

// Available roles
const availableRoles = [
  { value: 'GENERAL_MANAGER', label: 'General Manager' },
  { value: 'ACCOUNTANT', label: 'Accountant' },
  { value: 'RESTAURANT_STOCK_MANAGER', label: 'Restaurant Stock Manager' },
  { value: 'RESTAURANT_CHEF_LEADER', label: 'Restaurant Chef Leader' },
  { value: 'RESTAURANT_CHEF', label: 'Restaurant Chef' },
  { value: 'RESTAURANT_WAITER_LEADER', label: 'Restaurant Waiter Leader' },
  { value: 'RESTAURANT_WAITER', label: 'Restaurant Waiter' },
  { value: 'RESTAURANT_CASHIER', label: 'Restaurant Cashier' },
  { value: 'RESTAURANT_BARISTA', label: 'Restaurant Barista' },
  { value: 'BAKERY_MANAGER', label: 'Bakery Manager' },
  { value: 'BAKERY_STOCK_MANAGER', label: 'Bakery Stock Manager' },
  { value: 'BAKERY_CASHIER', label: 'Bakery Cashier' },
  { value: 'BAKERY_CHEF_LEADER', label: 'Bakery Chef Leader' },
  { value: 'BAKERY_CHEF', label: 'Bakery Chef' },
  { value: 'BAKERY_BARISTA', label: 'Bakery Barista' },
  { value: 'DECORATION_MANAGER', label: 'Decoration Manager' },
  { value: 'DECORATION_CASHIER', label: 'Decoration Cashier' },
  { value: 'DECORATION_STAFF', label: 'Decoration Staff' },
];

// Available departments
const availableDepartments = [
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'bakery', label: 'Bakery' },
  { value: 'decoration', label: 'Decoration' },
  { value: 'all', label: 'All Departments' },
];

export const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.credentialId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

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
    return found ? found.label : role.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getDepartmentLabel = (dept: string) => {
    const found = availableDepartments.find(d => d.value === dept);
    return found ? found.label : dept;
  };

  const handleDelete = (id: string) => {
    setUserToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    console.log('Deleting user:', userToDelete);
    setIsDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving user:', selectedUser);
    setIsDialogOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-500">Manage all users across the platform</p>
        </div>
        <Button className="bg-restaurant-600 hover:bg-restaurant-700" onClick={() => { setSelectedUser(null); setIsDialogOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Add User
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
                  placeholder="Search users..."
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
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {availableRoles.map((role) => (
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
                <TableHead>User</TableHead>
                <TableHead>Credential ID</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Mail className="h-3 w-3" />
                        {user.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono">
                      {user.credentialId}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{getRoleLabel(user.role)}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {getDepartmentLabel(user.department)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="h-3 w-3" />
                      {user.lastLogin || 'Never'}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(user)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(user.id)}>
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

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedUser ? 'Edit User' : 'Add New User'}</DialogTitle>
            <DialogDescription>
              {selectedUser ? 'Update user details and permissions' : 'Fill in the details to add a new user'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              {/* Personal Information */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-700">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" defaultValue={selectedUser?.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" defaultValue={selectedUser?.email} />
                  </div>
                </div>
              </div>

              {/* Credentials */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-700">Credentials</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="credentialId">Credential ID</Label>
                    <Input id="credentialId" placeholder="WAITER-001" defaultValue={selectedUser?.credentialId} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder={selectedUser ? 'Leave blank to keep current' : 'Enter password'} />
                  </div>
                </div>
              </div>

              {/* Role & Department */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-700">Role & Department</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select defaultValue={selectedUser?.role}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableRoles.map((role) => (
                          <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select defaultValue={selectedUser?.department}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableDepartments.map((dept) => (
                          <SelectItem key={dept.value} value={dept.value}>{dept.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-700">Status</h3>
                <div className="space-y-2">
                  <Select defaultValue={selectedUser?.status || 'active'}>
                    <SelectTrigger className="w-full md:w-1/2">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-restaurant-600 hover:bg-restaurant-700">
                {selectedUser ? 'Update User' : 'Add User'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-3 py-4">
            <AlertCircle className="h-6 w-6 text-red-500" />
            <p className="text-sm text-gray-600">
              All associated data including order history and activity logs will be removed.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};