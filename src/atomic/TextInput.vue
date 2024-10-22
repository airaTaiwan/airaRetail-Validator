<script setup lang="ts">
const { label, type, inputClass, disabled, placeholder } = defineProps<{
  label?: string
  type?: 'input' | 'textarea' | 'select'
  inputClass?: string
  disabled?: boolean
  placeholder?: string
}>()

const modelValue = defineModel<string | number | boolean>('modelValue')
</script>

<template>
  <label flex="~ col gap-1">
    <span v-if="label" color-base>{{ label }}</span>
    <textarea
      v-if="type === 'textarea'"
      v-model="modelValue as string"
      :placeholder="placeholder ?? label"
      box-input
      :class="inputClass"
      :disabled
    />
    <select
      v-else-if="type === 'select'"
      v-model="modelValue"
      :placeholder="placeholder ?? label"
      select-custom
      dark:select-custom-dark
      box-input
      :class="[inputClass]"
      :disabled="disabled"
    >
      <slot name="option" />
    </select>
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
