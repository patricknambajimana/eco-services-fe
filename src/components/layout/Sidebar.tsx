import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, FolderOpen, X } from 'lucide-react';
import { NAV_ITEMS } from '@/config/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
    const { user, can } = useAuth();
    const [activeDepartment, setActiveDepartment] = useState(user?.department === 'MANAGEMENT' ? '' : user?.department ?? '');
    const items = NAV_ITEMS.filter((i) => i.roles === 'ALL' || can(i.roles));
    const overview = items.filter((i) => i.section === 'Overview');
    const communications = items.filter((i) => i.label === 'Messages & Email');
    const system = items.filter((i) => i.section === 'System');
    const departmentOperations = [
        ...(user?.department === 'MANAGEMENT' ? [{ key: 'MANAGEMENT', name: 'Management', labels: [] }] : []),
        { key: 'RESTAURANT', name: 'Restaurant', labels: ['Orders', 'New Order', 'Kitchen', 'Tables', 'Menu'] },
        { key: 'BAKERY', name: 'Bakery', labels: ['Orders', 'New Order', 'Production Batches'] },
        { key: 'DECORATION', name: 'Decoration', labels: ['Orders', 'New Order', 'Showroom', 'Gift Services'] },
    ].map((department) => ({
        ...department,
        items: department.labels
            .map((label) => items.find((item) => item.label === label))
            .filter((item): item is (typeof items)[number] => item !== undefined),
    }));

    const renderItems = (sectionItems: typeof items) => sectionItems.map(({ path, label, icon: Icon }) => (
        <NavLink
            key={path}
            to={path}
            end
            onClick={onClose}
            className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${isActive ? 'bg-sidebar-primary font-medium text-sidebar-primary-foreground shadow-sm' : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}`}
        >
            <Icon size={18} /> {label}
        </NavLink>
    ));

    const renderSection = (label: string, sectionItems: typeof items) => sectionItems.length > 0 && (
        <div>
            <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/55">{label}</p>
            {renderItems(sectionItems)}
        </div>
    );

    return (
        <>
            {open && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={onClose} />}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 transform overflow-y-auto bg-sidebar text-sidebar-foreground transition lg:static lg:translate-x-0
        ${open ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex min-h-24 items-center justify-between border-b border-sidebar-border px-3">
                    <div className="flex h-16 flex-1 items-center justify-center rounded-xl bg-white px-3 py-2 shadow-sm">
                        <img src="/logo/EcoServices%20Business%20Management%20Logo.png" alt="Eco-Services Business Management" className="h-full w-full object-contain" />
                    </div>
                    <button className="lg:hidden" onClick={onClose} aria-label="Close menu"><X size={18} /></button>
                </div>
                <nav className="space-y-5 px-3 pb-8 pt-2">
                    {renderSection('Overview', overview)}
                    {renderSection('Communication', communications)}
                    <div>
                        <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/55">Departments</p>
                        <div className="space-y-2">
                            {departmentOperations.map(({ key, name, items: operationItems }) => (
                                <div key={name} className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-sidebar-accent/35">
                                    <div className="flex items-center gap-1">
                                        <button
                                            type="button"
                                            onClick={() => setActiveDepartment(activeDepartment === key ? '' : key)}
                                            className="flex min-w-0 flex-1 items-center gap-2 px-3 py-3 text-left text-sm font-semibold text-sidebar-accent-foreground transition hover:bg-sidebar-accent"
                                            aria-expanded={activeDepartment === key}
                                        >
                                            {activeDepartment === key ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                            <FolderOpen size={17} className="text-bakery-300" />
                                            <span>{name}</span>
                                        </button>
                                        <Link
                                            to={`/departments/${key.toLowerCase()}`}
                                            onClick={onClose}
                                            className="mr-2 rounded-md p-1.5 text-sidebar-foreground/60 transition hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                            aria-label={`Open ${name} workspace`}
                                        >
                                            <span className="sr-only">Open {name} workspace</span>
                                            <FolderOpen size={15} />
                                        </Link>
                                    </div>
                                    {activeDepartment === key && (
                                        <div className="border-t border-sidebar-border/70 px-2 py-2">
                                            {renderItems(operationItems)}
                                            <Link
                                                to={`/departments/${key.toLowerCase()}`}
                                                onClick={onClose}
                                                className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-bakery-200 transition hover:bg-sidebar-accent hover:text-white"
                                            >
                                                View all {name} operations →
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    {renderSection('System', system)}
                </nav>
                <p className="px-5 pb-4 text-[11px] text-sidebar-foreground/50">{user?.department} department</p>
            </aside>
        </>
    );
}