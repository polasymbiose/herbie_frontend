import cn from 'classnames/bind'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Link from 'next/link'
import { animated, useSpring, useTrail } from 'react-spring'
import useBodyClass from '../../hooks/useBodyClass'
import useWindowSize from '../../hooks/useWindowSize'
import s from './Menu.module.scss'
import { useTheme, useMediaQuery } from '@material-ui/core'
import { useRouter } from 'next/router'
import { rx_MenuIsOpen } from '../../App'
const cx = cn.bind(s)

const Menu = ({
  isOpen,
  setIsOpen,
  nav,
}: {
  isOpen: boolean
  setIsOpen: (bool: boolean) => void
  nav?: {
    path: string
    label: string
    infooter: boolean | null
    as: string
    href: string
    position: string
  }[]
}) => {
  const { width = 0, height = 0 } = useWindowSize({ init: false })
  // const location = useLocation()
  useBodyClass('noscroll', isOpen)
  const filteredNav =
    nav
      ?.filter((el) => !el.infooter)
      .sort((a, b) => parseFloat(a.position) - parseFloat(b.position)) || []
  const router = useRouter()
  const [mounted, setmounted] = useState(false)

  useEffect(() => {
    setmounted(true)
    rx_MenuIsOpen.next(false)
  }, [])

  const opener = useSpring({
    width: width,
    height: height,
    opacity: isOpen ? 1 : 0,
    clipPath: !isOpen ? 'inset(0% 0% 90% 90%)' : 'inset(0% 0% 0% 0%)',
    config: { tension: isOpen ? 2000 : 700, friction: 200, mass: 7 },
    delay: !isOpen ? 500 : 0,
  })

  const trail = useTrail(filteredNav.length, {
    from: {
      opacity: 0,
      x: 5,
      filter: 'blur(4px)',
    },
    opacity: isOpen ? 1 : 0,
    x: isOpen ? 0 : 5,
    filter: isOpen ? 'blur(0px)' : 'blur(2px)',
    delay: 120,
  })

  const closeMenu = (closeMenu: boolean) => () => {
    closeMenu && setIsOpen(false)
  }

  const css = cx({
    Menu: true,
    pointerEvents: !isOpen,
  })

  return (
    <React.Fragment>
      <nav className={css} style={{ width, height }}>
        <animated.div className={s.clipWrapper} style={opener}>
          <ul className={s.list}>
            {trail.map(({ x, ...rest }, index) => {
              const active =
                router.asPath === filteredNav[index].path ||
                (router.asPath.includes(filteredNav[index].path) && index !== 0)

              return (
                <animated.li
                  key={filteredNav[index].label}
                  className={s.listitem}
                  // @ts-ignore
                  style={{
                    ...rest,
                    transform: x.interpolate(
                      (x: any) => `translate3d(0,${x}px,0)`
                    ),
                  }}
                  onClick={closeMenu(index === 0)}
                >
                  <Link
                    key={filteredNav[index].label}
                    href={filteredNav[index].href}
                    as={filteredNav[index].as}
                  >
                    <div>
                      <MenuActiveItem isActive={active && isOpen} />
                      <h6 className={active ? s.active : ''}>
                        {filteredNav[index].label}
                      </h6>
                    </div>
                  </Link>
                </animated.li>
              )
            })}
          </ul>
        </animated.div>
      </nav>
    </React.Fragment>
  )
}

const MenuActiveItem = ({ isActive }: { isActive: boolean }) => {
  const theme = useTheme()
  const desktop = useMediaQuery(theme.breakpoints.up('sm'))

  const activeIndicator = useSpring({
    backgroundColor: !isActive ? '#282c34' : 'rgb(221,221,221)',
    opacity: isActive ? 1 : 0,
    width: !isActive ? 0 : desktop ? 80 : 20,
    config: { tension: 1000, friction: 100, mass: 10 },
    delay: isActive ? 0 : 0,
  })

  return (
    <div className={s.indicator}>
      <animated.div
        className={s.activeIndicator}
        style={activeIndicator}
      ></animated.div>
    </div>
  )
}

export default Menu
