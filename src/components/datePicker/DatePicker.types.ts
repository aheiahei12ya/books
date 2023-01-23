export interface DatePickerRef {}

export interface DatePickerProps {
  id?: string
  prepend?: React.ReactNode
  placeholder?: string
  type?: string
  rules?: []
  disabled?: boolean
  readOnly?: boolean
  onSelect?: (year: number, month: number, date: number) => void
  size?: 'small' | 'large'
  error?: boolean
  errorMessage?: string | React.ReactNode
  hideMessage?: boolean
  activate?: 'hover' | 'click'
  defaultSelected?: string | undefined
  locale?: string
}
