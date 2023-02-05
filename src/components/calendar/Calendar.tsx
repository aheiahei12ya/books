import classNames from 'classnames'
import dayjs from 'dayjs'
import { forwardRef, useCallback, useState } from 'react'

import { CalendarProps } from '@/components/calendar/Calendar.types'
import { weekNames } from '@/components/calendar/locale'
import { backToToday, calendar, getDate, handleMonthChange } from '@/components/lib/calendar'
import { getValue } from '@/lib/pythonic'

import styles from './Calendar.module.sass'

const duration = require('dayjs/plugin/duration')
dayjs.extend(duration)

const Calendar = forwardRef<unknown, CalendarProps>((props, ref) => {
  Calendar.displayName = 'Calendar'
  const thisYear = dayjs().year()
  const thisMonth = dayjs().month()
  const today = dayjs().date()
  const [year, setYear] = useState<number>(thisYear)
  const [month, setMonth] = useState<number>(thisMonth)

  const makeCell = useCallback(
    (date: number, type: 'past' | 'current' | 'future', index: number) => {
      const ratio = (() => {
        const value = getValue(props?.expense?.[index], 0)
        if (type !== 'current' || !props.expense) return
        if (value === 0) return styles.calendarCellEmpty
        if (value <= 1) return styles.calendarCellLow
        if (value <= 3) return styles.calendarCellNormal
        if (value <= 5) return styles.calendarCellMiddle
        return styles.calendarCellExtreme
      })()
      const isToday = date === today && year === thisYear && month === thisMonth && type === 'current'
      return (
        <div
          className={classNames(styles.calendarCell, ratio, {
            [styles.calendarCellDisabled]: type !== 'current'
          })}
          key={`${type}-${date}`}
        >
          <span
            className={classNames(
              classNames(styles.calendarCellDate, {
                [styles.calendarCellToday]: isToday
              })
            )}
          >
            {date}
          </span>
          {props.expense && (
            <div className={classNames(styles.calendarCellAppend)}>
              <span>
                {props.expense[index]}
                {props.locale === 'zh-CN' ? '次' : ''}
              </span>
            </div>
          )}
        </div>
      )
    },
    [month, props.expense, props.locale, thisMonth, thisYear, today, year]
  )
  return (
    <div className={styles.calendar}>
      {!!props.showToolbar && (
        <div className={styles.toolBar}>
          <div className={styles.toolBarDate}>{getDate(props.locale, year, month)}</div>
          {!props.hideToolButton && (
            <div className={styles.toolBarTools}>
              <div className={styles.toolButton} onClick={() => setYear(year - 1)}>
                <i className="fa-regular fa-angles-left"></i>
              </div>
              <div
                className={styles.toolButton}
                onClick={() => handleMonthChange('sub', year, month, setYear, setMonth)}
              >
                <i className="fa-regular fa-angle-left"></i>
              </div>
              <div onClick={() => backToToday(year, month, setYear, setMonth)} className={styles.toolButton}>
                {props.locale === 'zh-CN' ? '今天' : 'Today'}
              </div>
              <div
                className={styles.toolButton}
                onClick={() => handleMonthChange('add', year, month, setYear, setMonth)}
              >
                <i className="fa-regular fa-angle-right"></i>
              </div>
              <div className={styles.toolButton} onClick={() => setYear(year + 1)}>
                <i className="fa-regular fa-angles-right"></i>
              </div>
            </div>
          )}
        </div>
      )}
      <div className={styles.calendarHeader}>
        {weekNames(props.locale).map((weekName) => {
          return <span key={weekName}>{weekName}</span>
        })}
      </div>
      <div className={styles.calendarCells}>{calendar(year, month, makeCell)}</div>
    </div>
  )
})

export { Calendar }
