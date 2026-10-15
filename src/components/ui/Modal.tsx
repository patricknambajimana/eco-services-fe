import type { ReactNode } from 'react';

interface ModalProps {
    title: string;
    onClose: () => void;
    footer?: ReactNode;
    children: ReactNode;
}

export default function Modal({ title, onClose, footer, children }: ModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true">
            <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
                <div className="flex items-center justify-between gap-4">
                    <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
                    <button type="button" onClick={onClose} className="text-xl text-slate-500" aria-label="Close">×</button>
                </div>
                <div className="mt-4">{children}</div>
                {footer && <div className="mt-6 flex justify-end gap-2">{footer}</div>}
            </div>
        </div>
    );
}
