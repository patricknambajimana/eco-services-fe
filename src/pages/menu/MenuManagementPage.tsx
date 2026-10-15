import { useMemo, useRef, useState } from 'react';
import { Copy, Download, ExternalLink, FileText, Plus, ShieldCheck } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import {
    useCreateMenuItemMutation, useGetMenuQuery, useUpdateMenuItemMutation,
} from '@/services/operationsApi';
import { useAuth, useDepartmentScope } from '@/hooks/useAuth';
import { MENU_SUPERVISORS, canManageMenu } from '@/config/access';
import { OPERATING_DEPARTMENTS, roleLabel } from '@/config/roles';
import { PUBLIC_URL } from '@/config/env';
import { downloadMenuPdf } from '@/utils/menuPdf';
import { formatCurrency } from '@/utils/format';
import { getErrorMessage } from '@/utils/errors';
import { DEPT_THEME } from '@/components/dashboard/theme';
import PageHeader from '@/components/ui/PageHeader';
import Card from '@/components/ui/LegacyCard';
import DataTable from '@/components/ui/DataTable';
import type { Column } from '@/components/ui/DataTable';
import StatusBadge from '@/components/ui/StatusBadge';
import Button from '@/components/ui/LegacyButton';
import Modal from '@/components/ui/Modal';
import { Input, Textarea } from '@/components/ui/Fields';
import type { MenuItem, OperatingDepartment, Role } from '@/types';

const EMPTY = { name: '', category: '', price: '', description: '' };

export default function MenuManagementPage() {
    const { user } = useAuth();
    const scope = useDepartmentScope();
    const [dept, setDept] = useState<OperatingDepartment>(scope ?? 'RESTAURANT');
    const theme = DEPT_THEME[dept];

    const { data, isLoading } = useGetMenuQuery();
    const [update] = useUpdateMenuItemMutation();
    const [create, { isLoading: creating }] = useCreateMenuItemMutation();

    const qrBox = useRef<HTMLDivElement>(null);
    const [adding, setAdding] = useState(false);
    const [form, setForm] = useState(EMPTY);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const items = useMemo(() => (data ?? []).filter((m) => m.department === dept), [data, dept]);
    const categories = [...new Set(items.map((m) => m.category))];
    const manage = canManageMenu(user!.role, dept);
    const url = `${PUBLIC_URL}/menu/${dept.toLowerCase()}`;
    const supervisors: Role[] = [...MENU_SUPERVISORS[dept], 'GENERAL_MANAGER', 'SUPER_ADMIN'];

    const downloadQr = () => {
        const canvas = qrBox.current?.querySelector('canvas');
        if (!canvas) return;
        const a = document.createElement('a');
        a.href = canvas.toDataURL('image/png');
        a.download = `eco-service-${dept.toLowerCase()}-menu-qr.png`;
        a.click();
    };

    const copyLink = async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const addItem = async () => {
        if (!form.name.trim() || !form.category.trim() || !Number(form.price)) {
            return setError('Name, category and a price are required.');
        }
        try {
            await create({
                department: dept, name: form.name.trim(), category: form.category.trim(),
                price: Number(form.price), description: form.description.trim() || undefined,
            }).unwrap();
            setAdding(false);
            setForm(EMPTY);
        } catch (e) { setError(getErrorMessage(e)); }
    };

    const columns: Column<MenuItem>[] = [
        {
            header: 'Item',
            render: (m) => (
                <div>
                    <p className="font-medium">{m.name}</p>
                    {m.description && <p className="text-xs text-slate-500">{m.description}</p>}
                </div>
            ),
        },
        { header: 'Category', render: (m) => m.category },
        {
            header: 'Price (RWF)',
            render: (m) => manage ? (
                <input key={m.price} type="number" min={0} defaultValue={m.price} className="input w-28"
                    onBlur={(e) => Number(e.target.value) !== m.price && update({ id: m.id, price: Number(e.target.value) })} />
            ) : formatCurrency(m.price),
        },
        { header: 'Status', render: (m) => <StatusBadge status={m.available ? 'AVAILABLE' : 'OUT_OF_STOCK'} /> },
    ];
    if (manage) {
        columns.push({
            header: '',
            render: (m) => (
                <Button size="sm" variant="secondary" onClick={() => update({ id: m.id, available: !m.available })}>
                    {m.available ? 'Disable' : 'Enable'}
                </Button>
            ),
        });
    }

    return (
        <>
            <PageHeader title="Menu & QR code" subtitle={`${theme.label} menu shown to customers`}
                actions={manage ? <Button onClick={() => { setAdding(true); setError(''); }}><Plus size={16} /> Add item</Button> : undefined} />

            {!scope && (
                <div className="mb-4 flex gap-2">
                    {OPERATING_DEPARTMENTS.map((d) => (
                        <button key={d} onClick={() => setDept(d)}
                            className={`rounded-lg border px-4 py-2 text-sm font-medium ${dept === d ? DEPT_THEME[d].statement : 'border-slate-200 bg-white text-slate-600'}`}>
                            {DEPT_THEME[d].label}
                        </button>
                    ))}
                </div>
            )}

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <DataTable columns={columns} data={items} isLoading={isLoading} rowKey={(m) => m.id} emptyText="No menu items yet." />
                </div>

                <div className="space-y-6">
                    <Card title="Customer QR code">
                        <div ref={qrBox} className="mx-auto w-48 rounded-xl border-2 bg-white p-2" style={{ borderColor: theme.chart }}>
                            <QRCodeCanvas value={url} size={512} level="H" marginSize={2} fgColor={theme.chart}
                                style={{ width: '100%', height: 'auto' }} />
                        </div>
                        <p className="mt-3 break-all text-center text-xs text-slate-500">{url}</p>
                        {url.includes('localhost') && (
                            <p className="mt-2 rounded-lg bg-amber-50 p-2 text-xs text-amber-700">
                                This link points to your computer. Set VITE_PUBLIC_URL to your live website address before printing the QR code.
                            </p>
                        )}
                        <div className="mt-4 grid gap-2">
                            <Button onClick={() => downloadMenuPdf(dept, items.filter((i) => i.available))}><FileText size={16} /> Download PDF menu</Button>
                            <Button variant="secondary" onClick={downloadQr}><Download size={16} /> Download QR image</Button>
                            <Button variant="secondary" onClick={copyLink}><Copy size={16} /> {copied ? 'Copied' : 'Copy link'}</Button>
                            <a href={url} target="_blank" rel="noreferrer">
                                <Button variant="secondary" className="w-full"><ExternalLink size={16} /> Preview customer page</Button>
                            </a>
                        </div>
                    </Card>

                    <Card title="Menu supervisors">
                        <p className="mb-2 flex items-center gap-2 text-sm text-slate-600"><ShieldCheck size={16} /> Only these roles can edit this menu:</p>
                        <ul className="list-inside list-disc text-sm">
                            {supervisors.map((r) => <li key={r}>{roleLabel(r)}</li>)}
                        </ul>
                        {!manage && <p className="mt-3 rounded-lg bg-slate-50 p-2 text-xs text-slate-500">You have view-only access to this menu.</p>}
                    </Card>
                </div>
            </div>

            {adding && (
                <Modal title={`Add ${theme.label} item`} onClose={() => setAdding(false)}
                    footer={<><Button variant="secondary" onClick={() => setAdding(false)}>Cancel</Button><Button loading={creating} onClick={addItem}>Save</Button></>}>
                    <div className="space-y-3">
                        <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        <Input label="Category" list="menu-categories" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                        <datalist id="menu-categories">{categories.map((c) => <option key={c} value={c} />)}</datalist>
                        <Input label="Price (RWF)" type="number" min={0} value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                        <Textarea label="Description (optional)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                        {error && <p className="text-sm text-red-600">{error}</p>}
                    </div>
                </Modal>
            )}
        </>
    );
}