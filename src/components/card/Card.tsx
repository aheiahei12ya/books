import classNames from 'classnames'
import React, { forwardRef } from 'react'

import { CardProps } from '@/components/card/Card.types'

import styles from './Card.module.scss'

const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  Card.displayName = 'Card'
  return (
    <div
      ref={ref}
      className={classNames(styles.card, props?.className, {
        [styles[`elevation-${props.elevation}`]]: props.elevation,
        [styles.fill]: props.fill
      })}
    >
      {props.title && <span className={styles.cardTitle}>{props.title}</span>}
      {props.subtitle && <span className={styles.cardSubtitle}>{props.subtitle}</span>}
      {props.children && <div className={styles.cardContent}>{props.children}</div>}
    </div>
  )
})

export { Card }
