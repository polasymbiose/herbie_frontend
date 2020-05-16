import React, { useState, useEffect } from 'react'
import { animated, useSpring } from 'react-spring'
import useWindowSize from '../../hooks/useWindowSize'
import { useObservable } from '../../hooks/useObservable'
import { rx_Multiplier } from '../MainTeaser/MainTeaser'
import s from './Burger.module.scss'
import { useTheme, useMediaQuery } from '@material-ui/core'

const Burger = ({ isOpen, position, hide = false }: { isOpen: boolean, position: number, hide: boolean }) => {
  const theme = useTheme()
  const desktop = useMediaQuery(theme.breakpoints.up('sm'))
  const first = useSpring({
    transform: isOpen
      ? 'translate(9px, 29px) rotate(-45deg)'
      : 'translate(2px, 11px) rotate(0deg)',
    width: !isOpen ? 40 : 30
  })

  const second = useSpring({
    transform: isOpen
      ? 'translate(13px, 8px) rotate(45deg)'
      : 'translate(2px, 19px) rotate(0deg)',
    width: !isOpen ? 40 : 30
  })

  const third = useSpring({
    transform: isOpen
      ? 'translate(9px, 29px) rotate(-45deg)'
      : 'translate(2px, 27px) rotate(0deg)',
    width: !isOpen ? 40 : 30
  })

  const corrector = desktop ? 16 : 16

  const { height = 100 } = useWindowSize({ init: false })
  const multiplier = useObservable(rx_Multiplier)
  const [Color1, setColor1] = useState(false)
  const [Color2, setColor2] = useState(false)
  const [Color3, setColor3] = useState(false)

  useEffect(() => {
    if (height > 0) { 
      setColor1(-position > height * multiplier - (8 + corrector)) // 28
      setColor2(-position > height * multiplier - (16 + corrector)) // 34
      setColor3(-position > height * multiplier - (20 + corrector)) // 40
    }
  }, [position, height])

  return (
    <div
      style={{
        padding: `${corrector}px`,
        cursor: 'pointer',
        pointerEvents: hide ? 'none' : 'all',
        opacity: hide ? 0 : 1
      }}
      className={s.Burger}
    >
      <svg
        width='40'
        height='32'
        viewBox='0 0 44 44'
        xmlns='http://www.w3.org/2000/svg'
      >
        <animated.rect
          width='40'
          height='3'
          rx='2'
          style={{ ...first }}
          fill={Color1 && !isOpen ? '#00251A' : '#fafafa'}
        />
        <animated.rect
          width='40'
          height='3'
          rx='2'
          style={{ ...second }}
          fill={Color2 && !isOpen ? '#00251A' : '#fafafa'}
        />
        <animated.rect
          width='40'
          height='3'
          rx='2'
          style={{ ...third }}
          fill={Color3 && !isOpen ? '#00251A' : '#fafafa'}
        />
      </svg>
    </div>
  )
}

export default Burger
