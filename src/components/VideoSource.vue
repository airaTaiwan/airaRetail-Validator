<script setup lang="ts">
import { imgObj, videoSource } from '~/state/settings-file'
import type { VideoSourceType } from '~/types/settings'

const videoRef = ref<any>(null)
const canvasRef = ref<any>(null)

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

function onUploadVideo(event: any) {
  if (videoSource.value.fileType === 'file' && canvasRef.value && videoRef.value) {
    const ctx = canvasRef.value.getContext('2d') as CanvasRenderingContext2D
    const file = event.target.files[0]

    videoSource.value.fileLocation = file.name

    const url = URL.createObjectURL(file)
    videoRef.value.src = url
    videoRef.value.load()

    videoRef.value.onloadedmetadata = () => {
      canvasRef.value.width = videoRef.value.videoWidth
      canvasRef.value.height = videoRef.value.videoHeight

      videoRef.value.currentTime = 10
    }

    videoRef.value.onseeked = () => {
      ctx.drawImage(videoRef.value, 0, 0, canvasRef.value.width, canvasRef.value.height)
      imgObj.value.imgSrc = canvasRef.value.toDataURL('image/png')
      imgObj.value.width = canvasRef.value.width
      imgObj.value.height = canvasRef.value.height

      URL.revokeObjectURL(url)
    }
  }
}

function onUploadImage(event: any) {
  const file = event.target.files[0]
  const reader = new FileReader()

  reader.onload = (e) => {
    const img = new Image()
    img.src = e.target.result as string

    img.onload = () => {
      imgObj.value.imgSrc = img.src
      imgObj.value.width = img.width
      imgObj.value.height = img.height
    }
  }

  reader.readAsDataURL(file)
}
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
      <div class="flex">
        <input type="file" accept="video/*" class="w-1/2" @change="onUploadVideo">
        <input type="file" accept="image/*" class="w-1/2" @change="onUploadImage">
      </div>
      <TextInput v-model="videoSource.fileLocation" label="File Location (請補上完整路徑)" />
      <TextInput v-model.number="videoSource.fps" label="FPS" />
      <video ref="videoRef" style="display: none;" controls />
      <canvas ref="canvasRef" style="display: none;" />
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
