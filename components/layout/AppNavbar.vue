<template>
  <header class="app-navbar">
    <UContainer>
      <div class="app-navbar__inner">
        <!-- Logo + Brand -->
        <NuxtLink to="/" class="app-navbar__brand">
          <div class="app-navbar__logo">✦</div>
          <span class="app-navbar__name">MyApp</span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="app-navbar__nav">
          <NuxtLink
            v-for="link in publicNavLinks"
            :key="link.to"
            :to="link.to"
            class="app-navbar__link"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <!-- Auth Buttons (Desktop) -->
        <div class="app-navbar__actions app-navbar__desktop-right">
          <template v-if="user">
            <NuxtLink to="/dashboard" class="app-navbar__btn app-navbar__btn--secondary">
              Dashboard
            </NuxtLink>
            <button class="app-navbar__btn app-navbar__btn--ghost" @click="handleLogout">
              Logout
            </button>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="app-navbar__btn app-navbar__btn--ghost">
              Login
            </NuxtLink>
            <NuxtLink to="/register" class="app-navbar__btn app-navbar__btn--ghost">
              Register
            </NuxtLink>
          </template>
          <ThemeToggle class="app-__theme-toggle"/>
        </div>



        <div class="app-navbar__mobile-right">
          <ThemeToggle class="app-navbar__theme-toggle"/>
          <!-- Mobile Menu Button -->
          <button
            class="app-navbar__burger"
            aria-label="Toggle menu"
            @click="toggleDrawer"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

      </div>
    </UContainer>

    <!-- Mobile Drawer -->
    <LayoutMobileDrawer :is-open="drawerOpen" @close="closeDrawer">
      <template #header>
        <div class="app-navbar__drawer-brand">
          <div class="app-navbar__logo">✦</div>
          <span class="app-navbar__name">MyApp</span>
        </div>
      </template>

      <nav class="app-navbar__drawer-nav">
        <NuxtLink
          v-for="link in publicNavLinks"
          :key="link.to"
          :to="link.to"
          class="app-navbar__drawer-link"
          @click="closeDrawer"
        >
          {{ link.label }}
        </NuxtLink>

        <div class="app-navbar__drawer-divider" />

        <template v-if="user">
          <NuxtLink
            to="/dashboard"
            class="app-navbar__drawer-link"
            @click="closeDrawer"
          >
            Dashboard
          </NuxtLink>
          <button
            class="app-navbar__drawer-link"
            @click="handleLogoutMobile"
          >
            Logout
          </button>
        </template>

        <template v-else>
          <NuxtLink
            to="/login"
            class="app-navbar__drawer-link"
            @click="closeDrawer"
          >
            Login
          </NuxtLink>
          
          <NuxtLink
            to="/register"
            class="app-navbar__drawer-link"
            @click="closeDrawer"
          >
            Register
          </NuxtLink>
                  <div class="app-navbar__drawer-toggle">
        </div>
        </template>
      </nav>
    </LayoutMobileDrawer>
  </header>
</template>

<script setup lang="ts">
import { publicNavLinks } from '~/config/navigation'

const { user, logout } = useAuth()
const route = useRoute()
const drawerOpen = ref(false)

const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value
}

const closeDrawer = () => {
  drawerOpen.value = false
}

const handleLogout = async () => {
  await logout()
}

const handleLogoutMobile = async () => {
  closeDrawer()
  await logout()
}

// Close drawer on route change
watch(() => route.fullPath, () => {
  closeDrawer()
})
</script>

<style scoped>
.app-navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  padding: 1rem 0;
  background: var(--glass);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
  box-shadow: var(--nav-shadow);
}

.app-navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.app-navbar__brand {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.app-navbar__brand:hover {
  opacity: 0.9;
}

.app-navbar__logo {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  color: var(--accent-contrast);
  box-shadow: 0 4px 12px color-mix(in srgb, var(--accent) 40%, transparent);
  flex-shrink: 0;
}

.app-navbar__name {
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.app-navbar__nav {
  display: none;
  align-items: center;
  gap: 0.25rem;
}

@media (min-width: 768px) {
  .app-navbar__nav {
    display: flex;
  }
}

.app-navbar__link {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9375rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.app-navbar__link:hover {
  color: var(--text-primary);
  background: color-mix(in srgb, var(--text-primary) 8%, transparent);
}

.app-navbar__actions {
  display: none;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
}

@media (min-width: 768px) {
  .app-navbar__actions {
    display: flex;
  }
}

.app-navbar__btn {
  padding: 0.625rem 0.45rem;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.app-navbar__btn--ghost {
  background: transparent;
  /* border-color: var(--border); */
  color: var(--text-secondary);
}

.app-navbar__btn--ghost:hover {
  /* border-color: var(--border-strong); */
  /* background: color-mix(in srgb, var(--text-primary) 6%, transparent); */
  color: var(--text-primary);
}

.app-navbar__btn--secondary {
  background: var(--surface-muted);
  color: var(--text-primary);
  border-color: var(--border);
}

.app-navbar__btn--secondary:hover {
  background: color-mix(in srgb, var(--surface) 90%, transparent);
  transform: translateY(-1px);
}

.app-navbar__btn--primary {
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%);
  color: var(--accent-contrast);
  box-shadow: 0 4px 12px color-mix(in srgb, var(--accent) 30%, transparent);
}

.app-navbar__btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px color-mix(in srgb, var(--accent) 40%, transparent);
}

.app-navbar__btn--primary:active {
  transform: translateY(0);
}

.app-navbar__burger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface);
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s ease;
  color: var(--text-primary);
}

.app-navbar__burger span {
  width: 18px;
  height: 2px;
  background: currentColor;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.app-navbar__burger:hover {
  background: color-mix(in srgb, var(--surface) 90%, transparent);
  border-color: var(--border-strong);
}

.app-navbar__burger:active {
  transform: scale(0.95);
}

@media (min-width: 768px) {
  .app-navbar__burger {
    display: none;
  }
}

.app-navbar__theme-toggle {
  display: flex;
  align-items: center;
  padding: 0.25rem;
  border-radius: 8px;
  /* background: var(--surface); */
  color: var(--text-primary);
  transition: all 0.2s ease;
  padding-right: 15px;
}

.app-navbar__theme-toggle:hover {
  /* background: color-mix(in srgb, var(--surface) 90%, transparent); */
  /* border-color: var(--border-strong); */
}

.app-navbar__theme-toggle:active {
  transform: scale(0.95);
}

@media (min-width: 768px) {
  .app-navbar__theme-toggle {
    display: none;
  }
}

.app-navbar__mobile-right {
  display: flex;
  width: 100px;
  align-items: center;
}

@media (min-width: 768px) {
  .app-navbar__mobile-right {
    display: none;
    width: 0px;
    margin-left: 40px;
  }
}

.app-navbar__drawer-brand {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.app-navbar__drawer-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.app-navbar__drawer-toggle {
  margin: 0.25rem 0 0.75rem;
}

.app-navbar__drawer-link {
  padding: 0.875rem 1rem;
  border-radius: 10px;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s ease;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  text-align: left;
  width: 100%;
}

.app-navbar__drawer-link:hover {
  background: color-mix(in srgb, var(--text-primary) 8%, transparent);
  color: var(--text-primary);
}

.app-navbar__drawer-link--primary {
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%);
  color: var(--accent-contrast);
  font-weight: 600;
  box-shadow: 0 4px 12px color-mix(in srgb, var(--accent) 30%, transparent);
  text-align: center;
}

.app-navbar__drawer-link--primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px color-mix(in srgb, var(--accent) 35%, transparent);
}

.app-navbar__drawer-divider {
  height: 1px;
  background: var(--border);
  margin: 0.75rem 0;
}
</style>
