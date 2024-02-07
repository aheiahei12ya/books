import { RefObject } from 'react'

import { RuleType } from '@/components/lib/rule'
import { FormStoreType } from '@/hooks/useForm/types'

export interface FormContextType {
  form?: FormStoreType
  rules?: Record<string, RuleType[]>
  validate: boolean
  formItemMap?: RefObject<Map<any, RefObject<any>>>
  initialValue?: Record<string, any>
}
