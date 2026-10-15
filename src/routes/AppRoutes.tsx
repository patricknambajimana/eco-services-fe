import { Navigate, Route, Routes } from 'react-router-dom';
import type { ReactElement } from 'react';
import { ArrowRight, BarChart3, Leaf, ShieldCheck, Workflow } from 'lucide-react';
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
import SchedulePage from '@/pages/staff/SchedulePage';
import InventoryPage from '@/pages/inventory/InventoryPage';
import StockMovementsPage from '@/pages/inventory/StockMovementsPage';
import RequisitionsPage from '@/pages/inventory/RequisitionsPage';
import SuppliersPage from '@/pages/inventory/SuppliersPage';
import BatchesPage from '@/pages/bakery/BatchesPage';
import KitchenPage from '@/pages/restaurant/KitchenPage';
import TablesPage from '@/pages/restaurant/TablesPage';
import MenuPage from '@/pages/restaurant/MenuPage';
import ShowroomPage from '@/pages/decoration/ShowroomPage';
import GiftServicesPage from '@/pages/decoration/GiftServicesPage';
import ReportsPage from '@/pages/reports/ReportsPage';
import SettingsPage from '@/pages/settings/SettingsPage';
import { ForbiddenPage, NotFoundPage } from '@/pages/ErrorPages';

function HomePage() {
    return (
        <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
            <section className="relative isolate">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.22),transparent_45%)]" />
                <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
                    <div className="flex items-center gap-3 text-lg font-semibold">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500"><Leaf size={22} /></span>
                        Eco-Service
                    </div>
                    <a href="/login" className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium hover:bg-white/10">Sign in</a>
                </nav>
                <div className="mx-auto grid max-w-7xl gap-16 px-6 pb-24 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pt-24">
                    <div className="max-w-2xl">
                        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">Business operations platform</p>
                        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">One clear view of every department.</h1>
                        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                            Manage restaurant, bakery, and decoration operations from one secure workspace connected to your backend.
                        </p>
                        <div className="mt-9 flex flex-wrap gap-3">
                            <a href="/login" className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 font-semibold text-slate-950 hover:bg-emerald-400">
                                Continue to login <ArrowRight size={18} />
                            </a>
                            <a href="#features" className="rounded-lg border border-white/20 px-5 py-3 font-semibold text-white hover:bg-white/10">Explore features</a>
                        </div>
                    </div>
                    <div className="grid gap-4 self-end sm:grid-cols-2 lg:grid-cols-1">
                        {[
                            [ShieldCheck, 'Secure access', 'Role-based access for every team member.'],
                            [BarChart3, 'Actionable reporting', 'Track sales, inventory, and performance.'],
                            [Workflow, 'Connected workflows', 'Move work smoothly from order to fulfilment.'],
                        ].map(([Icon, title, description]) => {
                            const FeatureIcon = Icon as typeof ShieldCheck;
                            return <div key={title as string} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                                <FeatureIcon className="text-emerald-300" size={23} />
                                <h2 className="mt-4 font-semibold">{title as string}</h2>
                                <p className="mt-1 text-sm text-slate-400">{description as string}</p>
                            </div>;
                        })}
                    </div>
                </div>
            </section>
            <section id="features" className="mx-auto grid max-w-7xl gap-4 px-6 pb-16 sm:grid-cols-3 lg:px-8">
                {['Orders and customers', 'Inventory and requisitions', 'Staff and schedules'].map((feature) => (
                    <div key={feature} className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-sm text-slate-300">{feature}</div>
                ))}
            </section>
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
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/session-expired" element={<SessionExpiredPage />} />

            <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/forbidden" element={<ForbiddenPage />} />

                    {guarded('/orders', ACCESS.orders, <OrdersPage />)}
                    {guarded('/orders/new', ACCESS.createOrder, <CreateOrderPage />)}
                    {guarded('/orders/:id', ACCESS.orders, <OrderDetailsPage />)}
                    {guarded('/staff', ACCESS.staff, <StaffPage />)}
                    {guarded('/staff/credentials', ACCESS.credentials, <CredentialsPage />)}
                    {guarded('/staff/schedule', ACCESS.schedule, <SchedulePage />)}
                    {guarded('/inventory', ACCESS.inventory, <InventoryPage />)}
                    {guarded('/inventory/movements', ACCESS.movements, <StockMovementsPage />)}
                    {guarded('/inventory/requisitions', ACCESS.requisitions, <RequisitionsPage />)}
                    {guarded('/inventory/suppliers', ACCESS.suppliers, <SuppliersPage />)}
                    {guarded('/bakery/batches', ACCESS.batches, <BatchesPage />)}
                    {guarded('/restaurant/kitchen', ACCESS.kitchen, <KitchenPage />)}
                    {guarded('/restaurant/tables', ACCESS.tables, <TablesPage />)}
                    {guarded('/restaurant/menu', ACCESS.menu, <MenuPage />)}
                    {guarded('/decoration/showroom', ACCESS.showroom, <ShowroomPage />)}
                    {guarded('/decoration/gifts', ACCESS.gifts, <GiftServicesPage />)}
                    {guarded('/reports', ACCESS.reports, <ReportsPage />)}
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Route>
        </Routes>
    );
}
