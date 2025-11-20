<template>
  <div class="ui-input-wrapper">
    <label v-if="label" :for="inputId" class="ui-input__label">
      {{ label }}
    </label>
    <input
      :id="inputId"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :value="modelValue"
      class="ui-input"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])

const inputId = computed(() => `input-${Math.random().toString(36).substring(2, 9)}`)
</script>

<style scoped>
.ui-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.ui-input__label {
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(248, 250, 252, 0.85);
  letter-spacing: -0.01em;
}

.ui-input {
  width: 100%;
  padding: 0.875rem 1.125rem;
  border-radius: 10px;
  border: 1.5px solid rgba(255, 255, 255, 0.12);
  background: rgba(15, 23, 42, 0.5);
  color: #f8fafc;
  font-size: 0.9375rem;
  transition: all 0.2s ease;
  font-family: inherit;
}

.ui-input::placeholder {
  color: rgba(248, 250, 252, 0.4);
}

.ui-input:hover {
  border-color: rgba(255, 255, 255, 0.18);
  background: rgba(15, 23, 42, 0.7);
}

.ui-input:focus {
  outline: none;
  border-color: #667eea;
  background: rgba(15, 23, 42, 0.8);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

.ui-input:focus::placeholder {
  color: rgba(248, 250, 252, 0.3);
}
</style>
