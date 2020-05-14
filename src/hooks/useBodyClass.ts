import { useEffect } from 'react'

const useBodyClass = (className: string, mod = true) => {
  useEffect(() => {
    if (process.browser) {
      mod
        ? document.body.classList.add(className)
        : document.body.classList.remove(className)
    }
    return () => {
      if (process.browser) {
        document.body.classList.remove(className)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mod, process])
}

export default useBodyClass
