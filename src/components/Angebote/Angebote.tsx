import { Collapse, Grid } from '@material-ui/core'
import cn from 'classnames/bind'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import showdown from 'showdown'
import AngeboteFilter from '../AngeboteFilter/AngeboteFilter'
import s from './Angebote.module.scss'

const cx = cn.bind(s)

const Angebote = ({ data }: { index: number, data: any }) => {
  const router = useRouter()

  return (
    <div className={s.Angebote} >
      <AngeboteFilter
        data={data}
      />
      <Grid container justify='center' spacing={0}>
        <Grid item xs={10} sm={8} md={6}>
          {data?.map((cat: any, i: number) => {

            const visible = router.query.filter === cat.name || !router.query.filter && i === 0
            return (
              <Collapse timeout={500} in={visible} key={`pricetable-${cat.id}`}>
                <div
                  key={cat.label}
                  className={cx({
                    category: true
                  })}
                >
                  {cat.angebotskats.map((table: any, i: number) => {
                    return (
                      <PriceTable
                        cat={table}
                        key={`pricetable-${cat.id}-${table.id}`}
                        firstItem={i === 0}
                      />
                    )
                  })}
                </div>
              </Collapse>
            )
          })}
        </Grid>
      </Grid>
    </div>
  )
}

export default Angebote

const PriceTable = (props: any) => {
  return (
    <div style={{ paddingTop: props.firstItem ? 0 : 80 }}>
      <div dangerouslySetInnerHTML={{ __html: `<h3>${props.cat.label}</h3>` }} />
      {props.cat.text && (
        <div className={s.copy}>
          <TextHtml text={props.cat.text} />
        </div>
      )}
      <div
        className={cx({
          tableHead: true,
          item: true
        })}
      >
        <div className={s.info} />
        <div className={s.price}>
          <h4>Preis</h4>
        </div>
      </div>
      {props.cat.element.map((el: any) => {
        return (
          <div
            key={el.item}
            className={cx({
              border: true,
              item: true
            })}
          >
            <div className={s.info}>
              <h4>{el.item}</h4>
              {el.subheadline !== '' && <p>{el.subheadline}</p>}
            </div>
            <div className={s.price}>
              <h6>{`${el.price} €`}</h6>
            </div>
          </div>
        )
      })}

      {props.cat.footnote && (
        <div className={s.footnote}>
          <TextHtml text={props.cat.footnote} />
        </div>
      )}
    </div>
  )
}

const TextHtml = ({ text }: { text: string }) => {
  const converter = new showdown.Converter()
  const parsedHtml = converter.makeHtml(text)

  return <div dangerouslySetInnerHTML={{ __html: parsedHtml }} />
}
