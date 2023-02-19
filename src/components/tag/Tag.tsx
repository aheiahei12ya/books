import classNames from 'classnames'
import React, { forwardRef } from 'react'

import styles from './Tag.module.scss'
import { TagProps, TagRef } from './Tag.types'

const Tag = forwardRef<TagRef, TagProps>((props, ref) => {
  const color = props.color || 'default'
  const size = props.size || 'middle'
  const shape = props.shape || 'rect'
  const style = { width: props.width }
  return (
    <div
      onClick={props.onClick}
      className={classNames([
        styles.tagContainer,
        styles[`tag-size-${size}`],
        styles[`tag-color-${color}`],
        styles[`tag-shape-${shape}`],
        {
          [styles.tagContainerHover]: props.select
        }
      ])}
    >
      {props.icon && <span className={styles.tagContainerIcon}>{props.icon}</span>}
      <span style={style} className={classNames(styles.tagContainerText)}>
        {props.children}
      </span>
    </div>
  )
})

Tag.displayName = 'Tag'
export { Tag }
