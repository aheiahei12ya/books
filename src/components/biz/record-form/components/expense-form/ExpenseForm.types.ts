import { ItemType, ReceiptType } from '@/components/biz/record-form/components/types'

export interface ExpenseFormProps {
  defaultValue?: {}
  value?: {}
  accountList: ItemType[]
  platformList: ItemType[]
  paymentMethodList: ItemType[]
  categoryList: ItemType[]
  subcategoryList: ItemType[]
  reimbursementStateList: ItemType[]
  shortcutList: any[]
  orientation?: 'portrait' | 'landscape'
}

export interface ExpenseDropdownType {
  platformList: ItemType[]
  accountList: ItemType[]
  categoryList: ItemType[]
  subcategoryList: ItemType[]
  paymentMethodList: ItemType[]
  reimbursementStateList: ItemType[]
}

export type ExpenseType = {
  realAmount?: number
  amount?: number
  coupon?: number
  date?: string
  time?: string
  note?: string
  account?: ItemType
  paymentMethod?: ItemType
  platform?: ItemType
  category?: ItemType
  subcategory?: ItemType
  installmentDate?: string
  installmentNumber?: number
  autoDebitDate?: string
  autoDebitNumber?: number
  reimbursementAmount?: number
  reimbursementState?: ItemType
  reimbursementFullAmount?: boolean
  ledger?: ItemType
  beneficiary?: ItemType
}

export type ExpenseConfigType = {
  [Property in keyof ExpenseType]: ReceiptType
}
