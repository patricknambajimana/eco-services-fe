import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    title?: string;
    actions?: ReactNode;
    children?: ReactNode;
}

export default function LegacyCard({ title, actions, children, className = '', ...props }: CardProps) {
    return (
        <section className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm ${className}`} {...props}>
            {(title || actions) && <div className="mb-4 flex items-center justify-between gap-3">
                {title && <h2 className="text-base font-semibold text-slate-800">{title}</h2>}
                {actions}
            </div>}
            {children}
        </section>
    );
}
