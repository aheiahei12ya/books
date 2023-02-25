import React, { forwardRef, useMemo } from 'react'

import Empty from '@/components/empty'
import Table from '@/components/table'
import { ColumnType } from '@/components/table/Table.types'

import styles from './EveryYear.module.scss'

const columns: ColumnType[] = [
  {
    title: '金额',
    dataIndex: 'amount',
    key: 'amount',
    width: 80
  },
  {
    title: '一级分类',
    dataIndex: 'category',
    key: 'category',
    ellipsis: true
  },
  {
    title: '二级分类',
    dataIndex: 'subcategory',
    key: 'subcategory',
    ellipsis: true
  },
  {
    title: '备注',
    dataIndex: 'note',
    key: 'note',
    ellipsis: true,
    width: 100
  }
]

const records = [
  {
    year: 2021,
    items: [
      {
        type: '支出',
        note: '商品1',
        category: '类别类别类别',
        subcategory: '子类别',
        amount: '100.23',
        time: '19:30'
      },
      {
        type: '支出',
        note: '商品2',
        category: '类别',
        subcategory: '子类别',
        amount: '100.23',
        time: '19:30'
      },
      {
        type: '支出',
        note: '商品3',
        category: '类别',
        subcategory: '子类别',
        amount: '100.23',
        time: '19:30'
      },
      {
        type: '支出',
        note: '商品4',
        category: '类别',
        subcategory: '子类别',
        amount: '100.23',
        time: '19:30'
      }
    ]
  },
  {
    year: 2019,
    items: [
      {
        type: '支出',
        note: '商品1',
        category: '类别',
        subcategory: '子类别',
        amount: '100.23',
        time: '19:30'
      },
      {
        type: '支出',
        note: '商品2',
        category: '类别',
        subcategory: '子类别',
        amount: '100.23',
        time: '19:30'
      },
      {
        type: '支出',
        note: '商品3',
        category: '类别',
        subcategory: '子类别',
        amount: '100.23',
        time: '19:30'
      },
      {
        type: '支出',
        note: '商品4',
        category: '类别',
        subcategory: '子类别',
        amount: '100.23',
        time: '19:30'
      },
      {
        type: '支出',
        note: '商品4',
        category: '类别',
        subcategory: '子类别',
        amount: '100.23',
        time: '19:30'
      },
      {
        type: '支出',
        note: '商品4',
        category: '类别',
        subcategory: '子类别',
        amount: '100.23',
        time: '19:30'
      },
      {
        type: '支出',
        note: '商品4',
        category: '类别',
        subcategory: '子类别',
        amount: '100.23',
        time: '19:30'
      },
      {
        type: '支出',
        note: '商品4',
        category: '类别',
        subcategory: '子类别',
        amount: '100.23',
        time: '19:30'
      }
    ]
  },
  {
    year: 2018,
    items: [
      {
        type: '支出',
        note: '商品1',
        category: '类别',
        subcategory: '子类别',
        amount: '100.23',
        time: '19:30'
      },
      {
        type: '支出',
        note: '商品2',
        category: '类别',
        subcategory: '子类别',
        amount: '100.23',
        time: '19:30'
      },
      {
        type: '支出',
        note: '商品3',
        category: '类别',
        subcategory: '子类别',
        amount: '100.23',
        time: '19:30'
      },
      {
        type: '支出',
        note: '商品4',
        category: '类别',
        subcategory: '子类别',
        amount: '100.23',
        time: '19:30'
      }
    ]
  }
]

const EveryYear = forwardRef(() => {
  const makeList = useMemo(
    () =>
      records.map((record) => {
        return (
          <ul className={styles.everyYearChildren} key={record.year}>
            {record.items.map((item, index) => {
              return <li key={`${record.year}-${index}`}>{item.note}</li>
            })}
          </ul>
        )
      }),
    []
  )

  return records.length ? (
    <div className={styles.everyYear}>
      {records.map((record) => (
        <Table
          className={styles.everyYearChildren}
          key={record.year}
          title={record.year}
          columns={columns}
          data={record.items}
          size={'small'}
          showHeader
          fixHeader
        ></Table>
      ))}
    </div>
  ) : (
    <Empty>什么都没有</Empty>
  )
})

EveryYear.displayName = 'EveryYear'

export { EveryYear }
