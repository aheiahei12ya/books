import { FormStoreType } from '@/hooks/useForm/types'

export interface FormContextType {
  form?: FormStoreType
  rules?: any
  initialValue?: {}
}
