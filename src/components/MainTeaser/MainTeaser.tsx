import useCustomScrollPosition from '../../hooks/useCustomScrollPosition'
import cn from 'classnames/bind'
import React, { useEffect, useState } from 'react'
import { animated, useSpring } from 'react-spring'
import { BehaviorSubject } from 'rxjs'
import AnimatedArrow from '../AnimatedArrow/AnimatedArrow'
import { rx_ComponentHeights } from '../../hooks/useObservable'
import useWindowSize from '../../hooks/useWindowSize'
import s from './MainTeaser.module.scss'
import { useTheme, useMediaQuery } from '@material-ui/core'
const cx = cn.bind(s)

export const rx_Multiplier = new BehaviorSubject<number>(100)
export const rx_IsFooterHidden = new BehaviorSubject<boolean>(true)

const MainTeaser = ({
  imgSrc = '',
  headline = '',
  subHeadline = '',
  multiplier = 1,
  children,
  link,
  alt = 'herbie unverpackt berlin'
}: {
  imgSrc?: string
  alt?: string
  headline?: string
  subHeadline?: string
  multiplier?: number
  children?: React.ReactNode
  link?: React.ReactNode
  index: number
}) => {
  const { width = 100, height = 600 } = useWindowSize({init: true})

  const [stateHeight, setstateHeight] = useState(0)
  // const [position, setposition] = useState(0)
  const [loading, setloading] = useState(true)
  const [arrowIsVisible, setarrowIsVisible] = useState(false)
  const [ismounted, setismounted] = useState(false)
  const finalHeight = stateHeight * multiplier || 600
  const stiff = { tension: 1000, friction: 100, mass: 1 }
  const theme = useTheme()
  const desktop = useMediaQuery(theme.breakpoints.up('sm'))
  // const position = desktop ? useCustomScrollPosition() : 0
  const scrollposition = useCustomScrollPosition()
  const position = desktop ? scrollposition : 0
  const op = position <= stateHeight && stateHeight !== 0 ? (stateHeight - position * 2.4 ) / stateHeight : 0

  const { opacity, paddingTop } = useSpring({
    from: {
      paddingTop: 0,
      opacity: 0
    },
    opacity: op || 1,
    paddingTop: -position < stateHeight ? position * 0.2 : 0,
    // marginBottom: -position < height ? position * 0.5 : 0,
    config: stiff
  })

  useEffect(() => {
    stateHeight === 0 && setstateHeight(height)
  }, [height])
  
  useEffect(() => {
    rx_Multiplier.next(multiplier)
  }, [multiplier])

  // useEffect(() => {
  //   const cHeights = [...rx_ComponentHeights.value]
  //   cHeights[index] = height
  //   rx_ComponentHeights.next([...cHeights])
  // }, [height, index])

  useEffect(() => {
    setloading(true)
    rx_IsFooterHidden.next(true)
    setismounted(false)
  }, [imgSrc])

  useEffect(() => {
    rx_IsFooterHidden.next(true)
    setismounted(true)
  }, [])

  // show arrow delay
  useEffect(() => {
    let timer: any
    if (loading) {
      setarrowIsVisible(false)
    } else {
      timer = setTimeout(() => {
        setarrowIsVisible(true)
      }, 3000)
    }
    return () => {
      if (!loading) {
        clearTimeout(timer)
      }
    }
  }, [loading])

  const handleOnLoad = () => {
    setismounted(true)
    setloading(false)
    rx_IsFooterHidden.next(false)
  }

  const handleOnError = () => {
    rx_IsFooterHidden.next(false)
    setismounted(true)
  }


  const css = cx({
    floral: true,
    loaded: !loading
  })

  const mountCss = cx({
    textWrapper: true,
    ismounted
  })

  return (
    <div className={s.MainTeaser} style={{ height: finalHeight, width }}>
      <div className={css} style={{ height: finalHeight, width, backgroundImage: `url('/api/images?url=${imgSrc}')` }}>
        {children}
      </div>

      <div className={mountCss}>
        <animated.div style={{ opacity, paddingTop }}>
        <a className={s.startnext} href="https://www.startnext.com/herbie-unverpackt?utm_source=startnext&utm_medium=extwidget&utm_campaign=projectbutton&utm_term=projectpromo" title="Herbie Unverpackt, dein neuer Unverpackt-Laden in Berlin, unterstützen auf Startnext!" target="_blank"><img src="https://www.startnext.com/templates/platforms/startnext/themes/project/img/project_widget_btn_DE.png" alt="Unterstützen" /></a>
          <div dangerouslySetInnerHTML={{ __html: `<h1>${headline}</h1>` }} />
        </animated.div>
        <animated.div style={{ opacity }}>
          {subHeadline && <div dangerouslySetInnerHTML={{ __html: `<h2>${subHeadline}</h2>` }} />}
        </animated.div>
      </div>

      {link}

      <animated.div style={{ opacity }} className={s.arrow}>
        {arrowIsVisible && desktop && <AnimatedArrow />}
      </animated.div>
      <img style={{ display: 'none' }} src={`/api/images?url=${imgSrc}`} onLoad={handleOnLoad} onError={handleOnError} alt={alt}/>
    </div>
  )
}

export default MainTeaser
