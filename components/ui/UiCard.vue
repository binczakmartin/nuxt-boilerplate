<template>
  <div class="ui-card">
    <slot />
  </div>
</template>

<style scoped>
.ui-card {
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  padding: clamp(1.75rem, 3vw, 2.5rem);
  transition: all 0.3s ease;
}

.ui-card:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.12);
}

@media (max-width: 640px) {
  .ui-card {
    border-radius: 16px;
    padding: 1.5rem;
  }
}
</style>
