import { ReactComponent as ChevronsDown } from '@/assets/icons/chevron-down.svg'
import { ReactComponent as ChevronsRight } from '@/assets/icons/chevrons-right.svg'
import { ReactComponent as Dashboard } from '@/assets/icons/dashboard.svg'
import { ReactComponent as Gear } from '@/assets/icons/gear.svg'
import { ReactComponent as Language } from '@/assets/icons/language.svg'
import { ReactComponent as Logout } from '@/assets/icons/logout.svg'
import { ReactComponent as Statistic } from '@/assets/icons/statistic.svg'
import { ReactComponent as Transaction } from '@/assets/icons/transaction.svg'
import { IconProps } from '@/components/icon/Icon.types'

export const IconMap = {
  chevronDown: <ChevronsDown />,
  chevronsRight: <ChevronsRight />,
  dashboard: <Dashboard />,
  gear: <Gear />,
  logout: <Logout />,
  language: <Language />,
  statistic: <Statistic />,
  transaction: <Transaction />
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
