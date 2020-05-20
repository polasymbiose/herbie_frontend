import React, { CSSProperties } from 'react'
import s from './Button.module.scss'
import cn from 'classnames/bind'
import Link from 'next/link'
const cx = cn.bind(s)

const Button = ({
  label = 'button',
  style = {},
  containerStyle = {},
  link = '/',
  round = false,
  invert = false,
  black = false,
  handler,
  disabled = false
}: {
  label?: string
  style?: CSSProperties
  containerStyle?: CSSProperties
  link?: string
  round?: boolean
  invert?: boolean
  black?: boolean
  disabled?: boolean
  handler?: () => void
}) => {
  const css = cx({
    Button: true,
    round,
    invert,
    black,
    disabled
  })

  const customHandler = (e: any) => {
    e.preventDefault()
    handler?.()
  }

  return (
    <div className={css} style={{ marginTop: 80, ...containerStyle }}>
      <button style={{ ...style }}>
        {handler ? (
          <a onClick={customHandler}  style={{ ...style, border: '0px solid black' }}>{label}</a>
        ) : (
          <Link href={link} as={link} shallow={true}>
            <a>
          {/* <Link href={link} style={{ ...style, border: '0px solid black' }}> */}
            {label}
            </a>
          </Link>
        )}
      </button>
    </div>
  )
}

export default Button
