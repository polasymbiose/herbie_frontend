import cn from 'classnames/bind'
import React from 'react'
import s from './Button.module.scss'
const cx = cn.bind(s)

const RoundButton = ({
  label = 'RoundButton',
  handler,
  invert = false
}: {
  label?: string
  handler: () => void
  invert?: boolean
}) => {
  const css = cx({
    Button: true,
    round: true,
    invert
  })

  return (
    <div className={css} onClick={handler}>
      <button>{label}</button>
    </div>
  )
}

export default RoundButton
