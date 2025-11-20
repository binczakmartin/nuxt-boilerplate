# Navigation System Documentation

## 📁 File Structure

```
config/
  └── navigation.ts              # Centralized navigation configuration

components/layout/
  ├── AppNavbar.vue              # Public navbar (marketing/landing pages)
  ├── DashboardSidebar.vue       # Dashboard sidebar navigation
  ├── DashboardMenuItem.vue      # Recursive menu item component
  └── MobileDrawer.vue           # Reusable mobile drawer component

pages/
  ├── index.vue                  # Uses AppNavbar
  ├── login.vue                  # Uses AppNavbar
  ├── register.vue               # Uses AppNavbar
  └── dashboard/
      ├── index.vue              # Uses DashboardSidebar
      ├── settings.vue
      ├── analytics/
      │   ├── reports.vue
      │   └── insights.vue
      └── users/
          ├── index.vue
          └── roles.vue
```

## 🎯 How It Works

### Public Pages Navigation

**AppNavbar** is displayed on all non-dashboard pages (landing, login, register).

- **Desktop**: Logo + navigation links + auth buttons
- **Mobile**: Logo + burger icon → opens MobileDrawer with all links

### Dashboard Navigation

**DashboardSidebar** is displayed on all `/dashboard/*` pages.

- **Desktop**: Fixed left sidebar (280px) with logo, menu items, and user section
- **Mobile**: Hamburger button (top-left) → opens MobileDrawer with menu items
- **Features**:
  - Nested/collapsible menu groups
  - Active state highlighting
  - Smooth animations
  - Auto-expand when child is active

## 📝 Adding New Navigation Items

### Public Navbar Links

Edit `config/navigation.ts`:

```ts
export const publicNavLinks: NavLink[] = [
  { label: 'Features', to: '/#features' },
  { label: 'Pricing', to: '/#pricing' },
  { label: 'About', to: '/about' }, // ← Add new link
]
```

### Dashboard Menu Items

Edit `config/navigation.ts`:

```ts
export const dashboardMenuItems: DashboardMenuItem[] = [
  {
    label: 'Overview',
    to: '/dashboard',
    icon: 'i-heroicons-home',
  },
  {
    label: 'Analytics',
    icon: 'i-heroicons-chart-bar',
    children: [
      { label: 'Reports', to: '/dashboard/analytics/reports', icon: 'i-heroicons-document-text' },
      { label: 'Insights', to: '/dashboard/analytics/insights', icon: 'i-heroicons-light-bulb' },
    ],
  },
  // Add new item:
  {
    label: 'Billing',
    to: '/dashboard/billing',
    icon: 'i-heroicons-credit-card',
  },
  // Or add nested items:
  {
    label: 'Settings',
    icon: 'i-heroicons-cog-6-tooth',
    children: [
      { label: 'Profile', to: '/dashboard/settings/profile', icon: 'i-heroicons-user' },
      { label: 'Security', to: '/dashboard/settings/security', icon: 'i-heroicons-lock-closed' },
    ],
  },
]
```

## 🎨 Customization

### Colors & Styling

All navigation components use the same dark theme:
- Background: `rgba(15, 23, 42, 0.8)` with backdrop blur
- Active state: Purple gradient (`#667eea → #764ba2`)
- Text: `#f8fafc` with opacity variations

To customize, edit the `<style scoped>` sections in:
- `AppNavbar.vue`
- `DashboardSidebar.vue`
- `MobileDrawer.vue`

### Icons

Icons use **Heroicons** from Nuxt UI:
- Browse available icons: https://heroicons.com
- Format: `i-heroicons-[icon-name]`
- Example: `i-heroicons-chart-bar`, `i-heroicons-users`

## 🔧 Components API

### MobileDrawer

```vue
<MobileDrawer :is-open="drawerOpen" @close="closeDrawer">
  <template #header>
    <span>Custom Header</span>
  </template>
  
  <!-- Drawer content -->
  <nav>...</nav>
</MobileDrawer>
```

**Props:**
- `isOpen` (boolean): Controls drawer visibility

**Events:**
- `@close`: Emitted when drawer should close (backdrop click, X button, escape key)

**Slots:**
- `header`: Custom header content (default shows "Menu")
- `default`: Main drawer content

### DashboardMenuItem

```vue
<DashboardMenuItem :item="menuItem" @navigate="handleNavigate" />
```

**Props:**
- `item` (DashboardMenuItem): Menu item configuration

**Events:**
- `@navigate`: Emitted when a leaf item is clicked (for closing mobile drawer)

**Features:**
- Automatically handles nested children
- Shows chevron icon when item has children
- Toggles expansion on click
- Auto-expands when child route is active

## 📱 Responsive Behavior

### Breakpoints

- **Mobile**: < 768px
  - AppNavbar shows burger menu
  - DashboardSidebar shows hamburger button (top-left)
  
- **Tablet**: 768px - 1023px
  - AppNavbar shows full navigation
  - DashboardSidebar still uses mobile drawer
  
- **Desktop**: ≥ 1024px
  - AppNavbar shows full navigation
  - DashboardSidebar shows fixed left sidebar

### Mobile UX Features

- Body scroll prevented when drawer is open
- Backdrop click closes drawer
- Route change auto-closes drawer
- Escape key closes drawer
- Smooth slide-in/out animations
- Touch-friendly button sizes (44px min)

## 🚀 Best Practices

1. **Keep menu structure flat**: Max 2 levels deep (parent → children)
2. **Use descriptive labels**: Clear, concise menu item names
3. **Add icons**: Improve visual scanning and recognition
4. **Group related items**: Use nested children for logical grouping
5. **Test on mobile**: Always verify drawer behavior on small screens

## 🔄 Migration from Old LayoutHeader

The old `LayoutHeader` component has been removed and replaced with:

- **Public pages**: `AppNavbar`
- **Dashboard pages**: `DashboardSidebar`

The `app.vue` automatically detects if you're on a dashboard route and shows the appropriate navigation.
