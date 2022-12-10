import styles from './Index.module.sass';
import { InputRef, InputProps } from "./interface";
import classNames from 'classnames';
import { forwardRef, useState, useRef, useImperativeHandle, useId } from "react";

export const Input = forwardRef<InputRef, InputProps>((props, ref) => {
  Input.displayName = "Input"

  const hasPrepend = !!props.prepend
  const hasAppend = !!props.append
  const size = props.size || 'default'
  const [hasFocus, setHasFocus] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()

  const value = props.value !== undefined ? props.value : ''
  const setValue = (val: string) => props?.onChange?.(val)

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
  }))

  const shouldShowClear = (() => {
    if (!props.clearable || !value || props.readOnly) return false
    return hasFocus
  })()

  return (
    <div
      className={
        classNames(
          styles.inputBox,
          {
            [styles.inputBoxSm]: size === 'small',
            [styles.inputBoxLg]: size === 'large',
            [styles.inputBoxBase]: size === 'default',
            [styles.inputBoxFocus]: hasFocus
          },
        ) }
      onClick={ () => inputRef.current?.focus() }
    >
      { hasPrepend && (
        <span className={ styles.prefix }>
          { props.prepend }
        </span>
      ) }
      <input
        ref={ inputRef }
        id={ inputId }
        className={ styles.input }
        placeholder={ props.placeholder }
        value={ props.value && value }
        onChange={ e => {
          setValue(e.target.value)
        } }
        onFocus={ e => {
          setHasFocus(true)
        } }
        onBlur={ e => {
          setHasFocus(false)
        } }
        disabled={ props.disabled }
        readOnly={ props.readOnly }
      />
      { shouldShowClear && (
        <span className={ styles.clearable }
              onClick={ () => setValue('') }
              onMouseDown={ e => {
                e.preventDefault()
              } }
        >
          <i className="fa-solid fa-close"></i>
        </span>
      ) }
      { hasAppend && (
        <span className={ styles.append }>
          { props.append }
        </span>
      ) }
    </div>
  )
})

