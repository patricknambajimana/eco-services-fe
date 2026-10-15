import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { useLoginMutation } from '@/services/authApi';
import { setCredentials } from '@/store/authSlice';
import { useAppDispatch } from '@/store/hooks';
import { useAuth } from '@/hooks/useAuth';
import { APP_NAME } from '@/config/env';
import { getErrorMessage } from '@/utils/errors';
import { Input } from '@/components/ui/Fields';
import Button from '@/components/ui/LegacyButton';

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const [login, { isLoading }] = useLoginMutation();

    const [credentialId, setCredentialId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    if (user) return <Navigate to="/dashboard" replace />;

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        if (!credentialId.trim() || !password) return setError('Credential ID and password/PIN are required.');
        try {
            const res = await login({ username: credentialId, password }).unwrap();
            dispatch(setCredentials(res));
            navigate((location.state as { from?: { pathname: string } })?.from?.pathname ?? '/dashboard', { replace: true });
        } catch (err) {
            setError(getErrorMessage(err));
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100 p-4">
            <form onSubmit={onSubmit} className="w-full max-w-md space-y-4 rounded-2xl bg-white p-8 shadow-xl">
                <div className="text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white"><Leaf /></div>
                    <h1 className="text-lg font-bold">{APP_NAME}</h1>
                    <p className="text-sm text-slate-500">Sign in to continue</p>
                </div>
                <Input label="Username" value={credentialId} onChange={(e) => setCredentialId(e.target.value)} autoFocus autoComplete="username" />
                <Input label="Password / PIN" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
                {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
                <Button type="submit" loading={isLoading} className="w-full">Sign in</Button>
                <p className="text-center text-sm"><Link to="/forgot-password" className="text-brand-700 hover:underline">Forgot password?</Link></p>
            </form>
        </div>
    );
}