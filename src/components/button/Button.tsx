import classNames from 'classnames'
import { forwardRef } from 'react'

import styles from './Button.module.scss'
import { ButtonProps, ButtonRef } from './Button.types'

const Button = forwardRef<ButtonRef, ButtonProps>((props, ref) => {
  const {
    color = 'default',
    shape = 'default',
    type = 'default',
    size = 'default',
    htmlType = 'button',
    children,
    loading,
    block,
    disabled,
    className
  } = props

  const btnColor = type === 'text' ? `text-${color}` : color

  return (
    <button
      onClick={(e) => {
        if (loading || props.noClick) {
          e.preventDefault()
          return
        }
        props?.onClick?.(e)
      }}
      type={htmlType}
      className={classNames(
        styles.button,
        {
          [styles[`button-type-${type}`]]: type,
          [styles[`button-color-${btnColor}`]]: btnColor,
          [styles[`button-shape-${shape}`]]: shape,
          [styles[`button-size-${size}`]]: size,
          [styles['button-icon-only']]: !children && children !== 0,
          [styles['button-loading']]: loading,
          [styles['button-type-block']]: block,
          [styles['button-disabled']]: disabled,
          [styles['button-loading']]: loading
        },
        className
      )}
      disabled={disabled}
      form={props.form}
    >
      {loading ? <i className="fa-regular fa-spinner-third"></i> : <span>{children}</span>}
    </button>
  )
})

Button.displayName = 'Button'
export { Button }
