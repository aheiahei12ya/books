import { mockPost } from '@/mocks/utils'

const paymentMethod = [
  mockPost('api/payment-method/list', {
    paymentMethodList: [
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
  })
]

export default paymentMethod
