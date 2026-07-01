export const DEPARTMENTS = [
  { value: 'restaurant', label: 'Restaurant', icon: '🍽️' },
  { value: 'bakery', label: 'Bakery', icon: '🥐' },
  { value: 'decoration', label: 'Decoration', icon: '🏺' },
];

export const ROLES_BY_DEPARTMENT: Record<string, { value: string; label: string }[]> = {
  restaurant: [
    { value: 'RESTAURANT_STOCK_MANAGER', label: 'Stock Manager' },
    { value: 'RESTAURANT_CHEF_LEADER', label: 'Chef Leader' },
    { value: 'RESTAURANT_CHEF', label: 'Chef' },
    { value: 'RESTAURANT_WAITER_LEADER', label: 'Waiter Leader' },
    { value: 'RESTAURANT_WAITER', label: 'Waiter' },
    { value: 'RESTAURANT_CASHIER', label: 'Cashier' },
    { value: 'RESTAURANT_BARISTA', label: 'Barista' },
  ],
  bakery: [
    { value: 'BAKERY_MANAGER', label: 'Manager' },
    { value: 'BAKERY_STOCK_MANAGER', label: 'Stock Manager' },
    { value: 'BAKERY_CASHIER', label: 'Cashier' },
    { value: 'BAKERY_CHEF_LEADER', label: 'Chef Leader' },
    { value: 'BAKERY_CHEF', label: 'Chef' },
    { value: 'BAKERY_BARISTA', label: 'Barista' },
  ],
  decoration: [
    { value: 'DECORATION_MANAGER', label: 'Manager' },
    { value: 'DECORATION_CASHIER', label: 'Cashier' },
    { value: 'DECORATION_STAFF', label: 'Staff' },
  ],
};