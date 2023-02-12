export interface ProgressProps {
  size?: 'small' | 'middle' | 'large'
  type?: 'line' | 'plump'
  text?: string
  label?: boolean
  percentage?: number
  backgroundColor?: 'primary' | 'success' | 'danger' | 'warning' | 'default'
  textColor?: string
  className?: string
}

export interface ProgressRef {}
