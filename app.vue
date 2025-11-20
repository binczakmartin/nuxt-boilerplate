<template>
  <div class="app-shell">
    <!-- Dashboard layout with sidebar -->
    <template v-if="isDashboard">
      <LayoutDashboardSidebar />
      <main class="dashboard-main">
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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:global(body) {
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background-color: #0a0f1e;
  color: #f8fafc;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:global(*) {
  box-sizing: border-box;
}

.app-shell {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(180deg, #0a0f1e 0%, #050a14 100%);
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
  width: min(1400px, 100%);
  margin: 0 auto;
  padding: clamp(1.5rem, 3vw, 3rem);
}

@media (max-width: 640px) {
  .app-content {
    padding: 1rem;
  }
}

/* Dashboard Layout */
.dashboard-main {
  flex: 1;
  padding: 2rem;
  margin-left: 0;
  min-height: 100vh;
}

@media (min-width: 1024px) {
  .dashboard-main {
    margin-left: 280px;
  }
}

@media (max-width: 1023px) {
  .dashboard-main {
    padding: 5rem 1.5rem 2rem;
  }
}
</style>
