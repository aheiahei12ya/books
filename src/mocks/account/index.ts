import { mockPost } from '@/mocks/utils'

const account = [
  mockPost('/api/account/list', {
    accountList: [
      {
        id: 2,
        name: '余额'
      },
      {
        id: 5,
        name: '花呗'
      },
      {
        id: 3,
        name: '借呗'
      },
      {
        id: 6,
        name: '金条'
      },
      {
        id: 7,
        name: '美团月付'
      },
      {
        id: 1,
        name: '京东白条'
      },
      {
        id: 4,
        name: '招行信用卡'
      }
    ]
  })
]

export default account
