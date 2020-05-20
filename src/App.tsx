import cn from 'classnames'
import React, { useMemo, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Router from 'next/router'

// import { useLocation } from 'react-router'
// import { Route, Switch } from 'react-router-dom'
import s from './App.module.scss'
import Footer from './components/Footer/Footer'
import CookieBar from './components/CookieBar/CookieBar'
import Socials from './components/Socials/Socials'
import Menu from './components/Menu/Menu'

import { initAnalytics, pageview } from './helper/analytics'
import Home from './sites/Home'
import dynamic from 'next/dynamic'
import { BehaviorSubject } from 'rxjs'
import { rx_isGalleryOpen } from './hooks/useGalleryIsOpen'
import { useObservable } from './hooks/useObservable'
const Header = dynamic(import('./components/Header/Header'), {ssr: false});

export const rx_MenuIsOpen = new BehaviorSubject<boolean>(false)

function App(props: any) {
  const isOpen = useObservable(rx_MenuIsOpen)
  const router = useRouter()
  const galleryIndex = useObservable(rx_isGalleryOpen)
  const alldata = props.sites
  const nav = useMemo(
    () => alldata?.map((route: any) => route.navigationConfig),
    [alldata]
  )

  const css = cn({
    route: true,
    blur: isOpen || galleryIndex !== -1
  })

  const setIsOpen = (bool: boolean) => {
    rx_MenuIsOpen.next(bool)
  }

  useEffect(() => {
    initAnalytics()
    Router.events.on('routeChangeStart', handleRouteChange)
    return () => Router.events.off('routeChangeStart', handleRouteChange)
  }, [])

  const handleRouteChange = () => {

    rx_MenuIsOpen.next(false)
  }

  useEffect(() => {
    pageview(router?.asPath)
  }, [router])

  return (
    <React.Fragment>
      <div className={s.App}>
        <Socials />
        {/* <Menu isOpen={isOpen} setIsOpen={setIsOpen} nav={nav} /> */}
        <Header isOpen={isOpen || galleryIndex !== -1} setIsOpen={setIsOpen} hide={galleryIndex !== -1}/>
        <div className={css}>
          <Home alldata={alldata} {...props}/>
          <Footer nav={nav} />
        </div>
      </div>
      <CookieBar />
      <style jsx global>{`
        .noscroll {
          overflow: hidden;
          -webkit-overflow-scrolling: touch;
        }
        a {
          color: #A79A87;
        }
      `}</style>
    </React.Fragment>
  )
}

export default App
