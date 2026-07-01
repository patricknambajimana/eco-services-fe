Login Page
    ↓
Authenticate
    ↓
Get User Role from Backend
    ↓
Store JWT + User Info
    ↓
Redirect Automatically

SUPER_ADMIN          → /admin/dashboard
GENERAL_MANAGER      → /manager/dashboard
ACCOUNTANT           → /accounting/dashboard

Restaurant Roles     → /restaurant/dashboard
Bakery Roles         → /bakery/dashboard
Decoration Roles     → /decoration/dashboard

## Authentication Module structure
src/
│
├── pages/
│   ├── auth/
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── ForgotPasswordPage.tsx
│   │   └── ResetPasswordPage.tsx
│
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── PasswordInput.tsx
│   │   ├── DepartmentSelect.tsx
│   │   ├── AuthLayout.tsx
│   │   └── SocialLogin.tsx
│
├── services/
│   └── auth.service.ts
│
├── store/
│   └── auth.store.ts
│
├── routes/
│   ├── ProtectedRoute.tsx
│   └── RoleBasedRoute.tsx
│
└── utils/
    └── roleRedirect.ts