import React, { forwardRef, useMemo, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { HistoryTodayRecord } from '@/components/biz/history-today/HistoryToday.types'
import Empty from '@/components/empty'
import Table from '@/components/table'
import { makeColumns } from '@/components/table/utils'
import useRequest from '@/hooks/useRequest'
import services from '@/services'

import styles from './HistoryToday.module.scss'

const HistoryToday = forwardRef(() => {
  const i18n = useIntl()
  const [items, setItems] = useState([])

  const columns = useMemo(() => {
    return makeColumns(i18n, [
      { key: 'note', i18n: 'pages.transaction.table.note', ellipsis: true, width: 100 },
      { key: 'category', i18n: 'pages.transaction.table.category', ellipsis: true, width: undefined },
      { key: 'subcategory', i18n: 'pages.transaction.table.subcategory', ellipsis: true, width: undefined },
      { key: 'amount', i18n: 'pages.transaction.table.amount', ellipsis: true, width: 80 }
    ])
  }, [i18n])

  useRequest(
    () => {
      const date = new Date()
      return services.statistic.historyToday({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.getDate()
      })
    },
    {
      onSuccess: (data) => {
        if (data.success) {
          setItems(data.data.records)
        }
      }
    }
  )

  return items.length ? (
    <div className={styles.historyToday}>
      {items.map((record: HistoryTodayRecord) => (
        <Table
          className={styles.historyTodayChildren}
          key={record.year}
          title={record.year}
          columns={columns}
          data={record.items}
          size={'medium'}
          showHeader
          fixHeader
        ></Table>
      ))}
    </div>
  ) : (
    <Empty>
      <FormattedMessage id={'pages.record.statistic.empty'}></FormattedMessage>
    </Empty>
  )
})

HistoryToday.displayName = 'HistoryToday'

export { HistoryToday }
