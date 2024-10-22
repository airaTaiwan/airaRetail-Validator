<script setup lang="ts">
const { label, type, inputClass, disabled, placeholder } = defineProps<{
  label?: string
  type?: 'input' | 'textarea'
  inputClass?: string
  disabled?: boolean
  placeholder?: string
}>()

const modelValue = defineModel<string>('modelValue')
</script>

<template>
  <label flex="~ col gap-1">
    <span v-if="label" op75>{{ label }}</span>
    <textarea
      v-if="type === 'textarea'"
      v-model="modelValue"
      :placeholder="placeholder ?? label"
      box-input
      :class="inputClass"
      :disabled
    />
    <input
      v-else
      v-model="modelValue"
      :placeholder="placeholder ?? label"
      box-input
      :class="inputClass"
      :disabled
    >
  </label>
</template>
