// import Link from 'next/link';
import React from 'react'
import { fetchWrapper, host } from '../src/helper/fetch'
import App from '../src/App'
import getUnsplashImage from '../lib/getUnsplashImage'
import { BehaviorSubject } from 'rxjs'

export const rx_SsrData = new BehaviorSubject<any | null>(null)

function Index(props) {
  return <App alldata={props.sites} priceCat={props.mainCategories} {...props} />
}

export async function getStaticProps() {
  const url = `${host()}`
  const res = await fetchWrapper(`${url}/sites/`)
  const sites = await res.json()
  
  const currentRoute = sites.find((site) => {
    return site.navigationConfig.path === '/'
  })

  return {
    props: {
      sites
    },
  }
}

export default Index
