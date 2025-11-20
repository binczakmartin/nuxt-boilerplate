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
        <div class="app-navbar__actions">
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
            <NuxtLink to="/register" class="app-navbar__btn app-navbar__btn--primary">
              Get Started
            </NuxtLink>
          </template>
        </div>

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
            class="app-navbar__drawer-link app-navbar__drawer-link--primary"
            @click="closeDrawer"
          >
            Get Started
          </NuxtLink>
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
  background: rgba(10, 15, 30, 0.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.app-navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

/* Brand / Logo */
.app-navbar__brand {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.app-navbar__brand:hover {
  opacity: 0.85;
}

.app-navbar__logo {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  flex-shrink: 0;
}

.app-navbar__name {
  font-weight: 700;
  font-size: 1.125rem;
  color: #f8fafc;
  letter-spacing: -0.02em;
}

/* Desktop Navigation Links */
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
  color: rgba(248, 250, 252, 0.7);
  text-decoration: none;
  font-size: 0.9375rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.app-navbar__link:hover {
  color: #f8fafc;
  background: rgba(255, 255, 255, 0.05);
}

/* Desktop Auth Buttons */
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
  padding: 0.625rem 1.25rem;
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
  border-color: rgba(255, 255, 255, 0.12);
  color: rgba(248, 250, 252, 0.7);
}

.app-navbar__btn--ghost:hover {
  border-color: rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.05);
  color: #f8fafc;
}

.app-navbar__btn--secondary {
  background: rgba(15, 23, 42, 0.5);
  color: #f8fafc;
}

.app-navbar__btn--secondary:hover {
  background: rgba(15, 23, 42, 0.8);
  transform: translateY(-1px);
}

.app-navbar__btn--primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.app-navbar__btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.app-navbar__btn--primary:active {
  transform: translateY(0);
}

/* Mobile Burger Menu */
.app-navbar__burger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(15, 23, 42, 0.5);
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s ease;
}

.app-navbar__burger span {
  width: 18px;
  height: 2px;
  background: #f8fafc;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.app-navbar__burger:hover {
  background: rgba(15, 23, 42, 0.8);
  border-color: rgba(255, 255, 255, 0.18);
}

.app-navbar__burger:active {
  transform: scale(0.95);
}

@media (min-width: 768px) {
  .app-navbar__burger {
    display: none;
  }
}

/* Mobile Drawer Content */
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

.app-navbar__drawer-link {
  padding: 0.875rem 1rem;
  border-radius: 10px;
  color: rgba(248, 250, 252, 0.85);
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
  background: rgba(255, 255, 255, 0.06);
  color: #f8fafc;
}

.app-navbar__drawer-link--primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  text-align: center;
}

.app-navbar__drawer-link--primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.app-navbar__drawer-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 0.75rem 0;
}
</style>
