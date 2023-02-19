import classNames from 'classnames'
import { forwardRef } from 'react'

import styles from './Progress.module.sass'
import { ProgressProps, ProgressRef } from './Progress.types'

const Progress = forwardRef<ProgressRef, ProgressProps>((props, ref) => {
  const type = props.type || 'plump'
  const size = type === 'line' ? 'line' : props.size || 'middle'
  const backgroundColor = props.backgroundColor || 'primary'
  const textColor = props.textColor || undefined
  const percentage = props.percentage || 0
  const percentStyle = {
    width: `${percentage}%`
  }
  const textStyle = {
    color: textColor
  }

  return (
    <div className={classNames(styles.progressContainer, styles[`progress-container-${size}`], props.className)}>
      <div
        style={percentStyle}
        className={classNames(styles.progressContainerPercent, styles[`progress-color-${backgroundColor}`])}
      ></div>
      {props.text !== undefined && (
        <span
          style={textStyle}
          className={classNames(styles.progressContainerText, {
            [styles.progressContainerLineText]: type === 'line'
          })}
        >
          {props.text}
        </span>
      )}
    </div>
  )
})

Progress.displayName = 'Progress'
export { Progress }
