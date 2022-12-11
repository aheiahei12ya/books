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
      <div style={ { position: "absolute", right: "0",} }>
        <button onClick={ () => setLocale('en-US') }>en-US</button>
        <button onClick={ () => setLocale('zh-CN') }>zh-CN</button>
      </div>
      <Component { ...pageProps }/>
    </IntlProvider>
  )

}
