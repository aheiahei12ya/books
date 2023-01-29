export interface DropdownRule {
  required: boolean
  message?: JSX.Element
  rule?: string
}

export interface DropdownProps {
  id?: string
  width?: string
  height?: string
  size?: 'small' | 'large'

  onChange?: (val: string) => void
  value?: string | object
  returnObject?: boolean

  items?: any[]
  itemName?: string
  defaultValue?: string
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean

  rules?: DropdownRule[]
  error?: boolean
  errorMessage?: string | React.ReactNode
  hideMessage?: boolean

  prepend?: React.ReactNode
}

export interface DropdownRef {
  touch: () => boolean
}
