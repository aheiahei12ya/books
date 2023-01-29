import { FormStoreType } from '@/hooks/useForm/types'

export interface RuleType {
  required: boolean
  message?: JSX.Element | string
  rule?: string
}

export interface FormContextType {
  form?: FormStoreType
  rules?: Record<string, RuleType[]>
  validate: boolean
  formItemMap?: React.RefObject<Map<any, React.RefObject<any>>>
  initialValue?: {}
}
