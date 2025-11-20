<template>
  <div class="dashboard-page">
    <h1>Analytics - Insights</h1>
    <p>This is a demo sub-page for Analytics > Insights</p>
    
    <div class="demo-cards">
      <UiCard>
        <h3>Key Metric</h3>
        <p>Ut enim ad minim veniam, quis nostrud exercitation.</p>
      </UiCard>
      <UiCard>
        <h3>Trend Analysis</h3>
        <p>Duis aute irure dolor in reprehenderit in voluptate.</p>
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
