import { expenseType } from '@/components/biz/expense-form/ExpenseForm.types'
import { IncomeType } from "@/components/biz/income-form/IncomeForm.types";

export interface ReceiptFormProps {
  type: 'expense' | 'income'
  item: expenseType | IncomeType
  itemName: string
}
