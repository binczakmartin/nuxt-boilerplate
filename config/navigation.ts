export interface NavLink {
  label: string
  to: string
  icon?: string
}

export interface DashboardMenuItem {
  label: string
  to?: string
  icon: string
  children?: DashboardMenuItem[]
}

/**
 * Public navigation links (marketing/landing pages)
 */
export const publicNavLinks: NavLink[] = [
  { label: 'Features', to: '/#features' },
  { label: 'Pricing', to: '/#pricing' },
  { label: 'FAQ', to: '/#faq' },
]

/**
 * Dashboard sidebar menu structure
 * Supports nested sub-items for complex navigation
 */
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
  {
    label: 'Users',
    icon: 'i-heroicons-users',
    children: [
      { label: 'All Users', to: '/dashboard/users', icon: 'i-heroicons-user-group' },
      { label: 'Roles', to: '/dashboard/users/roles', icon: 'i-heroicons-shield-check' },
    ],
  },
  {
    label: 'Settings',
    to: '/dashboard/settings',
    icon: 'i-heroicons-cog-6-tooth',
  },
]
