import classNames from 'classnames'
import { forwardRef, useState } from 'react'

import styles from './Collapse.module.scss'
import { CollapseProps, CollapseRef } from './Collapse.types'
import { CollapseContext } from './CollapseContext'
import { CollapseContextType } from './CollapseContext.types'

const Collapse = forwardRef<CollapseRef, CollapseProps>((props, ref) => {
  const [expand, setExpand] = useState(props.defaultExpandName as string)
  const contextValue: CollapseContextType = {
    expand: expand,
    updateExpand: (val) => setExpand(val)
  }

  return (
    <CollapseContext.Provider value={contextValue}>
      <div className={classNames(styles.collapse, props.className)}>{props.children}</div>
    </CollapseContext.Provider>
  )
})

Collapse.displayName = 'Collapse'
export { Collapse }
