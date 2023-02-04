import {
  ItemType,
  ReceiptType
} from '@/components/biz/record-form/components/types'

export interface ExpenseFormProps {
  locale?: string
  defaultValue?: {}
  value?: {}
  accountList: ItemType[]
  platformList: ItemType[]
  paymentMethodList: ItemType[]
  categoryList: ItemType[]
  subcategoryList: ItemType[]
}

export interface ExpenseDropdownType {
  platformList: ItemType[]
  accountList: ItemType[]
  categoryList: ItemType[]
  subcategoryList: ItemType[]
  paymentMethodList: ItemType[]
}

export type ExpenseType = {
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

export type ExpenseConfigType = {
  amount: ReceiptType
  coupon: ReceiptType
  paymentMethod: ReceiptType
  platform: ReceiptType
  category: ReceiptType
  subcategory: ReceiptType
  date: ReceiptType
  time: ReceiptType
  account: ReceiptType
  note: ReceiptType
  installmentDate: ReceiptType
  installmentNumber: ReceiptType
  autoDebitDate: ReceiptType
  autoDebitNumber: ReceiptType
  reimbursementAmount: ReceiptType
  reimbursementState: ReceiptType
  reimbursementFullAmount: ReceiptType
}
