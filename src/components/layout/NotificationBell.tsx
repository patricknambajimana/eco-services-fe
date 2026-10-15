import { useState } from 'react';
import { Bell } from 'lucide-react';
import { useGetNotificationsQuery } from '@/services/reportsApi';
import { formatDateTime } from '@/utils/format';

export default function NotificationBell() {
    const { data = [] } = useGetNotificationsQuery(undefined, { pollingInterval: 30000 });
    const [open, setOpen] = useState(false);
    const [read, setRead] = useState<string[]>([]);
    const unread = data.filter((n) => !read.includes(n.id)).length;

    return (
        <div className="relative">
            <button onClick={() => setOpen((o) => !o)} className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100" aria-label="Notifications">
                <Bell size={20} />
                {unread > 0 && (
                    <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] text-white">
                        {unread}
                    </span>
                )}
            </button>
            {open && (
                <div className="absolute right-0 z-40 mt-2 w-80 rounded-xl border bg-white shadow-lg">
                    <div className="flex items-center justify-between border-b px-4 py-2">
                        <span className="text-sm font-semibold">Notifications</span>
                        <button className="text-xs text-brand-700" onClick={() => setRead(data.map((n) => n.id))}>Mark all read</button>
                    </div>
                    <ul className="max-h-80 divide-y overflow-y-auto">
                        {data.map((n) => (
                            <li key={n.id} className={`px-4 py-3 text-sm ${read.includes(n.id) ? 'opacity-60' : ''}`}>
                                <p className="font-medium">{n.title}</p>
                                <p className="text-xs text-slate-500">{n.message}</p>
                                <p className="mt-1 text-[11px] text-slate-400">{formatDateTime(n.createdAt)}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}