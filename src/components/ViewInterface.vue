<script setup lang="ts">
import { Action, Editor, Shape } from '@airataiwan/editor'
import { _historyShape } from '~/state/shape'

const action = ref(_historyShape.value.length > 0 ? Action.Default : Action.Draw)

watch(action, (newAction) => {
  if (newAction === Action.Default)
    action.value = Action.Draw
})
</script>

<template>
  <div class="view-area">
    <div aspect-w-4 aspect-h-3 relative overflow-hidden>
      <img src="/example.png" h-full w-full object-cover>
      <Editor
        v-model:history-shape="_historyShape"
        v-model:action="action"
        allow-backspace-delete
        enable-dpi
        :shape="Shape.Polygon"
        :polygon-options="{
          strokeStyle: 'red',
          lineWidth: 4,
        }"
      />
    </div>
  </div>
</template>
