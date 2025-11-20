<template>
  <div class="dashboard-page">
    <h1>User Roles</h1>
    <p>Configure user roles and permissions</p>
    
    <div class="demo-cards">
      <UiCard>
        <h3>Admin</h3>
        <p>Full access to all features</p>
      </UiCard>
      <UiCard>
        <h3>Editor</h3>
        <p>Can edit and publish content</p>
      </UiCard>
      <UiCard>
        <h3>Viewer</h3>
        <p>Read-only access</p>
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
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.demo-cards h3 {
  margin: 0 0 0.5rem;
  color: #f8fafc;
}

.demo-cards p {
  margin: 0;
  font-size: 0.875rem;
}
</style>
