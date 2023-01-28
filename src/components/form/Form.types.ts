import { FormStoreType } from '@/hooks/useForm/types'

interface RuleType {
  required: boolean
  message: JSX.Element | string
  rule?: string
}

export interface FormProps {
  form?: FormStoreType
  rules?: RuleType[]
  initialValue?: any
  children?: React.ReactNode
  orientation?: 'vertical' | 'horizontal'
  className?: string
}
