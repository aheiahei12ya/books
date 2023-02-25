import '@/styles/global.scss'
import '@/scripts/wdyr'

import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import React, { useState } from 'react'
import { IntlProvider } from 'react-intl'

import Layout from '@/layout'
import { AuthContextProvider } from '@/lib/auth'
import { disableReactDevTools } from '@/lib/env'
import { loadLocale } from '@/locales'

if (process.env.NODE_ENV == 'production') {
  disableReactDevTools()
}

type NextPageWithLayout = NextPage & {
  useLayout?: boolean
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const [locale, setLocale] = useState('zh-CN')
  const message = loadLocale(locale)

  const basic = (children: JSX.Element) => (
    <IntlProvider locale={locale} messages={message}>
      <AuthContextProvider>{children}</AuthContextProvider>
    </IntlProvider>
  )
  if (Component.useLayout) {
    return basic(
      <Layout locale={locale} setLocale={setLocale}>
        <Component {...pageProps} />
      </Layout>
    )
  } else {
    return basic(<Component {...pageProps} />)
  }
}

export default App
