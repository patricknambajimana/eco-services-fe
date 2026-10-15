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
                const err = error as AxiosError<{ message?: string }>;
                if (err.response?.status === 401 && token) {
                    api.dispatch({ type: 'auth/logout' });
                }
                return {
                    error: {
                        status: err.response?.status,
                        message: err.response?.data?.message ?? err.message,
                    },
                };
            }
        };
