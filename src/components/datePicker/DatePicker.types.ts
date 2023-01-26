export interface DatePickerRef {}

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

  rules?: []
  error?: boolean
  errorMessage?: string | React.ReactNode
  hideMessage?: boolean

  locale?: string
  prepend?: React.ReactNode
}
