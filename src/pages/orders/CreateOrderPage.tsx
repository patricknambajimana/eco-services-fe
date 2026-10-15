import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus } from 'lucide-react';
import { useCreateOrderMutation, useGetCatalogQuery, useGetCustomersQuery } from '@/services/ordersApi';
import { useAuth, useDepartmentScope } from '@/hooks/useAuth';
import { formatCurrency } from '@/utils/format';
import { getErrorMessage } from '@/utils/errors';
import PageHeader from '@/components/ui/PageHeader';
import Card from '@/components/ui/LegacyCard';
import Button from '@/components/ui/LegacyButton';
import { Input, Select, Textarea } from '@/components/ui/Fields';
import type { OperatingDepartment, PaymentMethod } from '@/types';

export default function CreateOrderPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const scope = useDepartmentScope();
    const { data: catalog = [] } = useGetCatalogQuery();
    const { data: customers = [] } = useGetCustomersQuery();
    const [createOrder, { isLoading }] = useCreateOrderMutation();

    const [dept, setDept] = useState<OperatingDepartment>(scope ?? 'RESTAURANT');
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [cart, setCart] = useState<Record<string, number>>({});
    const [customer, setCustomer] = useState({ name: '', phone: '', address: '' });
    const [custom, setCustom] = useState<Record<string, string>>({});
    const [giftWrap, setGiftWrap] = useState(false);
    const [method, setMethod] = useState<PaymentMethod>('CASH');
    const [paid, setPaid] = useState(false);
    const [error, setError] = useState('');

    const products = catalog.filter((p) => p.department === dept);
    const categories = [...new Set(products.map((p) => p.category))];
    const visible = products.filter((p) =>
        (!category || p.category === category) && p.name.toLowerCase().includes(search.toLowerCase()));

    const lines = useMemo(
        () => catalog.filter((p) => cart[p.id]).map((p) => ({
            productId: p.id, name: p.name, department: p.department, qty: cart[p.id], price: p.price,
        })),
        [catalog, cart],
    );
    const total = lines.reduce((s, l) => s + l.qty * l.price, 0);
    const activeDepts = new Set([dept, ...lines.map((l) => l.department)]);

    const change = (id: string, delta: number) =>
        setCart((c) => {
            const qty = Math.max(0, (c[id] ?? 0) + delta);
            const next = { ...c };
            if (qty === 0) delete next[id]; else next[id] = qty;
            return next;
        });
    const setField = (k: string) => (e: { target: { value: string } }) => setCustom((c) => ({ ...c, [k]: e.target.value }));

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        if (!customer.name.trim()) return setError('Customer name is required.');
        if (!lines.length) return setError('Add at least one product.');
        try {
            const order = await createOrder({
                customerName: customer.name, phone: customer.phone, address: customer.address, items: lines,
                paymentMethod: method, paymentStatus: paid ? 'PAID' : 'UNPAID',
                customization: { ...custom, ...(giftWrap ? { giftWrapping: 'Yes' } : {}) },
                createdBy: user!.fullName,
            }).unwrap();
            navigate(`/orders/${order.id}`);
        } catch (err) { setError(getErrorMessage(err)); }
    };

    return (
        <form onSubmit={onSubmit}>
            <PageHeader title="Create order" subtitle="Select products, customise and take payment" />
            <div className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <Card title="Customer">
                        <div className="grid gap-3 sm:grid-cols-2">
                            <Select label="Existing customer" value="" placeholder="Search / select existing…"
                                options={customers.map((c) => ({ value: c.id, label: `${c.name} (${c.phone})` }))}
                                onChange={(e) => {
                                    const c = customers.find((x) => x.id === e.target.value);
                                    if (c) setCustomer({ name: c.name, phone: c.phone, address: c.address });
                                }} />
                            <Input label="Name (or create new)" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
                            <Input label="Phone" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />
                            <Input label="Address" value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} />
                        </div>
                    </Card>

                    <Card title="Products">
                        <div className="mb-4 grid gap-3 sm:grid-cols-3">
                            {!scope && (
                                <Select label="Department" value={dept} onChange={(e) => { setDept(e.target.value as OperatingDepartment); setCategory(''); }}
                                    options={['RESTAURANT', 'BAKERY', 'DECORATION'].map((d) => ({ value: d, label: d }))} />
                            )}
                            <Input label="Search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Product name" />
                            <Select label="Category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="All"
                                options={categories.map((c) => ({ value: c, label: c }))} />
                        </div>
                        <ul className="divide-y">
                            {visible.map((p) => (
                                <li key={p.id} className="flex items-center justify-between py-2.5 text-sm">
                                    <div><p className="font-medium">{p.name}</p><p className="text-xs text-slate-500">{p.category} · {formatCurrency(p.price)}</p></div>
                                    <div className="flex items-center gap-2">
                                        <Button type="button" size="sm" variant="secondary" onClick={() => change(p.id, -1)}><Minus size={14} /></Button>
                                        <span className="w-6 text-center">{cart[p.id] ?? 0}</span>
                                        <Button type="button" size="sm" variant="secondary" onClick={() => change(p.id, 1)}><Plus size={14} /></Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Card>

                    <Card title="Order customisation">
                        <div className="grid gap-3 sm:grid-cols-2">
                            {activeDepts.has('RESTAURANT') && <>
                                <Input label="Table number" onChange={setField('tableNumber')} />
                                <Textarea label="Special requests" onChange={setField('specialRequests')} />
                            </>}
                            {activeDepts.has('BAKERY') && <>
                                <Input label="Pickup time" type="time" onChange={setField('pickupTime')} />
                                <Textarea label="Custom cake / product notes" onChange={setField('productNotes')} />
                            </>}
                            {activeDepts.has('DECORATION') && <>
                                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={giftWrap} onChange={(e) => setGiftWrap(e.target.checked)} /> Gift wrapping</label>
                                <Input label="Delivery details" onChange={setField('deliveryDetails')} />
                                <Input label="Installation request" onChange={setField('installation')} />
                            </>}
                        </div>
                    </Card>
                </div>

                <Card title="Summary" className="h-fit">
                    <ul className="space-y-1 text-sm">
                        {lines.map((l) => (
                            <li key={l.productId} className="flex justify-between"><span>{l.qty} × {l.name}</span><span>{formatCurrency(l.qty * l.price)}</span></li>
                        ))}
                        {!lines.length && <li className="text-slate-400">No items yet.</li>}
                    </ul>
                    <div className="my-4 flex justify-between border-t pt-3 font-semibold"><span>Total</span><span>{formatCurrency(total)}</span></div>
                    <div className="space-y-3">
                        <Select label="Payment method" value={method} onChange={(e) => setMethod(e.target.value as PaymentMethod)}
                            options={[{ value: 'CASH', label: 'Cash' }, { value: 'CARD', label: 'Card' }, { value: 'MOBILE_MONEY', label: 'Mobile money' }]} />
                        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={paid} onChange={(e) => setPaid(e.target.checked)} /> Payment received</label>
                        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
                        <Button type="submit" loading={isLoading} className="w-full">Place order</Button>
                    </div>
                </Card>
            </div>
        </form>
    );
}