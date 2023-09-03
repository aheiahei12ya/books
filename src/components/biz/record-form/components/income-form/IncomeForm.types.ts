import { ItemType, ReceiptType } from '@/components/biz/record-form/components/types'

export interface IncomeFormProps {
  defaultValue?: {}
  value?: {}
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
}

export type IncomeConfigType = {
  [Property in keyof Exclude<IncomeType, 'realAmount'>]: ReceiptType
}