// components/dashboard/superadmin/AdminSidebar.tsx
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Shield, 
  FileText, 
  Activity, 
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

interface NavItem {
  path: string;
  label: string;
  icon: any;
}

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  navItems?: NavItem[];
  brand?: string;
  brandSubtitle?: string;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  onLogout?: () => void;
}

const defaultNavItems: NavItem[] = [
  { path: '/superadmin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/superadmin/users', label: 'Users', icon: Users },
  { path: '/superadmin/businesses', label: 'Businesses', icon: Building2 },
  { path: '/superadmin/roles', label: 'Roles & Permissions', icon: Shield },
  { path: '/superadmin/reports', label: 'Reports', icon: FileText },
  { path: '/superadmin/activity', label: 'Activity Log', icon: Activity },
  { path: '/superadmin/settings', label: 'Settings', icon: Settings },
];

export const AdminSidebar = ({
  open,
  setOpen,
  navItems = defaultNavItems,
  brand = 'NPGROUP',
  brandSubtitle = 'Super Admin',
  collapsed: collapsedProp,
  onCollapsedChange,
  onLogout,
}: SidebarProps) => {
  const { user } = useAuth();
  const location = useLocation();

  // Support both controlled (parent tracks collapsed state) and
  // uncontrolled (this component tracks it internally) usage.
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const collapsed = collapsedProp ?? internalCollapsed;
  const setCollapsed = (val: boolean) => {
    if (onCollapsedChange) onCollapsedChange(val);
    else setInternalCollapsed(val);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen flex flex-col",
          "bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-950",
          "transition-all duration-300 ease-in-out",
          collapsed ? "w-20" : "w-64",
          "lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand */}
        <div className={cn(
          "p-4 border-b border-indigo-800/50 flex items-center",
          collapsed ? "justify-center" : "justify-between"
        )}>
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <span className="text-white font-bold text-xl">{brand[0]}</span>
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight">{brand}</span>
                <p className="text-[10px] text-indigo-300/80 font-medium">{brandSubtitle}</p>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-white font-bold text-xl">{brand[0]}</span>
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 rounded-lg hover:bg-indigo-800/50 text-indigo-300 hover:text-white transition-colors"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {navItems.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  title={collapsed ? item.label : ""}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "group flex items-center rounded-xl px-4 py-3 transition-all duration-300",
                    active
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "text-slate-200 hover:bg-indigo-800/60 hover:text-white",
                    collapsed ? "justify-center" : "justify-start"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 flex-shrink-0 transition-colors",
                      active
                        ? "text-white"
                        : "text-slate-300 group-hover:text-white"
                    )}
                  />

                  {!collapsed && (
                    <>
                      <span className="ml-3 text-sm font-medium whitespace-nowrap">
                        {item.label}
                      </span>

                      {item.label === "Dashboard" && (
                        <Badge className="ml-auto bg-indigo-500 hover:bg-indigo-500 text-white text-[10px]">
                          New
                        </Badge>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className={cn(
          "p-3 border-t border-indigo-800/50",
          collapsed ? "flex flex-col items-center gap-3" : "space-y-2"
        )}>
          {/* User Info */}
          <div className={cn(
            "p-2 rounded-lg bg-indigo-800/30 backdrop-blur-sm",
            collapsed ? "flex justify-center" : "flex items-center gap-3"
          )}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0 shadow-lg shadow-indigo-500/30">
              {(user?.name || 'A')[0].toUpperCase()}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user?.name || 'Admin User'}
                </p>
                <p className="text-xs text-indigo-300/70 truncate">
                  {user?.email || 'admin@example.com'}
                </p>
              </div>
            )}
          </div>

          {/* Logout */}
          <button
            onClick={onLogout}
            className={cn(
              "group flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-all",
              "text-slate-200 hover:bg-red-500/10 hover:text-red-400",
              collapsed && "justify-center"
            )}
          >
            <LogOut className="h-5 w-5 text-slate-300 group-hover:text-red-400" />

            {!collapsed && (
              <span className="font-medium">
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};