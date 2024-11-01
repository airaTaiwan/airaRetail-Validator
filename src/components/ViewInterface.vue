<script setup lang="ts">
import type { History } from '@airataiwan/editor'
import type { ComponentExposed } from 'vue-component-type-helpers'
import { Action, Editor, Shape } from '@airataiwan/editor'
import { useTemplateRef } from 'vue'
import { imgObj } from '~/state/settings-file'
import { _historyShape, lineShape, polygonShape } from '~/state/shape'

const EditorRef = useTemplateRef<ComponentExposed<typeof Editor>>('EditorRef')
const ImageRef = useTemplateRef<HTMLImageElement>('ImageRef')

const action = ref(_historyShape.value.length > 0 ? Action.Default : Action.Draw)
const shape = ref(Shape.LineWithArrow)

const showShape = computed(() => {
  const result = []
  if (lineShape.value) {
    result.push({
      type: 'LineWithArrow',
      points: [
        {
          x: lineShape.value.start.x / imgObj.value.width * ImageRef.value?.clientWidth,
          y: lineShape.value.start.y / imgObj.value.height * ImageRef.value?.clientHeight,
        },
        {
          x: lineShape.value.end.x / imgObj.value.width * ImageRef.value?.clientWidth,
          y: lineShape.value.end.y / imgObj.value.height * ImageRef.value?.clientHeight,
        },
      ],
    })
  }

  if (polygonShape.value.length !== 0) {
    result.push({
      type: 'Polygon',
      points: polygonShape.value.map(point => ({
        x: point.x / imgObj.value.width * ImageRef.value?.clientWidth,
        y: point.y / imgObj.value.height * ImageRef.value?.clientHeight,
      })),
    })
  }

  return result
})

function clear() {
  EditorRef.value?.reset()
  lineShape.value = null
  polygonShape.value = []
  action.value = Action.Draw
}

watch(imgObj, (obj) => {
  if (obj.imgSrc !== '') {
    EditorRef.value?.reset()
    action.value = Action.Draw
  }
}, { deep: true })

watch(action, (newAction) => {
  if (newAction === Action.Default)
    action.value = Action.Draw
})

function handleDrawDone(data: History) {
  const width = ImageRef.value?.clientWidth || 1
  const height = ImageRef.value?.clientHeight || 1

  if (data.type === 'LineWithArrow') {
    const [start, end] = data.points
    lineShape.value = {
      start: {
        x: (start.x / width) * imgObj.value.width,
        y: (start.y / height) * imgObj.value.height,
      },
      end: {
        x: (end.x / width) * imgObj.value.width,
        y: (end.y / height) * imgObj.value.height,
      },
    }
  }

  if (data.type === 'Polygon') {
    polygonShape.value = data.points.map(point => ({
      x: (point.x / width) * imgObj.value.width,
      y: (point.y / height) * imgObj.value.height,
    }))
  }
}

onMounted(() => {
  EditorRef.value?.reset()
})
</script>

<template>
  <div flex="~ col gap-2" class="view-area">
    <div v-if="imgObj.imgSrc !== ''" flex="~ items-center gap-2">
      <ToggleButton
        icon="i-mingcute-align-arrow-right-line"
        title="Line"
        :model-value="shape === Shape.LineWithArrow"
        @click="shape = Shape.LineWithArrow"
      />
      <ToggleButton
        icon="i-mingcute-rectangle-line"
        title="Polygon"
        :model-value="shape === Shape.Polygon"
        @click="shape = Shape.Polygon"
      />
      <SimpleButton
        icon="i-mingcute-delete-3-line"
        title="Clear"
        @click="clear"
      />
    </div>
    <div relative flex-1 overflow-hidden>
      <div pos-relative>
        <img v-if="imgObj.imgSrc !== ''" ref="ImageRef" :src="imgObj.imgSrc">
        <Editor
          ref="EditorRef"
          v-model:history-shape="showShape"
          v-model:action="action"
          :shape
          enable-dpi
          :polygon-options="{
            strokeStyle: 'red',
            lineWidth: 4,
          }"

          :line-with-arrow-options="{
            strokeStyle: 'blue',
            fillStyle: 'blue',
            lineWidth: 4,
          }"
          absolute inset-0
          @save="handleDrawDone"
        />
      </div>
    </div>
  </div>
</template>
