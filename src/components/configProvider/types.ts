import { ReactNode } from 'react'

export interface Props {
  children: ReactNode
}

export type ConfigType = {
  theme?: 'light' | 'dark'
  locale?: 'zh-CN' | 'en-US'
  changeConfig?: (config: Omit<ConfigType, 'changeConfig'>) => void
}
