import { Account } from '@/services/account/types'
import { Category } from '@/services/category/types'
import { Method } from '@/services/method/types'
import { Platform } from '@/services/platform/types'

export type ShortcutType = {
  id: number
  name: string
  coupon?: number
  account?: Account
  category?: Category
  subcategory?: Category
  method?: Method
  platform?: Platform
  note?: string
}

export interface ShortcutListResponse extends ShortcutType {}

export interface ShortcutListRequest {
  user: string
  type: string
}
