<template>
  <div class="auth-form-header">
    <h2 class="auth-form-title">{{ title }}</h2>
    <p class="auth-form-subtitle">
      <slot name="subtitle" />
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.auth-form-header {
  margin-bottom: 2rem;
}

.auth-form-title {
  font-size: 1.875rem;
  color: #f8fafc;
  margin: 0 0 0.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.auth-form-subtitle {
  color: rgba(248, 250, 252, 0.6);
  margin: 0;
  font-size: 0.9375rem;
}

.auth-form-subtitle :deep(a) {
  color: #22d3ee;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  border-bottom: 1.5px solid transparent;
}

.auth-form-subtitle :deep(a:hover) {
  color: #22c55e;
  border-bottom-color: #22c55e;
}
</style>
