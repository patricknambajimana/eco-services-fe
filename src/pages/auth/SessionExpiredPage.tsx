import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';

export default function SessionExpiredPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-brand-50 p-4">
            <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
                <Clock className="mx-auto text-brand-600" size={40} />
                <h1 className="mt-4 text-lg font-bold">Session expired</h1>
                <p className="mt-2 text-sm text-slate-500">You were signed out after a period of inactivity.</p>
                <Link to="/login" className="mt-6 inline-block rounded-lg bg-brand-600 px-5 py-2 text-sm font-medium text-white hover:bg-brand-700">
                    Sign in again
                </Link>
            </div>
        </div>
    );
}