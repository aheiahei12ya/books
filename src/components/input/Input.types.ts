interface inputRule {
  required: boolean
  message: JSX.Element
  rule?: string
}

export interface InputProps {
  id?: string
  prepend?: React.ReactNode
  append?: React.ReactNode
  value?: string
  placeholder?: string
  type?: 'string' | 'digit' | 'password'
  rules?: inputRule[]
  disabled?: boolean
  readOnly?: boolean
  clearable?: boolean
  onClear?: () => void
  onChange?: (val: string) => void
  showClearIfFill?: boolean
  onEnterPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  size?: 'small' | 'large'
  error?: boolean
  errorMessage?: string | React.ReactNode
  hideMessage?: boolean
}

export interface InputRef {
  clear: () => void
  focus: () => void
  blur: () => void
  nativeElement: HTMLInputElement | null
  touch: () => boolean
}
