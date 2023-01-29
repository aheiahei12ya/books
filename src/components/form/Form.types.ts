import { FormStoreType } from '@/hooks/useForm/types'

import { RuleType } from './FormContext.types'

export interface FormProps {
  form?: FormStoreType
  rules?: Record<string, RuleType[]>
  initialValue?: any
  children?: React.ReactNode
  orientation?: 'vertical' | 'horizontal'
  className?: string
  onSubmit?: (context: any) => void
}
