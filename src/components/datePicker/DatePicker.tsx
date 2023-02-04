import classNames from 'classnames'
import dayjs from 'dayjs'
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState
} from 'react'

import {
  calendar,
  getDate,
  handleDaySelect,
  handleMonthChange,
  handleSelect
} from '@/components/lib/calendar'
import { dropdownHandler } from '@/components/lib/dropdown'
import { checkRules, RuleType } from '@/components/lib/rule'
import useControlled from '@/hooks/useControlled'

import styles from './DatePicker.module.sass'
import { DatePickerProps } from './DatePicker.types'
import { weekNames } from './locale'

const DatePicker = forwardRef<unknown, DatePickerProps>((props, ref) => {
  const size = props.size || 'default'
  const buttonRef = useRef<HTMLDivElement>(null)
  const calendarRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<boolean>(false)
  const [selected, setSelected] = useControlled(props.value, props.onChange)
  const [rule, setRule] = useState({
    error: false,
    message: <></>
  })
  const thisYear = dayjs().year()
  const thisMonth = dayjs().month()
  const today = dayjs().date()
  const [year, setYear] = useState<number>(thisYear)
  const [month, setMonth] = useState<number>(thisMonth)

  const onClickOutsideHandler = useCallback(
    ({ target }: MouseEvent) => {
      if (!buttonRef.current) return
      if (buttonRef.current.contains(target as Node)) return
      setActive(false)
      checkRules(props.rules as RuleType[], setRule, selected)
      calendarRef.current!.style.maxHeight = '0'
      setTimeout(() => {
        calendarRef.current!.style.maxWidth = '0'
      }, 300)
      document.removeEventListener('click', onClickOutsideHandler)
    },
    [props.rules, selected]
  )

  const [activateDropdown, deactivateDropdown] = dropdownHandler(
    calendarRef,
    buttonRef,
    setActive,
    props.width || '220px',
    props.height || '230px',
    onClickOutsideHandler as EventListener
  )

  const handleSelectDate = (value: string) => {
    setSelected(value)
    checkRules(props.rules as RuleType[], setRule, value)
  }

  useImperativeHandle(ref, () => ({
    touch: () => {
      return checkRules(props.rules as RuleType[], setRule, selected)
    }
  }))

  const makeCell = useCallback(
    (selectedDay: number, type: 'past' | 'current' | 'future') => {
      const isToday =
        selectedDay === today &&
        year === thisYear &&
        month === thisMonth &&
        type === 'current'
      const [selectedYear, selectedMonth] = handleDaySelect(type, year, month)
      return (
        <div
          className={classNames(styles.datePickerCalendarCell, {
            [styles.datePickerCalendarCellDisabled]: type !== 'current'
          })}
          key={`${type}-${selectedDay}`}
          onClick={() =>
            handleSelect(
              selectedYear,
              selectedMonth,
              selectedDay,
              setYear,
              setMonth,
              handleSelectDate,
              deactivateDropdown
            )
          }
        >
          <span
            className={classNames(
              classNames(styles.datePickerCalendarCellContainer, {
                [styles.datePickerCalendarCellToday]: isToday,
                [styles.datePickerCalendarCellSelected]:
                  selected ===
                  `${selectedYear}-${selectedMonth + 1}-${selectedDay}`
              })
            )}
          >
            {selectedDay}
          </span>
        </div>
      )
    },
    [
      deactivateDropdown,
      handleSelectDate,
      month,
      selected,
      thisMonth,
      thisYear,
      today,
      year
    ]
  )

  return (
    <div ref={buttonRef}>
      <div
        className={classNames(styles.datePickerButton, {
          [styles.datePickerButtonSm]: size === 'small',
          [styles.datePickerButtonLg]: size === 'large',
          [styles.datePickerButtonBase]: size === 'default',
          [styles.datePickerButtonError]: rule.error,
          [styles.datePickerButtonFocus]: active
        })}
        onClick={active ? deactivateDropdown : activateDropdown}
      >
        {!!props.prepend && (
          <span
            className={classNames(styles.datePickerButtonInnerPrefix, {
              [styles.datePickerButtonInnerPrefixActive]: active
            })}
          >
            {props.prepend}
          </span>
        )}
        <div
          className={classNames(styles.datePickerButtonInner, {
            [styles.datePickerButtonInnerPlaceholder]: !selected,
            [styles.datePickerButtonInnerFocus]: active
          })}
        >
          {selected || props.defaultValue || props.placeholder}
        </div>
      </div>
      {!props.hideMessage && (
        <div className={styles.datePickerButtonInnerWarning}>
          {(props.error && props.errorMessage) || (rule.error && rule.message)}
        </div>
      )}
      <div
        onClick={(e) => e.stopPropagation()}
        ref={calendarRef}
        className={styles.datePickerCalendar}
      >
        <div className={styles.datePickerCalendarInner}>
          <div className={styles.datePickerToolBar}>
            <div
              className={styles.datePickerToolBarButton}
              onClick={() => setYear(year - 1)}
            >
              <i className="fa-regular fa-angles-left"></i>
            </div>
            <div
              className={styles.datePickerToolBarButton}
              onClick={() =>
                handleMonthChange('sub', year, month, setYear, setMonth)
              }
            >
              <i className="fa-regular fa-angle-left"></i>
            </div>
            <div className={styles.datePickerToolBarDate}>
              {getDate(props.locale, year, month)}
            </div>
            <div
              className={styles.datePickerToolBarButton}
              onClick={() =>
                handleMonthChange('add', year, month, setYear, setMonth)
              }
            >
              <i className="fa-regular fa-angle-right"></i>
            </div>
            <div
              className={styles.datePickerToolBarButton}
              onClick={() => setYear(year + 1)}
            >
              <i className="fa-regular fa-angles-right"></i>
            </div>
          </div>
          <div className={styles.datePickerCalendarHeader}>
            {weekNames(props.locale).map((weekName) => {
              return <span key={weekName}>{weekName}</span>
            })}
          </div>
          <div className={styles.datePickerCalendarCells}>
            {calendar(year, month, makeCell)}
          </div>
          {/*<div onClick={ backToToday } className={ styles.toolButton }>*/}
          {/*  { props.locale === 'zh-CN' ? '今天' : 'Today' }*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  )
})

DatePicker.displayName = 'DatePicker'

export { DatePicker }
