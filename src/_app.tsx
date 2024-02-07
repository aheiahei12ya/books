// import '@/styles/global.scss'
// import '@/scripts/wdyr.ts'
//
// import { RouterProvider } from 'react-router-dom'
//
// import { ConfigProvider } from '@/components/configProvider'
// import routes from '@/routes'
//
import { Outlet } from 'react-router-dom'

import Layout from '@/layout'

const App = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default App
