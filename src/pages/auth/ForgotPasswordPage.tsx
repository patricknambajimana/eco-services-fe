import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useForgotPasswordMutation } from '@/services/authApi';
import { getErrorMessage } from '@/utils/errors';
import { Input } from '@/components/ui/Fields';
import Button from '@/components/ui/LegacyButton';

export default function ForgotPasswordPage() {
    const [credentialId, setCredentialId] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [submit, { isLoading }] = useForgotPasswordMutation();

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setMessage(''); setError('');
        try { setMessage((await submit({ credentialId }).unwrap()).message); }
        catch (err) { setError(getErrorMessage(err)); }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-brand-50 p-4">
            <form onSubmit={onSubmit} className="w-full max-w-md space-y-4 rounded-2xl bg-white p-8 shadow-xl">
                <h1 className="text-lg font-bold">Reset your password / PIN</h1>
                <p className="text-sm text-slate-500">Enter your Credential ID and we will issue a temporary PIN.</p>
                <Input label="Credential ID" value={credentialId} onChange={(e) => setCredentialId(e.target.value)} required />
                {message && <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">{message}</p>}
                {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
                <Button type="submit" loading={isLoading} className="w-full">Request reset</Button>
                <p className="text-center text-sm"><Link to="/login" className="text-brand-700 hover:underline">Back to login</Link></p>
            </form>
        </div>
    );
}