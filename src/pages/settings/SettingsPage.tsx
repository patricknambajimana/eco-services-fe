import { useState } from 'react';
import type { FormEvent } from 'react';
import { useAuth, useDepartmentScope } from '@/hooks/useAuth';
import { ACCESS } from '@/config/access';
import PageHeader from '@/components/ui/PageHeader';
import Card from '@/components/ui/LegacyCard';
import Button from '@/components/ui/LegacyButton';
import { Input, Select } from '@/components/ui/Fields';
import type { OperatingDepartment } from '@/types';

type Value = string | number | boolean;
interface FieldDef { name: string; label: string; type?: 'text' | 'number' | 'select' | 'checkbox'; options?: string[]; def: Value }

const GENERAL: FieldDef[] = [
    { name: 'companyName', label: 'Company name', def: 'Eco-Service' },
    { name: 'email', label: 'Contact email', def: 'info@eco-service.com' },
    { name: 'phone', label: 'Contact phone', def: '' },
    { name: 'address', label: 'Address', def: 'Kigali, Rwanda' },
    { name: 'hours', label: 'Operating hours', def: '07:00 - 22:00' },
    { name: 'currency', label: 'Currency', type: 'select', options: ['RWF', 'USD', 'EUR'], def: 'RWF' },
    { name: 'tax', label: 'Tax rate (%)', type: 'number', def: 18 },
];

const DEPARTMENT: Record<OperatingDepartment, FieldDef[]> = {
    RESTAURANT: [
        { name: 'hours', label: 'Working hours', def: '08:00 - 22:00' },
        { name: 'tables', label: 'Number of tables', type: 'number', def: 8 },
        { name: 'serviceCharge', label: 'Service charge (%)', type: 'number', def: 5 },
        { name: 'delivery', label: 'Delivery enabled', type: 'checkbox', def: true },
    ],
    BAKERY: [
        { name: 'schedule', label: 'Production schedule', def: '04:00 - 12:00' },
        { name: 'coffeePrice', label: 'Default coffee price', type: 'number', def: 2500 },
        { name: 'expiryAlertDays', label: 'Expiry alert (days)', type: 'number', def: 2 },
    ],
    DECORATION: [
        { name: 'showroom', label: 'Showroom hours', def: '09:00 - 18:00' },
        { name: 'giftFee', label: 'Gift wrapping fee', type: 'number', def: 2000 },
    ],
};

const PREFERENCES: FieldDef[] = [
    { name: 'language', label: 'Language', type: 'select', options: ['English', 'Français', 'Kinyarwanda'], def: 'English' },
    { name: 'theme', label: 'Theme', type: 'select', options: ['Light', 'Dark'], def: 'Light' },
    { name: 'notifyEmail', label: 'Email notifications', type: 'checkbox', def: true },
    { name: 'notifyInApp', label: 'In-app notifications', type: 'checkbox', def: true },
];

function SettingsForm({ storageKey, fields }: { storageKey: string; fields: FieldDef[] }) {
    const defaults = Object.fromEntries(fields.map((f) => [f.name, f.def])) as Record<string, Value>;
    const [values, setValues] = useState<Record<string, Value>>(() => {
        try { return { ...defaults, ...JSON.parse(localStorage.getItem(storageKey) ?? '{}') }; } catch { return defaults; }
    });
    const [saved, setSaved] = useState(false);

    const submit = (e: FormEvent) => {
        e.preventDefault();
        localStorage.setItem(storageKey, JSON.stringify(values)); // TODO: replace with API call
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
            {fields.map((f) =>
                f.type === 'select' ? (
                    <Select key={f.name} label={f.label} value={String(values[f.name])} options={(f.options ?? []).map((o) => ({ value: o, label: o }))}
                        onChange={(e) => setValues({ ...values, [f.name]: e.target.value })} />
                ) : f.type === 'checkbox' ? (
                    <label key={f.name} className="flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={Boolean(values[f.name])} onChange={(e) => setValues({ ...values, [f.name]: e.target.checked })} /> {f.label}
                    </label>
                ) : (
                    <Input key={f.name} label={f.label} type={f.type ?? 'text'} value={String(values[f.name])}
                        onChange={(e) => setValues({ ...values, [f.name]: f.type === 'number' ? Number(e.target.value) : e.target.value })} />
                ),
            )}
            <div className="flex items-center gap-3 sm:col-span-2">
                <Button type="submit">Save changes</Button>
                {saved && <span className="text-sm text-green-600">Saved ✓</span>}
            </div>
        </form>
    );
}

export default function SettingsPage() {
    const { can } = useAuth();
    const scope = useDepartmentScope();
    const tabs = [
        ...(can(ACCESS.settingsGeneral) ? ['General'] : []),
        ...(can(ACCESS.settingsDepartment) ? ['Department'] : []),
        'Preferences',
    ];
    const [tab, setTab] = useState(tabs[0]);
    const [dept, setDept] = useState<OperatingDepartment>(scope ?? 'RESTAURANT');

    return (
        <>
            <PageHeader title="Settings" subtitle="System configuration and personal preferences" />
            <div className="mb-4 flex gap-2 border-b">
                {tabs.map((t) => (
                    <button key={t} onClick={() => setTab(t)}
                        className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium ${tab === t ? 'border-brand-600 text-brand-700' : 'border-transparent text-slate-500'}`}>
                        {t}
                    </button>
                ))}
            </div>
            <Card>
                {tab === 'General' && <SettingsForm storageKey="ecs_settings_general" fields={GENERAL} />}
                {tab === 'Department' && (
                    <div className="space-y-4">
                        {!scope && (
                            <div className="max-w-xs">
                                <Select label="Department" value={dept} onChange={(e) => setDept(e.target.value as OperatingDepartment)}
                                    options={(['RESTAURANT', 'BAKERY', 'DECORATION'] as const).map((d) => ({ value: d, label: d }))} />
                            </div>
                        )}
                        <SettingsForm key={dept} storageKey={`ecs_settings_${dept}`} fields={DEPARTMENT[dept]} />
                    </div>
                )}
                {tab === 'Preferences' && <SettingsForm storageKey="ecs_preferences" fields={PREFERENCES} />}
            </Card>
        </>
    );
}