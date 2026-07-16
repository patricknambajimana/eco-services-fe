// components/dashboard/superadmin/NotificationsDropdown.tsx
import { useState, useRef, useEffect } from 'react';
import { Bell, UserPlus, Building2, AlertTriangle, CheckCheck } from 'lucide-react';

interface Notification {
  id: string;
  type: 'user' | 'business' | 'system';
  title: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  { id: '1', type: 'user', title: 'New user registered: Alice Kim', time: '5m ago', read: false },
  { id: '2', type: 'business', title: 'New business submitted for review: Kigali Grill', time: '1h ago', read: false },
  { id: '3', type: 'system', title: 'Scheduled maintenance completed successfully', time: '3h ago', read: true },
  { id: '4', type: 'user', title: 'New user registered: David Uwase', time: 'Yesterday', read: true },
];

const iconFor = (type: Notification['type']) => {
  switch (type) {
    case 'user':
      return <UserPlus className="h-4 w-4 text-indigo-600" />;
    case 'business':
      return <Building2 className="h-4 w-4 text-blue-600" />;
    case 'system':
      return <AlertTriangle className="h-4 w-4 text-amber-600" />;
  }
};

export const NotificationsDropdown = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 hover:bg-gray-100 rounded-xl transition-colors relative"
      >
        <Bell className="h-5 w-5 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg shadow-red-500/25">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border border-gray-200/60 shadow-xl z-[100] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div>
              <p className="text-sm font-semibold text-gray-900">Notifications</p>
              <p className="text-xs text-gray-500">
                {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700"
              >
                <CheckCheck className="h-3.5 w-3.5" />
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <Bell className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No notifications yet</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`flex items-start gap-3 px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors ${
                    !n.read ? 'bg-indigo-50/40' : ''
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">{iconFor(n.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${!n.read ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                      {n.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                  </div>
                  {!n.read && <span className="w-2 h-2 bg-indigo-500 rounded-full mt-1.5 flex-shrink-0" />}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2.5 border-t border-gray-100 text-center">
            <button type="button" className="text-xs font-medium text-gray-500 hover:text-gray-700">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};