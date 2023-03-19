import classNames from 'classnames'
import React, { useMemo } from 'react'

import { columns } from './config'
import styles from './RecordList.module.scss'
import { RecordListProps } from './RecordList.types'

const expense = {
  '28,': [
    {
      id: 2553,
      form: '支出',
      form_id: 1,
      category: '虚拟商品',
      category_id: 7,
      project: '年费',
      project_id: 31,
      platform: '应用商店',
      platform_id: 6,
      account: '花呗',
      account_id: 5,
      figure: '5.00',
      date: '2023-03-28',
      time: '14:56:00',
      method: '自动',
      detail: 'Apple Music\n第7次自动记录\n剩余次数：5',
      installment_bill_id: null,
      installment_phase: 0,
      installment_current: 0,
      installment_remain: 0,
      auto_record_bill_id: 11,
      auto_record_phase: 12,
      auto_record_times: 7,
      auto_record_remain: 5,
      record_datetime: '2022-10-01T20:06:15.257'
    }
  ],
  '25,': [
    {
      id: 2623,
      form: '支出',
      form_id: 1,
      category: '虚拟商品',
      category_id: 7,
      project: '年费',
      project_id: 31,
      platform: '应用商店',
      platform_id: 6,
      account: '花呗',
      account_id: 5,
      figure: '6.00',
      date: '2023-03-25',
      time: '00:02:00',
      method: '自动',
      detail: 'iCloud\n第6次自动记录\n剩余次数：6',
      installment_bill_id: null,
      installment_phase: 0,
      installment_current: 0,
      installment_remain: 0,
      auto_record_bill_id: 12,
      auto_record_phase: 12,
      auto_record_times: 6,
      auto_record_remain: 6,
      record_datetime: '2022-10-29T19:03:32.522'
    }
  ],
  '18,': [
    {
      id: 1806,
      form: '支出',
      form_id: 1,
      category: '设备引进',
      category_id: 10,
      project: '小型',
      project_id: 44,
      platform: '苹果商店',
      platform_id: 8,
      account: '花呗',
      account_id: 5,
      figure: '299.88',
      date: '2023-03-18',
      time: '20:10:00',
      method: '分期',
      detail: 'iPhone 13第19期\n剩余5期',
      installment_bill_id: 21,
      installment_phase: 24,
      installment_current: 19,
      installment_remain: 5,
      auto_record_bill_id: null,
      auto_record_phase: 0,
      auto_record_times: 0,
      auto_record_remain: 0,
      record_datetime: '2021-09-19T10:03:04.459'
    },
    {
      id: 1830,
      form: '支出',
      form_id: 1,
      category: '设备引进',
      category_id: 10,
      project: '小型',
      project_id: 44,
      platform: '苹果商店',
      platform_id: 8,
      account: '花呗',
      account_id: 5,
      figure: '429.04',
      date: '2023-03-18',
      time: '20:12:00',
      method: '分期',
      detail: 'iPhone 13 Pro第19期\n剩余5期',
      installment_bill_id: 22,
      installment_phase: 24,
      installment_current: 19,
      installment_remain: 5,
      auto_record_bill_id: null,
      auto_record_phase: 0,
      auto_record_times: 0,
      auto_record_remain: 0,
      record_datetime: '2021-09-19T10:03:46.709'
    }
  ]
}

const RecordList = (props: RecordListProps) => {
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
  }, [])

  return (
    <table className={styles.recordList}>
      <colgroup>{colgroup}</colgroup>
      <thead>
        <tr className={styles.recordListHeaderRow}>{header}</tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={8}>
            <div className={styles.recordListTitleRow}>
              <div className={styles.recordListTitleDate}>
                <span className={styles.recordListTitleDateDay}>23</span>/<span>3</span>/<span>2023</span>
              </div>
              <div className={styles.recordListTitleExpense}>
                <span>支出：</span>
                <span className={styles.recordListTitleExpenseGreen}>5.00</span>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

RecordList.displayName = 'RecordList'
export { RecordList }
