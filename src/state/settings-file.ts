import type { SettingsFile } from '~/apis/settingsFile'
import type { VideoSource } from '~/types/settings'

export const videoSource = ref<VideoSource>({
  fileType: 'file',
  fileLocation: '',
  fps: 25,
})

export const settingsFile = shallowRef<SettingsFile>()
