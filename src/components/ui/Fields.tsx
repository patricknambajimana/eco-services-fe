import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

function Wrapper({ label, error, children }: { label?: string; error?: string; children: ReactNode }) {
    return (
        <label className="block space-y-1">
            {label && <span className="text-xs font-medium text-slate-600">{label}</span>}
            {children}
            {error && <span className="block text-xs text-red-600">{error}</span>}
        </label>
    );
}

export function Input({ label, error, className = '', ...rest }: InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }) {
    return <Wrapper label={label} error={error}><input {...rest} className={`input ${className}`} /></Wrapper>;
}

export function Textarea({ label, error, className = '', ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; error?: string }) {
    return <Wrapper label={label} error={error}><textarea rows={3} {...rest} className={`input ${className}`} /></Wrapper>;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: { value: string; label: string }[];
    placeholder?: string;
}

export function Select({ label, options, placeholder, className = '', ...rest }: SelectProps) {
    return (
        <Wrapper label={label}>
            <select {...rest} className={`input ${className}`}>
                {placeholder !== undefined && <option value="">{placeholder}</option>}
                {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
        </Wrapper>
    );
}