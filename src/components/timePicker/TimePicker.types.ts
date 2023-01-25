import dayjs from 'dayjs'

export interface TimePickerProps {
  id?: string
  prepend?: React.ReactNode
  placeholder?: string
  type?: string
  rules?: []
  disabled?: boolean
  readOnly?: boolean
  onSelect?: (hour: string, minute: string, second: string) => void
  size?: 'small' | 'large'
  error?: boolean
  errorMessage?: string | React.ReactNode
  hideMessage?: boolean
  activate?: 'hover' | 'click'
  locale?: string
  width?: string
  height?: string
  showSecond?: boolean
  defaultValue?: dayjs.Dayjs
}

export interface TImePickerRefs {}
