import { AlertTriangle } from 'lucide-react';
import Card from '@/components/ui/LegacyCard';

export default function AlertsCard({ alerts }: { alerts: string[] }) {
    return (
        <Card title="Alerts">
            {!alerts.length && <p className="text-sm text-slate-400">No alerts right now.</p>}
            <ul className="space-y-2">
                {alerts.map((a) => (
                    <li key={a} className="flex items-center gap-2 text-sm text-amber-700"><AlertTriangle size={16} /> {a}</li>
                ))}
            </ul>
        </Card>
    );
}