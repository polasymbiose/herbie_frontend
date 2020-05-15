// import Link from 'next/link';
import React from 'react'
import App from '../src/App'
import { host, fetchWrapper } from '../src/helper/fetch'
import { rx_SsrData } from './index'

function Route(props: any) {
  return (
      <App {...props}/>
  )
}

export async function getStaticPaths() {
  // const url = `${host()}`
  // const res = await fetchWrapper(`${url}/sites/`)
  // const sites = await res.json()
  // console.log('sites', sites)
  return {
    paths: [
      '/impressum'
    ],
    fallback: false,
  }
}

export async function getStaticProps() {
  if (rx_SsrData.value !== null) {
    return {
      props: {
        ...rx_SsrData.value
      }
    }
  }
  // Call an external API endpoint to get posts.
  const url = `${host()}`
  const res = await fetchWrapper(`${url}/sites/`)
  const sites = await res.json()

  rx_SsrData.next({
    sites
  })


  return {
    props: {
      sites
    }
  }
}

export default Route
