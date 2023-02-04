import { RuleType } from '@/components/lib/rule'

export interface InputProps {
  id?: string
  size?: 'small' | 'large'
  type?: 'string' | 'digit' | 'password' | 'calculator'

  value?: string
  onClear?: () => void
  onChange?: (val: string) => void
  onEnterPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void

  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  clearable?: boolean
  showClearIfFill?: boolean

  rules?: RuleType[]
  error?: boolean
  errorMessage?: string | React.ReactNode
  hideMessage?: boolean

  prepend?: React.ReactNode
  append?: React.ReactNode
}

export interface InputRef {
  blur: () => void
  clear: () => void
  focus: () => void
  touch: () => boolean
  nativeElement: HTMLInputElement | null
}
