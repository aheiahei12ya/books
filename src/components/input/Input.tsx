import classNames from 'classnames'
import {
  ChangeEvent,
  forwardRef,
  useId,
  useImperativeHandle,
  useRef,
  useState
} from 'react'

import { checkRules, RuleType } from '@/components/lib/rule'
import useControlled from '@/hooks/useControlled'

import styles from './Input.module.sass'
import { InputProps, InputRef } from './Input.types'

export const Input = forwardRef<InputRef, InputProps>((props, ref) => {
  Input.displayName = 'Input'

  const hasPrepend = !!props.prepend
  const hasAppend = !!props.append
  const size = props.size || 'default'
  const [hasFocus, setHasFocus] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()
  const [value, setValue] = useControlled(props.value, props.onChange)

  const [rule, setRule] = useState({
    error: false,
    message: <></>
  })

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.type === 'digit' && isNaN(Number(e.target.value))) return
    setValue(e.target.value)
    rule.error &&
    checkRules(props.rules as RuleType[], setRule, value, e.target.value)
  }
  useImperativeHandle(ref, () => ({
    clear: () => {
      setValue('')
    },
    focus: () => {
      inputRef.current?.focus()
    },
    blur: () => {
      inputRef.current?.blur()
    },
    get nativeElement() {
      return inputRef.current
    },
    touch: () => {
      return checkRules(props.rules as RuleType[], setRule, value)
    }
  }))

  const shouldShowClear = (() => {
    if (!props.clearable || !value || props.readOnly) return false
    return props.showClearIfFill || hasFocus
  })()

  return (
    <>
      <div
        className={ classNames(styles.inputBox, {
          [styles.inputBoxSm]: size === 'small',
          [styles.inputBoxLg]: size === 'large',
          [styles.inputBoxBase]: size === 'default',
          [styles.inputBoxFocus]: hasFocus,
          [styles.inputBoxError]: rule.error
        }) }
        onClick={ () => inputRef.current?.focus() }
        // onMouseDown={ (e) => {
        //   e.preventDefault()
        // } }
      >
        { hasPrepend && (
          <span
            className={ classNames(styles.prefix, {
              [styles.prefixActive]: hasFocus
            }) }
            onMouseDown={ (e) => {
              e.preventDefault()
            } }
          >
            { props.prepend }
          </span>
        ) }
        <input
          ref={ inputRef }
          id={ inputId }
          className={ styles.input }
          placeholder={ props.placeholder }
          value={ value }
          type={ props.type }
          onChange={ (e) => {
            handleInput(e)
          } }
          onFocus={ () => {
            setHasFocus(true)
          } }
          onBlur={ () => {
            setHasFocus(false)
            checkRules(props.rules as RuleType[], setRule, value)
          } }
          disabled={ props.disabled }
          readOnly={ props.readOnly }
        />
        { shouldShowClear && (
          <span
            className={ classNames(styles.clearable, {
              [styles.clearableAppend]: hasAppend
            }) }
            onClick={ () => {
              setValue('')
              props.onClear?.()
            } }
            onMouseDown={ (e) => {
              e.preventDefault()
            } }
          >
            <i className="fa-solid fa-close"></i>
          </span>
        ) }
        { hasAppend && (
          <span
            className={ styles.append }
            onMouseDown={ (e) => {
              e.preventDefault()
            } }
          >
            { props.append }
          </span>
        ) }
      </div>
      { !props.hideMessage && (
        <div className={ styles.inputWarning }>
          { (props.error && props.errorMessage) || (rule.error && rule.message) }
        </div>
      ) }
    </>
  )
})
