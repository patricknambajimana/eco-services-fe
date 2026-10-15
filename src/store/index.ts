import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/services/baseApi';
import authReducer, { AUTH_KEY } from './authSlice';

export const store = configureStore({
    reducer: { [baseApi.reducerPath]: baseApi.reducer, auth: authReducer },
    middleware: (gdm) => gdm().concat(baseApi.middleware),
});

store.subscribe(() => {
    const { user, token } = store.getState().auth;
    if (user && token) localStorage.setItem(AUTH_KEY, JSON.stringify({ user, token }));
    else localStorage.removeItem(AUTH_KEY);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;