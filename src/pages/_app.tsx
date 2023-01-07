import '@/styles/global.sass'

import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import React, { useState } from 'react'
import { IntlProvider } from 'react-intl'

import Layout from '@/layout'
import { AuthContextProvider } from '@/lib/auth'
import { loadLocale } from '@/locales'

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../mocks')
}

type NextPageWithLayout = NextPage & {
  useLayout?: boolean
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [locale, setLocale] = useState('zh-CN')
  const message = loadLocale(locale)

  const basic = (children: JSX.Element) => (
    <IntlProvider locale={locale} messages={message}>
      <div style={{ position: 'absolute', right: '0' }}>
        <button onClick={() => setLocale('en-US')}>en-US</button>
        <button onClick={() => setLocale('zh-CN')}>zh-CN</button>
      </div>
      <AuthContextProvider>{children}</AuthContextProvider>
    </IntlProvider>
  )
  if (Component.useLayout) {
    return basic(
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
  } else {
    return basic(<Component {...pageProps} />)
  }
}
