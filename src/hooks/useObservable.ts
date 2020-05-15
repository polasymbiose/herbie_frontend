import { useEffect, useState } from 'react'
import { BehaviorSubject } from 'rxjs'

export const rx_ComponentHeights = new BehaviorSubject<number[]>([])

export const useObservable = <T>(behaviorSubject: BehaviorSubject<T>) => {
  const [state, setState] = useState<T>(behaviorSubject.value)

  useEffect(() => {
    const subscription = behaviorSubject.subscribe(value => {
      setState(value)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [behaviorSubject])

  return state
}
