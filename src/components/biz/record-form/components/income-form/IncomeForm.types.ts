import { ItemType, ReceiptType } from '@/components/biz/record-form/components/types'

export interface IncomeFormProps {
  defaultValue?: Record<string, any>
  value?: Record<string, any>
  accountList: ItemType[]
  categoryList: ItemType[]
  subcategoryList: ItemType[]
  shortcutList: any[]
  orientation?: 'portrait' | 'landscape'
}

export interface IncomeDropdownType {
  accountList: ItemType[]
  categoryList: ItemType[]
  subcategoryList: ItemType[]
}

export type IncomeType = {
  realAmount?: number
  amount?: number
  tax?: number
  date?: string
  time?: string
  note?: string
  account?: ItemType
  category?: ItemType
  subcategory?: ItemType
  ledger?: ItemType
  beneficiary?: ItemType
  channel?: ItemType
  method?: ItemType
}

export type IncomeConfigType = {
  [Property in keyof Exclude<IncomeType, 'realAmount'>]: ReceiptType
}