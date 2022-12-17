export interface ButtonRef {
  nativeElement: HTMLButtonElement | null
}

export interface ButtonProps {
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  type?: 'submit' | 'reset' | 'button'
  shape?: 'default' | 'rounded' | 'rectangular'
  fill?: 'solid' | 'outline' | 'none'
  size?: 'mini' | 'small' | 'middle' | 'large'
  block?: boolean
  loading?: boolean | 'auto'
  loadingText?: string
  loadingIcon?: React.ReactNode
  disabled?: boolean
  className?: string;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | Promise<void> | unknown
  children?: React.ReactNode
}
