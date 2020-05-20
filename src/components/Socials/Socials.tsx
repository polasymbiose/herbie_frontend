import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import React from 'react'
import s from './Socials.module.scss'
import { useTheme, useMediaQuery } from '@material-ui/core'

const Socials = () => {
  const theme = useTheme()
  const desktop = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <div className={s.Socials}>

        <div className={s.wrapper}>
          <a
            href='https://www.instagram.com/herbieunverpackt/'
            target='_blank'
            rel='noreferrer'
          >
            <InstagramIcon style={{ fontSize: desktop ? 34 : 24, color: '#AA9FC1' }} />
          </a>
          <a
            href='https://www.facebook.com/Herbie-Unverpackt-101424224898669/'
            target='_blank'
            rel='noreferrer'
          >
            <FacebookIcon style={{ fontSize: desktop ? 34 : 24, color: '#AA9FC1' }} />
          </a>
        </div>
    </div>
  )
}

export default Socials
