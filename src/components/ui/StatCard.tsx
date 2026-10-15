import type { ComponentType } from 'react';

interface StatCardProps {
    label: string;
    value: string;
    hint?: string;
    icon?: ComponentType<{ size?: number; className?: string }>;
}

export default function StatCard({ label, value, hint, icon: Icon }: StatCardProps) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-sm text-slate-500">{label}</p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
                    {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
                </div>
                {Icon && <Icon size={22} className="text-brand-600" />}
            </div>
        </div>
    );
}
