export interface SizeProps {
  height: number
  width: number
  isPC?: boolean
  isMobile?: boolean
}

export const enum Device {
  mobile = 'mobile',
  PC = 'PC'
}
