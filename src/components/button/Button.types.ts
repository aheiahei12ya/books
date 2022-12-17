export interface ButtonRef {
  nativeElement: HTMLButtonElement | null
}

export interface ButtonProps {
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  type?: 'default' | 'text'
  shape?: 'default' | 'rounded' | 'rectangular'
  fill?: 'solid' | 'outline' | 'none'
  size?: 'default' | 'mini' | 'small' | 'middle' | 'large'
  block?: boolean
  loading?: boolean | 'auto'
  disabled?: boolean
  className?: string;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | Promise<void> | unknown
  children?: React.ReactNode
}
