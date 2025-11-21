<template>
  <header class="dashboard-mobile-nav">
    <div class="dashboard-mobile-nav__left">
      <button
        class="dashboard-mobile-nav__menu"
        type="button"
        aria-label="Open dashboard menu"
        @click="openSidebar"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      <!-- <div class="dashboard-mobile-nav__badge">
        <UIcon name="i-heroicons-home-20-solid" class="dashboard-mobile-nav__icon" />
        <span class="dashboard-mobile-nav__label">{{ currentLabel }}</span>
      </div> -->
    </div>

    <ThemeToggle class="dashboard-mobile-nav__theme" />
  </header>
</template>

<script setup lang="ts">
import { getBreadcrumbLabel } from '~/config/breadcrumb'

const route = useRoute()
const mobileOpen = useState('dashboardMobileSidebarOpen', () => false)

const openSidebar = () => {
  mobileOpen.value = true
}

const currentLabel = computed(() => {
  const pathSegments = route.path.split('/').filter(Boolean)
  if (pathSegments.length === 0) return 'Dashboard'

  const currentPath = `/${pathSegments.join('/')}`
  const customLabel = getBreadcrumbLabel(currentPath)
  if (customLabel) return customLabel

  const lastSegment = pathSegments[pathSegments.length - 1]
  return lastSegment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
})
</script>

<style scoped>
.dashboard-mobile-nav {
  display: none;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 1.25rem;
  margin: -1.5rem -1.5rem 1.25rem;
  position: sticky;
  top: 0;
  z-index: 60;
  background:var(--bg-page);
  border-bottom: 1px solid color-mix(in srgb, var(--border) 80%, transparent);
  box-shadow: var(--nav-shadow);
  backdrop-filter: blur(12px);
  /* border-radius: 0 0 20px 20px; */
}

@media (max-width: 768px) {
  .dashboard-mobile-nav {
    display: flex;
  }
}

.dashboard-mobile-nav__left {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.dashboard-mobile-nav__menu {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  border: 1px solid color-mix(in srgb, var(--border) 80%, transparent);
  background: color-mix(in srgb, var(--surface) 70%, transparent 30%);
  color: var(--text-primary);
  display: grid;
  place-items: center;
  cursor: pointer;
  /* box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35); */
  transition: all 0.2s ease;
}

.dashboard-mobile-nav__menu:hover {
  transform: translateY(-1px);
  border-color: color-mix(in srgb, var(--border-strong) 80%, transparent);
}

.dashboard-mobile-nav__menu:active {
  transform: scale(0.97);
}

.dashboard-mobile-nav__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 0.9rem;
  background: color-mix(in srgb, var(--surface-muted) 80%, transparent);
  border-radius: 12px;
  border: 1px solid color-mix(in srgb, var(--border) 90%, transparent);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}

.dashboard-mobile-nav__icon {
  width: 20px;
  height: 20px;
  color: var(--text-primary);
}

.dashboard-mobile-nav__label {
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}

.dashboard-mobile-nav__theme {
  padding: 0.5rem;
  border-radius: 12px;
  /* border: 1px solid color-mix(in srgb, var(--border) 90%, transparent); */
  /* background: color-mix(in srgb, var(--surface) 75%, transparent); */
  /* box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3); */
}

@media (max-width: 768px) {
  .dashboard-mobile-nav {
    /* margin: -1.5rem -1rem 1.25rem; */
  }

  .dashboard-mobile-nav__label {
    font-size: 0.98rem;
  }
}
</style>
