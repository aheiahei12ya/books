import { forwardRef, useMemo, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { RecordTipsProps, RecordTipsRef } from '@/components/biz/record-tips/RecordTips.types'
import Button from '@/components/button'
import Empty from '@/components/empty'
import Table from '@/components/table'
import { makeColumns } from '@/components/table/utils'
import Tabs from '@/components/tabs'
import useRequest from '@/hooks/useRequest'
import services from '@/services'

const RecordTips = forwardRef<RecordTipsRef, RecordTipsProps>((props, ref) => {
  const i18n = useIntl()

  const [tab, setTab] = useState<number>(0)
  const [items, setItems] = useState({
    reimbursementItems: [],
    autoRecordItems: [],
    installmentItems: []
  })

  useRequest(
    () => {
      const date = new Date()
      return services.statistic.methodReminder({
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

  const installmentColumns = useMemo(() => {
    return makeColumns(i18n, [
      { key: 'note', i18n: 'pages.transaction.table.note', ellipsis: true, width: 100 },
      { key: 'remain', i18n: 'pages.transaction.installment.remain', ellipsis: true },
      { key: 'finish', i18n: 'pages.transaction.installment.finish', ellipsis: true },
      { key: 'amount', i18n: 'pages.transaction.installment.amount', ellipsis: true, width: 80 }
    ])
  }, [i18n])

  const autoRecordColumns = useMemo(() => {
    return makeColumns(i18n, [
      { key: 'date', i18n: 'pages.transaction.autoRecord.date', ellipsis: true, width: 80 },
      { key: 'note', i18n: 'pages.transaction.table.note', ellipsis: true },
      { key: 'remain', i18n: 'pages.transaction.autoRecord.remain', ellipsis: true, width: 40 },
      { key: 'amount', i18n: 'pages.transaction.autoRecord.amount', ellipsis: true, width: 50 },
      {
        key: 'operate',
        dataIndex: 'id',
        i18n: 'pages.transaction.autoRecord.operate',
        render: (text) => (
          <div style={{ display: 'flex', gap: '3px' }}>
            <Button size={'mini'} type={'text'} onClick={() => console.log(text)}>
              <FormattedMessage id={'pages.transaction.autoRecord.prolong'}></FormattedMessage>
            </Button>
            <Button size={'mini'} type={'text'} color={'danger'} onClick={() => console.log(text)}>
              <FormattedMessage id={'pages.transaction.autoRecord.stop'}></FormattedMessage>
            </Button>
          </div>
        )
      }
    ])
  }, [i18n])

  const reimbursementColumns = useMemo(() => {
    return makeColumns(i18n, [
      { key: 'date', i18n: 'pages.transaction.reimbursement.date', ellipsis: true, width: undefined },
      { key: 'note', i18n: 'pages.transaction.table.note', ellipsis: true, width: 100 },
      { key: 'state', i18n: 'pages.transaction.reimbursement.state', ellipsis: true, width: undefined },
      {
        key: 'operate',
        dataIndex: 'id',
        i18n: 'pages.transaction.reimbursement.operate',
        render: (text) => (
          <Button size={'mini'} type={'text'} onClick={() => console.log(text)}>
            <FormattedMessage id={'pages.transaction.reimbursement.finish'}></FormattedMessage>
          </Button>
        )
      }
    ])
  }, [i18n])

  const reimbursementNodes = useMemo(() => {
    if (items.reimbursementItems.length) {
      setTab(2)
    }
    return items.reimbursementItems.length ? (
      <Table
        columns={reimbursementColumns}
        data={items.reimbursementItems}
        size={'small'}
        textAlign={'left'}
        showHeader
        fixHeader
      ></Table>
    ) : (
      <Empty>
        <FormattedMessage id={'pages.record.statistic.empty'}></FormattedMessage>
      </Empty>
    )
  }, [items.reimbursementItems, reimbursementColumns])

  const autoRecordNodes = useMemo(() => {
    if (items.autoRecordItems.length) {
      setTab(1)
    }
    return items.autoRecordItems.length ? (
      <Table
        columns={autoRecordColumns}
        data={items.autoRecordItems}
        size={'small'}
        textAlign={'left'}
        showHeader
        fixHeader
      ></Table>
    ) : (
      <Empty>
        <FormattedMessage id={'pages.record.statistic.empty'}></FormattedMessage>
      </Empty>
    )
  }, [autoRecordColumns, items.autoRecordItems])

  const installmentNodes = useMemo(() => {
    if (items.installmentItems.length) {
      setTab(0)
    }
    return items.installmentItems.length ? (
      <Table
        columns={installmentColumns}
        data={items.installmentItems}
        size={'small'}
        textAlign={'left'}
        showHeader
        fixHeader
      ></Table>
    ) : (
      <Empty>
        <FormattedMessage id={'pages.record.statistic.empty'}></FormattedMessage>
      </Empty>
    )
  }, [installmentColumns, items.installmentItems])

  const tabItems = useMemo(
    () => [
      {
        key: '1',
        label: i18n.formatMessage({ id: 'pages.transaction.table.installment' }),
        children: installmentNodes
      },
      {
        key: '2',
        label: i18n.formatMessage({ id: 'pages.transaction.table.autoRecord' }),
        children: autoRecordNodes
      },
      {
        key: '3',
        label: i18n.formatMessage({ id: 'pages.transaction.table.reimbursement' }),
        children: reimbursementNodes
      }
    ],
    [autoRecordNodes, i18n, installmentNodes, reimbursementNodes]
  )

  return <Tabs items={tabItems} selected={tab} onChange={setTab}></Tabs>
})

RecordTips.displayName = 'RecordTips'
export { RecordTips }
