import {
  Snackbar,
  Switch,
  SnackbarContent,
  Collapse,
  FormControlLabel,
  useTheme,
  useMediaQuery
} from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import cn from 'classnames/bind'
import Button from '../Button/Button'
import s from './CookieBar.module.scss'
import { useCookies } from 'react-cookie'
import Link from 'next/link'
const cx = cn.bind(s)

const CookieBar = () => {
  const [settings, setsettings] = useState(true)
  const [cookies, setCookie] = useCookies(['mbm'])
  const theme = useTheme()
  const desktop = useMediaQuery(theme.breakpoints.up('sm'))

  useEffect(() => {
    console.log('cookies.mbm', cookies.mbm)
    cookies.mbm === undefined &&
      setCookie('mbm', {
        analytics: false,
        isSet: false
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies])

  const toggleanalytics = () => {
    setCookie(
      'mbm',
      { ...cookies.mbm, analytics: !cookies.mbm.analytics },
      { path: '/' }
    )
  }

  const save = () => {
    setCookie(
      'mbm',
      { ...cookies.mbm, isSet: true },
      { path: '/' }
    )
  }

  const accept = () => {
    setCookie('mbm', { isSet: true, analytics: true }, { path: '/' })
  }

  return (
    <Snackbar
      // ClickAwayListenerProps={{ onClickAway: () => console.log('clickaway') }}
      open={!cookies.mbm?.isSet}
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      style={{ maxWidth: 600 }}
    >
      <SnackbarContent
        style={{ backgroundColor: '#EFEBE9', margin: 0, color: '#212121' }}
        message={
          <div className={s.barWrapper}>
            <h3>Informationen zum Datenschutz</h3>
            <div className={s.body}>
              <p>
                {
                  'Meine Website verwendet Cookies. Durch die Nutzung dieser Website stimmst du dem Einsatz von Cookies zu. Du kannst deine Entscheidung jederzeit auf der '
                }
                <Link href={'/datenschutz'} as={'/datenschutz'}>
                  {/* <Link href={'/datenschutz'} style={{ color: '#212121' }}> */}
                  <a>Datenschutz-Seite</a>
                </Link>
                {' ändern.'}
              </p>
              <div className={s.settings}>
                <Collapse in={settings}>
                  <FormControlLabel
                    control={
                      <div className={s.switch}>
                        <Switch
                          color={'secondary'}
                          size='small'
                          checked={
                            cookies.mbm?.analytics === undefined
                              ? false
                              : cookies.mbm?.analytics
                          }
                          onChange={toggleanalytics}
                        />
                      </div>
                    }
                    label='Google Analytics'
                  />
                </Collapse>
              </div>
            </div>
            <div
              className={cx({
                row: true,
                desktop: desktop
              })}
            >
              {/* <h4 onClick={() => setsettings(state => !state)}>
                Cookie-Einstellungen
              </h4> */}
                <Collapse in={settings}>
                  <div>
                    <Button
                      round
                      containerStyle={{ marginTop: 0 }}
                      style={{ padding: '4px 8px' }}
                      invert
                      label='Speichern'
                      handler={save}
                    />
                  </div>
                </Collapse>
              <div>
                <Button
                  round
                  containerStyle={{ marginTop: 0 }}
                  style={{ padding: '4px 8px', color: '#212121' }}
                  label='Cookie akzeptieren'
                  handler={accept}
                />
              </div>
            </div>
          </div>
        }
      />
    </Snackbar>
  )
}

export default CookieBar
