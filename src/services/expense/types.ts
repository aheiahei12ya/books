import { Account } from '@/services/account/types'
import { Category } from '@/services/category/types'
import { Method } from '@/services/method/types'
import { Platform } from '@/services/platform/types'
import { ExpensePresetType } from '@/services/setting/types'

export interface expenseInitialRequest {
  user: number
}

export interface expenseInitialResponse {
  accountList: Account[]
  categoryList: Category[]
  subcategoryList: Category[]
  methodList: Method[]
  platformList: Platform[]
  preset: ExpensePresetType
}
