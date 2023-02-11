import classNames from 'classnames'
import React, { forwardRef } from 'react'

import styles from './Tag.module.sass'
import { TagProps, TagRef } from './Tag.types'

const Tag = forwardRef<TagRef, TagProps>((props, ref) => {
  const color = props.color || 'default'
  const size = props.size || 'middle'
  return (
    <div
      onClick={ props.onClick }
      className={ classNames([
        styles.tagContainer,
        {
          [styles.tagContainerHover]: props.select,
          [styles.tagSizeSmall]: size === 'small',
          [styles.tagSizeMiddle]: size === 'middle',
          [styles.tagSizeLarge]: size === 'large',
          [styles.tagColorDefault]: color === 'default',
          [styles.tagColorPrimary]: color === 'primary',
          [styles.tagColorSuccess]: color === 'success',
          [styles.tagColorWarning]: color === 'warning',
          [styles.tagColorDanger]: color === 'danger'
        }
      ]) }
    >
      { props.icon && <span className={ styles.tagContainerIcon }>{ props.icon }</span> }
      <span className={ classNames(styles.tagContainerText) }>iiiaaa</span>
    </div>
  )
})

Tag.displayName = 'Tag'
export { Tag }
