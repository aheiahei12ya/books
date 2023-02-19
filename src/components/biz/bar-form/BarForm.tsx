import { forwardRef } from 'react'

import Progress from '@/components/progress'
import Tag from '@/components/tag'

import styles from './BarForm.module.sass'
import { BarFormProps, BarFormRef } from './BarForm.types'

const headList = [
  { itemName: '本月收入', amount: 3333.33, percentage: 84.3 },
  { itemName: '本月支出', amount: 88888.88, percentage: 84.3 }
]

const itemList = [
  { itemName: '日常开销', amount: 3213.23, percentage: 84.3 },
  { itemName: '住房开销', amount: 3133.23, percentage: 84.3 },
  { itemName: '意外开销', amount: 2133.23, percentage: 84.3 },
  { itemName: '设备引进', amount: 133.23, percentage: 84.3 },
  { itemName: '人物培养', amount: 133.23, percentage: 84.3 },
  { itemName: '生活开销', amount: 133.23, percentage: 84.3 },
  { itemName: '虚拟商品', amount: 33.23, percentage: 84.3 },
  { itemName: '败家消费', amount: 133.23, percentage: 84.3 },
  { itemName: '出行开销', amount: 333.23, percentage: 84.3 }
]

const BarForm = forwardRef<BarFormRef, BarFormProps>((props, ref) => {
  const width = `${Math.max(headList[0].amount, headList[1].amount).toString().length * 7.5}px`
  const makeRow = (
    itemName: string,
    amount: number,
    percentage: number,
    bgColor: 'success' | 'warning' | 'danger' = 'warning',
    hideText: boolean = false
  ) => {
    const text = hideText ? undefined : `${percentage}%`
    return (
      <div className={styles.barFormRow}>
        <div className={styles.barFormRowTag}>
          <Tag shape={'round'} size={'small'} select>
            {itemName}
          </Tag>
        </div>
        <div className={styles.barFormRowProgress}>
          <Progress
            size={'small'}
            text={text}
            percentage={percentage}
            backgroundColor={bgColor}
            textColor={'#000'}
          ></Progress>
        </div>
        <div className={styles.barFormRowTag}>
          <Tag size={'small'} width={width}>
            {amount}
          </Tag>
        </div>
      </div>
    )
  }
  return (
    <div className={styles.barFormContainer}>
      {headList.map((item, index) =>
        makeRow(item.itemName, item.amount, item.percentage, index ? 'success' : 'danger', true)
      )}
      {itemList.sort((a, b) => b.amount - a.amount).map((item) => makeRow(item.itemName, item.amount, item.percentage))}
    </div>
  )
})

BarForm.displayName = 'BarForm'
export { BarForm }
