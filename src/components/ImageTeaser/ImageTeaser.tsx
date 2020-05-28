import { Grid } from '@material-ui/core';
import React from 'react';
import { useComponentHeight } from '../../hooks/useComponentDimensions';
import s from './ImageTeaser.module.scss';

const ImageTeaser = ({ src = '', alt = '', index }: { src: string; alt: string; index: number }) => {
  const ref = useComponentHeight(index)
  
  return (
    <div className={s.ImageTeaser} ref={ref}>
      <Grid container justify="center" alignItems="stretch" alignContent="center" spacing={0}>
        <Grid item xs={10} sm={8} md={6}>
          <img src={`/api/images?url=${src}`} alt={alt || 'Herbie Unverpackt'} />
        </Grid>
      </Grid>
    </div>
  )
}

export default ImageTeaser
