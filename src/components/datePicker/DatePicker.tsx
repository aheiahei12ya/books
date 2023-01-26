import classNames from 'classnames'
import dayjs from 'dayjs'
import { forwardRef, useCallback, useRef, useState } from 'react'

import {
  calendar,
  getDate,
  handleDaySelect,
  handleMonthChange,
  handleSelect
} from '@/components/lib/calendar'
import useControlled from '@/hooks/useControlled'

import styles from './DatePicker.module.sass'
import { DatePickerProps } from './DatePicker.types'
import { weekNames } from './locale'

const DatePicker = forwardRef<unknown, DatePickerProps>((props, ref) => {
  const size = props.size || 'default'
  const buttonRef = useRef<HTMLDivElement>(null)
  const calendarRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<boolean>(false)
  const [selected, setSelected] = useControlled(
    props.defaultSelected,
    props.onChange
  )
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
    ({ target }: MouseEvent) => {
      if (!buttonRef.current) return
      if (buttonRef.current.contains(target as Node)) return
      setActive(false)
      calendarRef.current!.style.maxHeight = '0'
      setTimeout(() => {
        calendarRef.current!.style.maxWidth = '0'
      }, 300)
      document.removeEventListener('click', onClickOutsideHandler)
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

  const makeCell = useCallback(
    (selectedDay: number, type: 'past' | 'current' | 'future') => {
      const isToday =
        selectedDay === today && year === thisYear && month === thisMonth
      const [selectedYear, selectedMonth] = handleDaySelect(type, year, month)
      return (
        <div
          className={ classNames(styles.datePickerCalendarCell, {
            [styles.datePickerCalendarCellDisabled]: type !== 'current'
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
              () => handleCalendar('deactivate')
            )
          }
        >
          <span
            className={ classNames(
              classNames(styles.datePickerCalendarCellContainer, {
                [styles.datePickerCalendarCellToday]: isToday,
                [styles.datePickerCalendarCellSelected]:
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
      handleCalendar,
      month,
      selected,
      setSelected,
      thisMonth,
      thisYear,
      today,
      year
    ]
  )

  return (
    <div ref={ buttonRef }>
      <div
        className={ classNames(styles.datePickerButton, {
          [styles.datePickerButtonSm]: size === 'small',
          [styles.datePickerButtonLg]: size === 'large',
          [styles.datePickerButtonBase]: size === 'default',
          [styles.datePickerButtonError]: rule.error,
          [styles.datePickerButtonFocus]: active
        }) }
        onClick={ handleClick }
      >
        { !!props.prepend && (
          <span
            className={ classNames(styles.datePickerButtonInnerPrefix, {
              [styles.datePickerButtonInnerPrefixActive]: active
            }) }
          >
            { props.prepend }
          </span>
        ) }
        <div
          className={ classNames(styles.datePickerButtonInner, {
            [styles.datePickerButtonInnerPlaceholder]: !selected,
            [styles.datePickerButtonInnerFocus]: active
          }) }
        >
          { selected || props.placeholder }
        </div>
      </div>
      { !props.hideMessage && (
        <div className={ styles.datePickerButtonInnerWarning }>
          { (props.error && props.errorMessage) || (rule.error && rule.message) }
        </div>
      ) }
      <div
        onClick={ (e) => e.stopPropagation() }
        ref={ calendarRef }
        className={ styles.datePickerCalendar }
      >
        <div className={ styles.datePickerCalendarInner }>
          <div className={ styles.datePickerToolBar }>
            <div
              className={ styles.datePickerToolBarButton }
              onClick={ () => setYear(year - 1) }
            >
              <i className="fa-regular fa-angles-left"></i>
            </div>
            <div
              className={ styles.datePickerToolBarButton }
              onClick={ () =>
                handleMonthChange('sub', year, month, setYear, setMonth)
              }
            >
              <i className="fa-regular fa-angle-left"></i>
            </div>
            <div className={ styles.datePickerToolBarDate }>
              { getDate(props.locale, year, month) }
            </div>
            <div
              className={ styles.datePickerToolBarButton }
              onClick={ () =>
                handleMonthChange('add', year, month, setYear, setMonth)
              }
            >
              <i className="fa-regular fa-angle-right"></i>
            </div>
            <div
              className={ styles.datePickerToolBarButton }
              onClick={ () => setYear(year + 1) }
            >
              <i className="fa-regular fa-angles-right"></i>
            </div>
          </div>
          <div className={ styles.datePickerCalendarHeader }>
            { weekNames(props.locale).map((weekName) => {
              return <span key={ weekName }>{ weekName }</span>
            }) }
          </div>
          <div className={ styles.datePickerCalendarCells }>
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

DatePicker.displayName = 'DatePicker'

export { DatePicker }
