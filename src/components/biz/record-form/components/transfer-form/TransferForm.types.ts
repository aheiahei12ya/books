import {IncomeType} from "@/components/biz/record-form/components/income-form";
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
  amount?: number
  date?: string
  time?: string
  sourceAccount?: ItemType
  targetAccount?: ItemType
  note?: string
  ledger?: ItemType
  beneficiary?: ItemType
}

export type TransferConfigType = {
  [Property in keyof Exclude<IncomeType, 'amount'>]: ReceiptType
} & {
  sourceAmount: ReceiptType
  targetAmount: ReceiptType
}
