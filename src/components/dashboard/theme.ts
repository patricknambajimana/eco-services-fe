import type { Department } from '@/types';

interface Theme { label: string; border: string; statement: string; text: string; chart: string }

export const DEPT_THEME: Record<Department, Theme> = {
    MANAGEMENT: { label: 'Management', border: 'border-brand-600', statement: 'bg-brand-50 text-brand-800 border-brand-100', text: 'text-brand-700', chart: '#a12661' },
    RESTAURANT: { label: 'Restaurant', border: 'border-restaurant-500', statement: 'bg-restaurant-50 text-restaurant-700 border-restaurant-100', text: 'text-restaurant-700', chart: '#c94f2d' },
    BAKERY: { label: 'Bakery', border: 'border-bakery-500', statement: 'bg-bakery-50 text-bakery-700 border-bakery-100', text: 'text-bakery-700', chart: '#c13778' },
    DECORATION: { label: 'Decoration', border: 'border-decoration-500', statement: 'bg-decoration-50 text-decoration-700 border-decoration-100', text: 'text-decoration-700', chart: '#7c4dce' },
};