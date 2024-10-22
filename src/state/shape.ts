import type { History } from '@airataiwan/editor'

export const _historyShape = useLocalStorage<History[]>('aira-retail-validator-shape', [], {
  mergeDefaults: true,
})
