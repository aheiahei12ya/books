export interface TimePickerProps {
  id?: string
  prepend?: React.ReactNode
  placeholder?: string
  type?: string
  rules?: []
  disabled?: boolean
  readOnly?: boolean
  onChange?: (
    time: string,
    hour?: string,
    minute?: string,
    second?: string
  ) => void
  size?: 'small' | 'large'
  error?: boolean
  errorMessage?: string | React.ReactNode
  hideMessage?: boolean
  locale?: string
  width?: string
  height?: string
  showSecond?: boolean
  defaultValue?: string
}

export interface TImePickerRefs {}
