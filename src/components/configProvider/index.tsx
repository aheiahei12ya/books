import { createContext, useLayoutEffect, useState } from 'react'
import { IntlProvider } from 'react-intl'

import { loadLocale } from '@/locales'

import { ConfigType, Props } from './types.ts'

const theme = (localStorage.getItem('theme') || 'light') as ConfigType['theme']
const locale = (localStorage.getItem('locale') || 'zh-CN') as ConfigType['locale']

const ConfigContext = createContext<ConfigType>({
  locale
})

const ConfigProvider = (props: Props) => {
  const [config, setConfig] = useState<ConfigType>({
    theme,
    locale
  })

  const changeConfig = (config: ConfigType) => {
    setConfig((value) => ({ ...value, ...config }))
  }

  useLayoutEffect(() => {
    document.body.setAttribute('theme', theme!)
  }, [])

  return (
    <ConfigContext.Provider value={{ ...config, changeConfig }}>
      <IntlProvider locale={config.locale!} messages={loadLocale(config.locale!)}>
        {props.children}
      </IntlProvider>
    </ConfigContext.Provider>
  )
}

export { ConfigContext, ConfigProvider }
