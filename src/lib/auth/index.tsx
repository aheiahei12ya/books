import Router from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'

interface authContext {
  isLogin: boolean
  userInfo: object
  setLogin: (val: boolean) => void
  setLogout: () => void
  setUserInfo: (val: object) => void
}

const AuthContext = createContext<authContext>({} as authContext)

export const AuthContextProvider = ({ children }: any) => {
  const [isLogin, setLogin] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState({})
  const setLogout = () => {
    setLogin(false)
    setUserInfo({})
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
    } else {
      setUserInfo(userInfo)
      setLogin(true)
    }
  }, [])

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
export const useAuth = () => useContext(AuthContext)
