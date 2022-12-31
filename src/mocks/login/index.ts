import { accountError, passwordError } from '@/constants/resultCode'
import { mockLogin, mockPost } from '@/mocks/utils'

const login = [
  mockLogin('/api/userLogin', {
    nickName: '12ya',
    userInfo: {
      id: '1'
    }
  }),
  mockLogin(
    '/api/userLogin(accountError)',
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
    '/api/userLogin(passwordError)',
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
  mockPost('/api/userInfo', {
    nickName: '12ya',
    userInfo: {
      id: '1'
    }
  })
]

export default login