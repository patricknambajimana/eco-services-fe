import { Link } from 'react-router-dom';
import Card from '@/components/ui/LegacyCard';
import { useAuth } from '@/hooks/useAuth';
import type { Role } from '@/types';

export interface QuickAction { to: string; label: string; access?: Role[] }

/** Links are hidden automatically when the user's role cannot open the page. */
export default function QuickActions({ items }: { items: QuickAction[] }) {
    const { can } = useAuth();
    const visible = items.filter((i) => !i.access || can(i.access));
    if (!visible.length) return null;
    return (
        <div className="mt-6">
            <Card title="Quick actions">
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                    {visible.map((q) => (
                        <Link key={q.to} to={q.to} className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium transition-colors hover:border-brand-600 hover:bg-brand-50 hover:text-brand-700">
                            {q.label}
                        </Link>
                    ))}
                </div>
            </Card>
        </div>
    );
}