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
