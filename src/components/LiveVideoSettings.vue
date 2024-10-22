<script setup lang="ts">
import { liveVideoSettings } from '~/state/local-storage'
</script>

<template>
  <Box class="settings-area" title="Live Video Setting">
    <TextInput v-model="liveVideoSettings.liveView" type="select" label="Live view">
      <template #option>
        <option :value="true">
          TRUE
        </option>
        <option :value="false">
          FALSE
        </option>
      </template>
    </TextInput>
    <TextInput v-model.number="liveVideoSettings.ratio" type="select" label="Ratio">
      <template #option>
        <option :value="0.3">
          0.3
        </option>
        <option :value="0.4">
          0.4
        </option>
        <option :value="0.5">
          0.5
        </option>
        <option :value="1">
          1
        </option>
      </template>
    </TextInput>
  </Box>
</template>
