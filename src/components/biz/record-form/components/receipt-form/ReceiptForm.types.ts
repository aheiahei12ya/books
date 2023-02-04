import {
  ExpenseConfigType,
  ExpenseType
} from '@/components/biz/record-form/components/expense-form/ExpenseForm.types'
import {
  IncomeConfigType,
  IncomeType
} from '@/components/biz/record-form/components/income-form/IncomeForm.types'

export interface ReceiptFormProps {
  type: 'expense' | 'income'
  item: ExpenseType | IncomeType
  config: ExpenseConfigType | IncomeConfigType
  itemName: string
}
