import type { ProcedureParam } from '~/apis/procedure'

export const isProcess = ref<boolean>(false)

export const startTime = ref('')
export const endTime = ref('')

export const processParam = ref<ProcedureParam | null>(null)
