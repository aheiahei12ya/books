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
