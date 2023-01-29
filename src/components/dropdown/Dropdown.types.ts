import { RuleType } from '@/components/lib/rule'

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

  rules?: RuleType[]
  error?: boolean
  errorMessage?: string | React.ReactNode
  hideMessage?: boolean

  prepend?: React.ReactNode
}

export interface DropdownRef {
  touch: () => boolean
}
