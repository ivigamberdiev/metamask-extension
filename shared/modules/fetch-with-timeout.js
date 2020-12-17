import { memoize } from 'lodash'

const getFetchWithTimeout = memoize((timeout = 30000) => {
  return async function _fetch(url, opts) {
    const abortController = new window.AbortController()
    const abortSignal = abortController.signal
    const f = window.fetch(url, {
      ...opts,
      signal: abortSignal,
    })

    const timer = setTimeout(() => abortController.abort(), timeout)

    try {
      const res = await f
      clearTimeout(timer)
      return res
    } catch (e) {
      clearTimeout(timer)
      throw e
    }
  }
})

export default getFetchWithTimeout
