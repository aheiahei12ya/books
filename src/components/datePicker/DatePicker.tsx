import classNames from 'classnames'
import dayjs from 'dayjs'
import {
  forwardRef,
  ReactElement,
  useCallback,
  useMemo,
  useRef,
  useState
} from 'react'

import useHover from '@/hooks/useHover'
import { range } from '@/lib/pythonic'

import styles from './DatePicker.module.sass'
import { DatePickerProps } from './DatePicker.types'
import { monthNames, weekNames } from './locale'

const DatePicker = forwardRef<unknown, DatePickerProps>((props, ref) => {
  DatePicker.displayName = 'DatePicker'
  const size = props.size || 'default'
  const activate = props.activate || 'click'
  const [buttonRef, hover] = useHover()
  const sheetRef = useRef<HTMLDivElement>(null)
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

  const activateDropdown = useCallback(
    (type: 'activate' | 'deactivate') => {
      const nodeRef = sheetRef.current!
      const onClickOutsideHandler = (e: Event) => {
        if (!buttonRef.current) return
        buttonRef.current.contains(e.target) || activateDropdown('deactivate')
      }
      if (type === 'activate') {
        setActive(true)
        nodeRef.style.maxHeight = '230px'
        nodeRef.style.height = '230px'
        document.addEventListener('click', onClickOutsideHandler)
      } else {
        setActive(false)
        nodeRef.style.maxHeight = '0'
        document.removeEventListener('click', onClickOutsideHandler)
      }
    },
    [buttonRef]
  )

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (!active) {
      activateDropdown('activate')
    } else {
      activateDropdown('deactivate')
    }
  }

  const getDate = () => {
    if (props.locale === 'zh-CN') {
      return `${ year }年${ month + 1 }月`
    } else {
      return `${ monthNames[month] } ${ year }`
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
    (date: number, type: 'past' | 'current' | 'future', index: number) => {
      let selectedYear = year
      let selectedMonth = month
      switch (type) {
        case 'past':
          if (!month) {
            selectedYear = year - 1
            selectedMonth = 11
          } else {
            selectedMonth = month - 1
          }
          break
        case 'future':
          if (month === 11) {
            selectedYear = year + 1
            selectedMonth = 0
          } else {
            selectedMonth = month + 1
          }
          break
        default:
          props.onSelect?.(selectedYear, selectedMonth, date)
      }
      props.onSelect?.(selectedYear, selectedMonth + 1, date)
      const selectedDate = `${ selectedYear }-${ selectedMonth + 1 }-${ date }`
      setSelected(selectedDate)
      activateDropdown('deactivate')
      return selectedDate
    },
    [activateDropdown, month, props, year]
  )
  const makeCell = useCallback(
    (date: number, type: 'past' | 'current' | 'future', index: number) => {
      const isToday = date === today && year === thisYear && month === thisMonth
      return (
        <div
          className={ classNames(styles.calendarCell, {
            [styles.calendarCellDisabled]: type !== 'current'
          }) }
          key={ `${ type }-${ date }` }
          onClick={ () => handleSelect(date, type, index) }
        >
          <span
            className={ classNames(
              classNames(styles.calendarCellContainer, {
                [styles.calendarCellToday]: isToday,
                [styles.calendarCellSelected]:
                selected === `${ year }-${ month + 1 }-${ date }`
              })
            ) }
          >
            { date }
          </span>
        </div>
      )
    },
    [handleSelect, month, selected, thisMonth, thisYear, today, year]
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
    <>
      <div
        ref={ buttonRef }
        className={ classNames(styles.datePickerBox, {
          [styles.datePickerBoxSm]: size === 'small',
          [styles.datePickerBoxLg]: size === 'large',
          [styles.datePickerBoxBase]: size === 'default',
          [styles.datePickerBoxError]: rule.error,
          [styles.datePickerBoxFocus]: active
        }) }
        onClick={ (e) => {
          handleClick(e)
        } }
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
        ref={ sheetRef }
        className={ styles.calendarBox }
      >
        <div className={ styles.datePickerCalendar }>
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
                onClick={ () => handleMonthChange('sub') }
              >
                <i className="fa-regular fa-angle-left"></i>
              </div>
              <div className={ styles.toolBarDate }>{ getDate() }</div>
              <div
                className={ styles.toolButton }
                onClick={ () => handleMonthChange('add') }
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
            <div className={ styles.calendarCells }>{ calendar }</div>
            {/*<div onClick={ backToToday } className={ styles.toolButton }>*/ }
            {/*  { props.locale === 'zh-CN' ? '今天' : 'Today' }*/ }
            {/*</div>*/ }
          </div>
        </div>
      </div>
    </>
  )
})

export { DatePicker }
