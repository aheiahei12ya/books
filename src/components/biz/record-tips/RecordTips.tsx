import { forwardRef, useMemo, useState } from 'react'

import { autoRecordColumns, installmentColumns, reimbursementColumns } from '@/components/biz/record-tips/config'
import Empty from '@/components/empty'
import Table from '@/components/table'
import Tabs from '@/components/tabs'

import styles from './RecordTips.module.scss'

const installmentItems = [
  {
    note: '商品1',
    remain: '10',
    finish: '14',
    amount: '100.23'
  },
  {
    note: '商品1',
    remain: '10',
    finish: '14',
    amount: '100.23'
  },
  {
    note: '商品1',
    remain: '10',
    finish: '14',
    amount: '100.23'
  },
  {
    note: '商品1',
    remain: '10',
    finish: '14',
    amount: '100.23'
  },
  {
    note: '商品1',
    remain: '10',
    finish: '14',
    amount: '100.23'
  },
  {
    note: '商品1',
    remain: '10',
    finish: '14',
    amount: '100.23'
  },
  {
    note: '商品1',
    remain: '10',
    finish: '14',
    amount: '100.23'
  },
  {
    note: '商品1',
    remain: '10',
    finish: '14',
    amount: '100.23'
  },
  {
    note: '商品1',
    remain: '10',
    finish: '14',
    amount: '100.23'
  }
]

const autoRecordItems = [
  {
    date: '30号/月',
    note: '商品1',
    remain: '10',
    amount: '100.23',
    id: 1
  }
]

const reimbursementItems = [
  {
    note: '商品1',
    date: '2022-02-02',
    state: '报销中',
    id: 1
  }
]

const RecordTips = forwardRef(() => {
  const [tab, setTab] = useState<number>(0)

  const reimbursementNodes = useMemo(() => {
    if (reimbursementItems.length) {
      setTab(2)
    }
    return reimbursementItems.length ? (
      <Table
        columns={reimbursementColumns}
        data={reimbursementItems}
        size={'small'}
        textAlign={'left'}
        showHeader
        fixHeader
      ></Table>
    ) : (
      <Empty>什么都没有</Empty>
    )
  }, [])

  const autoRecordNodes = useMemo(() => {
    if (autoRecordItems.length) {
      setTab(1)
    }
    return autoRecordItems.length ? (
      <Table
        columns={autoRecordColumns}
        data={autoRecordItems}
        size={'small'}
        textAlign={'left'}
        showHeader
        fixHeader
      ></Table>
    ) : (
      <Empty>什么都没有</Empty>
    )
  }, [])

  const installmentNodes = useMemo(() => {
    if (installmentItems.length) {
      setTab(0)
    }
    return installmentItems.length ? (
      <Table
        columns={installmentColumns}
        data={installmentItems}
        size={'small'}
        textAlign={'left'}
        showHeader
        fixHeader
      ></Table>
    ) : (
      <Empty>什么都没有</Empty>
    )
  }, [])

  const tabItems = useMemo(
    () => [
      {
        key: '1',
        label: '分期付款',
        children: installmentNodes
      },
      {
        key: '2',
        label: '自动记录',
        children: autoRecordNodes
      },
      {
        key: '3',
        label: '公司报销',
        children: reimbursementNodes
      }
    ],
    [autoRecordNodes, installmentNodes, reimbursementNodes]
  )

  return <Tabs items={tabItems} selected={tab} onChange={setTab}></Tabs>
})

RecordTips.displayName = 'RecordTips'
export { RecordTips }
