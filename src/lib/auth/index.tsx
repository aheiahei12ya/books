import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { LoginResponse } from '@/services/user/types'

interface authContext {
  isLogin: boolean
  userInfo: LoginResponse
  setLogin: (val: boolean) => void
  setLogout: () => void
  setUserInfo: (val: LoginResponse) => void
}

const AuthContext = createContext<authContext>({} as authContext)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setLogin] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<LoginResponse>({} as LoginResponse)
  const navigate = useNavigate()
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
      navigate('/login')
      sessionStorage.clear()
    } else {
      setUserInfo(userInfo)
      setLogin(true)
    }
  }, [])

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)
