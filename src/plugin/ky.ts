import kyStandard, { type Options } from 'ky'

const { VITE_API_BASE_URL, VITE_API_BASE_PORT, VITE_API_PREFIX } = import.meta.env

function createTypedKyInstance(options?: Options) {
  const instance = kyStandard.create(options)

  return {
    get: <T>(url: string, options?: Options) => instance.get(url, options).json<{ data: T }>(),
    post: <T>(url: string, options?: Options) => instance.post(url, options).json<{ data: T }>(),
  }
}

const host = process.env.NODE_ENV === 'development' ? VITE_API_BASE_URL : `http://${window.location.hostname}`

const ky = createTypedKyInstance({
  prefixUrl: `${host}:${VITE_API_BASE_PORT}/${VITE_API_PREFIX}`,
  timeout: 20 * 60 * 1000,
})

export default ky
