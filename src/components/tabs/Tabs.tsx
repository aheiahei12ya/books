import classNames from 'classnames'
import { forwardRef, ReactNode, useEffect, useMemo, useRef, useState } from 'react'

import { TabsProps, TabsRef } from '@/components/tabs/Tabs.types'
import useControlled from '@/hooks/useControlled'

import styles from './Tabs.module.scss'

const Tabs = forwardRef<TabsRef, TabsProps>((props, ref) => {
  const size = props.size || 'medium'
  const [activated, setActivated] = useControlled(props.selected, props.onChange, props.defaultSelect)
  const [width, setWidth] = useState<number>(0)
  const [offset, setOffset] = useState<number>(0)
  const tabRef = useRef(null)
  const [tabs, content] = useMemo(() => {
    const tabs: ReactNode[] = []
    const content: ReactNode[] = []
    props.items.forEach((item, index) => {
      tabs.push(
        <div
          key={item.key}
          className={classNames(styles.headerCell, {
            [styles.headerCellActivated]: index === activated
          })}
          onClick={() => {
            setActivated(index)
          }}
        >
          {item.label}
        </div>
      )
      content.push(
        <div
          key={item.key}
          className={classNames(styles.bodyContent, {
            [styles.bodyActivated]: index === activated
          })}
        >
          {item.children}
        </div>
      )
    })
    return [tabs, content]
  }, [activated, props, setActivated])

  useEffect(() => {
    const node = tabRef.current!
    if (node) {
      // TODO: 修复这两个ts校验
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setWidth(node.childNodes[activated]?.offsetWidth)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setOffset(node.childNodes[activated]?.offsetLeft)
    }
    return () => {}
  }, [activated])

  return (
    <div className={styles.tabsContainer}>
      <div ref={tabRef} className={classNames(styles.header, styles[`header-${size}`])}>
        {tabs}
        <div className={classNames(styles.headerIndicator)} style={{ width: width, left: offset }}></div>
      </div>
      <div className={classNames(styles.body, styles[`body-${size}`], props?.bodyStyle)}>{content}</div>
    </div>
  )
})

Tabs.displayName = 'Tabs'
export { Tabs }
