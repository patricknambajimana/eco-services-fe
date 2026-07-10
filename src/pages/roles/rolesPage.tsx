import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Search,
  Plus,
  Edit,
  Shield,
  Users,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Trash,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  ALL_ROLES, 
  getRolesByDepartment, 
  getRolesByLevel,
  type RoleDefinition 
} from '@/constants/roles.constant';

export const RolesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedDept, setExpandedDept] = useState<string | null>('restaurant');
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'system' | 'general' | 'department'>('all');

  // Filter system roles
  const systemRoles = getRolesByLevel('system');
  const generalRoles = getRolesByLevel('general');
  
  // Filter by search
  const filterRoles = (rolesArray: RoleDefinition[]) => {
    return rolesArray.filter(r =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const restaurantRoles = filterRoles(getRolesByDepartment('restaurant'));
  const bakeryRoles = filterRoles(getRolesByDepartment('bakery'));
  const decorationRoles = filterRoles(getRolesByDepartment('decoration'));

  const filteredSystemRoles = filterRoles(systemRoles);
  const filteredGeneralRoles = filterRoles(generalRoles);

  // Apply level filter
  let displayedRoles = ALL_ROLES;
  if (selectedLevel !== 'all') {
    displayedRoles = displayedRoles.filter(r => r.level === selectedLevel);
  }
  displayedRoles = filterRoles(displayedRoles);

  const RoleCard = ({ role }: { role: RoleDefinition }) => (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-restaurant-300 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          <div className="bg-restaurant-50 p-2 rounded-lg">
            <Shield className="h-5 w-5 text-restaurant-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{role.displayName}</h3>
            <p className="text-sm text-gray-600">{role.description}</p>
          </div>
        </div>
        <Badge variant="outline" className="capitalize flex-shrink-0">
          {role.level}
        </Badge>
      </div>

      {/* Key Pages */}
      <div className="mb-3">
        <p className="text-xs font-semibold text-gray-700 mb-2">Key Pages:</p>
        <div className="flex flex-wrap gap-1">
          {role.keyPages.slice(0, 3).map((page) => (
            <Badge key={page} variant="secondary" className="text-xs bg-blue-50">
              {page}
            </Badge>
          ))}
          {role.keyPages.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{role.keyPages.length - 3} more
            </Badge>
          )}
        </div>
      </div>

      {/* Responsibilities */}
      <div className="mb-3">
        <p className="text-xs font-semibold text-gray-700 mb-2">Responsibilities:</p>
        <ul className="text-xs text-gray-600 space-y-1">
          {role.responsibilities.slice(0, 2).map((resp, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="h-3 w-3 text-green-600 flex-shrink-0 mt-0.5" />
              <span>{resp}</span>
            </li>
          ))}
          {role.responsibilities.length > 2 && (
            <li className="text-gray-500 italic">
              +{role.responsibilities.length - 2} more responsibilities
            </li>
          )}
        </ul>
      </div>

      {/* Permissions */}
      <div className="mb-4 p-3 bg-gray-50 rounded">
        <p className="text-xs font-semibold text-gray-700 mb-2">Permissions:</p>
        <div className="space-y-2 text-xs">
          <div className="flex gap-2">
            <span className="text-gray-600">View:</span>
            <span className="text-restaurant-600 font-medium">{role.canView.join(', ')}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-gray-600">Create:</span>
            <span className="text-green-600 font-medium">{role.canCreate.length > 0 ? role.canCreate.join(', ') : 'None'}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-gray-600">Edit:</span>
            <span className="text-blue-600 font-medium">{role.canEdit.length > 0 ? role.canEdit.join(', ') : 'None'}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-gray-600">Delete:</span>
            <span className="text-red-600 font-medium">{role.canDelete.length > 0 ? role.canDelete.join(', ') : 'None'}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1">
          <Edit className="h-3 w-3 mr-1" />
          Edit
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <Users className="h-3 w-3 mr-1" />
          Assign
        </Button>
        <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
          <Trash className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Roles & Permissions</h1>
          <p className="text-gray-500">Manage 17 roles across 4 departments</p>
        </div>
        <Button className="bg-restaurant-600 hover:bg-restaurant-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Role
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-restaurant-600">{ALL_ROLES.length}</p>
              <p className="text-sm text-gray-600">Total Roles</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{systemRoles.length}</p>
              <p className="text-sm text-gray-600">System Roles</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{generalRoles.length}</p>
              <p className="text-sm text-gray-600">General Roles</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {restaurantRoles.length + bakeryRoles.length + decorationRoles.length}
              </p>
              <p className="text-sm text-gray-600">Department Roles</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search roles by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {(['all', 'system', 'general', 'department'] as const).map((level) => (
                <Button
                  key={level}
                  variant={selectedLevel === level ? 'default' : 'outline'}
                  size="sm"
                  className={selectedLevel === level ? 'bg-restaurant-600' : ''}
                  onClick={() => setSelectedLevel(level)}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System & General Roles */}
      {selectedLevel === 'all' || selectedLevel === 'system' ? (
        filteredSystemRoles.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">👑 System Level</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredSystemRoles.map((role) => (
                <RoleCard key={role.id} role={role} />
              ))}
            </div>
          </div>
        )
      ) : null}

      {selectedLevel === 'all' || selectedLevel === 'general' ? (
        filteredGeneralRoles.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">📋 General Management</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredGeneralRoles.map((role) => (
                <RoleCard key={role.id} role={role} />
              ))}
            </div>
          </div>
        )
      ) : null}

      {/* Department Roles */}
      {selectedLevel === 'all' || selectedLevel === 'department' ? (
        <>
          {/* Restaurant */}
          {restaurantRoles.length > 0 && (
            <div>
              <button
                onClick={() => setExpandedDept(expandedDept === 'restaurant' ? null : 'restaurant')}
                className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200 hover:border-orange-300 transition-colors"
              >
                <h2 className="text-lg font-bold text-gray-900">🍽️ Restaurant Department ({restaurantRoles.length} Roles)</h2>
                {expandedDept === 'restaurant' ? (
                  <ChevronUp className="h-5 w-5 text-gray-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-600" />
                )}
              </button>
              {expandedDept === 'restaurant' && (
                <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {restaurantRoles.map((role) => (
                    <RoleCard key={role.id} role={role} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Bakery */}
          {bakeryRoles.length > 0 && (
            <div>
              <button
                onClick={() => setExpandedDept(expandedDept === 'bakery' ? null : 'bakery')}
                className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-200 hover:border-amber-300 transition-colors"
              >
                <h2 className="text-lg font-bold text-gray-900">🥐 Bakery Department ({bakeryRoles.length} Roles)</h2>
                {expandedDept === 'bakery' ? (
                  <ChevronUp className="h-5 w-5 text-gray-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-600" />
                )}
              </button>
              {expandedDept === 'bakery' && (
                <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {bakeryRoles.map((role) => (
                    <RoleCard key={role.id} role={role} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Decoration */}
          {decorationRoles.length > 0 && (
            <div>
              <button
                onClick={() => setExpandedDept(expandedDept === 'decoration' ? null : 'decoration')}
                className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-200 hover:border-pink-300 transition-colors"
              >
                <h2 className="text-lg font-bold text-gray-900">🏺 Decoration Department ({decorationRoles.length} Roles)</h2>
                {expandedDept === 'decoration' ? (
                  <ChevronUp className="h-5 w-5 text-gray-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-600" />
                )}
              </button>
              {expandedDept === 'decoration' && (
                <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {decorationRoles.map((role) => (
                    <RoleCard key={role.id} role={role} />
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};