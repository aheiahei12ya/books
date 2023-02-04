import { ReactNode } from 'react'

export interface IncomeFormProps {
  locale: string
  defaultValue?: {}
  value?: {}
}

export type IncomeType = {
  realAmount?: number | undefined
  amount?: number | undefined
  coupon?: number | undefined
  date?: string | undefined
  time?: string | undefined
  note?: string | undefined
  account?: ItemType | undefined
  paymentMethod?: ItemType | undefined
  platform?: ItemType | undefined
  category?: ItemType | undefined
  subcategory?: ItemType | undefined
  installmentDate?: string | undefined
  installmentNumber?: number | undefined
  autoDebitDate?: string | undefined
  autoDebitNumber?: number | undefined
  reimbursementAmount?: number | undefined
  reimbursementState?: ItemType | undefined
  reimbursementFullAmount?: boolean | undefined
}

export type ItemType = {
  id?: number
  key: string
  name: string
}

type ReceiptType = {
  type: 'input' | 'select' | 'checkbox' | 'date-picker' | 'time-picker'
  name: string
  icon: ReactNode
  items?: ItemType[]
}

export type IncomeConfigType = {
  amount: ReceiptType
  tax: ReceiptType
  // paymentMethod: ReceiptType
  category: ReceiptType
  subcategory: ReceiptType
  date: ReceiptType
  time: ReceiptType
  account: ReceiptType
  note: ReceiptType
}
