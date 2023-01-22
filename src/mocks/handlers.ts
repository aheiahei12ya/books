import account from './account'
import category from './category'
import login from './login'
import paymentMethod from './paymentMethod'
import platform from './platform'
import statistic from './statistic'

export const handlers = [
  ...login,
  ...statistic,
  ...platform,
  ...account,
  ...category,
  ...paymentMethod
]
