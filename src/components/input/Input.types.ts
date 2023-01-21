interface inputRule {
  required: boolean
  message: JSX.Element
  rule?: string
}

export interface InputProps {
  id?: string
  prepend?: React.ReactNode
  append?: React.ReactNode
  addonBefore?: React.ReactNode
  addonAfter?: React.ReactNode
  affixWrapperClassName?: string
  value?: string
  placeholder?: string
  type?: string
  rules?: inputRule[]
  disabled?: boolean
  readOnly?: boolean
  clearable?: boolean
  onChange?: (val: string) => void
  onEnterPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  enterKeyHint?:
    | 'enter'
    | 'done'
    | 'go'
    | 'next'
    | 'previous'
    | 'search'
    | 'send'
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
