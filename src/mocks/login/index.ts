import { accountError, passwordError } from '@/constants/resultCode'
import { mockLogin, mockPost } from '@/mocks/utils'

const login = [
  mockLogin('/api/user-login', {
    nickName: '12ya',
    avatar: 'http://aheiahei.imdo.co:8081/repository/blob/avatar/avatar.png',
    userInfo: {
      id: '1'
    }
  }),
  mockLogin(
    '/api/user-login(accountError)',
    {
      nickName: '12ya',
      userInfo: {
        id: '1'
      }
    },
    accountError,
    'account error',
    false
  ),
  mockLogin(
    '/api/user-login(passwordError)',
    {
      nickName: '12ya',
      userInfo: {
        id: '1'
      }
    },
    passwordError,
    'password error',
    false
  ),
  mockPost('/api/user-info', {
    nickName: '12ya',
    userInfo: {
      id: '1'
    }
  })
]

export default login
