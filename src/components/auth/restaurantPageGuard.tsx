import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { hasRestaurantPageAccess } from '@/constants/restaurant';
import { RestaurantPage, RestaurantRole } from '@/types/restaurant.types';

interface Props {
  page: RestaurantPage;
}

export const RestaurantPageGuard = ({ page }: Props) => {
  const { user } = useAuth();
  const role = user?.role as RestaurantRole;

  if (!hasRestaurantPageAccess(role, page)) {
    return <Navigate to="/restaurant" replace />;
  }

  return <Outlet />;
};