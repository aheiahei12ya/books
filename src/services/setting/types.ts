import { ExpenseType } from '@/components/biz/record-form/components/expense-form/ExpenseForm.types'
import { IncomeType } from '@/components/biz/record-form/components/income-form/IncomeForm.types'

type ItemType = {
  id: number
  key: string
  name: string
  root: number
}

export interface ExpensePresetType extends ExpenseType {
  category: ItemType
  subcategory: ItemType
}

export interface IncomePresetType extends IncomeType {
  category: ItemType
  subcategory: ItemType
}
