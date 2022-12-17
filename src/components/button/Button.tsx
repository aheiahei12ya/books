import classNames from "classnames";
import { forwardRef } from "react";
import { ButtonProps, ButtonRef } from "./Button.types";

import styles from './index.module.sass';

export const Button = forwardRef<ButtonRef, ButtonProps>((props, ref) => {
  Button.displayName = 'Button'
  const {
    color = 'default',
    shape,
    type,
    children,
    loading,
    block,
    disabled,
    className,
    ...rest
  } = props

  return (
    <button
      onClick={
        props.onClick
      }
      className={
        classNames(
          styles.button,
          {
            [styles[`button-${ color }`]]: color,
            [styles[`button-${ shape }`]]: shape !== 'default' && shape,
            [styles[`button-${ type }`]]: type,
            [styles['button-icon-only']]: !children && children !== 0,
            [styles['button-loading']]: loading,
            [styles['button-block']]: block,
            [styles['button-disabled']]: disabled,
          },
          className,
        ) }
      disabled={ disabled }
    >
      { children }
    </button>
  )
})
