import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useObservable } from './useObservable'
import { BehaviorSubject } from 'rxjs'

export const rx_isGalleryOpen = new BehaviorSubject(-1)

const useGalleryIsOpen = () => {
  // const [open, setopen] = useState(false)
  

  // useEffect(() => {
  //   const isOpen = router.query.image !== undefined
  //   setopen(isOpen)
  // }, [router])

  return open
}

export default useGalleryIsOpen
