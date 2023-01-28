import { ReactNode } from 'react'

export interface ExpenseFormProps {
  locale?: string
  defaultValue?: {}
  value?: {}
}

export type expenseType = {
  realAmount?: number | undefined
  amount?: number | undefined
  coupon?: number | undefined
  date?: string | undefined
  time?: string | undefined
  note?: string | undefined
  account?: itemType | undefined
  paymentMethod?: itemType | undefined
  platform?: itemType | undefined
  category?: itemType | undefined
  subcategory?: itemType | undefined
  installmentDate?: string | undefined
  installmentNumber?: number | undefined
  autoDebitDate?: string | undefined
  autoDebitNumber?: number | undefined
  reimbursementAmount?: number | undefined
  reimbursementState?: itemType | undefined
  reimbursementFullAmount?: boolean | undefined
}

export type itemType = {
  id?: number
  key: string
  name: string
}

type receiptType = {
  type: 'input' | 'select' | 'checkbox' | 'date-picker' | 'time-picker'
  name: string
  icon: ReactNode
  items?: itemType[]
}

export type expenseConfigType = {
  amount: receiptType
  coupon: receiptType
  paymentMethod: receiptType
  platform: receiptType
  category: receiptType
  subcategory: receiptType
  date: receiptType
  time: receiptType
  account: receiptType
  note: receiptType
  installmentDate: receiptType
  installmentNumber: receiptType
  autoDebitDate: receiptType
  autoDebitNumber: receiptType
  reimbursementAmount: receiptType
  reimbursementState: receiptType
  reimbursementFullAmount: receiptType
}
