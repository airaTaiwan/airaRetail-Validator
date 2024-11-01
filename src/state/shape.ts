import type { History } from '@airataiwan/editor'
import type { Point } from '@airataiwan/utils'

interface LineShape {
  start: Point
  end: Point
  crossDirection?: string
}

export const _historyShape = useLocalStorage<History[]>('aira-retail-validator-shape', [], {
  mergeDefaults: true,
})

export const lineShape = ref<LineShape | null>(null)
export const polygonShape = ref<Point[]>([])
