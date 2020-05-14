import { Grid } from '@material-ui/core'
import cn from 'classnames/bind'
import React from 'react'
// import { useComponentHeight } from '../../hooks/useComponentDimensions'
import Button from '../Button/Button'
import s from './HeadlineTeaser.module.scss'
import showdown from 'showdown'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

const cx = cn.bind(s)

const HeadlineTeaser = ({
  headline,
  background = false,
  link,
  text,
  html = false,
  paddingBottomS = false,
}: {
  headline: string
  background?: boolean
  link?: any
  text: string
  html: boolean
  paddingBottomS: boolean
  index: number
}) => {
  const css = cx({
    HeadlineTeaser: true,
    backgroundColor: background,
    paddingBottomS,
  })
  const router = useRouter()
  // const ref = useComponentHeight(index)
  const converter = new showdown.Converter()
  const parsedHtml = converter.makeHtml(text)
  const [cookies, setCookie] = useCookies(['mbm'])

  const show = () => {
    setCookie('mbm', { ...cookies.mbm, isSet: false }, { path: '/' })
  }

  return (
    <div className={css}>
      <Grid container justify='center' spacing={0}>
        <Grid item xs={10} sm={8} md={6}>
          <div>
            <div dangerouslySetInnerHTML={{ __html: `<h2>${headline}</h2>` }} />
            {router.asPath === '/datenschutz' && (
              <div style={{ marginBottom: 32 }}>
                <Button
                  label={'Auswahl ändern'}
                  handler={show}
                  black
                  containerStyle={{ marginTop: 32 }}
                />
              </div>
            )}
            <div>
              {html ? (
                <div dangerouslySetInnerHTML={{ __html: text }} />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: parsedHtml }} />
              )}
            </div>
            {link && (
              <Button
                label={link.label}
                link={link.link}
                black
                containerStyle={{ marginTop: 56 }}
              />
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default HeadlineTeaser
