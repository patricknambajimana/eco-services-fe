import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { ApiArgs, ApiError } from '../apiTypes';
import type { CommunicationEmail, CommunicationMessage, Department, Order, OrderItem, StockMovement } from '@/types';
import * as db from './mockDb';

class MockError extends Error {
    constructor(public status: number, message: string) { super(message); }
}
const fail = (status: number, message: string): never => { throw new MockError(status, message); };
const now = () => new Date().toISOString();
const uid = (p: string) => `${p}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
const messages: CommunicationMessage[] = [];
const emails: CommunicationEmail[] = [];
const byId = <T extends { id: string }>(list: T[], id: string): T =>
    list.find((x) => x.id === id) ?? fail(404, 'Record not found');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Body = Record<string, any>;
type Handler = (c: { ids: string[]; body: Body }) => unknown;

const routes: [string, string, Handler][] = [
    // ---------- auth ----------
    ['POST', '/auth/login', ({ body }) => {
        const credential = String(body.username ?? body.credentialId ?? '').trim().toUpperCase();
        const u = db.users.find((x) => x.credentialId === credential && x.password === body.password);
        if (!u) return fail(401, 'Invalid username or password.');
        const s = db.staff.find((x) => x.credentialId === u.credentialId);
        if (s && s.status !== 'ACTIVE') return fail(403, `Your account is ${s.status.toLowerCase().replace('_', ' ')}.`);
        const { password: _pw, ...user } = u;
        return { token: `mock-token-${u.id}`, user };
    }],
    ['POST', '/auth/forgot-password', ({ body }) => {
        if (!db.users.some((u) => u.credentialId === String(body.credentialId).trim().toUpperCase()))
            return fail(404, 'No account found for that Credential ID.');
        return { message: 'A temporary PIN has been sent. It expires in 15 minutes.' };
    }],

    // ---------- dashboard / misc ----------
    ['GET', '/dashboard/:dept', ({ ids }) => db.dashboards[ids[0] as Department] ?? fail(404, 'Unknown department')],
    ['GET', '/notifications', () => db.notifications],
    ['GET', '/reports/revenue', () => db.revenue],
    ['GET', '/catalog', () => db.catalog],
    ['GET', '/customers', () => db.customers],

    // ---------- orders ----------
    ['GET', '/orders', () => db.orders],
    ['GET', '/orders/:id', ({ ids }) => byId(db.orders, ids[0])],
    ['POST', '/orders', ({ body }) => {
        const items = body.items as OrderItem[];
        const depts = [...new Set(items.map((i) => i.department))];
        const order: Order = {
            id: `ORD-${1001 + db.orders.length}`, customerName: body.customerName, phone: body.phone,
            address: body.address, department: depts.length === 1 ? depts[0] : 'MIXED', status: 'PENDING',
            items, total: items.reduce((s, i) => s + i.qty * i.price, 0),
            paymentMethod: body.paymentMethod, paymentStatus: body.paymentStatus,
            createdBy: body.createdBy, createdAt: now(), customization: body.customization ?? {},
            history: [{ at: now(), by: body.createdBy, action: 'Order created' }],
        };
        db.orders.unshift(order);
        return order;
    }],
    ['PATCH', '/orders/:id', ({ ids, body }) => {
        const o = byId(db.orders, ids[0]);
        if (body.status) {
            o.status = body.status;
            o.history.push({ at: now(), by: body.by ?? 'System', action: `Status changed to ${body.status}` });
        }
        return o;
    }],

    // ---------- inventory ----------
    ['GET', '/inventory', () => db.inventory],
    ['PATCH', '/inventory/:id', ({ ids, body }) => Object.assign(byId(db.inventory, ids[0]), { quantity: body.quantity })],
    ['GET', '/stock-movements', () => db.movements],
    ['POST', '/stock-movements', ({ body }) => {
        const item = byId(db.inventory, body.productId);
        const adds = ['PURCHASE', 'TRANSFER_IN'].includes(body.type);
        item.quantity = Math.max(0, item.quantity + (adds ? 1 : -1) * body.quantity);
        const m: StockMovement = {
            id: uid('MV'), date: now(), product: item.name, quantity: body.quantity,
            type: body.type, department: item.department, user: body.user,
        };
        db.movements.unshift(m);
        return m;
    }],
    ['GET', '/requisitions', () => db.requisitions],
    ['POST', '/requisitions', ({ body }) => {
        const r = { ...body, id: uid('RQ'), status: 'PENDING' } as (typeof db.requisitions)[number];
        db.requisitions.unshift(r);
        return r;
    }],
    ['PATCH', '/requisitions/:id', ({ ids, body }) => {
        const r = byId(db.requisitions, ids[0]);
        r.status = body.status;
        if (body.status === 'APPROVED') {
            const item = db.inventory.find((i) => i.name === r.item);
            if (item) {
                item.quantity += r.quantity;
                db.movements.unshift({
                    id: uid('MV'), date: now(), product: item.name, quantity: r.quantity,
                    type: 'TRANSFER_IN', department: item.department, user: body.by,
                });
            }
        }
        return r;
    }],
    ['GET', '/suppliers', () => db.suppliers],

    // ---------- staff ----------
    ['GET', '/staff', () => db.staff],
    ['GET', '/communications/messages', () => messages],
    ['POST', '/communications/messages', ({ body }) => {
        if (!body.recipientId || !String(body.body ?? '').trim()) return fail(400, 'Recipient and message are required.');
        const recipient = db.staff.find((member) => member.id === String(body.recipientId));
        if (!recipient) return fail(404, 'Recipient not found.');
        const message = {
            id: uid('msg'), senderId: 'mock-manager', senderName: 'General Manager',
            recipientId: recipient.id, recipientName: recipient.fullName, body: String(body.body).trim(),
            createdAt: now(), read: false,
        };
        messages.unshift(message);
        return message;
    }],
    ['GET', '/communications/emails', () => emails],
    ['POST', '/communications/emails', ({ body }) => {
        if (!body.recipientId || !String(body.subject ?? '').trim() || !String(body.body ?? '').trim()) {
            return fail(400, 'Recipient, subject, and email body are required.');
        }
        const recipient = db.staff.find((member) => member.id === String(body.recipientId));
        if (!recipient) return fail(404, 'Recipient not found.');
        const email = {
            id: uid('mail'), senderId: 'mock-manager', senderName: 'General Manager',
            recipientId: recipient.id, recipientName: recipient.fullName, subject: String(body.subject).trim(),
            body: String(body.body).trim(), createdAt: now(), status: 'SENT' as const,
        };
        emails.unshift(email);
        return email;
    }],
    ['POST', '/staff', ({ body }) => {
        const departmentsById: Record<number, Department> = { 1: 'RESTAURANT', 2: 'BAKERY', 3: 'DECORATION' };
        const department = body.departmentId === undefined
            ? 'MANAGEMENT'
            : departmentsById[Number(body.departmentId)] ?? fail(400, 'A valid departmentId is required.');
        const roles = Array.isArray(body.roles) ? body.roles : [];
        if (!body.fullName || !body.username || !body.password || !body.pin || roles.length === 0) {
            return fail(400, 'fullName, username, password, pin, and roles are required.');
        }
        const credentialId = String(body.username).trim();
        const member = {
            ...body,
            id: uid('u'),
            credentialId,
            department,
            role: roles[0],
        } as (typeof db.staff)[number];
        db.staff.push(member);
        db.users.push({ id: member.id, fullName: member.fullName, credentialId, password: body.password, role: member.role, department: member.department });
        return member;
    }],
    ['PATCH', '/staff/:id', ({ ids, body }) => Object.assign(byId(db.staff, ids[0]), body)],
    ['PUT', '/staff/:id', ({ ids, body }) => Object.assign(byId(db.staff, ids[0]), body)],
    ['DELETE', '/staff/:id', ({ ids }) => {
        const index = db.staff.findIndex((member) => member.id === ids[0]);
        if (index < 0) return fail(404, 'Staff member not found.');
        const [removed] = db.staff.splice(index, 1);
        const userIndex = db.users.findIndex((user) => user.id === removed.id);
        if (userIndex >= 0) db.users.splice(userIndex, 1);
        return { success: true };
    }],
    ['PUT', '/staff/:id/credentials', ({ ids, body }) => {
        const s = byId(db.staff, ids[0]);
        const u = db.users.find((x) => x.credentialId === s.credentialId);
        if (body.password !== undefined && String(body.password).length < 8) return fail(400, 'Password must be at least 8 characters.');
        if (body.pin !== undefined && !/^\d{4,6}$/.test(String(body.pin))) return fail(400, 'PIN must contain 4 to 6 digits.');
        if (u && body.password) u.password = String(body.password);
        return body.pin ? { success: true } : { temporaryPin: String(Math.floor(100000 + Math.random() * 900000)) };
    }],
    ['GET', '/schedule', () => db.schedule],
    ['POST', '/schedule', ({ body }) => {
        const s = byId(db.staff, body.staffId);
        const shift = { ...body, id: uid('sh'), staffName: s.fullName, department: s.department } as (typeof db.schedule)[number];
        db.schedule.push(shift);
        return shift;
    }],

    // ---------- operations ----------
    ['GET', '/batches', () => db.batches],
    ['PATCH', '/batches/:id', ({ ids, body }) => Object.assign(byId(db.batches, ids[0]), body)],
    ['GET', '/tables', () => db.tables],
    ['PATCH', '/tables/:id', ({ ids, body }) => Object.assign(byId(db.tables, ids[0]), body)],
    ['GET', '/kitchen', () => db.kitchen],
    ['PATCH', '/kitchen/:id', ({ ids, body }) => Object.assign(byId(db.kitchen, ids[0]), body)],
    ['GET', '/menu', () => db.menu],
    ['PATCH', '/menu/:id', ({ ids, body }) => Object.assign(byId(db.menu, ids[0]), body)],
    ['GET', '/gifts', () => db.gifts],
    ['PATCH', '/gifts/:id', ({ ids, body }) => Object.assign(byId(db.gifts, ids[0]), body)],
];

export const mockBaseQuery: BaseQueryFn<ApiArgs, unknown, ApiError> = async ({ url, method = 'GET', data }) => {
    await new Promise((r) => setTimeout(r, 250));
    const path = url.split('?')[0];
    for (const [m, pattern, handler] of routes) {
        if (m !== method) continue;
        const match = path.match(new RegExp('^' + pattern.replace(/:[^/]+/g, '([^/]+)') + '$'));
        if (!match) continue;
        try {
            return { data: structuredClone(handler({ ids: match.slice(1), body: (data ?? {}) as Body })) };
        } catch (e) {
            if (e instanceof MockError) return { error: { status: e.status, message: e.message } };
            throw e;
        }
    }
    return { error: { status: 404, message: `No mock route for ${method} ${path}` } };
};