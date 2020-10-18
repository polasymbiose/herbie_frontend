import { useEffect, useState } from 'react'

export default function useWindowSize({ init = false }: { init?: boolean }) {
  const [height, setHeight] = useState<number>(0)
  const [width, setWidth] = useState<number>(0)

  const resizeHandler = () => {
    setHeight(window.innerHeight)
    setWidth(window.innerWidth)
  }

  const initHandler = () => {
    height === 0 && setHeight(window.innerHeight)
    width === 0 && setWidth(window.innerWidth)
  }


  
  useEffect(() => {
    initHandler()
    const handler = init ? initHandler : resizeHandler
    if (process.browser) {
      handler()
      window.addEventListener('resize', handler)
    }
    return () => {
      if (process.browser) {
        window.removeEventListener('resize', handler)
      }
    }
  }, [])

  return {
    width,
    height,
  }
}
