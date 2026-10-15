import type { ReactNode } from 'react';

export interface Column<T> { header: string; render: (row: T) => ReactNode; className?: string }

interface Props<T> {
    columns: Column<T>[];
    data?: T[];
    isLoading?: boolean;
    rowKey: (row: T) => string;
    onRowClick?: (row: T) => void;
    emptyText?: string;
}

export default function DataTable<T>({ columns, data, isLoading, rowKey, onRowClick, emptyText = 'No records found.' }: Props<T>) {
    return (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>{columns.map((c) => <th key={c.header} className={`px-4 py-3 font-medium ${c.className ?? ''}`}>{c.header}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {isLoading && (
                        <tr><td colSpan={columns.length} className="px-4 py-10 text-center text-slate-400">Loading…</td></tr>
                    )}
                    {!isLoading && !data?.length && (
                        <tr><td colSpan={columns.length} className="px-4 py-10 text-center text-slate-400">{emptyText}</td></tr>
                    )}
                    {data?.map((row) => (
                        <tr
                            key={rowKey(row)}
                            onClick={() => onRowClick?.(row)}
                            className={onRowClick ? 'cursor-pointer hover:bg-slate-50' : ''}
                        >
                            {columns.map((c) => <td key={c.header} className={`px-4 py-3 ${c.className ?? ''}`}>{c.render(row)}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}