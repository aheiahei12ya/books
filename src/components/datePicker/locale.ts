export const weekNames = (locale: string | undefined): string[] => {
  if (locale === 'zh-CN') {
    return ['日', '一', '二', '三', '四', '五', '六']
  }
  return ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
}

export const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]
