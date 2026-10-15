import { useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import type { ReactElement } from 'react';
import {
    ArrowRight, BarChart3, ChefHat, ClipboardList, Gift, LayoutDashboard,
    Leaf, Package, ShieldCheck, Store, Users, Wheat, Workflow,
} from 'lucide-react';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ACCESS } from '@/config/access';
import type { Role } from '@/types';

import LoginPage from '@/pages/auth/LoginPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';
import SessionExpiredPage from '@/pages/auth/SessionExpiredPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import OrdersPage from '@/pages/orders/OrdersPage';
import CreateOrderPage from '@/pages/orders/CreateOrderPage';
import OrderDetailsPage from '@/pages/orders/OrderDetailsPage';
import StaffPage from '@/pages/staff/StaffPage';
import CredentialsPage from '@/pages/staff/CredentialsPage';
import CommunicationsPage from '@/pages/communications/CommunicationsPage';
import SchedulePage from '@/pages/staff/SchedulePage';
import InventoryPage from '@/pages/inventory/InventoryPage';
import StockMovementsPage from '@/pages/inventory/StockMovementsPage';
import RequisitionsPage from '@/pages/inventory/RequisitionsPage';
import SuppliersPage from '@/pages/inventory/SuppliersPage';
import BatchesPage from '@/pages/bakery/BatchesPage';
import KitchenPage from '@/pages/restaurant/KitchenPage';
import TablesPage from '@/pages/restaurant/TablesPage';
import MenuManagementPage from '@/pages/menu/MenuManagementPage';
import PublicMenuPage from '@/pages/menu/PublicMenuPage';
import ShowroomPage from '@/pages/decoration/ShowroomPage';
import GiftServicesPage from '@/pages/decoration/GiftServicesPage';
import DepartmentPage from '@/pages/departments/DepartmentPage';
import ReportsPage from '@/pages/reports/ReportsPage';
import SettingsPage from '@/pages/settings/SettingsPage';
import { ForbiddenPage, NotFoundPage } from '@/pages/ErrorPages';

function HomePage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = window.setTimeout(() => setIsLoading(false), 1100);
        return () => window.clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-bakery-50 px-6 text-center">
                <div className="flex max-w-md flex-col items-center">
                    <img
                        src="/logo/EcoServices%20Business%20Management%20Logo.png"
                        alt="Eco-Services Business Management"
                        className="mb-10 h-20 w-auto object-contain"
                    />
                    <p className="font-serif text-xl italic text-bakery-700">Loading</p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Eco-Services</h1>
                    <p className="mt-3 text-base italic text-slate-500">Please wait while we prepare your workspace</p>
                    <div className="mt-10 h-12 w-12 animate-spin rounded-full border-4 border-bakery-100 border-t-bakery-600" aria-label="Loading" />
                </div>
            </main>
        );
    }

    const departments = [
        {
            title: 'Restaurant',
            description: 'Coordinate tables, menus, kitchen tickets, and service.',
            icon: ChefHat,
            className: 'border-restaurant-100 bg-restaurant-50 text-restaurant-700',
        },
        {
            title: 'Bakery',
            description: 'Plan production batches and keep fresh products moving.',
            icon: Wheat,
            className: 'border-bakery-100 bg-bakery-50 text-bakery-700',
        },
        {
            title: 'Decoration',
            description: 'Manage showroom requests and thoughtful gift services.',
            icon: Gift,
            className: 'border-decoration-100 bg-decoration-50 text-decoration-700',
        },
    ];

    const workflow = [
        ['01', 'Capture the order', 'Create customer orders and choose the responsible department.'],
        ['02', 'Fulfil with confidence', 'Move work through kitchen, bakery, showroom, and delivery workflows.'],
        ['03', 'Keep control', 'Monitor stock, people, performance, and reports from one workspace.'],
    ];

    return (
        <main className="min-h-screen overflow-hidden bg-bakery-50 text-slate-900">
            <section className="relative isolate overflow-hidden bg-bakery-700 text-white">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_10%,rgba(252,224,235,0.3),transparent_34%),linear-gradient(135deg,#801e4e,#43132d)]" />
                <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
                    <Link to="/" className="flex items-center gap-3">
                        <img src="/logo/EcoServices%20Business%20Management%20Logo.png" alt="Eco-Services" className="h-12 w-auto rounded-lg bg-white px-2 py-1 object-contain" />
                        <span className="hidden border-l border-white/30 pl-3 text-sm font-medium text-bakery-100 sm:block">Business Management</span>
                    </Link>
                    <Link to="/login" className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-bakery-700 shadow-sm transition hover:bg-bakery-50">Sign in</Link>
                </nav>
                <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pt-20">
                    <div className="max-w-2xl">
                        <p className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-bakery-100"><Leaf size={17} /> One connected business</p>
                        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Make every service feel effortless.</h1>
                        <p className="mt-6 max-w-xl text-lg leading-8 text-bakery-50">
                            A clear, secure workspace for managing your restaurant, bakery, and decoration teams from order to fulfilment.
                        </p>
                        <div className="mt-9 flex flex-wrap gap-3">
                            <Link to="/login" className="inline-flex items-center gap-2 rounded-lg bg-bakery-300 px-5 py-3 font-semibold text-bakery-900 transition hover:bg-white">Open your workspace <ArrowRight size={18} /></Link>
                            <a href="#departments" className="rounded-lg border border-white/25 px-5 py-3 font-semibold text-white transition hover:bg-white/10">Explore departments</a>
                        </div>
                    </div>
                    <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-sm">
                        <div className="flex items-center justify-between border-b border-white/15 pb-5">
                            <div><p className="text-sm text-bakery-100">Today at a glance</p><h2 className="mt-1 text-xl font-semibold">Your operations hub</h2></div>
                            <LayoutDashboard className="text-bakery-100" size={28} />
                        </div>
                        <div className="grid grid-cols-2 gap-3 py-5">
                            {[
                                [ClipboardList, 'Orders', 'From request to delivery'],
                                [Package, 'Inventory', 'Stock that stays visible'],
                                [Users, 'People', 'Teams with clear roles'],
                                [BarChart3, 'Insights', 'Decisions backed by data'],
                            ].map(([Icon, title, description]) => {
                                const FeatureIcon = Icon as typeof ClipboardList;
                                return <div key={title as string} className="rounded-xl bg-black/10 p-4"><FeatureIcon size={20} className="text-bakery-200" /><h3 className="mt-3 text-sm font-semibold">{title as string}</h3><p className="mt-1 text-xs leading-5 text-bakery-100">{description as string}</p></div>;
                            })}
                        </div>
                        <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm text-bakery-50"><ShieldCheck size={18} className="text-bakery-200" /> Secure, role-based access for every team member</div>
                    </div>
                </div>
            </section>
            <section id="departments" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-bakery-600">Built around your business</p><h2 className="mt-2 text-3xl font-bold tracking-tight">Every department, one rhythm.</h2></div>
                    <p className="max-w-md text-sm leading-6 text-slate-500">Each team gets the tools and color language that match the work they do, while management keeps the full picture.</p>
                </div>
                <div className="mt-8 grid gap-4 md:grid-cols-3">
                    {departments.map(({ title, description, icon: Icon, className }) => <div key={title} className={`rounded-2xl border p-6 transition hover:-translate-y-1 hover:shadow-lg ${className}`}><Icon size={28} /><h3 className="mt-6 text-lg font-bold text-slate-900">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p></div>)}
                </div>
            </section>
            <section className="border-y border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                    <div className="max-w-xl"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-bakery-600">A simple system flow</p><h2 className="mt-2 text-3xl font-bold tracking-tight">From first request to a better day.</h2></div>
                    <div className="mt-10 grid gap-8 md:grid-cols-3">{workflow.map(([number, title, description]) => <div key={number} className="relative"><span className="text-4xl font-bold text-bakery-200">{number}</span><h3 className="mt-3 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{description}</p></div>)}</div>
                </div>
            </section>
            <footer className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-slate-500 lg:px-8">
                <p className="flex items-center gap-2"><Store size={16} className="text-bakery-600" /> Eco-Services Business Management</p>
                <Link to="/login" className="font-semibold text-bakery-700 hover:text-bakery-900">Sign in to continue <ArrowRight className="ml-1 inline" size={15} /></Link>
            </footer>
        </main>
    );
}

function guarded(path: string, roles: Role[], element: ReactElement) {
    return (
        <Route key={path} element={<ProtectedRoute roles={roles} />}>
            <Route path={path} element={element} />
        </Route>
    );
}

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/menu/:dept" element={<PublicMenuPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/session-expired" element={<SessionExpiredPage />} />

            <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/departments/:department" element={<DepartmentPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/forbidden" element={<ForbiddenPage />} />

                    {guarded('/orders', ACCESS.orders, <OrdersPage />)}
                    {guarded('/orders/new', ACCESS.createOrder, <CreateOrderPage />)}
                    {guarded('/menus', ACCESS.menu, <MenuManagementPage />)}
                    {guarded('/orders/:id', ACCESS.orders, <OrderDetailsPage />)}
                    {guarded('/staff', ACCESS.staff, <StaffPage />)}
                    {guarded('/staff/credentials', ACCESS.credentials, <CredentialsPage />)}
                    {guarded('/communications', ACCESS.communications, <CommunicationsPage />)}
                    {guarded('/staff/schedule', ACCESS.schedule, <SchedulePage />)}
                    {guarded('/inventory', ACCESS.inventory, <InventoryPage />)}
                    {guarded('/inventory/movements', ACCESS.movements, <StockMovementsPage />)}
                    {guarded('/inventory/requisitions', ACCESS.requisitions, <RequisitionsPage />)}
                    {guarded('/inventory/suppliers', ACCESS.suppliers, <SuppliersPage />)}
                    {guarded('/bakery/batches', ACCESS.batches, <BatchesPage />)}
                    {guarded('/restaurant/kitchen', ACCESS.kitchen, <KitchenPage />)}
                    {guarded('/restaurant/tables', ACCESS.tables, <TablesPage />)}
                    {guarded('/restaurant/menu', ACCESS.menu, <MenuManagementPage />)}
                    {guarded('/decoration/showroom', ACCESS.showroom, <ShowroomPage />)}
                    {guarded('/decoration/gifts', ACCESS.gifts, <GiftServicesPage />)}
                    {guarded('/reports', ACCESS.reports, <ReportsPage />)}
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Route>
        </Routes>
    );
}
