<script setup lang="ts">
import dayjs from 'dayjs'
import { endTime, isProcess, startTime } from '~/state/process'
import { settingsFile } from '~/state/settings-file'

const emits = defineEmits(['save', 'import'])

const { VITE_WS_BASE_URL, VITE_WS_LINE_PORT, VITE_WS_FACE_PORT } = import.meta.env

const wsLine = ref<WebSocket | null>(null)
const wsFace = ref<WebSocket | null>(null)

const manual = ref(0)
const line = ref(0)
const face = ref(0)

const lineRatio = computed(() => !manual.value ? -1 : getRatio(line.value, manual.value))
const faceRatio = computed(() => !manual.value ? -1 : getRatio(face.value, manual.value))

const fileList = computed(() => settingsFile.value?.sort((a, b) => b.timestamp - a.timestamp))

function getRatio(data: number, base: number) {
  if (base === 0)
    return -1
  const ratio = Math.abs((data - base) / base) * 100
  return +((100 - ratio).toFixed(1))
}

function parseDate(date: number) {
  return dayjs(date).format('YYYY-MM-DD HH:mm')
}

function onSave() {
  emits('save', {
    manual: manual.value,
    faceCount: face.value,
    lineCount: line.value,
    faceRatio: faceRatio.value,
    lineRatio: lineRatio.value,
    timestamp: Date.now(),
  })
}

function onImport(idx: number) {
  const item = fileList.value?.[idx]
  if (item) {
    emits('import', item)
  }
}

watch(isProcess, (newVal, oldVal) => {
  if (newVal !== oldVal && newVal === true) {
    line.value = 0
    face.value = 0
  }
})

onMounted(() => {
  const host = process.env.NODE_ENV === 'development' ? VITE_WS_BASE_URL : `ws://${window.location.hostname}`
  wsLine.value = new WebSocket(`${host}:${VITE_WS_LINE_PORT}/cross-line`)

  wsLine.value.onmessage = () => {
    line.value += 1
  }

  wsFace.value = new WebSocket(`${host}:${VITE_WS_FACE_PORT}/face-detect`)

  wsFace.value.onmessage = () => {
    face.value += 1
  }
})

onBeforeUnmount(() => {
  wsLine.value?.close()
  wsFace.value?.close()
})
</script>

<template>
  <div class="result-area">
    <div class="mb-4 flex items-center gap-2">
      <div>Manual Count:</div>
      <TextInput v-model.number="manual" />
      <SimpleButton
        icon="i-mingcute-save-2-line"
        title="Save"
        class="ml-auto"
        :disabled="manual === 0"
        @click="onSave"
      />
    </div>
    <div class="mb-4 flex gap-4 text-lg">
      <div class="w-1/2">
        Start: <span class="text-bold text-xl text-blue">{{ startTime === '' ? '--' : startTime }}</span>
      </div>
      <div class="w-1/2">
        Stop: <span class="text-bold text-xl text-blue">{{ endTime === '' ? '--' : endTime }}</span>
      </div>
    </div>
    <div class="flex text-xl">
      <div class="w-1/2">
        Body
      </div>
      <div class="w-1/2">
        Face
      </div>
    </div>
    <div class="flex text-[3rem]">
      <div class="w-1/2 pl-4">
        {{ line }} / {{ manual }}
      </div>
      <div class="w-1/2 pl-4">
        {{ face }} / {{ manual }}
      </div>
    </div>
    <div class="mb-4 flex text-[3rem]">
      <div class="w-1/2 pl-4" :class="[lineRatio >= 85 ? 'text-green' : 'text-red']">
        {{ lineRatio < 0 ? 'N/A' : `${lineRatio}%` }}
      </div>
      <div class="w-1/2 pl-4" :class="[faceRatio >= 85 ? 'text-green' : 'text-red']">
        {{ faceRatio < 0 ? 'N/A' : `${faceRatio}%` }}
      </div>
    </div>

    <div class="h-[calc(100%-20rem)] flex flex-col gap-2 overflow-y-auto">
      <div v-for="(item, idx) in fileList" :key="idx" class="flex items-center gap-4 border rounded p-2">
        <!-- {{ item }} -->
        <div class="w-[calc(100%-4rem)] flex flex-col">
          <div class="flex items-center gap-2">
            <template v-if="item.param.source_type === 'file'">
              <span class="i-mingcute-folder-line w-8" />
              <div class="w-[calc(100%-1rem)] overflow-hidden text-ellipsis">
                {{ item.param.source_info }}
              </div>
            </template>
            <template v-else>
              <span class="i-mingcute-camcorder-line w-8" />
              <div class="w-[calc(100%-1rem)] overflow-hidden text-ellipsis">
                {{ item.param.ip }}
              </div>
            </template>
          </div>
          <div class="flex gap-4 pl-8">
            <div :class="[item.lineRatio >= 85 ? 'text-green' : 'text-red']">
              {{ item.lineRatio }}%
            </div>
            <div :class="[item.faceRatio >= 85 ? 'text-green' : 'text-red']">
              {{ item.faceRatio }}%
            </div>
            <div>{{ item.manual }}</div>
            <div class="ml-auto">
              {{ parseDate(item.timestamp) }}
            </div>
          </div>
        </div>
        <SimpleButton
          icon="i-mingcute-arrow-to-down-line"
          title=""
          @click="onImport(idx)"
        />
      </div>
    </div>
  </div>
</template>
