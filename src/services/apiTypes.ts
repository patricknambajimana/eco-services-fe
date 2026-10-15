import type { AxiosRequestConfig } from 'axios';

export interface ApiArgs {
    url: string;
    method?: AxiosRequestConfig['method'];
    data?: unknown;
    params?: unknown;
    headers?: AxiosRequestConfig['headers'];
}

export interface ApiError { status?: number; message: string }