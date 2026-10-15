import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import SessionGuard from './SessionGuard';

export default function DashboardLayout() {
    const [open, setOpen] = useState(false);
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar open={open} onClose={() => setOpen(false)} />
            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar onMenu={() => setOpen(true)} />
                <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                    <Outlet />
                </main>
            </div>
            <SessionGuard />
        </div>
    );
}