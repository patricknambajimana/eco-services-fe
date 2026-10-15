import { NavLink } from 'react-router-dom';
import { Leaf, X } from 'lucide-react';
import { NAV_ITEMS } from '@/config/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
    const { user, can } = useAuth();
    const items = NAV_ITEMS.filter((i) => i.roles === 'ALL' || can(i.roles));
    const sections = [...new Set(items.map((i) => i.section))];

    return (
        <>
            {open && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={onClose} />}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 transform overflow-y-auto bg-brand-900 text-brand-50 transition lg:static lg:translate-x-0
        ${open ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex h-16 items-center justify-between px-5">
                    <div className="flex items-center gap-2 font-bold"><Leaf size={22} /> Eco-Service</div>
                    <button className="lg:hidden" onClick={onClose} aria-label="Close menu"><X size={18} /></button>
                </div>
                <nav className="space-y-5 px-3 pb-8 pt-2">
                    {sections.map((section) => (
                        <div key={section}>
                            <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-brand-200/70">{section}</p>
                            {items.filter((i) => i.section === section).map(({ path, label, icon: Icon }) => (
                                <NavLink
                                    key={path}
                                    to={path}
                                    end
                                    onClick={onClose}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${isActive ? 'bg-brand-700 font-medium text-white' : 'text-brand-100 hover:bg-brand-800'}`}
                                >
                                    <Icon size={18} /> {label}
                                </NavLink>
                            ))}
                        </div>
                    ))}
                </nav>
                <p className="px-5 pb-4 text-[11px] text-brand-200/60">{user?.department} department</p>
            </aside>
        </>
    );
}