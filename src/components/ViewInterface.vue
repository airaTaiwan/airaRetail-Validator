<script setup lang="ts">
import { Action, Editor, Shape } from '@airataiwan/editor'
import { useTemplateRef } from 'vue'
import type { ComponentExposed } from 'vue-component-type-helpers'
import { _historyShape } from '~/state/shape'

const EditorRef = useTemplateRef<ComponentExposed<typeof Editor>>('EditorRef')

const action = ref(_historyShape.value.length > 0 ? Action.Default : Action.Draw)
const shape = ref(Shape.Line)

function clear() {
  EditorRef.value?.reset()
  action.value = Action.Draw
}

watch(action, (newAction) => {
  if (newAction === Action.Default)
    action.value = Action.Draw
})
</script>

<template>
  <div flex="~ col gap-2" class="view-area">
    <div flex="~ items-center gap-2">
      <ToggleButton
        icon="i-mingcute-align-arrow-right-line"
        title="Line"
        :model-value="shape === Shape.Line"
        @click="shape = Shape.Line"
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
      <div pos-relative class="h-full" aspect-video>
        <img src="/example.png" h-full w-full>
        <Editor
          ref="EditorRef"
          v-model:history-shape="_historyShape"
          v-model:action="action"
          :shape
          allow-backspace-delete
          enable-dpi
          :polygon-options="{
            strokeStyle: 'red',
            lineWidth: 4,
          }"
          :line-options="{
            strokeStyle: 'blue',
            lineWidth: 4,
          }"
          absolute inset-0
        />
      </div>
    </div>
  </div>
</template>
