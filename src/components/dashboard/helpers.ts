import type { OperatingDepartment, Order } from '@/types';

export const orderInDept = (o: Order, d: OperatingDepartment) =>
    o.department === d || o.items.some((i) => i.department === d);

/** Value of only the items that belong to one department (orders can be MIXED). */
export const deptTotal = (o: Order, d: OperatingDepartment) =>
    o.items.filter((i) => i.department === d).reduce((s, i) => s + i.qty * i.price, 0);

export const isToday = (iso: string) => new Date(iso).toDateString() === new Date().toDateString();
export const isActive = (o: Order) => o.status !== 'COMPLETED';
export const countBy = <T extends { status: string }>(list: T[], status: string) =>
    list.filter((x) => x.status === status).length;