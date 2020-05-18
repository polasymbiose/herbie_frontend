import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'

export default class MyDocument extends Document {
  render() {
    return (
      <html lang='de'>
        <Head>
          <meta charSet='utf-8' />
          <meta name="robots" content="noindex" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link
            rel='apple-touch-icon'
            sizes='57x57'
            href='/icon/apple-icon-57x57.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='60x60'
            href='/icon/apple-icon-60x60.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='72x72'
            href='/icon/apple-icon-72x72.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='76x76'
            href='/icon/apple-icon-76x76.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='114x114'
            href='/icon/apple-icon-114x114.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='120x120'
            href='/icon/apple-icon-120x120.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='144x144'
            href='/icon/apple-icon-144x144.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='152x152'
            href='/icon/apple-icon-152x152.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/icon/apple-icon-180x180.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='192x192'
            href='/icon/android-icon-192x192.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/icon/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='96x96'
            href='/icon/favicon-96x96.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/icon/favicon-16x16.png'
          />
          {/* <link rel="preload" href="/fonts/'Baloo 2'-v14-latin-500.woff" as="font"></link>
          <link rel="preload" href="/fonts/'Baloo 2'-v14-latin-regular.woff" as="font"></link> */}
          <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600&display=swap" rel="stylesheet"></link>
          <link rel="preconnect" href="https://www.google-analytics.com" />
          <meta name='msapplication-TileColor' content='#ffffff' />
          <meta name='msapplication-TileImage' content='/ms-icon-144x144.png' />
          <meta name='theme-color' content='#ffffff' />
          <meta name="google-site-verification" content="mMabHhOsXHpUeNXjGaG7R5cF5m-p5eC6-CvJeluUEiw" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: `{
              "@context": "http://schema.org",
                "@type": "Person",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Berlin",
                  "addressRegion": "Berlin",
                  "postalCode": "10343",
                "streetAddress": "str"
              },
                "email": "mailto:info@herbie-unverpackt.de",
              "image": "someNice.jpg",
                "jobTitle": "Foo",
              "name": "Camela",
                "telephone": "0176 24863717",
              "url": "https://www.herbie"
            }`,
          }}
        />
      </html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  }
}
