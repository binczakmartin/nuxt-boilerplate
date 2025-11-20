<template>
  <div class="dashboard-menu-item">
    <!-- Parent Item (clickable if has no children, expandable if has children) -->
    <component
      :is="item.to && !item.children ? 'NuxtLink' : 'button'"
      :to="item.to"
      :class="[
        'dashboard-menu-item__link',
        {
          'dashboard-menu-item__link--active': isActive,
          'dashboard-menu-item__link--has-children': hasChildren,
        }
      ]"
      @click="handleClick"
    >
      <UIcon v-if="item.icon" :name="item.icon" class="dashboard-menu-item__icon" />
      <span class="dashboard-menu-item__label">{{ item.label }}</span>
      
      <!-- Expand/Collapse Icon for items with children -->
      <svg
        v-if="hasChildren"
        :class="['dashboard-menu-item__chevron', { 'dashboard-menu-item__chevron--open': isExpanded }]"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M6 6l4 4 4-4" />
      </svg>
    </component>

    <!-- Children (Sub-items) -->
    <Transition name="expand">
      <div v-if="hasChildren && isExpanded" class="dashboard-menu-item__children">
        <LayoutDashboardMenuItem
          v-for="child in item.children"
          :key="child.label"
          :item="child"
          @navigate="handleChildNavigate"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { DashboardMenuItem as MenuItem } from '~/config/navigation'

interface Props {
  item: MenuItem
}

const props = defineProps<Props>()
const emit = defineEmits<{
  navigate: []
}>()

const route = useRoute()
const isExpanded = ref(false)

const hasChildren = computed(() => {
  return props.item.children && props.item.children.length > 0
})

const isActive = computed(() => {
  if (!props.item.to) return false
  
  // Exact match for non-nested items
  if (props.item.to === route.path) return true
  
  // For parent items with children, check if any child is active
  if (hasChildren.value) {
    return props.item.children?.some(child => child.to === route.path) || false
  }
  
  return false
})

// Auto-expand if a child is currently active
watchEffect(() => {
  if (hasChildren.value && isActive.value) {
    isExpanded.value = true
  }
})

const handleClick = () => {
  if (hasChildren.value) {
    // Toggle expansion for items with children
    isExpanded.value = !isExpanded.value
  } else {
    // Emit navigate event for leaf items
    emit('navigate')
  }
}

const handleChildNavigate = () => {
  emit('navigate')
}
</script>

<style scoped>
.dashboard-menu-item__link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  color: rgba(248, 250, 252, 0.7);
  text-decoration: none;
  font-size: 0.9375rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;
  width: 100%;
  text-align: left;
}

.dashboard-menu-item__link:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #f8fafc;
}

.dashboard-menu-item__link--active {
  background: rgba(102, 126, 234, 0.15);
  color: #667eea;
  border-color: rgba(102, 126, 234, 0.2);
}

.dashboard-menu-item__link--has-children {
  position: relative;
}

.dashboard-menu-item__icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.dashboard-menu-item__label {
  flex: 1;
}

.dashboard-menu-item__chevron {
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.dashboard-menu-item__chevron--open {
  transform: rotate(180deg);
}

/* Children Container */
.dashboard-menu-item__children {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  padding-left: 2rem;
  margin-top: 0.25rem;
  overflow: hidden;
}

.dashboard-menu-item__children .dashboard-menu-item__link {
  font-size: 0.875rem;
  padding: 0.625rem 1rem;
}

/* Expand/Collapse Transition */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
