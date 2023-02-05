import { ExpenseConfigType, ExpenseType } from '@/components/biz/record-form/components/expense-form/ExpenseForm.types'
import { IncomeConfigType, IncomeType } from '@/components/biz/record-form/components/income-form/IncomeForm.types'
import { TransferConfigType } from '@/components/biz/record-form/components/transfer-form/TransferForm.types'

export interface ReceiptFormProps {
  type: 'expense' | 'income' | 'transfer'
  item: ExpenseType | IncomeType
  keys: string[]
  config: ExpenseConfigType | IncomeConfigType | TransferConfigType
  itemName: string
}
