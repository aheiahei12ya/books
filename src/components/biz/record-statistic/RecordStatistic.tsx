import { forwardRef, useCallback, useMemo, useState } from 'react'

import Progress from '@/components/progress'
import Tag from '@/components/tag'
import useRequest from '@/hooks/useRequest'
import services from '@/services'

import styles from './RecordStatistic.module.scss'
import { classificationType, RecordStatisticProps, RecordStatisticRef } from './RecordStatistic.types'

const RecordStatistic = forwardRef<RecordStatisticRef, RecordStatisticProps>((props, ref) => {
  const [items, setItems] = useState<classificationType>({ headList: [], itemList: [] })

  useRequest(
    () => {
      const date = new Date()
      return services.statistic.classification({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.getDate()
      })
    },
    {
      onSuccess: (data) => {
        if (data.success) {
          setItems(data.data)
        }
      }
    }
  )

  const makeRow = useCallback(
    (
      itemName: string,
      amount: number,
      percentage: number,
      bgColor: 'success' | 'warning' | 'danger' = 'warning',
      hideText: boolean = false
    ) => {
      const width = `${ Math.max(items.headList[0].amount, items.headList[1].amount).toString().length * 7.5 }px`
      const text = hideText ? undefined : `${ percentage }%`
      return (
        <div className={ styles.recordStatisticRow } key={ itemName }>
          <div className={ styles.recordStatisticRowTag }>
            <Tag shape={ 'round' } size={ 'small' } select>
              { itemName }
            </Tag>
          </div>
          <div className={ styles.recordStatisticRowProgress }>
            <Progress
              size={ 'small' }
              text={ text }
              percentage={ percentage }
              backgroundColor={ bgColor }
              textColor={ '#000' }
            ></Progress>
          </div>
          <div className={ styles.recordStatisticRowTag }>
            <Tag size={ 'small' } width={ width }>
              { amount }
            </Tag>
          </div>
        </div>
      )
    },
    [items.headList]
  )

  const records = useMemo(
    () => (
      <>
        { items.headList.length &&
          items.headList.map((item, index) =>
            makeRow(item.itemName, item.amount, item.percentage, index ? 'success' : 'danger', true)
          ) }
        { items.itemList.length &&
          items.itemList
            .sort((a, b) => b.amount - a.amount)
            .map((item) => makeRow(item.itemName, item.amount, item.percentage)) }
      </>
    ),
    [items.headList, items.itemList, makeRow]
  )
  return <div className={ styles.recordStatisticContainer }>{ records }</div>
})

RecordStatistic.displayName = 'RecordStatistic'
export { RecordStatistic }
