import { useCallback, useEffect, useRef } from 'react'
import { BehaviorSubject } from 'rxjs'
import { useRouter } from 'next/router'

const rx_prevRouteMatch = new BehaviorSubject('')

const useLocationChange = (handler: (path: string) => void) => {
  const match = useRouter()
  const prevLocation = useRef(rx_prevRouteMatch.value)
  const memoHandler = useCallback(
    (path:string ) => {
      handler(path)
    },
    [handler]
  );
  useEffect(() => {

    if (match.pathname !== prevLocation.current) {
      memoHandler(match.pathname)
      prevLocation.current = match.pathname
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match])
}

export default useLocationChange
