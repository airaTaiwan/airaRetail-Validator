import kyStandard, { type Options } from 'ky'

const { VITE_API_BASE_URL, VITE_API_BASE_PORT, VITE_API_PREFIX } = import.meta.env

function createTypedKyInstance(options?: Options) {
  const instance = kyStandard.create(options)

  return {
    get: <T>(url: string, options?: Options) => instance.get(url, options).json<{ data: T }>(),
    post: <T>(url: string, options?: Options) => instance.post(url, options).json<{ data: T }>(),
  }
}

const ky = createTypedKyInstance({
  prefixUrl: `${VITE_API_BASE_URL}:${VITE_API_BASE_PORT}/${VITE_API_PREFIX}`,
  timeout: 20 * 60 * 1000,
})

export default ky
