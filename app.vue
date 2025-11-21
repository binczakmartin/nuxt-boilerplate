<template>
  <div class="app-shell">
    <!-- Dashboard layout with sidebar -->
    <template v-if="isDashboard">
      <LayoutDashboardSidebar />
      <main class="dashboard-main">
        <LayoutDashboardMobileNavbar />
        <LayoutBreadcrumb />
        <NuxtPage />
      </main>
    </template>

    <!-- Public pages layout with navbar -->
    <template v-else>
      <LayoutAppNavbar />
      <main class="app-main">
        <div class="app-content">
          <NuxtPage />
        </div>
      </main>
    </template>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// Determine if we're on a dashboard page
const isDashboard = computed(() => {
  return route.path.startsWith('/dashboard')
})
</script>

<style scoped>
:global(body) {
  background: var(--page-gradient);
  color: var(--text-primary);
}

.app-shell {
  position: relative;
  min-height: 100vh;
  background: var(--page-gradient);
  background-attachment: fixed;
}

/* Public Pages Layout */
.app-main {
  position: relative;
  z-index: 1;
  padding: 0;
  min-height: calc(100vh - 80px);
}

.app-content {
  width: 100%;
  margin: 0 auto;
  /* padding: clamp(1.5rem, 3vw, 3rem); */
}

@media (max-width: 640px) {
  .app-content {
    padding: 1rem;
  }
}

/* Dashboard Layout */
.dashboard-main {
  flex: 1;
  padding: 1.5rem 2rem 2rem;
  margin-left: 0;
  min-height: 100vh;
}

@media (min-width: 768px) {
  .dashboard-main {
    margin-left: 280px;
  }
}

@media (max-width: 768px) {
  .dashboard-main {
    padding: 1.5rem 1.5rem 2rem;
  }
}
</style>
