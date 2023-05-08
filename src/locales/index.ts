import { createIntl, createIntlCache } from 'react-intl'

import { en_US } from './en_US'
import { zh_CN } from './zh_CN'

function loadLocale(lang: string) {
  let message
  switch (lang) {
    case 'en-US':
      message = en_US
      break
    case 'zh-CN':
      message = zh_CN
      break
    default:
      message = zh_CN
      break
  }
  return message
}

const cache = createIntlCache()
const i18n = createIntl(
  {
    locale: 'zh-CN',
    messages: zh_CN
  },
  cache
)

export { i18n, loadLocale }
