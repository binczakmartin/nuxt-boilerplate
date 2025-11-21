<template>
  <aside class="dashboard-sidebar">
    <!-- Desktop Sidebar -->
    <div class="dashboard-sidebar__desktop">
      <!-- Logo / Brand -->
      <NuxtLink to="/" class="dashboard-sidebar__brand">
        <div class="dashboard-sidebar__logo">✦</div>
        <span class="dashboard-sidebar__name">MyApp</span>
      </NuxtLink>

      <!-- Navigation Menu -->
      <nav class="dashboard-sidebar__nav">
        <LayoutDashboardMenuItem
          v-for="item in dashboardMenuItems"
          :key="item.label"
          :item="item"
        />
      </nav>

      <!-- User Section -->
      <div class="dashboard-sidebar__user">
        <div class="dashboard-sidebar__user-info">
          <div class="dashboard-sidebar__avatar">
            {{ userInitials }}
          </div>
          <div class="dashboard-sidebar__user-text">
            <div class="dashboard-sidebar__user-email">{{ user?.email }}</div>
          </div>
        </div>
        <button
          class="dashboard-sidebar__logout"
          aria-label="Logout"
          @click="handleLogout"
        >
          <UIcon name="i-heroicons-arrow-right-on-rectangle" class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <LayoutMobileDrawer :is-open="mobileOpen" @close="closeMobileSidebar">
      <template #header>
        <div class="dashboard-sidebar__drawer-brand">
          <div class="dashboard-sidebar__logo">✦</div>
          <span class="dashboard-sidebar__name">MyApp</span>
        </div>

      </template>

      <nav class="dashboard-sidebar__mobile-nav">
        <LayoutDashboardMenuItem
          v-for="item in dashboardMenuItems"
          :key="item.label"
          :item="item"
          @navigate="closeMobileSidebar"
        />
      </nav>

      <div class="dashboard-sidebar__mobile-user">
        <div class="dashboard-sidebar__user-info">
          <div class="dashboard-sidebar__avatar">
            {{ userInitials }}
          </div>
          <div class="dashboard-sidebar__user-text">
            <div class="dashboard-sidebar__user-email">{{ user?.email }}</div>
          </div>
        </div>
        <button
          class="dashboard-sidebar__logout"
          @click="handleLogoutMobile"
        >
          <UIcon name="i-heroicons-arrow-right-on-rectangle" class="w-5 h-5" />
        </button>
      </div>
    </LayoutMobileDrawer>
  </aside>
</template>

<script setup lang="ts">
import { dashboardMenuItems } from '~/config/navigation'

const { user, logout } = useAuth()
const route = useRoute()
const mobileOpen = useState('dashboardMobileSidebarOpen', () => false)

const userInitials = computed(() => {
  if (!user.value?.email) return '?'
  const email = user.value.email
  return email.charAt(0).toUpperCase()
})

const closeMobileSidebar = () => {
  mobileOpen.value = false
}

const handleLogout = async () => {
  await logout()
}

const handleLogoutMobile = async () => {
  closeMobileSidebar()
  await logout()
}

watch(() => route.fullPath, () => {
  closeMobileSidebar()
})
</script>

<style scoped>
.dashboard-sidebar__desktop {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 280px;
  background: var(--glass);
  backdrop-filter: blur(20px);
  border-right: 1px solid var(--border);
  flex-direction: column;
  padding: 1.5rem;
  z-index: 40;
  box-shadow: var(--nav-shadow);
}

@media (min-width: 768px) {
  .dashboard-sidebar__desktop {
    display: flex;
  }
}

.dashboard-sidebar__brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  margin-bottom: 2rem;
  padding: 0.5rem;
}

.dashboard-sidebar__logo {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: var(--accent-contrast);
  box-shadow: 0 4px 12px color-mix(in srgb, var(--accent) 40%, transparent);
  flex-shrink: 0;
}

.dashboard-sidebar__name {
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.dashboard-sidebar__nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  overflow-y: auto;
}

.dashboard-sidebar__controls {
  margin-bottom: 1.25rem;
}

.dashboard-sidebar__user {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 12px;
  background: var(--surface-muted);
  border: 1px solid var(--border);
  margin-top: 1rem;
}

.dashboard-sidebar__user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  min-width: 0;
}

.dashboard-sidebar__avatar {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--accent) 0%, var(--state-success) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--accent-contrast);
  flex-shrink: 0;
}

.dashboard-sidebar__user-text {
  flex: 1;
  min-width: 0;
}

.dashboard-sidebar__user-email {
  font-size: 0.875rem;
  color: var(--text-primary);
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dashboard-sidebar__logout {
  background: transparent;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.dashboard-sidebar__logout:hover {
  background: color-mix(in srgb, var(--text-primary) 8%, transparent);
  color: var(--text-primary);
}

.dashboard-sidebar__drawer-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.dashboard-sidebar__drawer-controls {
  margin: 1rem 0;
}

.dashboard-sidebar__mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.dashboard-sidebar__mobile-user {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 12px;
  background: var(--surface-muted);
  border: 1px solid var(--border);
  margin-top: 1rem;
}
</style>
