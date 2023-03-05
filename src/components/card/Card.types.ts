export interface CardRef {
  width?: number
  height?: number
}

export interface CardProps {
  title?: string
  subtitle?: string
  className?: string
  bodyClass?: string
  style?: object
  bodyStyle?: object
  titleStyle?: object
  subtitleStyle?: object
  elevation?: number
  fill?: boolean
  children?: React.ReactNode
}
