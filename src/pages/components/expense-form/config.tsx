import { expenseConfigType } from '@/pages/components/expense-form/ExpenseForm.types'

export const receiptDetailKeys = [
  'amount',
  'coupon',
  'account',
  'paymentMethod',
  'platform',
  'category',
  'subcategory',
  'date',
  'time',
]

export const expenseFormKeys = [
  ['account', 'platform', 'paymentMethod'],
  ['category', 'subcategory', 'coupon'],
  ['date', 'time', 'amount'],
  ['note']
]

export const expenseConfig: expenseConfigType = {
  amount: {
    type: 'input',
    name: '订单金额',
    icon: <i className="fa-regular fa-sack-dollar"></i>,
  },
  coupon: {
    type: 'input',
    name: '现金优惠',
    icon: <i className="fa-regular fa-percent"></i>,
  },
  paymentMethod: {
    type: 'select',
    name: '付款方式',
    icon: <i className="fa-regular fa-credit-card"></i>,
    items: []
  },
  platform: {
    type: 'select',
    name: '消费平台',
    icon: <i className="fa-regular fa-map-pin"></i>,
    items: []
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
    type: 'select',
    name: '消费日期',
    icon: <i className="fa-regular fa-calendar"></i>,
  },
  time: {
    type: 'select',
    name: '消费时间',
    icon: <i className="fa-regular fa-clock"></i>,
  },
  account: {
    type: 'select',
    name: '支出账户',
    icon: <i className="fa-regular fa-piggy-bank"></i>,
    items: []
  },
  note: {
    type: 'input',
    name: '备注',
    icon: <i className="fa-regular fa-comment"></i>
  }
}
