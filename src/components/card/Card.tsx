import classNames from 'classnames'
import React, { forwardRef } from 'react'

import { CardProps } from '@/components/card/Card.types'

import styles from './Card.module.scss'

const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const showHead = props.title || props.tools
  return (
    <div
      ref={ref}
      style={props.style}
      className={classNames(styles.card, props?.className, {
        [styles[`elevation-${props.elevation}`]]: props.elevation,
        [styles.fill]: props.fill
      })}
    >
      {showHead && (
        <div className={classNames(styles.cardHead, props?.headerClass)}>
          <div style={props.titleStyle} className={styles.cardTitle}>
            {props.title}
          </div>
          <div className={classNames(styles.cardTool, props?.toolClass)}>{props.tools}</div>
        </div>
      )}
      {props.subtitle && (
        <div style={props.subtitleStyle} className={styles.cardSubtitle}>
          {props.subtitle}
        </div>
      )}
      {props.children && (
        <div style={props.bodyStyle} className={classNames(styles.cardContent, props?.bodyClass)}>
          {props.children}
        </div>
      )}
    </div>
  )
})

Card.displayName = 'Card'
export { Card }
