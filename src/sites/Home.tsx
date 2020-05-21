import React, { useMemo } from 'react'
import useGalleryIsOpen, { rx_isGalleryOpen } from '../hooks/useGalleryIsOpen'
import useBodyClass from '../hooks/useBodyClass'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { useObservable } from '../hooks/useObservable'
import { rx_IsFooterHidden } from '../components/MainTeaser/MainTeaser'

const Form = dynamic(import('../components/Form/Form'))
const MainTeaser = dynamic(import('../components/MainTeaser/MainTeaser'), {
  ssr: false,
})
const BoxTeaser = dynamic(import('../components/BoxTeaser/BoxTeaser'))
const HeadlineTeaser = dynamic(
  import('../components/HeadlineTeaser/HeadlineTeaser')
)
const ImageTeaser = dynamic(import('../components/ImageTeaser/ImageTeaser'), {
  ssr: false,
})
const GalleryList = dynamic(import('../components/GalleryList/GalleryList'), {
  ssr: false,
})
const Slider = dynamic(import('../components/Slider/Slider'), { ssr: false })

const Home = ({ alldata, mainteaser, boxteaser }: { alldata: any[]; priceCat: any, mainteaser: any, boxteaser: any }) => {
  const router = useRouter()
  const galleryIndex = useObservable(rx_isGalleryOpen)
  useBodyClass('noscroll', galleryIndex !== -1)
  const isHidden = useObservable(rx_IsFooterHidden)

  // data of route
  const data = useMemo(
    () =>
      alldata?.find((d: any) => {
        return d.navigationConfig.path.includes(router.pathname)
      }) ||
      alldata?.find((d: any) => {
        return d.navigationConfig.path.includes(router.query.route)
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router, alldata]
  )
  const teaserList = data?.TeaserList || []

  return (
    <div>
      {teaserList?.map((teaser: any, index: number) => {
        if (teaser.__component === 'base-components.main-teaser') {
          console.log('mainteaser', mainteaser)
          return (
            <div key={`teaserlist-${teaser.__component}${teaser.id}`}>
              <MainTeaser
                alt={teaser?.TeaserImage?.alt}
                index={index}
                imgSrc={`${teaser?.TeaserImage?.name}`}
                // imgSrc={`${host()}/${teaser?.TeaserImage?.url}`}
                headline={teaser?.MainHeadline}
                subHeadline={teaser?.SubHeadline}
                multiplier={teaser?.multiplier}
              />
            </div>
          )
        } else if (teaser.__component === 'base-components.headline-teaser' && !isHidden) {
          return (
            <HeadlineTeaser
              key={`teaserlist-${teaser.__component}${teaser.id}`}
              index={index}
              headline={teaser.headline}
              link={teaser.Link}
              background={teaser.backgroundColor === true}
              text={teaser.text}
              html={teaser.html}
              paddingBottomS={teaser.paddingBottomSmall}
            />
          )
        } else if (teaser.__component === 'base-components.image-teaser' && !isHidden) {
          return (
            <ImageTeaser
              key={`teaserlist-${teaser.__component}${teaser.id}`}
              index={index}
              src={`${teaser?.image.url}`}
              alt={teaser.alt}
            />
          )
        } else if (teaser.__component === 'base-components.gallery' && !isHidden) {
          return (
            <div key={`teaserlist-${teaser.__component}${teaser.id}`}>
              <Slider data={teaser.images} />
              <GalleryList index={index} images={teaser.images} />
            </div>
          )
        } else if (teaser.__component === 'base-components.formular' && !isHidden) {
          return (
            <Form
              index={index}
              data={teaser}
              key={`teaserlist-${teaser.__component}${teaser.id}`}
            />
          )
        } else {
          if (isHidden) {
            return null
          }
          return (
            <BoxTeaser
              key={`teaserlist-${teaser.__component}${teaser.id}`}
              index={index}
              alt={boxteaser?.image?.alt}
              headline={teaser.headline}
              link={teaser.Link}
              imgSrc={`${teaser.image.name}`}
              text={teaser.text}
            />
          )
        }
      })}
    </div>
  )
}

export default Home
