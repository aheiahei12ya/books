import { RuleType } from '@/components/lib/rule'
import { FormStoreType } from '@/hooks/useForm/types'

export interface FormContextType {
  form?: FormStoreType
  rules?: Record<string, RuleType[]>
  validate: boolean
  formItemMap?: React.RefObject<Map<any, React.RefObject<any>>>
  initialValue?: {}
}
