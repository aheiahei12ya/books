export interface TagProps {
  select?: boolean
  onClick?: () => void
  icon?: React.ReactNode
  color?: 'primary' | 'success' | 'danger' | 'warning' | 'default'
  size?: 'small' | 'middle' | 'large'
}

export interface TagRef {}
