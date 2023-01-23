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
  'time'
]

export const expenseFormKeys = [
  ['platform', 'category', 'subcategory'],
  ['date', 'time', 'amount'],
  ['account', 'paymentMethod', 'coupon']
]

export const expenseFormKeysAppend = [['note']]

export const installmentKeys = ['installmentDate', 'installmentNumber']

export const autoDebitKeys = ['autoDebitDate', 'autoDebitNumber']

export const reimbursementKeys = [
  'reimbursementAmount',
  'reimbursementState',
  'reimbursementFullAmount'
]

export const expenseConfig: expenseConfigType = {
  amount: {
    type: 'input',
    name: '订单金额',
    icon: <i className="fa-regular fa-sack-dollar"></i>
  },
  coupon: {
    type: 'input',
    name: '现金优惠',
    icon: <i className="fa-regular fa-percent"></i>
  },
  paymentMethod: {
    type: 'select',
    name: '付款方式',
    icon: <i className="fa-regular fa-credit-card"></i>,
    items: [
      { name: '正常支付', key: 'normal' },
      { name: '分期付款', key: 'installment' },
      { name: '公司报销', key: 'reimbursement' },
      { name: '自动扣款', key: 'auto-debit' }
    ]
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
    icon: <i className="fa-regular fa-calendar"></i>
  },
  time: {
    type: 'select',
    name: '消费时间',
    icon: <i className="fa-regular fa-clock"></i>
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
  },
  installmentDate: {
    type: 'select',
    name: '扣款日期',
    icon: <i className="fa-regular fa-calendar-clock"></i>
  },
  installmentNumber: {
    type: 'select',
    name: '分期期数',
    icon: <i className="fa-regular fa-hashtag"></i>
  },
  autoDebitDate: {
    type: 'select',
    name: '扣款日期',
    icon: <i className="fa-regular fa-calendar-clock"></i>
  },
  autoDebitNumber: {
    type: 'select',
    name: '扣款次数',
    icon: <i className="fa-regular fa-hashtag"></i>
  },
  reimbursementAmount: {
    type: 'input',
    name: '报销金额',
    icon: <i className="fa-regular fa-calendar-clock"></i>
  },
  reimbursementFullAmount: {
    type: 'checkbox',
    name: '全额报销',
    icon: <i className="fa-regular fa-calendar-clock"></i>
  },
  reimbursementState: {
    type: 'select',
    name: '报销状态',
    icon: <i className="fa-regular fa-hashtag"></i>,
    items: [
      { name: '待报销', key: 'waiting' },
      { name: '报销中', key: 'ongoing' },
      { name: '已报销', key: 'finished' }
    ]
  }
}
