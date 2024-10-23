export interface LiveVideoSettings {
  liveView: boolean
  ratio: number
}

export interface InferenceProfile {
  captureInterval: number
  objectDetectionThreshold: number
  facialRecognitionThreshold: number
  verificationLength: number
}

export type VideoSourceType = 'file' | 'rtsp'

export type VideoSource =
  | (VideoSourceFileOptions & { fileType: 'file' })
  | (VideoSourceRTSPOptions & { fileType: 'rtsp' })

export interface VideoSourceFileOptions {
  fileLocation: string
  fps: number
}

export interface VideoSourceRTSPOptions {
  ipAddress: string
  username: string
  password: string
  url: string
  fps: number
}
