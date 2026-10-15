import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/authSlice';
import { baseApi } from '@/services/baseApi';
import { canAccess } from '@/config/roles';
import type { Department, Role } from '@/types';

export function useAuth() {
    const user = useAppSelector((s) => s.auth.user);
    const can = (roles: Role[]) => !!user && canAccess(user.role, roles);
    return { user, can };
}

/** Returns the user's own department, or undefined for management (sees everything). */
export function useDepartmentScope(): Exclude<Department, 'MANAGEMENT'> | undefined {
    const { user } = useAuth();
    return user && user.department !== 'MANAGEMENT' ? user.department : undefined;
}

export function useLogout() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    return (redirect = '/login') => {
        dispatch(logout());
        dispatch(baseApi.util.resetApiState());
        navigate(redirect, { replace: true });
    };
}