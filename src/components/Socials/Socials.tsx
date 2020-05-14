import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import React from 'react'
import s from './Socials.module.scss'

const Socials = () => {
  return (
    <div className={s.Socials}>

        <div className={s.wrapper}>
          <a
            href='https://www.instagram.com/makeoverbymey/'
            target='_blank'
            rel='noreferrer'
          >
            <InstagramIcon style={{ fontSize: 24, color: '#AA9FC1' }} />
          </a>
          <a
            href='https://www.facebook.com/Makeover-by-Mey-108240967449246/'
            target='_blank'
            rel='noreferrer'
          >
            <FacebookIcon style={{ fontSize: 24, color: '#AA9FC1' }} />
          </a>
        </div>
    </div>
  )
}

export default Socials
