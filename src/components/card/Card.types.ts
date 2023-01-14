export interface CardRef {
  width?: number
  height?: number
}

export interface CardProps {
  title?: string
  subtitle?: string
  className?: string
  elevation?: number
  fill?: boolean
  children?: React.ReactNode
}
