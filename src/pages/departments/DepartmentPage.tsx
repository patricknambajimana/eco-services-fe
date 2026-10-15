import { Link, useParams } from 'react-router-dom';
import {
    ArrowLeftRight, BarChart3, CalendarDays, ChefHat, ClipboardList, CreditCard, Gift,
    LayoutDashboard, LayoutGrid, Package, PlusCircle, Settings, ShoppingCart, Store,
    Truck, UserCog, Users, UtensilsCrossed, Wheat,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ACCESS } from '@/config/access';
import PageHeader from '@/components/ui/PageHeader';
import Card from '@/components/ui/LegacyCard';
import type { Department } from '@/types';

type WorkspaceDepartment = Department;
type AccessKey = keyof typeof ACCESS;

interface Operation {
    label: string;
    description: string;
    icon: LucideIcon;
    access?: AccessKey;
    path?: string;
}

interface OperationGroup {
    title: string;
    operations: Operation[];
}

interface WorkspaceConfig {
    title: string;
    description: string;
    className: string;
    groups: OperationGroup[];
}

const shared: OperationGroup = {
    title: 'Shared operations',
    operations: [
        { label: 'Orders', description: 'Create, search, filter, update, and export orders through every status.', icon: ShoppingCart, access: 'orders', path: '/orders' },
        { label: 'New order', description: 'Create an order for a customer and assign its department.', icon: PlusCircle, access: 'createOrder', path: '/orders/new' },
        { label: 'Stock movements', description: 'Record purchases, transfers, production usage, sold stock, and waste.', icon: ArrowLeftRight, access: 'movements', path: '/inventory/movements' },
        { label: 'Requisitions', description: 'Submit, review, approve, reject, and fulfil stock requests.', icon: ClipboardList, access: 'requisitions', path: '/inventory/requisitions' },
        { label: 'Notifications', description: 'Receive order, inventory, production, staff, and system alerts.', icon: Settings, path: '/dashboard' },
    ],
};

const departmentConfig: Record<WorkspaceDepartment, WorkspaceConfig> = {
    MANAGEMENT: {
        title: 'Management workspace',
        description: 'Control users, financial performance, company settings, and every department from one place.',
        className: 'from-bakery-50 to-white text-bakery-700 border-bakery-100',
        groups: [
            {
                title: 'People, access and governance',
                operations: [
                    { label: 'Staff and users', description: 'Add, edit, filter, activate, deactivate, and manage every employee.', icon: Users, access: 'staff', path: '/staff' },
                    { label: 'Credentials and permissions', description: 'Create, reset, and manage roles and staff credentials.', icon: UserCog, access: 'credentials', path: '/staff/credentials' },
                    { label: 'Schedules', description: 'Create staff shifts and weekly schedules.', icon: CalendarDays, access: 'schedule', path: '/staff/schedule' },
                    { label: 'System activity', description: 'Monitor operational activity and system events.', icon: BarChart3, access: 'reports', path: '/reports' },
                ],
            },
            {
                title: 'Business intelligence and finance',
                operations: [
                    { label: 'Consolidated dashboard', description: 'Review revenue, orders, inventory alerts, and staff availability.', icon: LayoutDashboard, path: '/dashboard' },
                    { label: 'Cross-department reports', description: 'Compare revenue, inventory usage, customer trends, and employee performance.', icon: BarChart3, access: 'reports', path: '/reports' },
                    { label: 'Financial reporting', description: 'Review revenue, expenses, tax, payroll summary, profit, and loss.', icon: CreditCard, access: 'financial', path: '/reports' },
                    { label: 'Pricing strategy', description: 'Review pricing decisions and department performance before changes.', icon: CreditCard, access: 'financial', path: '/reports' },
                ],
            },
            {
                title: 'Company configuration',
                operations: [
                    { label: 'Company settings', description: 'Configure company information, hours, currency, tax, and invoices.', icon: Settings, access: 'settingsGeneral', path: '/settings' },
                    { label: 'Notifications', description: 'Configure email, SMS, and system notification preferences.', icon: Settings, path: '/settings' },
                    { label: 'Department settings', description: 'Configure operating rules for each department.', icon: Settings, access: 'settingsDepartment', path: '/settings' },
                ],
            },
            shared,
        ],
    },
    RESTAURANT: {
        title: 'Restaurant workspace',
        description: 'Manage dining, tables, kitchen, menu, barista service, cashier work, stock, and restaurant reporting.',
        className: 'from-restaurant-50 to-white text-restaurant-700 border-restaurant-100',
        groups: [
            {
                title: 'Dining and tables',
                operations: [
                    { label: 'Tables and reservations', description: 'Seat customers, reserve tables, assign waiters, and track available, occupied, reserved, and cleaning tables.', icon: LayoutGrid, access: 'tables', path: '/restaurant/tables' },
                    { label: 'Customer complaints', description: 'Capture service issues alongside the customer order workflow.', icon: Users, access: 'orders', path: '/orders' },
                ],
            },
            {
                title: 'Orders and service',
                operations: [
                    { label: 'Take orders', description: 'Create orders with table numbers and special requests.', icon: ShoppingCart, access: 'createOrder', path: '/orders/new' },
                    { label: 'Serve meals and update status', description: 'Move restaurant orders from pending through served and completed.', icon: ChefHat, access: 'orders', path: '/orders' },
                ],
            },
            {
                title: 'Kitchen and recipes',
                operations: [
                    { label: 'Kitchen tickets', description: 'View incoming orders, assign kitchen tasks, track preparation time, and update ticket status.', icon: ChefHat, access: 'kitchen', path: '/restaurant/kitchen' },
                    { label: 'Preparation schedules', description: 'Plan kitchen preparation and service coverage.', icon: CalendarDays, access: 'schedule', path: '/staff/schedule' },
                    { label: 'Recipes', description: 'Create and manage recipes used by the kitchen.', icon: UtensilsCrossed, access: 'menu', path: '/restaurant/menu' },
                ],
            },
            {
                title: 'Menu, barista and cashier',
                operations: [
                    { label: 'Menu management', description: 'Create items, categories, specials, prices, and availability.', icon: UtensilsCrossed, access: 'menu', path: '/restaurant/menu' },
                    { label: 'Barista service', description: 'Prepare beverages and monitor coffee station inventory.', icon: ChefHat, access: 'inventory', path: '/inventory' },
                    { label: 'Cashier and payments', description: 'Process payments, refunds, cash drawer activity, and receipts.', icon: CreditCard, access: 'orders', path: '/orders' },
                ],
            },
            {
                title: 'Stock and reports',
                operations: [
                    { label: 'Ingredient stock', description: 'Track ingredient quantities, expiry dates, and stock requests.', icon: Package, access: 'inventory', path: '/inventory' },
                    { label: 'Restaurant reports', description: 'Review sales, popular dishes, table turnover, ingredient usage, and staff performance.', icon: BarChart3, access: 'reports', path: '/reports' },
                    { label: 'Staff performance', description: 'Manage restaurant staff and shifts.', icon: Users, access: 'staff', path: '/staff' },
                ],
            },
            shared,
        ],
    },
    BAKERY: {
        title: 'Bakery workspace',
        description: 'Manage production, products, counter sales, coffee, ingredients, suppliers, expiry, waste, and bakery reporting.',
        className: 'from-bakery-50 to-white text-bakery-700 border-bakery-100',
        groups: [
            {
                title: 'Production',
                operations: [
                    { label: 'Production batches', description: 'Plan and track batches as planned, in progress, completed, or expired.', icon: Wheat, access: 'batches', path: '/bakery/batches' },
                    { label: 'Baking tasks and quality', description: 'Assign baking tasks and review production quality.', icon: ChefHat, access: 'batches', path: '/bakery/batches' },
                    { label: 'Production schedule', description: 'Plan bakery shifts and production coverage.', icon: CalendarDays, access: 'schedule', path: '/staff/schedule' },
                    { label: 'Recipes and ingredient usage', description: 'Manage recipes and record ingredient usage per batch.', icon: UtensilsCrossed, access: 'batches', path: '/bakery/batches' },
                ],
            },
            {
                title: 'Product management and counter sales',
                operations: [
                    { label: 'Bakery products', description: 'Manage products, selling and cost prices, ingredients, preparation time, and shelf life.', icon: Wheat, access: 'batches', path: '/bakery/batches' },
                    { label: 'Counter and pickup orders', description: 'Process counter sales, pickup orders, custom cakes, payments, receipts, and statuses.', icon: ShoppingCart, access: 'orders', path: '/orders' },
                ],
            },
            {
                title: 'Coffee services',
                operations: [
                    { label: 'Coffee and beverage orders', description: 'Prepare coffee, track consumption, and manage beverage availability.', icon: ChefHat, access: 'orders', path: '/orders' },
                    { label: 'Coffee bean inventory', description: 'Monitor beans, usage, reorder alerts, origin, and roast information.', icon: Package, access: 'inventory', path: '/inventory' },
                ],
            },
            {
                title: 'Inventory, suppliers and expiry',
                operations: [
                    { label: 'Ingredient inventory', description: 'Track flour, sugar, butter, coffee beans, quantities, and expiry dates.', icon: Package, access: 'inventory', path: '/inventory' },
                    { label: 'Suppliers', description: 'Manage supplier information and purchase history.', icon: Truck, access: 'suppliers', path: '/inventory/suppliers' },
                    { label: 'Expiry and waste', description: 'Record waste, review expiry notifications, recommend discounts, and report expiry.', icon: ClipboardList, access: 'movements', path: '/inventory/movements' },
                ],
            },
            {
                title: 'Reports',
                operations: [
                    { label: 'Bakery reports', description: 'Analyze production efficiency, waste, product popularity, coffee consumption, and production costs.', icon: BarChart3, access: 'reports', path: '/reports' },
                    { label: 'Bakery staff', description: 'Manage bakery employees and shifts.', icon: Users, access: 'staff', path: '/staff' },
                ],
            },
            shared,
        ],
    },
    DECORATION: {
        title: 'Decoration workspace',
        description: 'Manage showroom displays, sales, gift services, warehouse stock, pricing, slow movers, and reports.',
        className: 'from-decoration-50 to-white text-decoration-700 border-decoration-100',
        groups: [
            {
                title: 'Showroom',
                operations: [
                    { label: 'Product displays', description: 'Manage display locations, featured and seasonal displays, categories, and availability.', icon: Store, access: 'showroom', path: '/decoration/showroom' },
                    { label: 'Customer product information', description: 'Prepare product information for showroom customers.', icon: Store, access: 'showroom', path: '/decoration/showroom' },
                ],
            },
            {
                title: 'Sales and gift services',
                operations: [
                    { label: 'Decoration sales', description: 'Process product sales, payments, receipts, and customer order status.', icon: ShoppingCart, access: 'orders', path: '/orders' },
                    { label: 'Gift wrapping', description: 'Record custom instructions, delivery details, installation requests, and service status.', icon: Gift, access: 'gifts', path: '/decoration/gifts' },
                ],
            },
            {
                title: 'Warehouse and inventory',
                operations: [
                    { label: 'Showroom inventory', description: 'Track products, materials, display locations, and availability.', icon: Package, access: 'inventory', path: '/inventory' },
                    { label: 'Restock and requisitions', description: 'Restock products and create supply requisitions.', icon: ClipboardList, access: 'requisitions', path: '/inventory/requisitions' },
                    { label: 'Stock movements', description: 'Track warehouse transfers, sales, and waste.', icon: ArrowLeftRight, access: 'movements', path: '/inventory/movements' },
                ],
            },
            {
                title: 'Management and reports',
                operations: [
                    { label: 'Pricing and slow movers', description: 'Update product pricing, review sales performance, and handle slow-moving products.', icon: CreditCard, access: 'reports', path: '/reports' },
                    { label: 'Decoration reports', description: 'Analyze product sales, customer preferences, seasonal trends, and inventory turnover.', icon: BarChart3, access: 'reports', path: '/reports' },
                    { label: 'Decoration staff', description: 'Manage showroom staff and schedules.', icon: Users, access: 'staff', path: '/staff' },
                ],
            },
            shared,
        ],
    },
};

export default function DepartmentPage() {
    const { department } = useParams<{ department: WorkspaceDepartment }>();
    const { user, can } = useAuth();
    const normalizedDepartment = department?.toUpperCase() as WorkspaceDepartment | undefined;
    const config = normalizedDepartment ? departmentConfig[normalizedDepartment] : undefined;
    if (!config) return <p className="text-red-600">Department not found.</p>;

    const query = normalizedDepartment;
    return (
        <div>
            <PageHeader
                title={config.title}
                subtitle={`${config.description} Signed in as ${user?.fullName}.`}
                actions={<Link to="/dashboard" className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium transition hover:border-bakery-500 hover:bg-bakery-50">Back to dashboard</Link>}
            />
            <section className={`mb-6 rounded-2xl border bg-gradient-to-r p-6 shadow-sm ${config.className}`}>
                <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-white/80 p-3"><LayoutDashboard size={24} /></div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] opacity-70">Department control centre</p>
                        <h2 className="mt-1 text-xl font-bold">Complete {config.title.replace(' workspace', '')} operations</h2>
                        <p className="mt-2 max-w-3xl text-sm text-slate-600">Every workflow is separated by department. Choose an operation to open its working screen, or use the capability card as the source of truth for this department.</p>
                    </div>
                </div>
            </section>
            <div className="space-y-8">
                {config.groups.map((group) => {
                    const operations = group.operations.filter((operation) => !operation.access || can(ACCESS[operation.access]));
                    return (
                        <section key={group.title}>
                            <div className="mb-3">
                                <h2 className="text-base font-semibold text-slate-900">{group.title}</h2>
                                <p className="mt-1 text-sm text-slate-500">{operations.length} available operation{operations.length === 1 ? '' : 's'}</p>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                {operations.map(({ label, description, icon: Icon, path }) => (
                                    <Card key={group.title + label} className="group transition hover:-translate-y-0.5 hover:border-bakery-300 hover:shadow-md">
                                        {path ? (
                                            <Link to={`${path}${path.includes('?') ? '&' : '?'}department=${query}`} className="block">
                                                <OperationContent Icon={Icon} label={label} description={description} />
                                            </Link>
                                        ) : <OperationContent Icon={Icon} label={label} description={description} />}
                                    </Card>
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>
        </div>
    );
}

function OperationContent({ Icon, label, description }: { Icon: LucideIcon; label: string; description: string }) {
    return (
        <>
            <div className="flex items-start justify-between gap-4">
                <div className="rounded-xl bg-bakery-50 p-3 text-bakery-700 transition group-hover:bg-bakery-100"><Icon size={22} /></div>
                <span className="text-xs font-semibold text-slate-400 group-hover:text-bakery-600">Open →</span>
            </div>
            <h3 className="mt-5 font-semibold text-slate-900">{label}</h3>
            <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
        </>
    );
}
