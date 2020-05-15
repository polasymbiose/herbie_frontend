import { useEffect, useRef, useState } from 'react'

const useCustomScrollPosition = () => {
  const [positionY, setpositionY] = useState(0)
  const getScrollPosition = () => {
    if (!process.browser) return { x: 0, y: 0 }
    return { x: window.scrollX, y: window.scrollY }
  }
  const position = useRef(getScrollPosition())

  const callBack = () => {
    const currPos = getScrollPosition()
    position.current = currPos
    setpositionY(currPos.y)
  }

  useEffect(() => {
    if (process.browser) {
      window.addEventListener('scroll', callBack)
    }

    return () => {
      if (process.browser) {
        window.removeEventListener('scroll', callBack)
      }
    }
  }, [])

  return positionY
}

// useCustomScrollPosition.defaultProps = {
//   deps: [],
//   element: false,
//   useWindow: false,
//   wait: null,
// }

export default useCustomScrollPosition
