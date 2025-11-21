<template>
  <button
    class="theme-toggle"
    type="button"
    :aria-label="ariaLabel"
    @click="toggleTheme"
  >
    <span class="theme-toggle__icon">
      <UIcon
        v-if="isDark"
        name="i-heroicons-moon-20-solid"
        class="w-5 h-5"
      />
      <UIcon
        v-else
        name="i-heroicons-sun-20-solid"
        class="w-5 h-5"
      />
    </span>
    <span v-if="withLabel" class="theme-toggle__label">
      {{ isDark ? 'Dark' : 'Light' }}
    </span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  withLabel: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  }
})

const { isDark, toggleTheme } = useTheme()

const ariaLabel = computed(() => {
  if (props.label) return props.label
  return `Switch to ${isDark.value ? 'light' : 'dark'} mode`
})
</script>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  /* padding: 0.5rem 0.75rem; */
  border-radius: var(--radius);
  /* border: 1px solid var(--border);
  background: var(--surface-muted); */
  color: var(--text-primary);
  cursor: pointer;
  /* transition: all 0.2s ease; */
  /* box-shadow: var(--shadow-soft); */
}

.theme-toggle:hover {
  border-color: var(--border-strong);
  /* background: color-mix(in srgb, var(--surface) 90%, transparent); */
}

.theme-toggle:active {
  transform: translateY(1px);
}

.theme-toggle__icon {
  display: grid;
  place-items: center;
  width: 1.25rem;
  height: 1.25rem;
  color: var(--text-primary);
}

.theme-toggle__label {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .theme-toggle {
    box-shadow: none;
  }
}
</style>
