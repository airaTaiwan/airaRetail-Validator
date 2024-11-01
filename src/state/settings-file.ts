import type { SettingsFile } from '~/apis/settingsFile'
import type { ImageObj, VideoSource } from '~/types/settings'

export const imgObj = ref<ImageObj>({
  width: 0,
  height: 0,
  imgSrc: '',
})

export const videoSource = ref<VideoSource>({
  fileType: 'file',
  fileLocation: '',
  fps: 25,
})

export const settingsFile = shallowRef<SettingsFile[]>()
