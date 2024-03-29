export interface TagProps {
  select?: boolean
  onClick?: () => void
  icon?: React.ReactNode
  color?: 'primary' | 'success' | 'danger' | 'warning' | 'default'
  size?: 'small' | 'middle' | 'large'
  shape?: 'rect' | 'round'
  width?: string
  hideBorder?: boolean
  children?: React.ReactNode
}

export interface TagRef {}
