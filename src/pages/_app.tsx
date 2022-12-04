import React from "react";
import '../styles/global.sass'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <p>sss</p>
      <Component { ...pageProps } />
    </>
  )

}
