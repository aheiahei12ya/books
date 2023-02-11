import { ItemType, ReceiptType } from '@/components/biz/record-form/components/types'

export interface IncomeFormProps {
  defaultValue?: {}
  value?: {}
  accountList: ItemType[]
  categoryList: ItemType[]
  subcategoryList: ItemType[]
  shortcutList: any[]
}

export interface IncomeDropdownType {
  accountList: ItemType[]
  categoryList: ItemType[]
  subcategoryList: ItemType[]
}

export type IncomeType = {
  realAmount?: number | undefined
  amount?: number | undefined
  tax?: number | undefined
  date?: string | undefined
  time?: string | undefined
  note?: string | undefined
  account?: ItemType | undefined
  category?: ItemType | undefined
  subcategory?: ItemType | undefined
}

export type IncomeConfigType = {
  amount: ReceiptType
  tax: ReceiptType
  category: ReceiptType
  subcategory: ReceiptType
  date: ReceiptType
  time: ReceiptType
  account: ReceiptType
  note: ReceiptType
}
