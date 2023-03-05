export interface CardRef {
  width?: number
  height?: number
}

export interface CardProps {
  title?: string
  subtitle?: string
  className?: string
  style?: object
  elevation?: number
  fill?: boolean
  children?: React.ReactNode
}
