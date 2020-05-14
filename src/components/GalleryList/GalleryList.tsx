import React from 'react'
import s from './GalleryList.module.scss'
import { Grid } from '@material-ui/core'
import WideScreenGallery from '../WideScreenGallery/WideScreenGallery'
import { useComponentHeight } from '../../hooks/useComponentDimensions'

const GalleryList = ({ images, index }: { images: { XS: { url: string }; alt: string }[], index: number }) => {
  const ref = useComponentHeight(index)
  return (
    <div className={s.GalleryList} ref={ref}>
      <Grid container justify="center" alignItems="stretch" alignContent="center" spacing={0}>
        <Grid item xs={11} sm={10} md={8}>
          <div className={s.wrapper}>
            <WideScreenGallery imgs={images} />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default GalleryList
