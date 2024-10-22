<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div border-base rounded-lg bg-gray:20 p-4 dark:bg-gray:5>
    <h3 mb-4 text="sm gray-500" font-bold>
      {{ title }}
    </h3>
    <div flex="~ col gap-2">
      <slot />
    </div>
  </div>
</template>
