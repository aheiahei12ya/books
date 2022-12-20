import { mockPost } from '@/mocks/utils'

const login = [
  mockPost('/submit', {
    nickName: 'ww',
    userInfo: {
      id: '1'
    }
  })
]

export default login
