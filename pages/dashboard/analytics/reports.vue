<template>
  <div class="dashboard-page">
    <h1>Analytics - Reports</h1>
    <p>This is a demo sub-page for Analytics > Reports</p>
    
    <div class="demo-cards">
      <UiCard>
        <h3>Revenue Report</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </UiCard>
      <UiCard>
        <h3>User Report</h3>
        <p>Sed do eiusmod tempor incididunt ut labore et dolore.</p>
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
