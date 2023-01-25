import { mockPost } from '@/mocks/utils'

const statistic = [
  mockPost('/api/platform/list', {
    platformList: [
      {
        id: 5,
        name: '线下',
        key: 'offline'
      },
      {
        id: 3,
        name: '京东',
        key: 'jingdong'
      },
      {
        id: 1,
        name: '淘宝天猫',
        key: 'taobao'
      },
      {
        id: 7,
        name: '小米有品'
      },
      {
        id: 4,
        name: '网易考拉'
      },
      {
        id: 6,
        name: '应用商店'
      },
      {
        id: 8,
        name: '苹果商店'
      },
      {
        id: 9,
        name: '京东金融'
      }
    ]
  })
]

export default statistic
