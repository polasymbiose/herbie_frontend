import React from 'react'
import s from './BoxTeaser.module.scss'
import { Grid } from '@material-ui/core'
import Button from '../Button/Button'
import showdown from 'showdown'

const BoxTeaser = ({
  imgSrc,
  headline,
  link,
  text
}: {
  imgSrc: string
  headline?: string
  link?: any
  index: number
  text: string
}) => {

  const converter = new showdown.Converter()
  const parsedHtml = converter.makeHtml(text)

  return (
    <div className={s.BoxTeaser}>
      <Grid container justify="center" alignItems="stretch" alignContent="center" spacing={0}>
        <Grid item xs={12} sm={10} md={10} lg={8}>
          <div className={s.wrapper}>
            <Grid container justify="center" alignItems="stretch" alignContent="center" spacing={0}>
              <Grid item xs={12} sm={6}>
                <img src={`/api/images?url=${imgSrc}`} alt="herbie unverpackt"/>
                <div className={s.background} style={{ backgroundImage: `url('/api/images?url=${imgSrc}')` }}></div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className={s.innerBox}>
                  {headline && (
                    <div>
                      <h2>{headline}</h2>
                    </div>
                  )}
                  <div dangerouslySetInnerHTML={{ __html: parsedHtml }} />
                  {link && <Button label={link.label} link={link.link} />}
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default BoxTeaser
