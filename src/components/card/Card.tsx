import classNames from 'classnames'
import React, { forwardRef } from 'react'

import { CardProps } from '@/components/card/Card.types'

import styles from './Card.module.scss'

const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  Card.displayName = 'Card'
  return (
    <div
      ref={ref}
      style={props.style}
      className={classNames(styles.card, props?.className, {
        [styles[`elevation-${props.elevation}`]]: props.elevation,
        [styles.fill]: props.fill
      })}
    >
      {props.title && (
        <span style={props.titleStyle} className={styles.cardTitle}>
          {props.title}
        </span>
      )}
      {props.subtitle && (
        <span style={props.subtitleStyle} className={styles.cardSubtitle}>
          {props.subtitle}
        </span>
      )}
      {props.children && (
        <div style={props.bodyStyle} className={classNames(styles.cardContent, props?.bodyClass)}>
          {props.children}
        </div>
      )}
    </div>
  )
})

export { Card }
