import React, { useEffect, useState } from 'react'
import Column from './Column'
import s from './WideScreenGallery.module.scss'
import { useTheme, useMediaQuery } from '@material-ui/core';

const WideScreenGallery = ({ imgs }) => {
  const theme = useTheme()
  const desktop = useMediaQuery(theme.breakpoints.up('sm'))
  const columns = desktop ? 3 : 1
  const [items, set] = useState(imgs)

  useEffect(() => {
    set(imgs)
  }, [imgs])

  const colCalcY = []
  const cols = []

  for (let index = 0; index < columns; index++) {
    colCalcY.push([])
    cols.push([])
  }

  const arrSum = arr => arr.reduce((a, b) => a + b, 0)

  items.forEach((child, i) => {
    const currentColumn = i % columns
    const imgWidth = 400 / columns
    const imgHeight = (imgWidth - 24) * 1
    const arrOfcombinedHeights = colCalcY.map(col => arrSum(col))
    const smallestColumn = arrOfcombinedHeights.indexOf(Math.min.apply(null, arrOfcombinedHeights))
    colCalcY[smallestColumn].push(imgHeight)
    cols[currentColumn].push({ ...child, width: imgWidth, height: imgHeight, index: i })
    return { ...child, index: i, column: currentColumn }
  })

  return (
    <div className={s.wsgallery}>
      {cols.map((col, i) => (
        <div className={s.columnWrapper} key={`galleryColumn-${i}`}>
          <Column column={col} colIndex={i} />
        </div>
      ))}
    </div>
  )
}

export default WideScreenGallery
