<script setup lang="ts">
const { label } = defineProps<{
  label?: string
}>()

async function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  const files = input.files
  return files
}
</script>

<template>
  <label flex="~ col gap-1">
    <span v-if="label">{{ label }}</span>
    <input
      type="file"
      accept="video/*"
      cursor-pointer
      @change="onFileChange"
    >
  </label>
</template>
