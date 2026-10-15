import { LogOut, Menu } from 'lucide-react';
import { useAuth, useLogout } from '@/hooks/useAuth';
import { roleLabel } from '@/config/roles';
import NotificationBell from './NotificationBell';

export default function Topbar({ onMenu }: { onMenu: () => void }) {
    const { user } = useAuth();
    const logout = useLogout();
    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 lg:px-8">
            <button className="rounded-lg p-2 hover:bg-slate-100 lg:hidden" onClick={onMenu} aria-label="Open menu">
                <Menu size={20} />
            </button>
            <div className="hidden lg:block" />
            <div className="flex items-center gap-3">
                <NotificationBell />
                <div className="text-right leading-tight">
                    <p className="text-sm font-semibold">{user?.fullName}</p>
                    <p className="text-xs text-slate-500">{user && roleLabel(user.role)}</p>
                </div>
                <button onClick={() => logout()} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100" aria-label="Log out">
                    <LogOut size={20} />
                </button>
            </div>
        </header>
    );
}