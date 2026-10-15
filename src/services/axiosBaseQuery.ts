import axios from 'axios';
import type { AxiosError } from 'axios';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { RootState } from '@/store';
import type { ApiArgs, ApiError } from './apiTypes';

export const axiosBaseQuery =
    (baseUrl: string): BaseQueryFn<ApiArgs, unknown, ApiError> =>
        async ({ url, method = 'GET', data, params, headers }, api) => {
            const token = (api.getState() as RootState).auth.token;
            try {
                const response = await axios({
                    url: baseUrl + url,
                    method,
                    data,
                    params,
                    headers: {
                        ...(method === 'GET' ? {
                            'Cache-Control': 'no-cache, no-store',
                            Pragma: 'no-cache',
                        } : {}),
                        ...headers,
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                });
                const payload = response.data as { data?: unknown };
                return { data: payload.data ?? response.data };
            } catch (error) {
                const err = error as AxiosError<{
                    message?: string;
                    errors?: unknown;
                    error?: { message?: string; errors?: unknown };
                }>;
                if (err.response?.status === 401 && token) {
                    api.dispatch({ type: 'auth/logout' });
                }
                const responseData = err.response?.data;
                const nested = responseData?.error;
                const details = responseData?.errors ?? nested?.errors;
                const detailMessage = Array.isArray(details)
                    ? details.map((item) => {
                        if (typeof item === 'string') return item;
                        if (item && typeof item === 'object' && 'message' in item) return String((item as { message: unknown }).message);
                        return JSON.stringify(item);
                    }).join(' ')
                    : details && typeof details === 'object'
                        ? Object.entries(details as Record<string, unknown>)
                            .map(([field, value]) => `${field}: ${Array.isArray(value) ? value.join(', ') : String(value)}`)
                            .join(' ')
                        : '';
                return {
                    error: {
                        status: err.response?.status,
                        message: detailMessage || nested?.message || responseData?.message || err.message,
                    },
                };
            }
        };
