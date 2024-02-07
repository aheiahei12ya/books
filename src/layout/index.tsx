import { ReactNode, useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import { ConfigContext } from '@/components/configProvider'
import Sidebar from '@/components/sidebar'
import useResize from '@/hooks/useResize'
import { useAuth } from '@/lib/auth'

import styles from './index.module.scss'

interface layoutProps {
  children: ReactNode
}

const Layout = (props: layoutProps) => {
  const [loading, setLoading] = useState(true)
  const auth = useAuth()
  const router = useNavigate()
  const resize = useResize()
  const { locale, changeConfig } = useContext(ConfigContext)
  const avatar = auth?.userInfo?.avatar ? (
    <img src={auth?.userInfo?.avatar} width="60" height="60" alt={'avatar'} />
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
      name: <FormattedMessage id={'layout.sidebar.button.language'} />,
      icon: <i className="fa-regular fa-language"></i>,
      onClick: () => {
        if (locale === 'zh-CN') {
          changeConfig?.({ locale: 'en-US' })
        } else {
          changeConfig?.({ locale: 'zh-CN' })
        }
      }
    },
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
        router('/login')
      }
    }
  ]
  useEffect(() => {
    setLoading(false)
    return () => setLoading(true)
  }, [])
  return loading ? (
    <div></div>
  ) : (
    <div className={styles.layout}>
      {resize.isLandscape && <Sidebar avatar={avatar} items={items} tools={tools} defaultShrink />}
      <div className={styles.container}>{props.children}</div>
    </div>
  )
}

export default Layout
