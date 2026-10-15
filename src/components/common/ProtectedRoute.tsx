import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import type { Role } from '@/types';

export default function ProtectedRoute({ roles }: { roles?: Role[] }) {
    const { user, can } = useAuth();
    const location = useLocation();
    if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
    if (roles && !can(roles)) return <Navigate to="/forbidden" replace />;
    return <Outlet />;
}