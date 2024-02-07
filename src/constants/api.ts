// export const DEV_PREFIX = 'http://dev.aheiahei.com:9200/data/book/'
export const DEV_PREFIX = 'http://localhost:3001/'

export const accountApi = {
  list: 'api/account/list'
}

export const categoryApi = {
  list: 'api/category/list'
}

export const expenseApi = {
  initial: 'api/expense/initial'
}

export const incomeApi = {
  initial: 'api/income/initial'
}

export const userApi = {
  userLogin: 'api/user/login',
  userInfo: 'api/user/info'
}

export const statisticsApi = {
  expenseTrend: 'api/statistics/expense-trend',
  balanceTrend: 'api/statistics/balance-trend',
  expense: 'api/statistics/expense',
  expenseTimes: 'api/statistics/expense-times',
  historyToday: 'api/statistics/history-today',
  methodReminder: 'api/statistics/method-reminder',
  classification: 'api/statistics/classification'
}

export const shortcutApi = {
  list: 'api/shortcut/list'
}

export const transactionApi = {
  yearList: 'api/transaction/year-list',
  expense: 'api/transaction/expense'
}
