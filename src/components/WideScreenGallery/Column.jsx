import React from 'react'
// import { Link, useRouteMatch } from 'react-router-dom'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { host } from '../../helper/fetch'
import s from './Column.module.scss'
import {rx_isGalleryOpen} from '../../hooks/useGalleryIsOpen'

const Column = ({ column, colIndex }) => {
  return (
    <>
      {column.map(item => {
        return (
          <div
            className={s.column}
            key={`${item.id}-${item.index}-colIndex${colIndex}`}
            src={item.thumb}
            onClick={() => rx_isGalleryOpen.next(item.index)}
          >
            {/* <Link scroll={false} href={`/galerie/[image]`} as={`/galerie/${item.XL?.name || item.XS?.name}`}>
              <img src={`/api/images?url=${item.XL?.url || item.XS?.url}`} alt={item.alt} />
            </Link> */}
              <img src={`/api/images?url=${item.XS?.url}`} alt={item.alt} />
          </div>
        )
      })}
    </>
  )
}

export default Column
