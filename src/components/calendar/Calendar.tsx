import classNames from 'classnames'
import dayjs from 'dayjs'
import { forwardRef, ReactElement, useCallback, useMemo, useState } from 'react'

import { CalendarProps } from '@/components/calendar/Calendar.types'
import { monthNames, weekNames } from '@/components/calendar/locale'
import { getValue, range } from '@/lib/pythonic'

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
  const getDate = () => {
    if (props.locale === 'zh-CN') {
      return `${year}年${month + 1}月`
    } else {
      return `${monthNames[month]} ${year}`
    }
  }
  const backToToday = () => {
    setYear(thisYear)
    setMonth(thisMonth)
  }
  const handleMonthChange = (method: 'sub' | 'add') => {
    switch (method) {
      case 'add':
        if (month >= 11) {
          setYear(year + 1)
          setMonth(0)
        } else {
          setMonth(month + 1)
        }
        break
      case 'sub':
        if (month <= 0) {
          setYear(year - 1)
          setMonth(11)
        } else {
          setMonth(month - 1)
        }
        break
      default:
        break
    }
  }
  const handleSelect = useCallback(
    (date: number, type: 'past' | 'current' | 'future') => {
      switch (type) {
        case 'past':
          if (!month) props.onSelect?.(year - 1, 11, date)
          else props.onSelect?.(year, month - 1, date)
          break
        case 'future':
          if (month === 11) props.onSelect?.(year + 1, 0, date)
          else props.onSelect?.(year, month + 1, date)
          break
        default:
          props.onSelect?.(year, month, date)
      }
    },
    [month, props, year]
  )
  const makeCell = useCallback(
    (date: number, type: 'past' | 'current' | 'future', index: number) => {
      const ratio = (() => {
        const value = getValue(props?.expense?.[index], 0)
        if (type !== 'current') return
        if (value === 0) return styles.calendarCellEmpty
        if (value <= 1) return styles.calendarCellLow
        if (value <= 3) return styles.calendarCellNormal
        if (value <= 5) return styles.calendarCellMiddle
        return styles.calendarCellExtreme
      })()
      return (
        <div
          className={classNames(styles.calendarCell, ratio, {
            [styles.calendarCellDisabled]: type !== 'current',
            [styles.calendarCellSelected]: !!props.onSelect
          })}
          key={`${type}-${date}`}
          onClick={() => handleSelect(date, type)}
        >
          <span
            className={classNames(
              classNames({
                [styles.calendarCellToday]:
                  date === today && year === thisYear && month === thisMonth
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
    [
      handleSelect,
      month,
      props.expense,
      props.locale,
      props.onSelect,
      thisMonth,
      thisYear,
      today,
      year
    ]
  )
  const calendar = useMemo(() => {
    const calendar: ReactElement[] = []
    const beforeMonth: number[] = []
    const afterMonth: number[] = []

    const days = new Date(year, month + 1, 0).getDate()
    const lastMonthDays = new Date(year, month, 0).getDate()
    let firstDay = dayjs().year(year).month(month).date(1).day()
    let lastDay = 6 - dayjs().year(year).month(month).date(days).day()

    while (firstDay) {
      --firstDay
      beforeMonth.push(lastMonthDays - firstDay)
    }
    let lastIndex = 0
    while (lastDay) {
      --lastDay
      afterMonth.push(++lastIndex)
    }

    let count = 0
    beforeMonth.forEach((i) => {
      calendar.push(makeCell(i, 'past', count))
      ++count
    })
    range(1, days + 1).forEach((i) => {
      calendar.push(makeCell(i, 'current', count))
      ++count
    })
    afterMonth.forEach((i) => {
      calendar.push(makeCell(i, 'future', count))
      ++count
    })
    return calendar
  }, [makeCell, month, year])
  return (
    <div className={styles.calendar}>
      {!!props.showToolbar && (
        <div className={styles.toolBar}>
          <div className={styles.toolBarDate}>{getDate()}</div>
          {!props.hideToolButton && (
            <div className={styles.toolBarTools}>
              <div
                className={styles.toolButton}
                onClick={() => setYear(year - 1)}
              >
                <i className="fa-regular fa-angles-left"></i>
              </div>
              <div
                className={styles.toolButton}
                onClick={() => handleMonthChange('sub')}
              >
                <i className="fa-regular fa-angle-left"></i>
              </div>
              <div onClick={backToToday} className={styles.toolButton}>
                {props.locale === 'zh-CN' ? '今天' : 'Today'}
              </div>
              <div
                className={styles.toolButton}
                onClick={() => handleMonthChange('add')}
              >
                <i className="fa-regular fa-angle-right"></i>
              </div>
              <div
                className={styles.toolButton}
                onClick={() => setYear(year + 1)}
              >
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
      <div className={styles.calendarCells}>{calendar}</div>
    </div>
  )
})

export { Calendar }
