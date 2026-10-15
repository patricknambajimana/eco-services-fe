import type { InventoryItem, InventoryStatus } from '@/types';

export function getInventoryStatus(item: InventoryItem): InventoryStatus {
    if (item.expiryDate && new Date(item.expiryDate) < new Date()) return 'EXPIRED';
    if (item.quantity <= 0) return 'OUT_OF_STOCK';
    if (item.quantity <= item.minStock * 0.5) return 'CRITICAL';
    if (item.quantity <= item.minStock) return 'LOW_STOCK';
    return 'AVAILABLE';
}