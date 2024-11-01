import type { Point } from '@airataiwan/utils'
import ky from '~/plugin/ky'
import { processParam } from '~/state/process'

export interface ProcedureParam {
  showVideo: boolean
  ratio: number
  source_type: string
  source_info: string
  fps: number
  ip: string
  port: number
  user: string
  pass: string
  captureInterval: number
  faceDetect: {
    detectionThreshold: number
    mergeScore: number
    roi: Point[]
    angleThreshold: number
    minFaceSize: number
  }
  crossLine: {
    objectDetectThreshold: number
    start: Point
    end: Point
    crossDirection: string
  }
}

export async function startProcedure(param: ProcedureParam) {
  processParam.value = param
  return ky.post<ProcedureParam>('validations/start', {
    json: { ...param },
  })
}

export async function stopProcedure() {
  return ky.post<undefined>('validations/stop')
}
