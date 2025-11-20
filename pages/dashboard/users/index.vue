<template>
  <div class="dashboard-page">
    <h1>Users</h1>
    <p>Manage all users in your application</p>
    
    <div class="demo-cards">
      <UiCard>
        <h3>Total Users</h3>
        <p style="font-size: 2rem; font-weight: 700; color: #22d3ee; margin-top: 0.5rem;">1,234</p>
      </UiCard>
      <UiCard>
        <h3>Active Today</h3>
        <p style="font-size: 2rem; font-weight: 700; color: #22c55e; margin-top: 0.5rem;">567</p>
      </UiCard>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
</script>

<style scoped>
.dashboard-page h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #f8fafc;
}

.dashboard-page p {
  color: rgba(248, 250, 252, 0.7);
  margin-bottom: 2rem;
}

.demo-cards {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.demo-cards h3 {
  margin: 0 0 0.5rem;
  color: #f8fafc;
}
</style>
