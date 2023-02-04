import { ExpenseType } from '@/components/biz/record-form/components/expense-form/ExpenseForm.types'
import { IncomeType } from '@/components/biz/record-form/components/income-form/IncomeForm.types'

export interface ReceiptFormProps {
  type: 'expense' | 'income'
  item: ExpenseType | IncomeType
  itemName: string
}
