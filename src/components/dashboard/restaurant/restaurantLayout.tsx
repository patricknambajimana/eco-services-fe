import { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Settings, LogOut, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { RESTAURANT_NAV_ITEMS, RESTAURANT_ROLE_LABELS, hasRestaurantPageAccess } from '@/constants/restaurant';
import { RestaurantRole } from '@/types/restaurant.types';
import { NotificationsDropdown } from '@/components/dashboard/superadmin/NotificationsDropdown';

export const RestaurantLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const role = user?.role as RestaurantRole;

  // Only show nav items this role is actually permitted to open —
  // same RBAC source (RESTAURANT_ROLE_PAGES) used to guard the routes themselves.
  const visibleNavItems = RESTAURANT_NAV_ITEMS.filter((item) => hasRestaurantPageAccess(role, item.page));

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside
        className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-restaurant-900 to-restaurant-800 text-white transition-all duration-300 fixed h-screen z-40 shadow-xl overflow-y-auto`}
      >
        <div className="p-6 flex items-center justify-between border-b border-restaurant-700/50">
          {sidebarOpen && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-restaurant-500 rounded-lg flex items-center justify-center font-bold text-lg">R</div>
              <div>
                <div className="text-sm font-bold text-white">Restaurant</div>
                <div className="text-xs text-restaurant-100">{RESTAURANT_ROLE_LABELS[role] ?? 'Staff'}</div>
              </div>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 hover:bg-restaurant-700 rounded-lg text-white">
            {sidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
          </button>
        </div>

        <nav className="mt-6 px-3 space-y-1">
          {visibleNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive ? 'bg-restaurant-500 shadow-lg text-white' : 'text-gray-200 hover:bg-restaurant-700/50'
                }`}
              >
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-restaurant-700/50 space-y-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-300 hover:bg-red-900/30 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            {sidebarOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} flex-1 flex flex-col transition-all duration-300`}>
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Restaurant</h1>
              <p className="text-sm text-gray-600 mt-1">{RESTAURANT_ROLE_LABELS[role] ?? 'Staff'} workspace</p>
            </div>
            <div className="flex items-center gap-4">
              <NotificationsDropdown />
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-600">{RESTAURANT_ROLE_LABELS[role]}</p>
                </div>
                <div className="w-9 h-9 bg-gradient-to-br from-restaurant-500 to-restaurant-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {(user?.name || 'U')[0]}
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};