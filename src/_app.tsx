import { Outlet } from 'react-router-dom'

import Layout from '@/layout'
import { AuthContextProvider } from '@/lib/auth'

const App = () => {
  return (
    <AuthContextProvider>
      <Layout>
        <Outlet />
      </Layout>
    </AuthContextProvider>
  )
}

export default App
