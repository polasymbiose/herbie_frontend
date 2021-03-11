import { Grid } from '@material-ui/core'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import React from 'react'
import s from './Footer.module.scss'
import { rx_IsFooterHidden } from '../MainTeaser/MainTeaser'
import { useObservable } from '../../hooks/useObservable'
import Link from 'next/link'

const Footer = (props: any) => {
  const isHidden = useObservable(rx_IsFooterHidden)

  if (isHidden) {
    return null
  }

  return (
    <div className={s.Footer}>
      <Grid container justify='center'>
        <Grid item xs={10} sm={10} md={8} className={s.innerBox}>
          <Grid container spacing={2} justify={'center'}>
            <Grid item xs={12} sm={10} md={6}>
              <ul>
                <li>Herbie Unverpackt GmbH</li>
                <li>Mo-Mi &amp; Fr-Sa 12 - 19 Uhr // Di-Do 11 - 20 Uhr</li>
                <li>&nbsp;</li>
                <li>Elbestraße 19</li>
                <li>12045 Berlin</li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={10} md={6}>
              <ul>
                <li>
                  <a href='mailto:info@herbie-unverpackt.de'>
                    info@herbie-unverpackt.de
                  </a>
                </li>
              </ul>
              <div className={s.footerend}>
              <div className={s.social}>
                <a
                  href='https://www.instagram.com/herbieunverpackt/'
                  target='_blank'
                  rel='noreferrer'
                >
                  <InstagramIcon style={{ fontSize: 26 }} />
                </a>
                <a
                  href='https://www.facebook.com/Herbie-Unverpackt-101424224898669/'
                  target='_blank'
                  rel='noreferrer'
                >
                  <FacebookIcon style={{ fontSize: 26 }} />
                </a>
              </div>
              <div className={s.right}>
                {props.nav
                  ?.filter((item: any) => item.infooter === true)
                  .map((item: any) => {
                    return (
                      <div key={`footer-${item.path}`}>
                        <Link
                          href={`${item.path}`}
                          as={`${item.path}`}
                          shallow={true}
                        >
                          <a>{item.label}</a>
                        </Link>
                      </div>
                    )
                  })}
              </div>
            </div>
          </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Footer
