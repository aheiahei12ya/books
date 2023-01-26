import classNames from 'classnames'
import dayjs from 'dayjs'
import { forwardRef, useCallback, useMemo, useRef, useState } from 'react'

import Button from '@/components/button'
import { dropdownHandler } from '@/components/lib/dropdown'
import { padNumber } from '@/components/lib/util'
import useControlled from '@/hooks/useControlled'
import { range } from '@/lib/pythonic'

import styles from './TimePicker.module.sass'
import { TimePickerProps } from './TimePicker.types'

const TimePicker = forwardRef<unknown, TimePickerProps>((props, ref) => {
  const size = props.size || 'default'
  const defaultTime = props.value || props.defaultValue || '0:0:0'

  const buttonRef = useRef<HTMLDivElement>(null)
  const timePickerRef = useRef<HTMLDivElement>(null)
  const hourRef = useRef<HTMLDivElement>(null)
  const minuteRef = useRef<HTMLDivElement>(null)
  const secondRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<boolean>(false)

  const [selected, setSelected] = useControlled(props.value, props.onChange)
  const [defaultHour, defaultMinute, defaultSecond] = defaultTime.split(':')
  const [hour, setHour] = useState(Number(defaultHour))
  const [minute, setMinute] = useState(Number(defaultMinute))
  const [second, setSecond] = useState(Number(defaultSecond))

  const [rule, setRule] = useState({
    error: false,
    message: <></>
  })

  const onClickOutsideHandler = useCallback(
    ({ target }: MouseEvent) => {
      if (!buttonRef.current) return
      if (buttonRef.current.contains(target as Node)) return
      setActive(false)
      timePickerRef.current!.style.maxHeight = '0'
      setTimeout(() => {
        timePickerRef.current!.style.maxWidth = '0'
      }, 300)
      document.removeEventListener('click', onClickOutsideHandler)
    },
    [buttonRef]
  )

  const [activateDropdown, deactivateDropdown] = dropdownHandler(
    timePickerRef,
    buttonRef,
    setActive,
    props.width || '150px',
    props.height || '230px',
    onClickOutsideHandler as EventListener
  )

  const setNow = () => {
    const now = dayjs()
    active ? deactivateDropdown() : activateDropdown()
    setHour(now.hour())
    setMinute(now.minute())
    setSecond(now.second())
    setSelected(now.format('HH:mm:ss'))
  }

  const handleSetTime = () => {
    active ? deactivateDropdown() : activateDropdown()
    const hourStr = padNumber(hour)
    const minuteStr = padNumber(minute)
    const secondStr = padNumber(second)
    setSelected(`${ hourStr }:${ minuteStr }:${ secondStr }`)
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

  const timePicker = useMemo(() => {
    return (
      <>
        <div ref={ hourRef } className={ styles.timePickerCells }>
          { range(24).map((val) => {
            return (
              <div
                key={ `hour-${ val }` }
                className={ classNames(styles.timePickerCell, {
                  [styles.timePickerCellSelected]: val === hour
                }) }
                onClick={ (e) => handleSelect(e, 'hour', val) }
              >
                { padNumber(val) }
              </div>
            )
          }) }
        </div>
        <div ref={ minuteRef } className={ styles.timePickerCells }>
          { range(60).map((val) => {
            return (
              <div
                key={ `minute-${ val }` }
                className={ classNames(styles.timePickerCell, {
                  [styles.timePickerCellSelected]: val === minute
                }) }
                onClick={ (e) => handleSelect(e, 'minute', val) }
              >
                { padNumber(val) }
              </div>
            )
          }) }
        </div>
        { props.showSecond && (
          <div ref={ secondRef } className={ styles.timePickerCells }>
            { range(60).map((val) => {
              return (
                <div
                  key={ `seconds-${ val }` }
                  className={ classNames(styles.timePickerCell, {
                    [styles.timePickerCellSelected]: val === second
                  }) }
                  onClick={ (e) => handleSelect(e, 'second', val) }
                >
                  { padNumber(val) }
                </div>
              )
            }) }
          </div>
        ) }
      </>
    )
  }, [hour, minute, props.showSecond, second])

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
        onClick={ active ? deactivateDropdown : activateDropdown }
      >
        { !!props.prepend && (
          <span
            className={ classNames(styles.timePickerButtonInnerPrefix, {
              [styles.timePickerButtonInnerPrefixActive]: active
            }) }
          >
            { props.prepend }
          </span>
        ) }
        <div
          className={ classNames(styles.timePickerButtonInner, {
            [styles.timePickerButtonInnerPlaceholder]: !selected,
            [styles.timePickerButtonInnerFocus]: active
          }) }
        >
          { selected || props.defaultValue || props.placeholder }
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
          <div className={ styles.timePicker }>{ timePicker }</div>
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

TimePicker.displayName = 'TimePicker'

export { TimePicker }
