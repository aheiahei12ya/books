import React, { forwardRef } from 'react'

import styles from './DivideLine.module.scss'
import { DivideLineProps, DivideLineRef } from './DivideLine.types'

const DivideLine = forwardRef<DivideLineRef, DivideLineProps>((props, ref) => {
  return (
    <div className={styles.divideLine}>{props.text && <span className={styles.divideLineText}>{props.text}</span>}</div>
  )
})

DivideLine.displayName = 'DivideLine'
export { DivideLine }
