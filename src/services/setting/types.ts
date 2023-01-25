import { expenseType } from '@/components/biz/expense-form/ExpenseForm.types'

export interface presetExpenseFormRequest {
  user: number
}

type itemType = {
  id: number
  key: string
  name: string
  root: number
}

export interface presetType extends expenseType {
  category: itemType
  subcategory: itemType
}

export interface presetExpenseFormResponse {
  preset: presetType
}
