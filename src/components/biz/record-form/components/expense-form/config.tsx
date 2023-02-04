import { ExpenseConfigType } from './ExpenseForm.types'

export const expenseReceiptKeys = [
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

export const expenseConfig: ExpenseConfigType = {
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
    type: 'date-picker',
    name: '扣款日期',
    icon: <i className="fa-regular fa-calendar-clock"></i>
  },
  installmentNumber: {
    type: 'input',
    name: '分期期数',
    icon: <i className="fa-regular fa-hashtag"></i>
  },
  autoDebitDate: {
    type: 'date-picker',
    name: '扣款日期',
    icon: <i className="fa-regular fa-calendar-clock"></i>
  },
  autoDebitNumber: {
    type: 'input',
    name: '扣款次数',
    icon: <i className="fa-regular fa-hashtag"></i>
  },
  reimbursementAmount: {
    type: 'input',
    name: '报销金额',
    icon: <i className="fa-regular fa-hashtag"></i>
  },
  reimbursementFullAmount: {
    type: 'checkbox',
    name: '全额报销',
    icon: <i className="fa-regular fa-calendar-clock"></i>
  },
  reimbursementState: {
    type: 'select',
    name: '报销状态',
    icon: <i className="fa-regular fa-tags"></i>,
    items: [
      { name: '待报销', key: 'waiting' },
      { name: '报销中', key: 'ongoing' },
      { name: '已报销', key: 'finished' }
    ]
  }
}

export const rules = {
  amount: [{ required: true, message: '请输入订单金额' }],
  paymentMethod: [{ required: true, message: '请选择付款方式' }],
  platform: [{ required: true, message: '请选择消费平台' }],
  category: [{ required: true, message: '请选择一级分类' }],
  subcategory: [{ required: true, message: '请选择二级分类' }],
  date: [{ required: true, message: '请选择消费日期' }],
  time: [{ required: true, message: '请选择消费时间' }],
  account: [{ required: true, message: '请选择支出账户' }],
  note: [{ required: true, message: '请输入备注' }],
  installmentDate: [{ required: true, message: '请选择扣款日期' }],
  installmentNumber: [{ required: true, message: '请输入分期期数' }],
  autoDebitDate: [{ required: true, message: '请选择扣款日期' }],
  autoDebitNumber: [{ required: true, message: '请输入扣款次数' }],
  // reimbursementAmount: [{ required: true, message: '请输入报销金额' }],
  reimbursementState: [{ required: true, message: '请选择报销状态' }]
}
