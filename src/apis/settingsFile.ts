import type { Point } from '@airataiwan/utils'
import ky from '~/plugin/ky'

interface SettingsFileParam {
  crossLine: Point[]
}

export interface SettingsFile {
  param: SettingsFileParam[]
  manual: number
  faceCount: number
  lineCount: number
  faceRatio: number
  lineRatio: number
  timestamp: string
}

export async function getSettingsFile() {
  return ky.get<SettingsFile>('settingsFiles')
}

export async function insertSettingsFile(settings: string) {
  return ky.post<SettingsFile>('settingsFiles', {
    json: { settings },
  })
}
