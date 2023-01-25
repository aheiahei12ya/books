import { account } from '@/services/account/types'
import { category } from '@/services/category/types'
import { paymentMethod } from '@/services/paymentMethod/types'
import { platform } from '@/services/platform/types'
import { presetType } from '@/services/setting/types'

export interface expenseInitialRequest {
  user: number
}

export interface expenseInitialResponse {
  accountList: account[]
  categoryList: category[]
  subcategoryList: category[]
  paymentMethodList: paymentMethod[]
  platformList: platform[]
  preset: presetType
}
