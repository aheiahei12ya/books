import { expenseType } from '@/components/biz/expense-form/ExpenseForm.types'

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
