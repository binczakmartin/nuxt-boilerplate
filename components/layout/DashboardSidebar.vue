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

    <!-- Mobile Toggle Button -->
    <button
      class="dashboard-sidebar__mobile-toggle"
      aria-label="Toggle sidebar"
      @click="toggleMobileSidebar"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 12h18M3 6h18M3 18h18" />
      </svg>
    </button>

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
const mobileOpen = ref(false)

const userInitials = computed(() => {
  if (!user.value?.email) return '?'
  const email = user.value.email
  return email.charAt(0).toUpperCase()
})

const toggleMobileSidebar = () => {
  mobileOpen.value = !mobileOpen.value
}

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
</script>

<style scoped>
/* Desktop Sidebar */
.dashboard-sidebar__desktop {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 280px;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  flex-direction: column;
  padding: 1.5rem;
  z-index: 40;
}

@media (min-width: 1024px) {
  .dashboard-sidebar__desktop {
    display: flex;
  }
}

/* Brand */
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  flex-shrink: 0;
}

.dashboard-sidebar__name {
  font-weight: 700;
  font-size: 1.25rem;
  color: #f8fafc;
  letter-spacing: -0.02em;
}

/* Navigation */
.dashboard-sidebar__nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  overflow-y: auto;
}

/* User Section */
.dashboard-sidebar__user {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
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
  background: linear-gradient(135deg, #22d3ee 0%, #22c55e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 700;
  color: #0a0f1e;
  flex-shrink: 0;
}

.dashboard-sidebar__user-text {
  flex: 1;
  min-width: 0;
}

.dashboard-sidebar__user-email {
  font-size: 0.875rem;
  color: rgba(248, 250, 252, 0.85);
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
  color: rgba(248, 250, 252, 0.6);
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.dashboard-sidebar__logout:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #f8fafc;
}

/* Mobile Toggle */
.dashboard-sidebar__mobile-toggle {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 45;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(16px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f8fafc;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
}

.dashboard-sidebar__mobile-toggle:hover {
  background: rgba(15, 23, 42, 1);
  border-color: rgba(255, 255, 255, 0.18);
}

.dashboard-sidebar__mobile-toggle:active {
  transform: scale(0.95);
}

@media (min-width: 1024px) {
  .dashboard-sidebar__mobile-toggle {
    display: none;
  }
}

/* Mobile Drawer Specific Styles */
.dashboard-sidebar__drawer-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
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
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  margin-top: 1rem;
}
</style>
