# Eco-Service Business Management System (Frontend)

Multi-department (Restaurant, Bakery, Decoration) business management frontend.
Built with React, TypeScript, Redux Toolkit + RTK Query, React Router and Tailwind CSS.

## 1. Create the project and install packages

Copy all the files into a folder (e.g. `eco-service-bms`) using the structure above, then:

```bash
cd eco-service-fe

# Runtime dependencies
npm install react react-dom react-router-dom @reduxjs/toolkit react-redux axios recharts lucide-react

# Dev dependencies
npm install -D vite @vitejs/plugin-react typescript tailwindcss
  @types/react @types/react-dom @types/node
```

(Or just run `npm install`, because every package is already listed in `package.json`.)

## 2. Run

```bash
npm run dev       # http://localhost:5173
npm run build     # type-check + production build
npm run preview
```

## 3. Environment variables (`.env`)

| Variable        | Description                                          |
|-----------------|------------------------------------------------------|
| VITE_USE_MOCK   | `true` = built-in mock API, `false` = real backend   |
| VITE_API_URL    | Base URL of your backend, e.g. http://localhost:5000/api/v1 |

## 4. Demo accounts (mock mode)

Choose the matching department on the login page.

| Credential ID | Password | Department | Role                       |
|---------------|----------|------------|----------------------------|
| ADMIN001      | admin123 | Management | SUPER_ADMIN                |
| GM001         | 1234     | Management | GENERAL_MANAGER            |
| ACC001        | 1234     | Management | ACCOUNTANT                 |
| RW001         | 1234     | Restaurant | RESTAURANT_WAITER          |
| RC001         | 1234     | Restaurant | RESTAURANT_CASHIER         |
| RCL001        | 1234     | Restaurant | RESTAURANT_CHEF_LEADER     |
| RS001         | 1234     | Restaurant | RESTAURANT_STOCK_MANAGER   |
| BM001         | 1234     | Bakery     | BAKERY_MANAGER             |
| BCH001        | 1234     | Bakery     | BAKERY_CHEF                |
| BC001         | 1234     | Bakery     | BAKERY_CASHIER             |
| DM001         | 1234     | Decoration | DECORATION_MANAGER         |
| DC001         | 1234     | Decoration | DECORATION_CASHIER         |
| DS001         | 1234     | Decoration | DECORATION_STAFF           |

## 5. Connecting your real backend

Set `VITE_USE_MOCK=false` and use the backend URL
`http://localhost:5000/api/v1`. Login uses the backend `username` and
`password` fields. All endpoints are defined in `src/services/*Api.ts`
(RTK Query). The routes the mock implements are listed in
`src/services/mock/mockBaseQuery.ts`. Match your backend to them or edit the URLs.

## 6. Architecture notes

- **RBAC**: `src/config/access.ts` is the single source of truth for page access.
  It drives both the route guards and the sidebar.
- **RTK Query**: one `baseApi`, with feature APIs added via `injectEndpoints`.
- **Session**: idle timeout (15 min) with a 60 s countdown warning.