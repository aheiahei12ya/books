export interface ButtonRef {
  nativeElement: HTMLButtonElement | null
}

export interface ButtonProps {
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  type?: 'default' | 'text'
  htmlType?: 'submit' | 'reset' | 'button'
  shape?: 'default' | 'rounded' | 'rectangular'
  fill?: 'solid' | 'outline' | 'none'
  size?: 'default' | 'mini' | 'small' | 'middle' | 'large'
  block?: boolean
  loading?: boolean | 'auto'
  disabled?: boolean
  className?: string
  form?: string
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | Promise<void> | unknown
  children?: React.ReactNode
}
