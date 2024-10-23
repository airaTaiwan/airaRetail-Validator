<script setup lang="ts">
import { videoSource } from '~/state/settings-file'
import type { VideoSourceType } from '~/types/settings'

function updateVideoSource(newType: VideoSourceType) {
  if (newType === 'file') {
    videoSource.value = {
      fileType: 'file',
      fileLocation: '',
      fps: 25,
    }
  }
  else {
    videoSource.value = {
      fileType: 'rtsp',
      ipAddress: '',
      username: '',
      password: '',
      url: '',
      fps: 25,
    }
  }
}

const fileType = computed({
  get: () => videoSource.value.fileType,
  set: (newType: VideoSourceType) => {
    if (newType !== videoSource.value.fileType) {
      updateVideoSource(newType)
    }
  },
})
</script>

<template>
  <Box class="source-area" title="Video Source">
    <TextInput
      v-model="fileType"
      type="select"
    >
      <template #option>
        <option value="file">
          File
        </option>
        <option value="rtsp">
          RTSP
        </option>
      </template>
    </TextInput>
    <template v-if="videoSource.fileType === 'file'">
      <TextInput v-model="videoSource.fileLocation" label="File Location" />
      <TextInput v-model.number="videoSource.fps" label="FPS" />
    </template>
    <template v-else>
      <TextInput v-model="videoSource.ipAddress" label="IP address" />
      <TextInput v-model="videoSource.username" label="User" />
      <TextInput v-model="videoSource.password" label="Pass" />
      <TextInput v-model="videoSource.url" label="URL" />
      <TextInput v-model.number="videoSource.fps" label="FPS" />
    </template>
  </Box>
</template>
