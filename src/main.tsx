import '@/styles/global.scss'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { ConfigProvider } from '@/components/configProvider'
import { disableReactDevTools } from '@/lib/env'
import routes from '@/routes'

if (import.meta.env.MODE == 'production') {
  disableReactDevTools()
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider>
      <RouterProvider router={routes} />
    </ConfigProvider>
  </React.StrictMode>
)
