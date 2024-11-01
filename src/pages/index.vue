<script setup lang="ts">
import dayjs from 'dayjs'
import { startProcedure, stopProcedure } from '~/apis/procedure'
import { insertSettingsFile } from '~/apis/settingsFile'
import { inferenceProfile, liveVideoSettings } from '~/state/local-storage'
import { endTime, isProcess, processParam, startTime } from '~/state/process'
import { settingsFile, videoSource } from '~/state/settings-file'
import { _historyShape, lineShape, polygonShape } from '~/state/shape'

defineOptions({
  name: 'IndexPage',
})

const timer = ref(null)

async function onSave(data: any) {
  if (processParam.value) {
    const { message } = await insertSettingsFile({
      param: processParam.value,
      ...data,
    })
    if (message === 'success' && settingsFile.value) {
      settingsFile.value = [
        ...settingsFile.value,
        {
          param: processParam.value,
          ...data,
        },
      ]
    }
  }
}

async function onStart() {
  const result = await startProcedure({
    showVideo: liveVideoSettings.value.liveView,
    ratio: liveVideoSettings.value.ratio,
    source_type: videoSource.value.fileType,
    source_info: videoSource.value?.fileLocation || videoSource.value?.url || '',
    fps: videoSource.value.fps,
    ip: videoSource.value?.ipAddress || '',
    port: videoSource.value?.port || 80,
    user: videoSource.value?.username || '',
    pass: videoSource.value?.password || '',
    captureInterval: inferenceProfile.value.captureInterval,
    faceDetect: {
      detectionThreshold: inferenceProfile.value.facialRecognitionThreshold,
      mergeScore: inferenceProfile.value.mergeFaceScore,
      angleThreshold: inferenceProfile.value.faceAngleThreshold,
      minFaceSize: inferenceProfile.value.minFaceSize,
      roi: polygonShape.value,
    },
    crossLine: {
      objectDetectThreshold: inferenceProfile.value.objectDetectionThreshold,
      start: lineShape.value.end,
      end: lineShape.value.start,
    },
  })

  startTime.value = dayjs().format('YYYY-MM-DD HH:mm')

  console.log(result)

  timer.value = setTimeout(() => {
    onStop()
    if (timer.value)
      clearTimeout(timer.value)
  }, inferenceProfile.value.verificationLength * 60 * 1000)

  isProcess.value = true
}

async function onStop() {
  const result = await stopProcedure()
  console.log(result)
  endTime.value = dayjs().format('YYYY-MM-DD HH:mm')
  isProcess.value = false
}

function onImport(item: any) {
  const { param } = item
  liveVideoSettings.value.liveView = param.showVideo
  liveVideoSettings.value.ratio = param.ratio
  videoSource.value.fileType = param.source_type
  videoSource.value.fps = param.fps

  if (videoSource.value.fileType === 'file') {
    videoSource.value.fileLocation = param.source_info
    videoSource.value.url = ''
    videoSource.value.ipAddress = ''
    videoSource.value.port = 80
    videoSource.value.user = ''
    videoSource.value.pass = ''
  }
  else {
    videoSource.value.url = param.source_info
    videoSource.value.fileLocation = ''
    videoSource.value.ipAddress = param.ip
    videoSource.value.port = param.port
    videoSource.value.user = param.user
    videoSource.value.pass = param.pass
  }

  inferenceProfile.value.captureInterval = param.captureInterval
  inferenceProfile.value.facialRecognitionThreshold = param.faceDetect.detectionThreshold
  inferenceProfile.value.objectDetectionThreshold = param.crossLine.objectDetectThreshold
  inferenceProfile.value.mergeFaceScore = param.faceDetect.mergeScore
  inferenceProfile.value.faceAngleThreshold = param.faceDetect.angleThreshold
  inferenceProfile.value.minFaceSize = param.faceDetect.minFaceSize
  polygonShape.value = param.faceDetect.roi
  lineShape.value = {
    start: param.crossLine.end,
    end: param.crossLine.start,
    crossDirection: param.crossLine.crossDirection,
  }
}

onUnmounted(() => {
  if (timer.value) {
    clearTimeout(timer.value)
  }
})
</script>

<template>
  <LiveVideoSettings />
  <VideoSource />
  <InferenceProfile @start="onStart" @stop="onStop" />
  <ViewInterface />
  <ResultInterface @save="onSave" @import="onImport" />
</template>
