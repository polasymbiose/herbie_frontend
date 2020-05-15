// import Link from 'next/link';
import React from 'react'
import MainTeaser from '../src/components/MainTeaser/MainTeaser'
import { fetchWrapper, host } from '../src/helper/fetch'
import { rx_SsrData } from './index'

function ErrorPage() {
  return (
    <>
      <MainTeaser
        index={1}
        headline={'404'}
        subHeadline={'Leider ist ein Fehler aufgetreten'}
        multiplier={1}
      ></MainTeaser>
    </>
  )
}

export async function getStaticProps() {
  if (rx_SsrData.value !== null) {
    return {
      props: {
        ...rx_SsrData.value,
      },
    }
  }
  // Call an external API endpoint to get posts.
  const url = `${host()}`
  const res = await fetchWrapper(`${url}/sites/`)
  const sites = await res.json()
  const res2 = await fetchWrapper(`${url}/main-categories/`)
  const mainCategories = await res2.json()

  rx_SsrData.next({
    sites,
    mainCategories,
  })

  return {
    props: {
      sites,
      mainCategories,
    },
  }
}

export default ErrorPage
