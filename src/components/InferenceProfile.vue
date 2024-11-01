<script setup lang="ts">
import { inferenceProfile } from '~/state/local-storage'
import { isProcess } from '~/state/process'

const emits = defineEmits(['start', 'stop'])

function onStart() {
  emits('start')
}

function onStop() {
  emits('stop')
}
</script>

<template>
  <Box class="inference-area" title="Inference Profile">
    <div class="flex gap-4">
      <div class="w-1/2 flex flex-col gap-2">
        <TextInput v-model.number="inferenceProfile.facialRecognitionThreshold" label="Facial Recognition Threshold" />
        <TextInput v-model.number="inferenceProfile.mergeFaceScore" label="Face Merge Score (0 - 1)" />
        <TextInput v-model.number="inferenceProfile.minFaceSize" label="Min Face Size (50 - 200)" />
        <TextInput v-model.number="inferenceProfile.faceAngleThreshold" label="Angle Threshold (0 - 45)" />
      </div>
      <div class="w-1/2 flex flex-col gap-2">
        <TextInput v-model.number="inferenceProfile.captureInterval" label="Capture Interval (ms)" />
        <TextInput v-model.number="inferenceProfile.objectDetectionThreshold" label="Object Detection Threshold" />
        <TextInput v-model.number="inferenceProfile.verificationLength" label="Verification Length (min.)" />
        <SimpleButton
          v-if="!isProcess"
          title="Start"
          color="bg-blue rounded text-white"
          class="mt-auto"
          @click="onStart"
        />
        <SimpleButton
          v-else
          title="Stop"
          color="bg-red rounded text-white"
          class="mt-auto"
          @click="onStop"
        />
      </div>
    </div>
  </Box>
</template>
