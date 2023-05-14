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

export { loadLocale }
