import { Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import Link from 'next/link'
import RoundButton from '../Button/RoundButton'
import s from './AngeboteFilter.module.scss'
import { useRouter } from 'next/router'

const AngeboteFilter = ({
  data
}: {
  data: any
}) => {
  const router = useRouter()

  const sortByPosition = (a: any, b: any) => {
    if (a.position < b.position) {
      return -1
    }
    if (a.position > b.position) {
      return 1
    }
    return 0
  }

  return (
    <div className={s.AngeboteFilter}>
      <Grid container justify='center' spacing={0}>
        <Grid item xs={10} sm={10} md={7} lg={7}>
          <div className={s.filterList}>
            {data?.sort(sortByPosition).map((cat: any, i: number) => {
              const invert = router.query.filter === cat.name || !router.query.filter && i === 0
              return (
                // @ts-ignore
                <Link
                  scroll={false}
                  shallow={true}
                  key={`filter-${cat.name}`}
                  href={`/preise/[filter]`}
                  as={`/preise/${cat.name}`}
                >
                  <div className={s.filterItem}>
                    <RoundButton
                      label={cat.name}
                      invert={invert}
                      handler={() => {}}
                    />
                  </div>
                </Link>
              )
            })}
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default AngeboteFilter
