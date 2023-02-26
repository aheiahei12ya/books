import { forwardRef } from 'react'

import { EmptyProps, EmptyRef } from '@/components/empty/Empty.types'

import styles from './Empty.module.scss'

const Empty = forwardRef<EmptyRef, EmptyProps>((props, ref) => {
  return <div className={styles.emptyContainer}>{props.children}</div>
})

Empty.displayName = 'Empty'
export { Empty }
