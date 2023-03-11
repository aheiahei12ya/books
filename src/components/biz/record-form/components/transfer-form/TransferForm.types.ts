import { ItemType, ReceiptType } from '@/components/biz/record-form/components/types'

export interface TransferFormProps {
  defaultValue?: {}
  value?: {}
  accountList: ItemType[]
  shortcutList: any[]
  orientation?: 'portrait' | 'landscape'
}

export interface TransferFormRef {}

export interface TransferDropdownType {
  accountList: ItemType[]
}

export type TransferType = {
  amount?: number | undefined
  date?: string | undefined
  time?: string | undefined
  sourceAccount?: ItemType | undefined
  targetAccount?: ItemType | undefined
}

export type TransferConfigType = {
  sourceAmount: ReceiptType
  targetAmount: ReceiptType
  date: ReceiptType
  time: ReceiptType
  sourceAccount: ReceiptType
  targetAccount: ReceiptType
}
