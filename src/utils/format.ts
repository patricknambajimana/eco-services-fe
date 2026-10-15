const money = new Intl.NumberFormat('en-RW', { style: 'currency', currency: 'RWF', maximumFractionDigits: 0 });

export const formatCurrency = (n: number) => money.format(n);
export const formatDate = (iso: string) => new Date(iso).toLocaleDateString();
export const formatDateTime = (iso: string) => new Date(iso).toLocaleString();
export const humanize = (s: string) => s.replace(/_/g, ' ');