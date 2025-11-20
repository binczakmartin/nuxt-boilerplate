<template>
  <div class="auth-wrapper">
    <div class="auth-glow" :style="{ '--glow-position': glowPosition }" />
    <UContainer>
      <div class="auth-grid">
        <section class="auth-panel">
          <slot name="panel" />
        </section>

        <UiCard class="auth-form-card">
          <slot name="form" />
        </UiCard>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
defineProps({
  glowPosition: {
    type: String,
    default: 'right' // 'right' or 'left'
  }
})
</script>

<style scoped>
.auth-wrapper {
  position: relative;
  min-height: 100vh;
  padding: clamp(2rem, 6vw, 5rem) 0;
}

.auth-glow {
  display: none;
}

.auth-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr));
  gap: clamp(2.5rem, 5vw, 5rem);
  align-items: center;
}

.auth-panel {
  color: rgba(248, 250, 252, 0.75);
  max-width: 36rem;
}

@media (max-width: 768px) {
  .auth-panel {
    order: 2;
  }

  .auth-form-card {
    order: 1;
  }
}
</style>
