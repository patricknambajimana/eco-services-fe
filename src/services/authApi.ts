import { baseApi } from './baseApi';
import type { Department, Role, User } from '@/types';

interface BackendLoginResponse {
    success: boolean;
    message: string;
    data: {
        token: string;
        user: {
            userId: number;
            fullName: string;
            username: string;
            roles: string[];
            departmentName?: string;
        };
    };
}

interface BackendLoginPayload {
    token: string;
    user: BackendLoginResponse['data']['user'];
}

const toRole = (roles: string[]): Role => {
    const role = roles[0];
    return role && role in {
        SUPER_ADMIN: true, GENERAL_MANAGER: true, ACCOUNTANT: true,
        RESTAURANT_MANAGER: true, RESTAURANT_STOCK_MANAGER: true, RESTAURANT_CHEF_LEADER: true,
        RESTAURANT_CHEF: true, RESTAURANT_WAITER_LEADER: true, RESTAURANT_WAITER: true,
        RESTAURANT_CASHIER: true, RESTAURANT_BARISTA: true, BAKERY_MANAGER: true,
        BAKERY_STOCK_MANAGER: true, BAKERY_CASHIER: true, BAKERY_CHEF_LEADER: true,
        BAKERY_CHEF: true, BAKERY_BARISTA: true, DECORATION_MANAGER: true,
        DECORATION_CASHIER: true, DECORATION_STAFF: true,
    } ? role as Role : 'SUPER_ADMIN';
};

const toDepartment = (role: Role, name?: string): Department => {
    if (role === 'SUPER_ADMIN' || role === 'GENERAL_MANAGER' || role === 'ACCOUNTANT') return 'MANAGEMENT';
    const department = name?.toUpperCase();
    if (department === 'RESTAURANT' || department === 'BAKERY' || department === 'DECORATION') return department;
    return role.split('_')[0] as Department;
};

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<
            { token: string; user: User },
            { username: string; password: string }
        >({
            query: (data) => ({ url: '/auth/login', method: 'POST', data }),
            transformResponse: (response: BackendLoginResponse | BackendLoginPayload) => {
                const payload = 'data' in response ? response.data : response;
                const role = toRole(payload.user.roles);
                return {
                    token: payload.token,
                    user: {
                        id: String(payload.user.userId),
                        fullName: payload.user.fullName,
                        credentialId: payload.user.username,
                        role,
                        department: toDepartment(role, payload.user.departmentName),
                    },
                };
            },
        }),
        forgotPassword: build.mutation<{ message: string }, { credentialId: string }>({
            query: ({ credentialId }) => ({ url: '/auth/forgot-password', method: 'POST', data: { username: credentialId } }),
        }),
    }),
});

export const { useLoginMutation, useForgotPasswordMutation } = authApi;