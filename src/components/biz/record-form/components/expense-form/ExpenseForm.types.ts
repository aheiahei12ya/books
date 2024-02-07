import { ItemType, ReceiptType } from '@/components/biz/record-form/components/types'

export interface ExpenseFormProps {
  defaultValue?: Record<string, any>
  value?: Record<string, any>
  accountList: ItemType[]
  platformList: ItemType[]
  methodList: ItemType[]
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
  methodList: ItemType[]
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
  method?: ItemType
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
