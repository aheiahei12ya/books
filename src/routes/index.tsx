import { createHashRouter } from 'react-router-dom'

import App from '@/_app.tsx'
import Home from '@/pages/home'
import Login from '@/pages/login'
import Setting from '@/pages/setting'
import Statistic from '@/pages/statistic'
import Transaction from '@/pages/transaction'

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'home', element: <Home /> },
      {
        path: 'transaction',
        element: <Transaction />
      },
      {
        path: 'statistic',
        element: <Statistic />
      },
      {
        path: 'setting',
        element: <Setting />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
])

export default router
