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
  shrinkBtnName?: string
  defaultValue?: number

  autoShrink?: boolean
  defaultShrink?: boolean
  hideShrinkButton?: boolean

  avatar?: React.ReactNode
  brand?: brandProps
  items: Array<itemProps>
  tools?: Array<toolProps>
}
