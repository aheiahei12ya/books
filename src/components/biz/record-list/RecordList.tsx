import classNames from 'classnames'
import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { makeColumns } from '@/components/table/utils'
import get from '@/lib/pythonic/get'

import styles from './RecordList.module.scss'
import { RecordListProps } from './RecordList.types'

const RecordList = (props: RecordListProps) => {
  const i18n = useIntl()

  const columns = useMemo(() => {
    return makeColumns(i18n, [
      { key: 'time', i18n: 'pages.transaction.table.time', ellipsis: true, width: 70 },
      { key: 'type', i18n: 'pages.transaction.table.type', ellipsis: true, width: 70 },
      { key: 'account', i18n: 'pages.transaction.table.account', ellipsis: true, width: undefined },
      { key: 'method', i18n: 'pages.transaction.table.method', ellipsis: true, width: undefined },
      { key: 'category', i18n: 'pages.transaction.table.category', ellipsis: true, width: undefined },
      { key: 'subcategory', i18n: 'pages.transaction.table.subcategory', ellipsis: true, width: undefined },
      { key: 'amount', i18n: 'pages.transaction.table.amount', ellipsis: true, width: 80 },
      { key: 'note', i18n: 'pages.transaction.table.note', ellipsis: true, width: 100 }
    ])
  }, [i18n])

  const [header, colgroup] = useMemo(() => {
    const header: React.ReactNode[] = []
    const colgroup: React.ReactNode[] = []
    columns.forEach((column) => {
      const style = column?.width ? { width: `${column.width}px` } : {}
      colgroup.push(<col key={column.key} style={style}></col>)
      header.push(
        <th key={column.key}>
          <div className={classNames(styles.recordListHeaderCell, { [styles.recordListEllipsis]: column.ellipsis })}>
            {column.title}
          </div>
        </th>
      )
    })
    return [header, colgroup]
  }, [columns])

  const content = useMemo(() => {
    const contentColumns = ['time', 'type', 'account', 'method', 'category', 'subcategory', 'amount', 'note']
    const content: React.ReactNode[] = []
    props.expenses.forEach((singleDay) => {
      content.push(
        <tr key={singleDay?.day}>
          <td colSpan={8}>
            <div className={styles.recordListTitleRow}>
              <div className={styles.recordListTitleDate}>
                <span className={styles.recordListTitleDateDay}>{singleDay?.day}</span>/<span>{singleDay?.month}</span>/
                <span>{singleDay?.year}</span>
              </div>
              <div className={styles.recordListTitleExpense}>
                <span>{i18n.formatMessage({ id: 'pages.transaction.record.expense' })}：</span>
                <span className={styles.recordListTitleExpenseGreen}>{singleDay?.expense}</span>
              </div>
            </div>
          </td>
        </tr>
      )

      singleDay?.items?.forEach((item) => {
        content.push(
          <tr key={item.id} className={styles.recordListContentRow}>
            {contentColumns.map((columnName) => (
              <td key={columnName} className={styles.recordListContentCell}>
                {get(item, columnName, undefined)}
              </td>
            ))}
          </tr>
        )
      })
    })

    return content
  }, [i18n, props.expenses])

  return (
    <table className={styles.recordList}>
      <colgroup>{colgroup}</colgroup>
      <thead>
        <tr className={styles.recordListHeaderRow}>{header}</tr>
      </thead>
      <tbody>{content}</tbody>
    </table>
  )
}

RecordList.displayName = 'RecordList'
export { RecordList }
