import { mockPost } from '@/mocks/utils'

const statistic = [
  mockPost('/api/statistics/outcome-trend', {
    trend: [0, 56, 183, 74, 40, 54, 100, 200, 210, 304, 250, 120]
  }),
  mockPost('/api/statistics/balance-trend', {
    trend: [0, 56, 74, 74, 40, 54, 100, 200, 210, 230, 250, 300]
  })
]

export default statistic
