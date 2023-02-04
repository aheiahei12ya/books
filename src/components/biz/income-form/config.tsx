import { IncomeConfigType } from './IncomeForm.types'

export const incomeReceiptKeys = [
  'amount',
  'tax',
  'account',
  'category',
  'subcategory',
  'date',
  'time'
]

export const incomeFormKeys = [
  ['account', 'category', 'subcategory'],
  ['date', 'time'],
  ['tax', 'amount']
]

export const incomeFormKeysAppend = [['note']]

export const incomeConfig: IncomeConfigType = {
  amount: {
    type: 'input',
    name: '收入金额',
    icon: <i className="fa-regular fa-sack-dollar"></i>
  },
  tax: {
    type: 'input',
    name: '缴纳税款',
    icon: <i className="fa-regular fa-percent"></i>
  },
  category: {
    type: 'select',
    name: '一级分类',
    icon: <i className="fa-regular fa-grid-horizontal"></i>,
    items: []
  },
  subcategory: {
    type: 'select',
    name: '二级分类',
    icon: <i className="fa-regular fa-grid"></i>,
    items: []
  },
  date: {
    type: 'date-picker',
    name: '消费日期',
    icon: <i className="fa-regular fa-calendar"></i>
  },
  time: {
    type: 'time-picker',
    name: '消费时间',
    icon: <i className="fa-regular fa-clock"></i>
  },
  account: {
    type: 'select',
    name: '收入账户',
    icon: <i className="fa-regular fa-piggy-bank"></i>,
    items: []
  },
  note: {
    type: 'input',
    name: '备注',
    icon: <i className="fa-regular fa-comment"></i>
  }
}

export const rules = {
  amount: [{ required: true, message: '请输入订单金额' }],
  platform: [{ required: true, message: '请选择消费平台' }],
  category: [{ required: true, message: '请选择一级分类' }],
  subcategory: [{ required: true, message: '请选择二级分类' }],
  date: [{ required: true, message: '请选择消费日期' }],
  time: [{ required: true, message: '请选择消费时间' }],
  account: [{ required: true, message: '请选择支出账户' }],
  note: [{ required: true, message: '请输入备注' }],
}
