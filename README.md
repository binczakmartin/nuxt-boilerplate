# Nuxt 4 Boilerplate

A modern, production-ready Nuxt 4 boilerplate with authentication, dashboard navigation, and a clean dark theme design system.

## ✨ Features

### 🎨 Modern Design System
- **Dark Theme**: Professional dark color scheme with purple gradient accents
- **Responsive**: Mobile-first design that works on all screen sizes
- **Customizable**: Centralized theme configuration in `/config/theme.ts`
- **Smooth Animations**: Polished micro-interactions and transitions

### 🔐 Authentication System
- **JWT-based**: Secure authentication with HTTP-only cookies
- **Protected Routes**: Middleware-based route protection
- **Login/Register**: Pre-built authentication pages
- **User Management**: Profile and logout functionality

### 🧭 Advanced Navigation
- **Public Navbar**: Clean marketing navbar with mobile drawer
- **Dashboard Sidebar**: Professional sidebar with nested menu support
- **Config-Driven**: Easy to add/remove menu items via configuration
- **Auto-Active States**: Highlights current route and auto-expands parent items
- **Mobile Optimized**: Drawer pattern for mobile navigation

### 🛠️ Technical Stack
- **Nuxt 4**: Latest Nuxt with all modern features
- **Vue 3**: Composition API with `<script setup>`
- **TypeScript**: Fully typed codebase
- **Nuxt UI**: Beautiful UI components
- **Drizzle ORM**: Type-safe database queries
- **PostgreSQL**: Production-ready database
- **Tailwind CSS**: Utility-first styling

### 📦 Component Library
- **Modular Components**: Reusable UI components in `/components/ui/`
- **Layout Components**: Navigation and layout components
- **Auth Components**: Authentication-specific components
- **Demo Pages**: Example dashboard pages with nested routes

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd nuxt-boilerplate
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
JWT_SECRET="your-super-secret-jwt-key-change-this"
```

4. **Run database migrations**
```bash
pnpm db:push
```

5. **Start development server**
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
nuxt-boilerplate/
├── components/
│   ├── layout/              # Navigation components
│   │   ├── AppNavbar.vue
│   │   ├── DashboardSidebar.vue
│   │   ├── DashboardMenuItem.vue
│   │   └── MobileDrawer.vue
│   ├── ui/                  # Reusable UI components
│   │   ├── UiButton.vue
│   │   ├── UiCard.vue
│   │   └── UiInput.vue
│   └── auth/                # Auth-specific components
│       ├── AuthWrapper.vue
│       ├── AuthPanelContent.vue
│       └── AuthFormHeader.vue
│
├── pages/
│   ├── index.vue            # Landing page
│   ├── login.vue            # Login page
│   ├── register.vue         # Register page
│   └── dashboard/           # Dashboard pages
│       ├── index.vue
│       ├── settings.vue
│       ├── analytics/
│       └── users/
│
├── server/
│   ├── api/                 # API routes
│   │   ├── auth/
│   │   └── user/
│   ├── middleware/          # Server middleware
│   └── utils/               # Server utilities
│
├── config/
│   ├── navigation.ts        # Navigation configuration
│   ├── theme.ts             # Theme configuration
│   └── NAVIGATION.md        # Navigation docs
│
├── composables/
│   └── useAuth.ts           # Auth composable
│
├── middleware/
│   └── auth.ts              # Auth middleware
│
├── db/
│   ├── index.ts             # Database connection
│   └── schema.ts            # Database schema
│
└── app.vue                  # Root component
```

## 🎨 Customization

### Theme Configuration

Edit `/config/theme.ts` to customize colors, shadows, and other design tokens:

```typescript
export const themeConfig = {
  colors: {
    primary: '#667eea',
    accent: '#764ba2',
    // ... more colors
  },
  gradients: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    // ... more gradients
  },
}
```

### Navigation Menu

Edit `/config/navigation.ts` to add/remove menu items:

```typescript
// Public navbar links
export const publicNavLinks: NavLink[] = [
  { label: 'Features', to: '/#features' },
  { label: 'Pricing', to: '/#pricing' },
]

// Dashboard sidebar menu
export const dashboardMenuItems: DashboardMenuItem[] = [
  {
    label: 'Analytics',
    icon: 'i-heroicons-chart-bar',
    children: [
      { label: 'Reports', to: '/dashboard/analytics/reports', icon: 'i-heroicons-document-text' },
    ],
  },
]
```

### Adding New Pages

1. **Create the page file**
```bash
touch pages/dashboard/your-page.vue
```

2. **Add to navigation config**
```typescript
// In config/navigation.ts
{
  label: 'Your Page',
  to: '/dashboard/your-page',
  icon: 'i-heroicons-sparkles',
}
```

That's it! The navigation will automatically include your new page.

## 🔐 Authentication

### Register a New User

```typescript
const { register } = useAuth()

await register({
  email: 'user@example.com',
  password: 'securepassword'
})
```

### Login

```typescript
const { login } = useAuth()

await login({
  email: 'user@example.com',
  password: 'securepassword'
})
```

### Protect Routes

Add `middleware: 'auth'` to your page:

```vue
<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
</script>
```

### Access Current User

```typescript
const { user } = useAuth()

console.log(user.value?.email)
```

## 🧪 Database

### Schema

The database schema is defined in `/db/schema.ts` using Drizzle ORM:

```typescript
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})
```

### Migrations

Push schema changes to database:
```bash
pnpm db:push
```

Generate migrations:
```bash
pnpm db:generate
```

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 768px
  - Drawer navigation
  - Stacked layouts
  
- **Tablet**: 768px - 1023px
  - Full navbar
  - Drawer for dashboard
  
- **Desktop**: ≥ 1024px
  - Full navbar
  - Fixed sidebar for dashboard

### Mobile Navigation

Both public and dashboard layouts use a professional drawer pattern on mobile:

- Smooth slide-in animation
- Dark backdrop with blur
- Close triggers: X button, backdrop click, escape key, route change
- Body scroll prevention

## 🚀 Production

### Build

```bash
pnpm build
```

### Preview

```bash
pnpm preview
```

### Environment Variables

Make sure to set these in production:

```env
DATABASE_URL="your-production-database-url"
JWT_SECRET="your-production-jwt-secret"
NODE_ENV="production"
```

## 📚 Documentation

- **Navigation System**: See `/config/NAVIGATION.md`
- **Navigation Refactoring**: See `/NAVIGATION_REFACTOR.md`
- **Theme Configuration**: See `/config/README.md`

## 🎯 Key Concepts

### Component Naming Convention

Nuxt auto-imports components with folder prefixes:

```
components/layout/AppNavbar.vue     → <LayoutAppNavbar>
components/ui/UiButton.vue          → <UiButton>
components/auth/AuthWrapper.vue     → <AuthWrapper>
```

### Route Middleware

- **Global**: Applied to all routes (defined in `nuxt.config.ts`)
- **Named**: Applied via `definePageMeta({ middleware: 'auth' })`
- **Anonymous**: Inline functions in `definePageMeta`

### Composables

Reusable reactive logic in `/composables/`:

- `useAuth()`: Authentication state and methods
- Auto-imported throughout the app

## 🛠️ Development

### Code Quality

```bash
# Type checking
pnpm typecheck

# Linting
pnpm lint

# Formatting (if configured)
pnpm format
```

### VS Code

Recommended extensions:
- Vue - Official
- Tailwind CSS IntelliSense
- ESLint
- TypeScript Vue Plugin (Volar)

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with Nuxt 4** • [Documentation](https://nuxt.com) • [Nuxt UI](https://ui.nuxt.com)
