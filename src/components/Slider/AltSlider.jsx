import cn from 'classnames/bind'
import dynamic from "next/dynamic";
import React, { useEffect, useState } from 'react'
import {useRouter} from 'next/router'
import useGalleryIsOpen from  '../../hooks/useGalleryIsOpen'
import { animated, useSprings } from 'react-spring'
import { rx_isGalleryOpen } from '../../hooks/useGalleryIsOpen'
import { useObservable } from '../../hooks/useObservable'
import { useDrag } from 'react-use-gesture'
import s from './Slider.module.scss'
const Header = dynamic(import('../Header/Header'), {ssr: false});
import { host } from '../../helper/fetch'
const cx = cn.bind(s)

const AltSlider = ({ imgs, handleClose }) => {
  const [indexstate, setindexstate] = useState(0)
  const galleryIndex = useObservable(rx_isGalleryOpen)
  const [springProps, setSpring] = useSprings(imgs.length, i => ({
    opacity: 1
  }))

  useEffect(() => {  
    changeSlide(galleryIndex)
  }, [galleryIndex])

  const indexCorr = index => {
    return index < 0 ? imgs.length - 1 : imgs.length <= index ? 0 : index
  }

  const handleHistory = (newindex) => {
    const newstate = indexCorr(newindex)
    changeSlide(newstate)
  }

  const changeSlide = (newindex = 0) => {
    const newstate = indexCorr(newindex)
    setSpring(i => {
      if (i < newstate || i > newstate) return { opacity: 0 }
      return { opacity: i !== newstate ? 0 : 1 }
    })
    setindexstate(newindex)
  }

  return (
    <div className={s.AltSlider}>
  
      {/* <Header isOpen={galleryIndex !== -1} setIsOpen={handleClose} /> */}
      {springProps.map(({ opacity }, i) => (
        <animated.div key={i} style={{ opacity }}>
          <div
            className={s.background}
            style={{
              backgroundImage: `url(/api/images?url=${imgs[i].data.XL?.url || imgs[i].data.XS?.url})`,
              backgroundSize: 'contain'
            }}
          />
        </animated.div>
      ))}
      <div className={s.arrows}>
        <div
          className={cx({ disabled: indexstate - 1 < 0, rotate: true })}
          onClick={() => {
            indexstate - 1 >= 0 && handleHistory(indexstate - 1)
          }}
        >
          <Arrow />
        </div>
        <div
          className={cx({ disabled: indexstate + 1 > imgs.length - 1 })}
          onClick={() => {
            indexstate + 1 <= imgs.length - 1 && handleHistory(indexstate + 1)
          }}
        >
          <Arrow />
        </div>
      </div>
    </div>
  )
}

const Arrow = () => {
  return (
    <svg width="96px" height="52px" viewBox="0 0 200 1000" version="1.1" className={s.arrow}>
      <g transform="scale(-2, 2)">
        <polygon
          fill={'#F7F5F4'}
          className={s.arrow}
          points="145.188 238.575, 360.688 23.075, 360.688 3.975, 341.588 3.975, 116.488 229.075, 116.488 248.175, 341.588 473.175, 351.088 477.175, 360.588 473.175, 360.588 454.075, 145.188 238.575"
        />
      </g>
    </svg>
  )
}

export default AltSlider
