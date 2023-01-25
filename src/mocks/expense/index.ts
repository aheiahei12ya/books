import { mockPost } from '@/mocks/utils'
import { expenseInitialResponse } from '@/services/expense/types'
import { presetType } from '@/services/setting/types'

const accountListData = [
  {
    id: 2,
    name: '余额',
    key: 'balance'
  },
  {
    id: 5,
    name: '花呗',
    key: ''
  },
  {
    id: 3,
    name: '借呗',
    key: ''
  },
  {
    id: 6,
    name: '金条',
    key: ''
  },
  {
    id: 7,
    name: '美团月付',
    key: ''
  },
  {
    id: 1,
    name: '京东白条',
    key: ''
  },
  {
    id: 4,
    name: '招行信用卡',
    key: ''
  }
]
const categoryListData = [
  {
    id: 3,
    name: '日常开销',
    key: 'daily',
    root: 1
  },
  {
    id: 4,
    name: '生活开销',
    key: 'life',
    root: 1
  },
  {
    id: 5,
    name: '人物培养',
    key: 'character',
    root: 1
  },
  {
    id: 6,
    name: '败家消费',
    key: 'splurge',
    root: 1
  },
  {
    id: 7,
    name: '虚拟商品',
    key: 'virtual',
    root: 1
  }
]
const subcategoryListData = [
  {
    id: 5,
    key: 'dinner',
    name: '吃饭',
    root: 1
  },
  {
    id: 6,
    key: 'drink',
    name: '饮料',
    root: 1
  },
  {
    id: 7,
    key: 'snack',
    name: '零食',
    root: 1
  }
]
const paymentMethodListData = [
  {
    id: 5,
    name: '正常支付',
    key: 'normal'
  },
  {
    id: 3,
    name: '分期付款',
    key: 'installment'
  },
  {
    id: 1,
    name: '公司报销',
    key: 'reimbursement'
  },
  {
    id: 7,
    name: '自动扣款',
    key: 'auto-debit'
  }
]
const platformListData = [
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
const presetData: presetType = {
  realAmount: undefined,
  amount: undefined,
  coupon: undefined,
  note: undefined,
  account: {
    id: 1,
    key: 'balance',
    name: '余额'
  },
  paymentMethod: {
    id: 2,
    key: 'normal',
    name: '正常支付'
  },
  platform: {
    id: 3,
    key: 'taobao',
    name: '淘宝天猫'
  },
  category: {
    id: 4,
    key: 'daily',
    name: '日常开销',
    root: 0
  },
  subcategory: {
    id: 5,
    key: 'dinner',
    name: '吃饭',
    root: 1
  },
  reimbursementState: {
    name: '待报销',
    key: 'waiting'
  }
}

const expenseInitialData: expenseInitialResponse = {
  accountList: accountListData,
  categoryList: categoryListData,
  subcategoryList: subcategoryListData,
  paymentMethodList: paymentMethodListData,
  platformList: platformListData,
  preset: presetData
}

const expense = [mockPost('/api/expense/initial', expenseInitialData)]

export default expense
