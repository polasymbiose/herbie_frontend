import cn from 'classnames/bind'
import React from 'react'
import s from './AnimatedArrow.module.scss'
const cx = cn.bind(s)

const AnimatedArrow = ({ hover = false, infinite= true }: { hover?: boolean, infinite?: boolean }) => {
  const css = cx({
    AnimatedArrow: true,
    hover,
    infinite
  })

  return (
    <div className={css}>
      <div className={s.wrapper}>
        <svg width="48px" height="26px" viewBox="0 0 492 492" version="1.1" className={s.arrow}>
          <g transform="scale(-2, 2)">
            <polygon
              fill={'#EFEBE9'}
              className={s.arrow}
              points="145.188 238.575, 360.688 23.075, 360.688 3.975, 341.588 3.975, 116.488 229.075, 116.488 248.175, 341.588 473.175, 351.088 477.175, 360.588 473.175, 360.588 454.075, 145.188 238.575"
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

export default AnimatedArrow
