import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  MapPin,
  Users,
  DollarSign,
  Star,
  AlertCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';

// Mock data for the page
const mockBusinesses = [
  { 
    id: '1', 
    name: 'Downtown Bistro', 
    type: 'restaurant', 
    status: 'active', 
    location: '123 Main St, City',
    manager: 'John Smith',
    staffCount: 15,
    revenue: 12430,
    orders: 156,
    rating: 4.8,
    joinedDate: '2025-01-15',
    lastActive: '2026-06-30 14:30',
    settings: {
      operatingHours: '9:00 AM - 11:00 PM',
      deliveryRadius: 5,
      deliveryFee: 2.99,
    }
  },
  { 
    id: '2', 
    name: 'Artisan Bakery', 
    type: 'bakery', 
    status: 'active', 
    location: '456 Oak Ave, City',
    manager: 'Sarah Johnson',
    staffCount: 8,
    revenue: 2890,
    orders: 78,
    rating: 4.9,
    joinedDate: '2025-03-01',
    lastActive: '2026-06-30 16:45',
    settings: {
      operatingHours: '7:00 AM - 8:00 PM',
      deliveryRadius: 3,
      deliveryFee: 1.99,
    }
  },
  { 
    id: '3', 
    name: 'Elegant Decor', 
    type: 'decoration', 
    status: 'active', 
    location: '789 Pine St, City',
    manager: 'Emily Davis',
    staffCount: 5,
    revenue: 1110,
    orders: 33,
    rating: 4.7,
    joinedDate: '2025-06-10',
    lastActive: '2026-06-30 10:20',
    settings: {
      operatingHours: '10:00 AM - 9:00 PM',
      deliveryRadius: 20,
      deliveryFee: 5.99,
    }
  },
  { 
    id: '4', 
    name: 'Grand Plaza', 
    type: 'mixed', 
    status: 'active', 
    location: '101 Plaza Blvd, City',
    manager: 'Robert Wilson',
    staffCount: 25,
    revenue: 21560,
    orders: 234,
    rating: 4.6,
    joinedDate: '2024-09-01',
    lastActive: '2026-06-30 12:10',
    settings: {
      operatingHours: '8:00 AM - 10:00 PM',
      deliveryRadius: 10,
      deliveryFee: 3.99,
    }
  },
  { 
    id: '5', 
    name: 'Coffee & Pastry', 
    type: 'bakery', 
    status: 'inactive', 
    location: '222 Coffee Ln, City',
    manager: 'Lisa Park',
    staffCount: 0,
    revenue: 0,
    orders: 0,
    rating: 0,
    joinedDate: '2025-11-15',
    lastActive: '2026-05-15 09:00',
    settings: {
      operatingHours: '7:00 AM - 6:00 PM',
      deliveryRadius: 3,
      deliveryFee: 1.99,
    }
  },
];

export const BusinessesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [businessToDelete, setBusinessToDelete] = useState<string | null>(null);

  const filteredBusinesses = mockBusinesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          business.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          business.manager.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || business.status === statusFilter;
    const matchesType = typeFilter === 'all' || business.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-400';
      case 'suspended': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'restaurant': return '🍽️';
      case 'bakery': return '🥐';
      case 'decoration': return '🏺';
      case 'mixed': return '🏢';
      default: return '🏢';
    }
  };

  const handleDelete = (id: string) => {
    setBusinessToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // In real app, call API to delete
    console.log('Deleting business:', businessToDelete);
    setIsDeleteDialogOpen(false);
    setBusinessToDelete(null);
  };

  const handleEdit = (business: any) => {
    setSelectedBusiness(business);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, call API to save
    console.log('Saving business:', selectedBusiness);
    setIsDialogOpen(false);
    setSelectedBusiness(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Businesses</h1>
          <p className="text-gray-500">Manage all businesses across the platform</p>
        </div>
        <Button className="bg-restaurant-600 hover:bg-restaurant-700" onClick={() => { setSelectedBusiness(null); setIsDialogOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Business
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
                  placeholder="Search businesses..."
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
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="restaurant">Restaurant</SelectItem>
                <SelectItem value="bakery">Bakery</SelectItem>
                <SelectItem value="decoration">Decoration</SelectItem>
                <SelectItem value="mixed">Mixed</SelectItem>
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
                <TableHead>Business</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead>Staff</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBusinesses.map((business) => (
                <TableRow key={business.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getTypeIcon(business.type)}</span>
                      <div>
                        <p className="font-medium text-gray-900">{business.name}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                          {business.rating || '—'}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">{business.type}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      {business.location}
                    </div>
                  </TableCell>
                  <TableCell>{business.manager || 'Unassigned'}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-gray-400" />
                      {business.staffCount}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3 text-gray-400" />
                      {business.revenue.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(business.status)}>
                      {business.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/super-admin/businesses/${business.id}`)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(business)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(business.id)}>
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
            <DialogTitle>{selectedBusiness ? 'Edit Business' : 'Add New Business'}</DialogTitle>
            <DialogDescription>
              {selectedBusiness ? 'Update business details and settings' : 'Fill in the details to add a new business'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              {/* Basic Information */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-700">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Business Name</Label>
                    <Input id="name" placeholder="e.g., Downtown Bistro" defaultValue={selectedBusiness?.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select defaultValue={selectedBusiness?.type}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="restaurant">Restaurant</SelectItem>
                        <SelectItem value="bakery">Bakery</SelectItem>
                        <SelectItem value="decoration">Decoration</SelectItem>
                        <SelectItem value="mixed">Mixed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="e.g., 123 Main St, City" defaultValue={selectedBusiness?.location} />
                </div>
              </div>

              {/* Management */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-700">Management</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="manager">Manager</Label>
                    <Select defaultValue={selectedBusiness?.manager}>
                      <SelectTrigger>
                        <SelectValue placeholder="Assign manager" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="John Smith">John Smith</SelectItem>
                        <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                        <SelectItem value="Emily Davis">Emily Davis</SelectItem>
                        <SelectItem value="Robert Wilson">Robert Wilson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select defaultValue={selectedBusiness?.status || 'active'}>
                      <SelectTrigger>
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

              {/* Settings */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-700">Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hours">Operating Hours</Label>
                    <Input id="hours" placeholder="e.g., 9:00 AM - 11:00 PM" defaultValue={selectedBusiness?.settings?.operatingHours} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="radius">Delivery Radius (km)</Label>
                    <Input id="radius" type="number" placeholder="5" defaultValue={selectedBusiness?.settings?.deliveryRadius} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fee">Delivery Fee ($)</Label>
                    <Input id="fee" type="number" step="0.01" placeholder="2.99" defaultValue={selectedBusiness?.settings?.deliveryFee} />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-restaurant-600 hover:bg-restaurant-700">
                {selectedBusiness ? 'Update Business' : 'Add Business'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Business</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this business? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-3 py-4">
            <AlertCircle className="h-6 w-6 text-red-500" />
            <p className="text-sm text-gray-600">
              All associated data including orders, staff, and inventory will be permanently removed.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete Business</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};