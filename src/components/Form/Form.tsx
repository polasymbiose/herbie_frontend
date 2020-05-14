import {
  Collapse,
  Grid,
  TextField,
  useMediaQuery,
  Checkbox
} from '@material-ui/core'
import cn from 'classnames/bind'
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles'
import React, { useState } from 'react'
import { formCreator, postReqeuest } from '../../helper/fetch'
// import { useComponentHeight } from '../../hooks/useComponentDimensions'
import { useInput } from '../../hooks/useForms'
import Button from '../Button/Button'
import Dialog from '../Dialog'
import s from './Form.module.scss'
import Link from 'next/link'
const cx = cn.bind(s)

const useStyles = makeStyles(() => ({
  full: {
    width: '100%'
  }
}))

const MaterialTextField = withStyles(theme => ({
  root: {
    '& legend span': {
      display: 'none'
    },
    '& .MuiTextField-root': {
      width: '100%',

      [theme.breakpoints.down('md')]: {
        marginTop: 32
      }
    },
    '& label': {
      transform: 'translate(0px, -17px) scale(0.8)',
      color: '#A79A87'
    },
    '& label.Mui-focused': {
      color: '#A79A87',
      transform: 'translate(0px, -17px) scale(0.8)'
    },
    '& label.MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(0px, -17px) scale(0.8)'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#A79A87'
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      // borderColor: '#A79A87',

      '&.Mui-focused fieldset': {
        borderColor: '#A79A87'
      },
      '&.Mui-hover': {
        // borderColor: '#A79A87'
      }
    },
    '.MuiFormLabel-root.Mui-focused': {
      color: '#A79A87'
    },
    '& .MuiFormHelperText-root': {
      fontFamily: 'Baloo 2',
      marginLeft: 0,
      position: 'absolute',
      bottom: 0,
      transform: 'translateY(100%);'
    },
    '& .MuiInputBase-input': {
      padding: '12px 14px'
    }
  }
}))(TextField)

const Form = ({ data }: { index: number; data: any }) => {
  const classes = useStyles()
  // const ref = useComponentHeight(index)
  const theme = useTheme()
  const desktop = useMediaQuery(theme.breakpoints.up('sm'))
  const [messagesent, setmessagesent] = useState(false)
  const [postError, setpostError] = useState(false)

  const [checkbox, setcheckbox] = useState(false)
  const [checkboxMessage, setcheckboxMessage] = useState(false)

  const { name } = useInput('name', {})
  const { email } = useInput('email', {
    validator: val => {
      const emailAr = val.match(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/g
      )
      return emailAr !== null
    }
  })
  const { tel } = useInput('tel', {
    validator: () => true
  })
  const { nachricht } = useInput('nachricht', {})

  const submit = () => {
    let valid = true
    setcheckboxMessage(false)

    if (!name.isValid()) {
      valid = false
    }

    if (!email.isValid()) {
      valid = false
    }

    if (!tel.isValid()) {
      valid = false
    }

    if (!nachricht.isValid()) {
      valid = false
    }

    if (!checkbox) {
      valid = false
      setcheckboxMessage(true)
    }

    if (!valid) {
      return
    }

    const formdata = formCreator({
      name: name.value,
      email: email.value,
      tel: tel.value,
      nachricht: nachricht.value
    })

    postReqeuest(formdata)
      .then(() => {
        setmessagesent(true)
      })
      .catch(() => {
        setpostError(true)
      })
  }

  const resetMessage = () => {
    nachricht.resetValue()
    setmessagesent(false)
  }

  return (
    <div
      className={cx({
        Form: true,
        paddingTop: data.paddingTop
      })}
    >
      <Grid
        container
        justify='center'
        alignContent='center'
        alignItems='stretch'
        spacing={0}
      >
        <Grid item xs={10} sm={8} md={6}>
          <div>
            <div className={s.formWrapper}>
              <div className={s.successMask}>
                <Collapse timeout={400} in={messagesent}>
                  <div>
                    <h2>{data.message_sent_success}</h2>
                    <p>Hast du weitere Fragen?</p>
                    <Button
                      black
                      handler={resetMessage}
                      label={'neue anfrage'}
                      containerStyle={{ margin: '32px 0 80px 0' }}
                    />
                  </div>
                </Collapse>
              </div>
              <Collapse timeout={400} in={!messagesent}>
                <div className={s.inputMask}>
                  <form noValidate autoComplete='off'>
                    <div style={{ marginBottom: 12 }}>
                      <Grid
                        container
                        justify='center'
                        alignContent='center'
                        spacing={desktop ? 2 : 0}
                      >
                        <Grid item xs={12} sm={6} md={6}>
                          <div className={s.toprow}>
                            <MaterialTextField
                              id='standard-name'
                              label='Name'
                              value={name.value}
                              onChange={name.handleValue!}
                              variant='outlined'
                              helperText={`${
                                desktop && name.error
                                  ? 'Bitte Namen eingeben'
                                  : ''
                              }`}
                              onFocus={() => {
                                name.handleError(false)
                              }}
                              error={name.error}
                              disabled={messagesent}
                              className={classes.full}
                              required
                            />
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <div className={s.toprow}>
                            <MaterialTextField
                              disabled={messagesent}
                              id='standard-email'
                              label='E-Mail'
                              value={email.value}
                              onChange={email.handleValue!}
                              variant='outlined'
                              helperText={`${
                                desktop && email.error
                                  ? 'Bitte Email eingeben'
                                  : ''
                              }`}
                              error={email.error}
                              onFocus={() => {
                                email.handleError(false)
                              }}
                              className={classes.full}
                              required
                            />
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                          <div className={s.toprow}>
                            <MaterialTextField
                              disabled={messagesent}
                              id='standard-tel'
                              label='Telefonnummer'
                              value={tel.value}
                              onChange={tel.handleValue!}
                              variant='outlined'
                              helperText={`${
                                desktop && tel.error
                                  ? 'Bitte Telefonnummer eingeben'
                                  : ''
                              }`}
                              error={tel.error}
                              onFocus={() => {
                                tel.handleError(false)
                              }}
                              className={classes.full}
                            />
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                    <div
                      style={{ display: 'flex', marginTop: desktop ? 32 : 16 }}
                    >
                      <MaterialTextField
                        id='outlined-error-helper-text'
                        required
                        disabled={messagesent}
                        value={nachricht.value}
                        onChange={nachricht.handleValue!}
                        label='Nachricht'
                        onFocus={() => nachricht.handleError(false)}
                        error={nachricht.error}
                        helperText={`${
                          desktop && nachricht.error
                            ? data.error_empty_message
                            : ''
                        }`}
                        variant='outlined'
                        multiline
                        rows='4'
                        className={classes.full}
                      />
                    </div>
                  </form>
                  <div className={s.checkbox}>
                    <div className={s.switch}>
                      <p>
                        <Checkbox
                          checked={checkbox}
                          onChange={() => {
                            setcheckbox(s => !s)
                            setcheckboxMessage(false)
                          }}
                          color='primary'
                          inputProps={{
                            'aria-label':
                              'Ich akzeptiere die Datenschutz-Bedingungen'
                          }}
                          style={{ padding: '0 8px 0 0' }}
                        />
                        {'Ich akzeptiere die '}
                        <Link href={'/[route]'} as={`${'/datenschutz'}`} shallow={true}>
                          <a>{'Datenschutz-Bedingungen'}</a>
                        </Link>
                      </p>
                    </div>
                    <div>
                      {checkboxMessage && (
                        <p className={s.errormsg}>
                          Bitte den Datenschutz-Bedingungen zustimmen
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    disabled={messagesent}
                    handler={submit}
                    label={'senden'}
                    invert
                    containerStyle={{ margin: '32px 0 80px 0' }}
                  />
                </div>
              </Collapse>
            </div>
          </div>
        </Grid>
        <Dialog
          open={postError}
          handleClose={() => setcheckboxMessage(false)}
          message={'Leider konnte die Nachricht nicht gesendet werden'}
        />
        <Dialog
          open={postError}
          handleClose={() => setpostError(false)}
          message={'Leider konnte die Nachricht nicht gesendet werden'}
        />
      </Grid>
    </div>
  )
}

export default Form
