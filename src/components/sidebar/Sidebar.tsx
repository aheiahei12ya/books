import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { forwardRef, useEffect, useState } from 'react'

import useResize from '@/hooks/useResize'

import SidebarButton from './components/sidebarButton'
import styles from './Sidebar.module.scss'
import { SidebarProps } from './Sidebar.types'

export const Sidebar = forwardRef<unknown, SidebarProps>((props, ref) => {
  Sidebar.displayName = 'Sidebar'
  const [shrink, setShrink] = useState<boolean>(!!props?.defaultShrink)
  const [selected, setSelected] = useState<number>()
  const size = useResize()
  const router = useRouter()

  useEffect(() => {
    const selectedKey = Number(sessionStorage.getItem('selectedKey')) || props.defaultValue || 0
    setSelected(selectedKey)
  }, [props.defaultValue])

  useEffect(() => {
    if (props.autoShrink) {
      size.isMobile ? setShrink(true) : setShrink(false)
    }
  }, [props.autoShrink, size.isMobile])

  const shrinkIcon = (
    <i
      className={classNames(
        'fa-solid',
        'fa-chevrons-left',
        shrink ? styles.sidebarShrinkBtn : styles.sidebarStretchBtn
      )}
    ></i>
  )

  const handleSelect = (index: number, path: string | undefined, click?: Function) => {
    if (path === undefined) {
      click?.()
      return
    }
    if (router.pathname === path) return
    setSelected(index)
    sessionStorage.setItem('selectedKey', index.toString())
    click?.()
    path && router.replace(path)
  }

  return (
    <nav className={classNames(styles.sidebar, shrink ? styles.sidebarShrink : styles.sidebarStretch)}>
      <div>
        {props.avatar && <SidebarButton type={'avatar'} icon={props.avatar} />}
        {props.brand && (
          <SidebarButton type={'brand'} icon={props.brand?.icon} hideText={shrink}>
            {props.brand?.name}
          </SidebarButton>
        )}
        {props.items.map((item, index) => (
          <SidebarButton
            key={item?.key || index}
            icon={item.icon}
            hideText={shrink}
            selected={index === selected}
            onClick={() => handleSelect(index, item?.path)}
          >
            {item.name}
          </SidebarButton>
        ))}
      </div>
      <div>
        {props.tools?.map((item, index) => (
          <SidebarButton
            key={item?.key || index}
            type={'tool'}
            icon={item.icon}
            hideText={shrink}
            onClick={() => handleSelect(-1, item?.path, item.onClick)}
          >
            {item.name}
          </SidebarButton>
        ))}
        {props.hideShrinkButton || (
          <SidebarButton type={'tool'} onClick={() => setShrink(!shrink)} icon={shrinkIcon} hideText={shrink}>
            {props.shrinkBtnName}
          </SidebarButton>
        )}
      </div>
    </nav>
  )
})
