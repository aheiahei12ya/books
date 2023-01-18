import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import Sidebar from '@/components/sidebar'
import { useAuth } from '@/lib/auth'

import styles from './index.module.sass'

interface layoutProps {
  children: JSX.Element
}

const Layout = ({ children }: layoutProps) => {
  const auth = useAuth()
  const router = useRouter()
  const avatar = auth?.userInfo?.avatar ? (
    <Image
      src={auth?.userInfo?.avatar}
      width="60"
      height="60"
      alt={'avatar'}
      priority
    />
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
        sessionStorage.removeItem('userInfo')
        sessionStorage.removeItem('selectedKey')
        router.replace('/login')
      }
    }
  ]

  return (
    <div className={styles.layout}>
      <Sidebar avatar={avatar} items={items} tools={tools} autoShrink />
      <div className={styles.container}>{children}</div>
    </div>
  )
}

export default Layout
