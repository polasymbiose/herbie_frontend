import { useEffect, useState, useMemo } from 'react'

function useMedia(queries: any, values: any, defaultValue: any) {
  // const match = () => values[queries.findIndex((q: any) => matchMedia(q).matches)] || defaultValue
  const match = useMemo(() => defaultValue, [defaultValue, queries, values])
  const [value, set] = useState(match)
  useEffect(() => {
    let handler
    if (process.browser) {
      handler = () => set(match)
      window.addEventListener('resize', handler)
    }
    return () => {
      if (process.browser && handler) {
        window.removeEventListener('resize', handler)
      }
    }
  }, [match])
  return value
}

export default useMedia