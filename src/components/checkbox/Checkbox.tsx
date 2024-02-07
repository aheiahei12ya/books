import classNames from 'classnames'
import { forwardRef } from 'react'

import styles from './Checkbox.module.scss'
import { CheckboxProps, CheckboxRef } from './Checkbox.types'

export const Checkbox = forwardRef<CheckboxRef, CheckboxProps>((props, ref) => {
  Checkbox.displayName = 'Checkbox'
  return (
    <label
      className={classNames(styles.checkbox, {
        [styles.checkboxDisabled]: props.disabled
      })}
    >
      <input
        id={props.id}
        type={'checkbox'}
        onChange={(e) => {
          props.onChange?.(e.target.checked)
        }}
        checked={props.checked}
        className={classNames(styles.inner, {
          [styles.innerDisabled]: props.disabled
        })}
        disabled={props.disabled}
      />
      <span
        className={classNames(styles.label, {
          [styles.labelDisabled]: props.disabled
        })}
      >
        {props.children}
      </span>
    </label>
  )
})
