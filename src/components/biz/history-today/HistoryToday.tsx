import React, { forwardRef, useMemo, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { HistoryTodayRecord } from '@/components/biz/history-today/HistoryToday.types'
import Empty from '@/components/empty'
import Table from '@/components/table'
import { ColumnType } from '@/components/table/Table.types'
import useRequest from '@/hooks/useRequest'
import services from '@/services'

import styles from './HistoryToday.module.scss'

const HistoryToday = forwardRef(() => {
  const i18n = useIntl()
  const [items, setItems] = useState([])

  const columns = useMemo(() => {
    const columns: ColumnType[] = []
    for (const item of [
      ['note', 'pages.transaction.table.note', true, 100],
      ['category', 'pages.transaction.table.category', true, undefined],
      ['subcategory', 'pages.transaction.table.subcategory', true, undefined],
      ['amount', 'pages.transaction.table.amount', true, 80]
    ]) {
      columns.push({
        key: item[0] as string,
        dataIndex: item[0] as string,
        title: i18n.formatMessage({ id: item[1] as string }),
        ellipsis: item[2] as boolean,
        width: item[3] as number
      })
    }

    return columns
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
