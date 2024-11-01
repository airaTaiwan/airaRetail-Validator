import type { InferenceProfile, LiveVideoSettings } from '~/types/settings'

export const liveVideoSettings = useLocalStorage<LiveVideoSettings>(
  'aira-retail-validator-live-video-settings',
  {
    liveView: false,
    ratio: 0.3,
  },
  {
    mergeDefaults: true,
  },
)

export const inferenceProfile = useLocalStorage<InferenceProfile>(
  'aira-retail-validator-inference-profile',
  {
    captureInterval: 1000,
    objectDetectionThreshold: 0.5,
    facialRecognitionThreshold: 0.5,
    mergeFaceScore: 0.8,
    faceAngleThreshold: 15,
    minFaceSize: 50,
    verificationLength: 10,
  },
  {
    mergeDefaults: true,
  },
)
