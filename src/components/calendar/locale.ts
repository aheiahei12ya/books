export const weekNames = (locale: string | undefined): string[] => {
  if (locale === 'zh-CN') {
    return [
      '星期日',
      '星期一',
      '星期二',
      '星期三',
      '星期四',
      '星期五',
      '星期六'
    ]
  }
  return ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
}

export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
