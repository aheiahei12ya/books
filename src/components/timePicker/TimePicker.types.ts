export interface TimePickerProps {
  id?: string
  width?: string
  height?: string
  size?: 'small' | 'large'

  value?: string
  onChange?: (
    time: string,
    hour?: string,
    minute?: string,
    second?: string
  ) => void

  showSecond?: boolean
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

export interface TimePickerRefs {}
