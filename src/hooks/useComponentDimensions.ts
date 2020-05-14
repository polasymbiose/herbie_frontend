import { useObservable, rx_ComponentHeights } from './useObservable';
import { useEffect } from 'react'
// @ts-ignore
import useDimensions from 'react-use-dimensions';

export const useComponentDimensions = () => {
    const heights = useObservable(rx_ComponentHeights)

    useEffect(() => {
      console.log('heights', heights)
  }, [heights])
}


export const useComponentHeight = (index: number) => {
  const [ref, { height }] = useDimensions()

  useEffect(() => {
    const cHeights = [...rx_ComponentHeights.value]
    cHeights[index] = height
    rx_ComponentHeights.next([...cHeights])
  }, [height, index])

  return ref
}
