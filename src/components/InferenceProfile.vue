<script setup lang="ts">
import { inferenceProfile } from '~/state/local-storage'
</script>

<template>
  <Box class="inference-area" title="Inference Profile">
    <TextInput v-model.number="inferenceProfile.captureInterval" label="Capture Interval" />
    <TextInput v-model.number="inferenceProfile.objectDetectionThreshold" label="Object Detection Threshold" />
    <TextInput v-model.number="inferenceProfile.facialRecognitionThreshold" label="Facial Recognition Threshold" />
    <TextInput v-model.number="inferenceProfile.verificationLength" label="Verification Length" />
  </Box>
</template>
