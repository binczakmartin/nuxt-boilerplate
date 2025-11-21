<template>
  <div class="ui-card">
    <slot />
  </div>
</template>

<style scoped>
.ui-card {
  border: 1px solid var(--border);
  border-radius: 20px;
  background: var(--surface);
  backdrop-filter: blur(20px);
  box-shadow: var(--shadow-strong);
  padding: clamp(1.75rem, 3vw, 2.5rem);
  transition: all 0.3s ease;
}

.ui-card:hover {
  box-shadow: 0 12px 40px color-mix(in srgb, #000 35%, transparent);
  transform: translateY(-4px);
  border-color: var(--border-strong);
}

@media (max-width: 768px) {
  .ui-card {
    border-radius: 16px;
    padding: 1.5rem;
  }
}
</style>
