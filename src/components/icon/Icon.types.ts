import { IconMap } from '@/components/icon/Icon'

type IconMapType = keyof typeof IconMap

export interface IconProps {
  name?: IconMapType
  size?: 'small' | 'medium' | 'large'
  src?: string
  style?: object
  className?: string
}
