import { useMediaQuery, useTheme } from '@material-ui/core'
import { CSSProperties } from '@material-ui/core/styles/withStyles'
import cn from 'classnames/bind'
import Link from 'next/link'
import React from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import s from './Logo.module.scss'
const cx = cn.bind(s)

const Logos = ({
  menuIsOpen,
  position = 0,
}: {
  menuIsOpen: boolean
  position?: number
}) => {
  const { height = 1 } = useWindowSize({ init: true })
  const theme = useTheme()
  const desktop = useMediaQuery(theme.breakpoints.up('sm'))

  const cHeight = (height + position - 61) * -1
  const leave = `inset(0px 0px ${desktop ? cHeight + 24 : cHeight - 16}px 0px)`
  const css = cx({
    Logos: true,
    openMenu: menuIsOpen,
  })

  return (
    <div className={css}>
      <div className={s.LogoWrapper} style={{ clipPath: leave }}>
        <Link href={'/'} as={'/'} shallow={true}>
          <a>
            <img src={'/images/herbie_logo_stretch.png'} alt={'Herbie unverpackt Logo' } className={s.flower}/>
            <img src={'/images/herbie-schriftzug.jpg'} alt={'Herbie unverpackt Logo' } className={s.herbie}/>
          </a>
        </Link>
      </div>
    </div>
  )
}


export default Logos
