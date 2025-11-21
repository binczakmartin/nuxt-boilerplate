<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div v-if="isOpen" class="mobile-drawer">
        <!-- Backdrop -->
        <div class="mobile-drawer__backdrop" @click="close" />
        
        <!-- Drawer Panel -->
        <div class="mobile-drawer__panel">
          <!-- Header with close button -->
          <div class="mobile-drawer__header">
            <slot name="header">
              <span class="mobile-drawer__title">Menu</span>
            </slot>
            <button
              class="mobile-drawer__close"
              aria-label="Close menu"
              @click="close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Drawer content -->
          <div class="mobile-drawer__content">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const close = () => {
  emit('close')
}

// Prevent body scroll when drawer is open
watch(() => props.isOpen, (isOpen) => {
  if (process.client) {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  }
})

// Clean up on unmount
onUnmounted(() => {
  if (process.client) {
    document.body.style.overflow = ''
  }
})

// Close on escape key
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.isOpen) {
      close()
    }
  }
  document.addEventListener('keydown', handleEscape)
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})
</script>

<style scoped>
.mobile-drawer {
  position: fixed;
  inset: 0;
  z-index: 100;
}

.mobile-drawer__backdrop {
  position: absolute;
  inset: 0;
  background: var(--overlay);
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease;
}

.mobile-drawer__panel {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(320px, 85vw);
  background: var(--surface);
  backdrop-filter: blur(20px);
  border-left: 1px solid var(--border);
  box-shadow: -8px 0 32px color-mix(in srgb, #000 45%, transparent);
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease;
}

@media (max-width: 768px) {
  .mobile-drawer__panel {
    left: 0;
    right: 0;
    width: 100vw;
    border-left: none;
    border-radius: 0;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.35);
  }
}

.mobile-drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border);
}

.mobile-drawer__title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
}

.mobile-drawer__close {
  background: transparent;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.mobile-drawer__close:hover {
  background: color-mix(in srgb, var(--text-primary) 8%, transparent);
  color: var(--text-primary);
}

.mobile-drawer__close:active {
  transform: scale(0.95);
}

.mobile-drawer__content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

/* Transitions */
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.2s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

.drawer-enter-active .mobile-drawer__panel,
.drawer-leave-active .mobile-drawer__panel {
  transition: transform 0.3s ease;
}

.drawer-enter-from .mobile-drawer__panel,
.drawer-leave-to .mobile-drawer__panel {
  transform: translateX(100%);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
