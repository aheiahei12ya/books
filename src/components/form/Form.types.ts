import { RuleType } from '@/components/lib/rule'
import { FormStoreType } from '@/hooks/useForm/types'

export interface FormProps {
  id?: string
  form?: FormStoreType
  rules?: Record<string, RuleType[]>
  initialValue?: any
  children?: React.ReactNode
  orientation?: 'vertical' | 'horizontal'
  gap?: string
  className?: string
  onSubmit?: (context: any) => void
}
