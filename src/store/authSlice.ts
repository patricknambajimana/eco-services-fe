import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/types';

export const AUTH_KEY = 'ecs_auth';

interface AuthState { user: User | null; token: string | null }

const load = (): AuthState => {
    try {
        const raw = localStorage.getItem(AUTH_KEY);
        if (raw) return JSON.parse(raw) as AuthState;
    } catch { /* ignore corrupted storage */ }
    return { user: null, token: null };
};

const authSlice = createSlice({
    name: 'auth',
    initialState: load(),
    reducers: {
        setCredentials: (_s, a: PayloadAction<{ user: User; token: string }>) => a.payload,
        logout: () => ({ user: null, token: null }),
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;