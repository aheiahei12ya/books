interface DropdownRule {
  required: boolean
  message?: JSX.Element
  rule?: string
}

export interface DropdownProps {
  id?: string
  prepend?: React.ReactNode
  placeholder?: string
  type?: string
  rules?: DropdownRule[]
  disabled?: boolean
  readOnly?: boolean
  onSelect?: (val: string) => void
  size?: 'small' | 'large'
  error?: boolean
  errorMessage?: string | React.ReactNode
  hideMessage?: boolean
  activate?: 'hover' | 'click'
  items?: any[]
  itemName?: string
  returnObject?: boolean
  defaultSelected?: string | undefined
  value?: string
}
