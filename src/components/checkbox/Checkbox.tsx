import classNames from "classnames";
import React, { forwardRef } from "react";
import { CheckboxRef, CheckboxProps } from "./Checkbox.types";

import styles from './index.module.sass';

export const Checkbox = forwardRef<CheckboxRef, CheckboxProps>((props, ref) => {
  Checkbox.displayName = 'Checkbox'
  return (
    <label className={
      classNames(
        styles.checkbox,
        {
          [styles.checkboxDisabled]: props.disabled
        }
      )
    }>
      <input
        id={props.id}
        type={ 'checkbox' }
        onChange={ (e) => {
          props.onChange?.(e.target.checked)
        } }
        checked={ props.checked }
        className={
          classNames(
            styles.inner,
            {
              [styles.innerDisabled]: props.disabled
            }
          )
        }
        disabled={ props.disabled }
      />
      <span className={
        classNames(
          styles.label,
          {
            [styles.labelDisabled]: props.disabled
          }
        )
      }>
        { props.children }
      </span>
    </label>
  )
})
