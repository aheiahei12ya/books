export interface CheckboxRef {
  check: () => void
  uncheck: () => void
}

export interface CheckboxProps {
  id?: string
  checked?: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
  children?: React.ReactNode
}
