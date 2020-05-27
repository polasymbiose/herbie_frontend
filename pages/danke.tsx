// import Link from 'next/link';
import React from 'react'
import { fetchWrapper, host } from '../src/helper/fetch'
import App from '../src/App'
import getUnsplashImage from '../lib/getUnsplashImage'

function Index(props) {
  return <App alldata={props.sites} priceCat={props.mainCategories} {...props} />
}

export async function getStaticProps() {
  const url = `${host()}`
  const res = await fetchWrapper(`${url}/sites/`)
  const sites = await res.json()

  return {
    props: {
      sites
    }
  }
}

export default Index
