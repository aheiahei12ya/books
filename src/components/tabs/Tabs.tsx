import classNames from 'classnames'
import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react'

import { TabsProps, TabsRef } from '@/components/tabs/Tabs.types'

import styles from './Tabs.module.scss'

const Tabs = forwardRef<TabsRef, TabsProps>((props, ref) => {
  const size = props.size || 'medium'
  const [activated, setActivated] = useState<number>(0)
  const [width, setWidth] = useState<number>(0)
  const [offset, setOffset] = useState<number>(0)
  const tabRef = useRef(null)
  const [tabs, content] = useMemo(() => {
    const tabs: React.ReactNode[] = []
    const content: React.ReactNode[] = []
    props.items.forEach((item, index) => {
      tabs.push(
        <div
          key={item.key}
          className={classNames(styles.headerCell, {
            [styles.headerCellActivated]: index === activated
          })}
          onClick={(e) => {
            setActivated(index)
            setWidth((e.target as HTMLDivElement).offsetWidth)
            setOffset((e.target as HTMLDivElement).offsetLeft)
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
  }, [activated, props.items])

  useEffect(() => {
    const node = tabRef.current!
    if (node) {
      // TODO: 修复这两个ts校验
      // @ts-ignore
      setWidth(node.firstChild.offsetWidth)
      // @ts-ignore
      setOffset(node.firstChild.offsetLeft)
    }
  }, [])

  return (
    <div className={styles.tabsContainer}>
      <div ref={tabRef} className={classNames(styles.header, styles.headerContainer, styles[`header-${size}`])}>
        {tabs}
        <div className={classNames(styles.headerIndicator)} style={{ width: width, left: offset }}></div>
      </div>
      <div className={classNames(styles.bodyContainer, styles[`body-${size}`])}>{content}</div>
    </div>
  )
})

Tabs.displayName = 'Tabs'
export { Tabs }
