import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  Shield, 
  FileText, 
  Activity, 
  Settings,
  Home
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navItems = [
    { path: '/general-manager', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/general-manager/businesses', label: 'Businesses', icon: Building2 },
    { path: '/general-manager/managers', label: 'Managers', icon: Users },
    { path: '/general-manager/roles', label: 'Roles & Permissions', icon: Shield },
    { path: '/general-manager/reports', label: 'Reports', icon: FileText },
    { path: '/general-manager/activity', label: 'Activity Log', icon: Activity },
    { path: '/general-manager/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed lg:sticky top-0 left-0 z-50
        w-64 h-screen bg-gradient-to-b from-restaurant-900 to-restaurant-800
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex flex-col h-full text-white">
          {/* Brand */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <div>
                <span className="text-xl font-bold">NPGROUP</span>
                <span className="block text-xs text-white/60 font-medium">
                  General Manager
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <NavLink
              to="/home"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            >
              <Home className="h-5 w-5" />
              <span className="font-medium">Back to Store</span>
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
};