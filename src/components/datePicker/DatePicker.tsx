import classNames from 'classnames'
import dayjs from 'dayjs'
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'

import {
  calendar,
  getDate,
  handleDaySelect,
  handleMonthChange,
  handleSelect
} from '@/components/lib/calendar'
import useHover from '@/hooks/useHover'

import styles from './DatePicker.module.sass'
import { DatePickerProps } from './DatePicker.types'
import { weekNames } from './locale'

const DatePicker = forwardRef<unknown, DatePickerProps>((props, ref) => {
  DatePicker.displayName = 'DatePicker'
  const size = props.size || 'default'
  const activate = props.activate || 'click'
  const [buttonRef, hover] = useHover()
  const calendarRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<boolean>(false)
  const [selected, setSelected] = useState(props.defaultSelected)
  const [rule, setRule] = useState({
    error: false,
    message: <></>
  })
  const thisYear = dayjs().year()
  const thisMonth = dayjs().month()
  const today = dayjs().date()
  const [year, setYear] = useState<number>(thisYear)
  const [month, setMonth] = useState<number>(thisMonth)
  const width = props.width || '220px'
  const height = props.height || '230px'

  const onClickOutsideHandler = useCallback(
    (e: Event) => {
      if (!buttonRef.current) return
      buttonRef.current.contains(e.target) || handleCalendar('deactivate')
    },
    [buttonRef]
  )

  const handleCalendar = useCallback(
    (type: 'activate' | 'deactivate') => {
      const nodeRef = calendarRef.current!
      if (type === 'activate') {
        setActive(true)
        nodeRef.style.maxHeight = height
        nodeRef.style.height = height
        nodeRef.style.maxWidth = width
        nodeRef.style.width = width
        document.addEventListener('click', onClickOutsideHandler)
      } else {
        setActive(false)
        nodeRef.style.maxHeight = '0'
        setTimeout(() => {
          nodeRef.style.maxWidth = '0'
        }, 300)
        document.removeEventListener('click', onClickOutsideHandler)
      }
    },
    [height, onClickOutsideHandler, width]
  )

  const handleClick = () => {
    if (!active) {
      handleCalendar('activate')
    } else {
      handleCalendar('deactivate')
    }
  }

  useEffect(() => {
    if (activate === 'hover') {
      if (hover) {
        handleCalendar('activate')
      } else {
        handleCalendar('deactivate')
      }
    }
  }, [hover])

  const makeCell = useCallback(
    (selectedDay: number, type: 'past' | 'current' | 'future') => {
      const isToday =
        selectedDay === today && year === thisYear && month === thisMonth
      const [selectedYear, selectedMonth] = handleDaySelect(type, year, month)
      return (
        <div
          className={ classNames(styles.calendarCell, {
            [styles.calendarCellDisabled]: type !== 'current'
          }) }
          key={ `${ type }-${ selectedDay }` }
          onClick={ () =>
            handleSelect(
              selectedYear,
              selectedMonth,
              selectedDay,
              setYear,
              setMonth,
              setSelected,
              () => handleCalendar('deactivate'),
              props.onSelect
            )
          }
        >
          <span
            className={ classNames(
              classNames(styles.calendarCellContainer, {
                [styles.calendarCellToday]: isToday,
                [styles.calendarCellSelected]:
                selected ===
                `${ selectedYear }-${ selectedMonth + 1 }-${ selectedDay }`
              })
            ) }
          >
            { selectedDay }
          </span>
        </div>
      )
    },
    [
      buttonRef,
      month,
      props.onSelect,
      selected,
      thisMonth,
      thisYear,
      today,
      year
    ]
  )

  return (
    <div ref={ buttonRef }>
      <div
        className={ classNames(styles.datePickerBox, {
          [styles.datePickerBoxSm]: size === 'small',
          [styles.datePickerBoxLg]: size === 'large',
          [styles.datePickerBoxBase]: size === 'default',
          [styles.datePickerBoxError]: rule.error,
          [styles.datePickerBoxFocus]: active
        }) }
        onClick={ handleClick }
      >
        { !!props.prepend && (
          <span
            className={ classNames(styles.datePickerPrefix, {
              [styles.datePickerPrefixActive]:
              (hover && activate === 'hover') || active
            }) }
          >
            { props.prepend }
          </span>
        ) }
        <div
          className={ classNames(styles.datePicker, {
            [styles.datePickerPlaceholder]: !selected,
            [styles.datePickerFocus]: (hover && activate === 'hover') || active
          }) }
        >
          { selected || props.placeholder }
        </div>
      </div>
      { !props.hideMessage && (
        <div className={ styles.datePickerWarning }>
          { (props.error && props.errorMessage) || (rule.error && rule.message) }
        </div>
      ) }
      <div
        onClick={ (e) => e.stopPropagation() }
        ref={ calendarRef }
        className={ styles.calendarBox }
      >
        <div className={ styles.calendar }>
          <div className={ styles.toolBar }>
            <div
              className={ styles.toolButton }
              onClick={ () => setYear(year - 1) }
            >
              <i className="fa-regular fa-angles-left"></i>
            </div>
            <div
              className={ styles.toolButton }
              onClick={ () =>
                handleMonthChange('sub', year, month, setYear, setMonth)
              }
            >
              <i className="fa-regular fa-angle-left"></i>
            </div>
            <div className={ styles.toolBarDate }>
              { getDate(props.locale, year, month) }
            </div>
            <div
              className={ styles.toolButton }
              onClick={ () =>
                handleMonthChange('add', year, month, setYear, setMonth)
              }
            >
              <i className="fa-regular fa-angle-right"></i>
            </div>
            <div
              className={ styles.toolButton }
              onClick={ () => setYear(year + 1) }
            >
              <i className="fa-regular fa-angles-right"></i>
            </div>
          </div>
          <div className={ styles.calendarHeader }>
            { weekNames(props.locale).map((weekName) => {
              return <span key={ weekName }>{ weekName }</span>
            }) }
          </div>
          <div className={ styles.calendarCells }>
            { calendar(year, month, makeCell) }
          </div>
          {/*<div onClick={ backToToday } className={ styles.toolButton }>*/ }
          {/*  { props.locale === 'zh-CN' ? '今天' : 'Today' }*/ }
          {/*</div>*/ }
        </div>
      </div>
    </div>
  )
})

export { DatePicker }
