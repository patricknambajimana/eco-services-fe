import { baseApi } from './baseApi';
import type { CreateShiftPayload, CreateStaffPayload, Department, Role, Shift, StaffMember, StaffStatus, UpdateCredentialsPayload } from '@/types';

interface BackendStaff {
    userId?: string | number;
    id?: string | number;
    fullName?: string;
    phone?: string;
    email?: string;
    department?: string;
    departmentName?: string;
    status?: string;
    roles?: string[];
    credentialId?: string;
}

interface BackendShift {
    id?: string | number;
    scheduleId?: string | number;
    userId?: string | number;
    staffId?: string | number;
    shiftDate?: string;
    date?: string;
    startTime?: string;
    endTime?: string;
    start?: string;
    end?: string;
    user?: { fullName?: string; departmentName?: string; department?: string };
    staff?: { fullName?: string; departmentName?: string; department?: string };
}

const departments = ['MANAGEMENT', 'RESTAURANT', 'BAKERY', 'DECORATION'] as const;
const normalizeDepartment = (value?: string): Shift['department'] => {
    const department = value?.toUpperCase();
    return departments.includes(department as typeof departments[number])
        ? department as Shift['department']
        : 'MANAGEMENT';
};

const normalizeStaff = (staff: BackendStaff): StaffMember => {
    const department = normalizeDepartment(staff.departmentName ?? staff.department) as Department;
    const role = (staff.roles?.[0] ?? 'RESTAURANT_WAITER') as Role;
    return {
        id: String(staff.userId ?? staff.id ?? ''),
        fullName: staff.fullName ?? '',
        phone: staff.phone ?? '',
        email: staff.email ?? '',
        department,
        role,
        status: (staff.status ?? 'ACTIVE').toUpperCase() as StaffStatus,
        credentialId: staff.credentialId ?? '',
    };
};

const normalizeShift = (shift: BackendShift): Shift => {
    const date = shift.shiftDate ?? shift.date ?? '';
    const day = date ? (new Date(`${date}T00:00:00`).getDay() + 6) % 7 : 0;
    const staff = shift.user ?? shift.staff;
    return {
        id: String(shift.id ?? shift.scheduleId ?? `${shift.userId}-${date}`),
        staffId: String(shift.userId ?? shift.staffId ?? ''),
        staffName: staff?.fullName ?? 'Staff member',
        department: normalizeDepartment(staff?.departmentName ?? staff?.department),
        day,
        start: shift.startTime ?? shift.start ?? '',
        end: shift.endTime ?? shift.end ?? '',
        shiftDate: date,
    };
};

export const staffApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getStaff: build.query<StaffMember[], void>({
            query: () => ({ url: '/staff', headers: { 'Cache-Control': 'no-cache, no-store' } }),
            transformResponse: (staff: BackendStaff[]) => staff.map(normalizeStaff),
            providesTags: ['Staff'],
        }),
        createStaff: build.mutation<StaffMember, CreateStaffPayload>({
            query: (data) => ({ url: '/staff', method: 'POST', data }), invalidatesTags: ['Staff'],
        }),
        updateStaff: build.mutation<StaffMember, Partial<StaffMember> & { id: string }>({
            query: ({ id, ...data }) => ({ url: `/staff/${id}`, method: 'PUT', data }),
            invalidatesTags: ['Staff'],
        }),
        deleteStaff: build.mutation<void, string>({
            query: (id) => ({ url: `/staff/${id}`, method: 'DELETE' }),
            invalidatesTags: ['Staff'],
        }),
        resetCredentials: build.mutation<{ temporaryPin: string }, string>({
            query: (id) => ({ url: `/staff/${id}/credentials`, method: 'PUT', data: {} }),
            invalidatesTags: ['Staff'],
        }),
        updateCredentials: build.mutation<void, { id: string; data: UpdateCredentialsPayload }>({
            query: ({ id, data }) => ({ url: `/staff/${id}/credentials`, method: 'PUT', data }),
            invalidatesTags: ['Staff'],
        }),
        getSchedule: build.query<Shift[], void>({
            query: () => ({ url: '/staff/schedules', headers: { 'Cache-Control': 'no-cache, no-store' } }),
            transformResponse: (shifts: BackendShift[]) => shifts.map(normalizeShift),
            providesTags: ['Schedule'],
        }),
        createShift: build.mutation<Shift, CreateShiftPayload>({
            query: (data) => ({ url: '/staff/schedules', method: 'POST', data }), invalidatesTags: ['Schedule'],
        }),
    }),
});

export const {
    useGetStaffQuery, useCreateStaffMutation, useUpdateStaffMutation, useDeleteStaffMutation, useResetCredentialsMutation, useUpdateCredentialsMutation,
    useGetScheduleQuery, useCreateShiftMutation,
} = staffApi;