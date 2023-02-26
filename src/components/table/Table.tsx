import classNames from 'classnames'
import React, { forwardRef, useMemo } from 'react'

import { TableProps, TableRef } from '@/components/table/Table.types'

import styles from './Table.module.scss'

const Table = forwardRef<TableRef, TableProps>((props, ref) => {
  const size = props.size || 'medium'
  const textAlign = props.textAlign || 'center'
  const [header, colgroup] = useMemo(() => {
    const header: React.ReactNode[] = []
    const colgroup: React.ReactNode[] = []
    props.columns.forEach((column) => {
      const style = column?.width ? { width: `${column.width}px` } : {}
      colgroup.push(<col key={column.key} style={style}></col>)
      header.push(
        <th
          key={column.key}
          className={classNames(styles.tableHeaderCell, styles[`table-${size}`], {
            [styles.tableEllipsis]: column.ellipsis
          })}
          style={{ textAlign: textAlign }}
        >
          {column.title}
        </th>
      )
    })
    return [header, colgroup]
  }, [textAlign, props.columns, size])

  const body = useMemo(() => {
    return props.data.map((item: any, index) => {
      return (
        <tr key={index} className={styles.tableRow}>
          {props.columns.map((column) => (
            <td
              key={column.key}
              className={classNames(styles[`table-${size}`], { [styles.tableEllipsis]: column.ellipsis })}
              style={{ textAlign: textAlign }}
            >
              {column?.render ? column.render(item[column.dataIndex]) : item[column.dataIndex]}
            </td>
          ))}
        </tr>
      )
    })
  }, [textAlign, props.columns, props.data, size])

  return (
    <div className={classNames(styles.tableContainer, props?.className)}>
      {props.title && <span className={styles.tableTitle}>{props.title}</span>}
      {props.fixHeader ? (
        <>
          <div className={styles.headerContainer}>
            <table className={classNames(styles.table)}>
              <colgroup>{colgroup}</colgroup>
              {props.showHeader && (
                <thead className={styles.tableHeader}>
                  <tr className={styles.tableRow}>{header}</tr>
                </thead>
              )}
            </table>
          </div>
          <div className={styles.bodyContainer}>
            <table className={classNames(styles.table)}>
              <colgroup>{colgroup}</colgroup>
              <tbody>{body}</tbody>
            </table>
          </div>
        </>
      ) : (
        <table className={classNames(styles.table)}>
          <colgroup>{colgroup}</colgroup>
          {props.showHeader && (
            <thead className={styles.tableHeader}>
              <tr className={styles.tableRow}>{header}</tr>
            </thead>
          )}
          <tbody>{body}</tbody>
        </table>
      )}
    </div>
  )
})

Table.displayName = 'Table'
export { Table }
