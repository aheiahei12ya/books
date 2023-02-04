import { Account } from '@/services/account/types'
import { Category } from '@/services/category/types'
import { IncomePresetType } from '@/services/setting/types'

export interface incomeInitialRequest {
  user: number
}

export interface incomeInitialResponse {
  accountList: Account[]
  categoryList: Category[]
  subcategoryList: Category[]
  preset: IncomePresetType
}
