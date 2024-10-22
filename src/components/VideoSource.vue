<script setup lang="ts">
const videoSource = ref({
  file: null,
  fileLocation: '',
  FPS: 60,
})
</script>

<template>
  <Box class="source-area" title="Video Source">
    <FileInput label="Video File" />
    <TextInput v-model="videoSource.fileLocation" label="File Location" />
    <TextInput v-model.number="videoSource.FPS" label="FPS" />
  </Box>
</template>
