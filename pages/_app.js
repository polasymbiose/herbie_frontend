import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo } from 'react'
import '../src/index.scss'

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#AA9FC1'
    },
    secondary: {
      main: '#A79A87'
    }
  },
  typography: {
    fontFamily: [
      '"Baloo 2"',
      '"-apple-system"',
      '"Segoe UI"',
      '"Roboto"',
      '"Oxygen"',
      '"Ubuntu"',
      '"Cantarell"',
      '"Fira Sans"',
      '"Droid Sans"',
      '"Helvetica Neue"',
      '"sans-serif"'
    ].join(','),
    fontSize: 16,
    htmlFontSize: 16
  }
})

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const data = useMemo(
    () =>
      pageProps.sites?.find(d => {
        return d.navigationConfig.path.includes(router.asPath)
      }) ||
      pageProps.sites?.find(d => {
        return (
          d.navigationConfig.path.includes('/impressionen') &&
          router.asPath.includes('/impressionen')
        )
      }) ||
      pageProps.sites?.find(d => {
        return (
          d.navigationConfig.path.includes('/preise') &&
          router.asPath.includes('/preise')
        )
      }) ||
      pageProps.sites?.find(d => {
        return d.navigationConfig.path.includes(router.query.route)
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router, pageProps.sites]
  )

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <React.Fragment>
      <Head>
      {data?.metatitle && <title>{data?.metatitle}</title>}
        <meta name='description' content={data?.metadescription} />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  )
}
