export interface DatePickerRef {}

export interface DatePickerProps {
  id?: string
  prepend?: React.ReactNode
  placeholder?: string
  type?: string
  rules?: []
  disabled?: boolean
  readOnly?: boolean
  onChange?: (date: string, year?: number, month?: number, day?: number) => void
  size?: 'small' | 'large'
  error?: boolean
  errorMessage?: string | React.ReactNode
  hideMessage?: boolean
  defaultSelected?: string | undefined
  locale?: string
  width?: string
  height?: string
}
