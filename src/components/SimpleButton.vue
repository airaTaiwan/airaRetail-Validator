<script setup lang="ts">
defineProps<{
  icon?: string
  color?: string
  title?: string
}>()
</script>

<template>
  <button
    :class="color || 'btn-simple-primary'"
    relative px2.5 py2 line-height-1em shadow
  >
    <span v-if="icon" :class="icon" />
    <slot :title="title">
      {{ title }}
    </slot>
  </button>
</template>
