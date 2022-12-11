import React, { useState } from "react";
import '../styles/global.sass'
import type { AppProps } from 'next/app'
import { IntlProvider } from 'react-intl';
import { loadLocale } from "../locales";


export default function App({ Component, pageProps }: AppProps) {
  const [locale, setLocale] = useState('zh-CN')
  const message = loadLocale(locale)
  return (
    <IntlProvider locale={ locale } messages={ message }>
      <button onClick={ () => setLocale('en-US') }>en-US</button>
      <button onClick={ () => setLocale('zh-CN') }>zh-CN</button>
      <Component { ...pageProps } />
    </IntlProvider>
  )

}
