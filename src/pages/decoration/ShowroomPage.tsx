import { useState } from 'react';
import { useGetInventoryQuery } from '@/services/inventoryApi';
import { getInventoryStatus } from '@/utils/inventory';
import PageHeader from '@/components/ui/PageHeader';
import Card from '@/components/ui/LegacyCard';
import StatusBadge from '@/components/ui/StatusBadge';
import { Input } from '@/components/ui/Fields';

export default function ShowroomPage() {
    const { data = [], isLoading } = useGetInventoryQuery();
    const [search, setSearch] = useState('');
    const items = data.filter((i) => i.department === 'DECORATION' && i.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <PageHeader title="Showroom" subtitle="Product displays and availability" />
            <div className="mb-4 max-w-sm"><Input placeholder="Search products" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
            {isLoading && <p className="text-slate-400">Loading…</p>}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((i) => (
                    <Card key={i.id}>
                        <div className="mb-2 flex items-start justify-between">
                            <h3 className="font-semibold">{i.name}</h3><StatusBadge status={getInventoryStatus(i)} />
                        </div>
                        <p className="text-sm text-slate-500">{i.category}</p>
                        <p className="mt-3 text-2xl font-bold">{i.quantity} <span className="text-sm font-normal text-slate-500">{i.unit}</span></p>
                        <p className="mt-1 text-xs text-slate-500">Display location: {i.displayLocation ?? 'Storage'}</p>
                    </Card>
                ))}
            </div>
        </>
    );
}