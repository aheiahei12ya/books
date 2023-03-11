export interface CardRef {
  width?: number
  height?: number
}

export interface CardProps {
  title?: string
  subtitle?: string
  tools?: React.ReactNode
  className?: string
  headerClass?: string
  bodyClass?: string
  toolClass?: string
  style?: object
  bodyStyle?: object
  titleStyle?: object
  subtitleStyle?: object
  elevation?: number
  fill?: boolean
  children?: React.ReactNode
}
