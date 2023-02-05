import Router from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'

import { LoginResponse } from '@/services/login/types'

interface authContext {
  isLogin: boolean
  userInfo: LoginResponse
  setLogin: (val: boolean) => void
  setLogout: () => void
  setUserInfo: (val: LoginResponse) => void
}

const AuthContext = createContext<authContext>({} as authContext)

export const AuthContextProvider = ({ children }: any) => {
  const [isLogin, setLogin] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<LoginResponse>({} as LoginResponse)
  const setLogout = () => {
    setLogin(false)
    setUserInfo({} as LoginResponse)
  }
  const contextValue = {
    isLogin: isLogin,
    userInfo: userInfo,
    setLogin: setLogin,
    setLogout: setLogout,
    setUserInfo: setUserInfo
  }

  useEffect(() => {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo') || '{}')
    if (!userInfo.nickName) {
      Router.replace('/login')
      sessionStorage.clear()
    } else {
      setUserInfo(userInfo)
      setLogin(true)
    }
  }, [])

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)
