import { ReactComponent as Gear } from '@/assets/icons/gear.svg'
import { IconProps } from '@/components/icon/Icon.types'

export const IconMap = {
  gear: <Gear></Gear>
}

const Icon = (props: IconProps) => {
  const { src, name } = props

  if (name) {
    return IconMap[name] || <></>
  }

  return <img src={src} alt={''} />
}

Icon.displayName = 'Icon'
export { Icon }
