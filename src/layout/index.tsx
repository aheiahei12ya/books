import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import Sidebar from '@/components/sidebar'
import useResize from '@/hooks/useResize'
import { useAuth } from '@/lib/auth'

import styles from './index.module.scss'

interface layoutProps {
  children: JSX.Element
}

const Layout = ({ children }: layoutProps) => {
  const [loading, setLoading] = useState(true)
  const auth = useAuth()
  const router = useRouter()
  const resize = useResize()
  const avatar = auth?.userInfo?.avatar ? (
    <Image src={auth?.userInfo?.avatar} width="60" height="60" alt={'avatar'} priority />
  ) : (
    <span></span>
  )

  const items = [
    {
      name: <FormattedMessage id={'layout.sidebar.button.dashboard'} />,
      icon: <i className="fa-solid fa-chart-tree-map"></i>,
      path: '/home',
      selected: true
    },
    {
      name: <FormattedMessage id={'layout.sidebar.button.transaction'} />,
      icon: <i className="fa-regular fa-book-section"></i>,
      path: '/transaction',
      selected: false
    },
    {
      name: <FormattedMessage id={'layout.sidebar.button.statistic'} />,
      icon: <i className="fa-solid fa-chart-column"></i>,
      path: '/statistic',
      selected: false
    }
  ]
  const tools = [
    {
      name: <FormattedMessage id={'layout.sidebar.button.setting'} />,
      icon: <i className="fa-regular fa-gear"></i>,
      path: '/setting'
    },
    {
      name: <FormattedMessage id={'layout.sidebar.button.logout'} />,
      icon: <i className="fa-solid fa-arrow-right-from-bracket"></i>,
      onClick: () => {
        sessionStorage.clear()
        router.replace('/login')
      }
    }
  ]
  useEffect(() => {
    setLoading(false)
  }, [])
  return loading ? (
    <div></div>
  ) : (
    <div className={styles.layout}>
      {resize.isLandscape && (
        <Sidebar avatar={avatar} items={items} tools={tools} defaultShrink={resize.isMobile} autoShrink />
      )}
      <div className={styles.container}>{children}</div>
    </div>
  )
}

export default Layout
