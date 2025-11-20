<template>
  <div class="dashboard-page">
    <h1>Settings</h1>
    <p>Configure your application settings</p>
    
    <div class="demo-cards">
      <UiCard>
        <h3>Profile Settings</h3>
        <p>Update your personal information</p>
      </UiCard>
      <UiCard>
        <h3>Notifications</h3>
        <p>Manage email and push notifications</p>
      </UiCard>
      <UiCard>
        <h3>Security</h3>
        <p>Password and two-factor authentication</p>
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

.demo-cards p {
  margin: 0;
  font-size: 0.9375rem;
}
</style>
