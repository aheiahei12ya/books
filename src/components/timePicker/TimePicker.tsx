import classNames from 'classnames'
import dayjs from 'dayjs'
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'

import Button from '@/components/button'
import { padNumber } from '@/components/lib/util'
import useHover from '@/hooks/useHover'
import { range } from '@/lib/pythonic'

import styles from './TimePicker.module.sass'
import { TimePickerProps } from './TimePicker.types'

const TimePicker = forwardRef<unknown, TimePickerProps>((props, ref) => {
  TimePicker.displayName = 'TimePicker'
  const size = props.size || 'default'
  const activate = props.activate || 'click'
  const [buttonRef, hover] = useHover()
  const timePickerRef = useRef<HTMLDivElement>(null)
  const hourRef = useRef<HTMLDivElement>(null)
  const minuteRef = useRef<HTMLDivElement>(null)
  const secondRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<boolean>(false)
  const [hour, setHour] = useState(props.defaultValue?.hour() || 0)
  const [minute, setMinute] = useState(props.defaultValue?.minute() || 0)
  const [second, setSecond] = useState(props.defaultValue?.second() || 0)
  const [selected, setSelected] = useState(
    props.defaultValue?.format('HH:mm:ss') || undefined
  )
  const [rule, setRule] = useState({
    error: false,
    message: <></>
  })
  const width = props.width || '150px'
  const height = props.height || '230px'

  const onClickOutsideHandler = useCallback(
    (e: Event) => {
      if (!buttonRef.current) return
      if (buttonRef.current.contains(e.target)) return
      setActive(false)
      timePickerRef.current!.style.maxHeight = '0'
      setTimeout(() => {
        timePickerRef.current!.style.maxWidth = '0'
      }, 300)
      document.removeEventListener('click', onClickOutsideHandler)
    },
    [buttonRef]
  )

  const handleDropdown = useCallback(
    (type: 'activate' | 'deactivate') => {
      const nodeRef = timePickerRef.current!
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
      handleDropdown('activate')
    } else {
      handleDropdown('deactivate')
    }
  }

  useEffect(() => {
    if (activate === 'hover') {
      if (hover) {
        handleDropdown('activate')
      } else {
        handleDropdown('deactivate')
      }
    }
  }, [activate, handleDropdown, hover])

  const setNow = () => {
    const now = dayjs()
    handleClick()
    setHour(now.hour())
    setMinute(now.minute())
    setSecond(now.second())
    setSelected(now.format('HH:mm:ss'))
  }

  const handleSetTime = () => {
    handleClick()
    const hourStr = padNumber(hour)
    const minuteStr = padNumber(minute)
    const secondStr = padNumber(second)
    setSelected(`${ hourStr }:${ minuteStr }:${ secondStr }`)
    props.onSelect?.(hourStr, minuteStr, secondStr)
  }

  const handleSelect = (
    { target }: any,
    type: 'hour' | 'minute' | 'second',
    val: number
  ) => {
    const shouldBe = val * 24 - target.parentNode.offsetHeight / 2 + 18
    switch (type) {
      case 'hour': {
        const nodeRef = hourRef.current! as Element
        nodeRef.scrollTo({
          top: shouldBe,
          behavior: 'smooth'
        })
        setHour(val)
        break
      }
      case 'minute': {
        const nodeRef = minuteRef.current! as Element
        nodeRef.scrollTo({
          top: shouldBe,
          behavior: 'smooth'
        })
        setMinute(val)
        break
      }
      case 'second': {
        const nodeRef = secondRef.current! as Element
        nodeRef.scrollTo({
          top: shouldBe,
          behavior: 'smooth'
        })
        setSecond(val)
        break
      }
    }
  }

  const makeTimePicker = () => {
    return (
      <>
        <div ref={ hourRef } className={ styles.timePickerCells }>
          { range(24).map((val, i) => {
            return (
              <div
                key={ `hour-${ i }` }
                className={ classNames(styles.timePickerCell, {
                  [styles.timePickerCellSelected]: val === hour
                }) }
                onClick={ (e) => handleSelect(e, 'hour', val) }
              >
                { val }
              </div>
            )
          }) }
        </div>
        <div ref={ minuteRef } className={ styles.timePickerCells }>
          { range(60).map((val, i) => {
            return (
              <div
                key={ `minute-${ i }` }
                className={ classNames(styles.timePickerCell, {
                  [styles.timePickerCellSelected]: val === minute
                }) }
                onClick={ (e) => handleSelect(e, 'minute', val) }
              >
                { val }
              </div>
            )
          }) }
        </div>
        { props.showSecond && (
          <div ref={ secondRef } className={ styles.timePickerCells }>
            { range(60).map((val, i) => {
              return (
                <div
                  key={ `seconds-${ i }` }
                  className={ classNames(styles.timePickerCell, {
                    [styles.timePickerCellSelected]: val === second
                  }) }
                  onClick={ (e) => handleSelect(e, 'second', val) }
                >
                  { val }
                </div>
              )
            }) }
          </div>
        ) }
      </>
    )
  }

  return (
    <div ref={ buttonRef }>
      <div
        className={ classNames(styles.timePickerButton, {
          [styles.timePickerButtonSm]: size === 'small',
          [styles.timePickerButtonLg]: size === 'large',
          [styles.timePickerButtonBase]: size === 'default',
          [styles.timePickerButtonError]: rule.error,
          [styles.timePickerButtonFocus]: active
        }) }
        onClick={ handleClick }
      >
        { !!props.prepend && (
          <span
            className={ classNames(styles.timePickerButtonInnerPrefix, {
              [styles.timePickerButtonInnerPrefixActive]:
              (hover && activate === 'hover') || active
            }) }
          >
            { props.prepend }
          </span>
        ) }
        <div
          className={ classNames(styles.timePickerButtonInner, {
            [styles.timePickerButtonInnerPlaceholder]: !selected,
            [styles.timePickerButtonInnerFocus]:
            (hover && activate === 'hover') || active
          }) }
        >
          { selected || props.placeholder }
        </div>
      </div>
      { !props.hideMessage && (
        <div className={ styles.timePickerButtonInnerWarning }>
          { (props.error && props.errorMessage) || (rule.error && rule.message) }
        </div>
      ) }
      <div
        onClick={ (e) => e.stopPropagation() }
        ref={ timePickerRef }
        className={ styles.timePickerBox }
      >
        <div className={ styles.timePickerContainer }>
          <div className={ styles.timePicker }>{ makeTimePicker() }</div>
          <div className={ styles.timePickerAction }>
            <div className={ styles.timePickerActionButton } onClick={ setNow }>
              <span>{ props.locale === 'zh-CN' ? '现在' : 'Now' }</span>
            </div>
            <Button size={ 'small' } color={ 'primary' } onClick={ handleSetTime }>
              <span>{ props.locale === 'zh-CN' ? '确定' : 'OK' }</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
})

export { TimePicker }
