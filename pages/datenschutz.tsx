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
    return site.navigationConfig.path === '/datenschutz'
  })

  const TeaserImages = currentRoute?.TeaserList.find((t) => t.TeaserImage)
  const boxteaserimage = currentRoute?.TeaserList.filter((t) => t.image) // boxteaser

  const mainteaser = {
    name: TeaserImages.TeaserImage.name.substr(0, TeaserImages.TeaserImage.name.indexOf('.')),
    id: TeaserImages.TeaserImage.id,
    src: await getUnsplashImage(TeaserImages.TeaserImage.hash, TeaserImages.TeaserImage.ext, TeaserImages.TeaserImage.name.substr(0, TeaserImages.TeaserImage.name.indexOf('.')))
  }

  const boxteaser = boxteaserimage.length > 0 && {
    name: boxteaserimage[0].image.name.substr(0, boxteaserimage[0].image.name.indexOf('.')),
    id: boxteaserimage[0].image.id,
    src: await getUnsplashImage(boxteaserimage[0].image.hash, boxteaserimage[0].image.ext, boxteaserimage[0].image.name.substr(0, boxteaserimage[0].image.name.indexOf('.'))),
  }
  return {
    props: {
      boxteaser,
      mainteaser,
      sites
    },
  }
}

export default Index
