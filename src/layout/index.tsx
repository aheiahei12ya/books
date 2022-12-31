import React from 'react'

import { useAuth } from '@/lib/auth'

interface layoutProps {
  children: JSX.Element
}

function Layout({ children }: layoutProps) {
  const auth = useAuth()
  return (
    <div>
      <div>aaaa</div>
      <div>{children}</div>
      <div>bbbb</div>
    </div>
  )
}

export default Layout
