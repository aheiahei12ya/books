interface brandProps {
  name: string | React.ReactNode
  icon: string | React.ReactNode
  path?: string
}

interface itemProps {
  key?: string | number
  name: string | React.ReactNode
  icon: string | React.ReactNode
  path?: string
  selected: boolean
}

interface toolProps {
  key?: string | number
  name: string | React.ReactNode
  icon: string | React.ReactNode
  path?: string
  onClick?: () => void
}

export interface SidebarProps {
  brand?: brandProps
  avatar?: React.ReactNode
  items: Array<itemProps>
  tools?: Array<toolProps>
  defaultShrink?: boolean
  autoShrink?: boolean
  shrinkBtnName?: string
  defaultSelected?: number
  hideShrinkButton?: boolean
}
