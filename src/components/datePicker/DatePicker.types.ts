import { RuleType } from '@/components/lib/rule'

export interface DatePickerRef {
  touch: () => boolean
}

export interface DatePickerProps {
  id?: string
  width?: string
  height?: string
  size?: 'small' | 'large'

  value?: string
  onChange?: (date: string, year?: number, month?: number, day?: number) => void

  defaultValue?: string
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean

  rules?: RuleType[]
  error?: boolean
  errorMessage?: string | React.ReactNode
  hideMessage?: boolean

  locale?: string
  prepend?: React.ReactNode
}
