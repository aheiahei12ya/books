export interface SizeProps {
  height: number
  width: number
  isPC?: boolean
  isMobile?: boolean
  isPortrait?: boolean
  isLandscape?: boolean
}

export const enum Device {
  mobile = 'mobile',
  PC = 'PC'
}
