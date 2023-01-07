export interface SidebarButtonProps {
  key?: string | number
  icon: string | React.ReactNode
  hideText?: boolean
  selected?: boolean
  children?: React.ReactNode
  type?: 'default' | 'brand' | 'tool' | 'avatar'
  onClick?: () => void
}
