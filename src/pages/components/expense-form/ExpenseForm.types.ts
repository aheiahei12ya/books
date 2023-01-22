import { ReactNode } from 'react'

export interface ExpenseFormProps {
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
}

export type itemType = {
  id: number
  name: string
}

type receiptType = {
  type: 'input' | 'select'
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
}
