import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    title?: string;
    children?: ReactNode;
}

export default function LegacyCard({ title, children, className = '', ...props }: CardProps) {
    return (
        <section className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm ${className}`} {...props}>
            {title && <h2 className="mb-4 text-base font-semibold text-slate-800">{title}</h2>}
            {children}
        </section>
    );
}
