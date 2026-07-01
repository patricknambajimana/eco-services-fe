import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, LogOut, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export const UserActions = () => {
  const navigate = useNavigate();
  const {user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" className="relative">
        <Heart className="h-5 w-5 text-gray-600" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
          3
        </span>
      </Button>
      <Button variant="ghost" size="sm" className="relative">
        <ShoppingCart className="h-5 w-5 text-gray-600" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-restaurant-500 text-white text-[10px] rounded-full flex items-center justify-center">
          2
        </span>
      </Button>
      <div className="flex items-center gap-2 ml-2">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-gray-900">
            {user?.name || 'Guest'}
          </p>
          <p className="text-xs text-gray-500">Customer</p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="gap-2 border-2 hover:border-red-500 hover:bg-red-50 hover:text-red-600 transition-colors">
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </div>
  );
};