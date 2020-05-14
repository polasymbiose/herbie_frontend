// import Link from 'next/link';
import React from 'react'
import App from '../src/App'
import { host, fetchWrapper } from '../src/helper/fetch'
import { BehaviorSubject } from 'rxjs'

function AppApp(props: any) {
  return (
      <App {...props}/>
  )
}

// export const config = { amp: true }
export const rx_SsrData = new BehaviorSubject<any | null>(null)

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  const url = `${host()}`
  const res = await fetchWrapper(`${url}/sites/`)
  const sites = await res.json()

  return {
    props: {
      sites
    }
  }
}

export default AppApp
