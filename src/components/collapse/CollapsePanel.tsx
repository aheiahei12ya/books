import classNames from 'classnames'
import { forwardRef } from 'react'

import styles from './Collapse.module.scss'
import useCollapseContext from './CollapseContext'
import { CollapsePanelProps, CollapsePanelRef } from './CollapsePanel.types'

const CollapsePanel = forwardRef<CollapsePanelRef, CollapsePanelProps>((props, ref) => {
  const collapseContext = useCollapseContext()
  const handleSelect = () => {
    const name = collapseContext.expand === props.name ? '' : props.name
    collapseContext.updateExpand(name)
  }
  return (
    <div className={styles.collapseContainer}>
      <div className={classNames(styles.collapseHeader, props.headerClass)} onClick={handleSelect}>
        {props.header}
      </div>

      <div
        className={classNames(styles.collapsePanel, {
          [styles.collapsePanelShow]: collapseContext.expand === props.name
        })}
      >
        <div
          className={classNames(
            styles.collapseContent,
            {
              [styles.collapseContentShow]: collapseContext.expand === props.name
            },
            props.contentClass
          )}
        >
          {props.children}
        </div>
      </div>
    </div>
  )
})

CollapsePanel.displayName = 'CollapsePanel'
export { CollapsePanel }
