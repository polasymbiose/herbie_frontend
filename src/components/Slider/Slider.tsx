import cn from 'classnames/bind'
import dynamic from 'next/dynamic'
import React from 'react'
import { rx_isGalleryOpen } from '../../hooks/useGalleryIsOpen'
import { useObservable } from '../../hooks/useObservable'
import { host } from '../../helper/fetch'
import useWindowSize from '../../hooks/useWindowSize'
import AltSlider from './AltSlider'
import s from './Slider.module.scss'
const Header = dynamic(import('../Header/Header'), { ssr: false })

const cx = cn.bind(s)

const Slider = ({ data }: { data: any }) => {
  const { width, height } = useWindowSize({ init: false })
  const galleryIndex = useObservable(rx_isGalleryOpen)
  const css = cx({
    Slider: true,
    active: rx_isGalleryOpen.value !== -1,
  })

  const handleClose = () => {
    rx_isGalleryOpen.next(-1)
  }

  const altImages = data.map((img: any) => ({
    src: `${host()}/${img.XL?.url || img.XS?.url}`,
    data: img,
  }))
  return (
    <div className={css} style={{ width, height }}>
      <Header
        isOpen={galleryIndex !== -1}
        setIsOpen={handleClose}
        hide={false}
      />
      <div className={s.curtain} style={{ width: width }}>
        {/* @ts-ignore */}
        <AltSlider imgs={altImages} handleClose={handleClose} />
      </div>
    </div>
  )
}

export default Slider
