import { zh_CN } from './zh_CN'
import { en_US } from './en_US'

function loadLocale(lang: string) {
  let message = null
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

export { loadLocale }
