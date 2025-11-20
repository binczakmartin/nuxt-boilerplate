<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'ui-button',
      `ui-button--${variant}`,
      { 'ui-button--loading': loading, 'ui-button--block': block }
    ]"
  >
    <svg
      v-if="loading"
      class="ui-button__spinner"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps({
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button'
  },
  variant: {
    type: String as PropType<'primary' | 'ghost' | 'solid'>,
    default: 'primary'
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 10px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  font-size: 0.9375rem;
  border: 1px solid transparent;
  transition: all 0.2s ease;
  cursor: pointer;
  text-decoration: none;
}

.ui-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ui-button--block {
  width: 100%;
}

.ui-button--primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.ui-button--primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.ui-button--primary:active:not(:disabled) {
  transform: translateY(0);
}

.ui-button--ghost {
  background: transparent;
  border-color: rgba(0, 0, 0, 0.15);
  color: #6b7280;
}

.ui-button--ghost:hover:not(:disabled) {
  border-color: rgba(0, 0, 0, 0.25);
  background: #f8f9fa;
  color: #111827;
}

.ui-button--solid {
  background: #111827;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.ui-button--solid:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.ui-button--solid:active:not(:disabled) {
  transform: translateY(0);
}

.ui-button__spinner {
  animation: spin 1s linear infinite;
  width: 1.25rem;
  height: 1.25rem;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
