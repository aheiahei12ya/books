import dayjs from 'dayjs'
import { ReactElement } from 'react'

import { monthNames } from '@/components/calendar/locale'
import { range } from '@/lib/pythonic'

export const calendar = (year: number, month: number, makeCell: Function) => {
  const calendar: ReactElement[] = []
  const beforeMonth: number[] = []
  const afterMonth: number[] = []

  const days = new Date(year, month + 1, 0).getDate()
  const lastMonthDays = new Date(year, month, 0).getDate()
  let firstDay = dayjs().year(year).month(month).date(1).day()
  let lastDay = 6 - dayjs().year(year).month(month).date(days).day()

  while (firstDay) {
    --firstDay
    beforeMonth.push(lastMonthDays - firstDay)
  }

  let lastIndex = 0
  while (lastDay) {
    --lastDay
    afterMonth.push(++lastIndex)
  }

  let count = 0
  beforeMonth.forEach((day) => {
    calendar.push(makeCell(day, 'past', count))
    ++count
  })
  range(1, days + 1).forEach((day) => {
    calendar.push(makeCell(day, 'current', count))
    ++count
  })
  afterMonth.forEach((day) => {
    calendar.push(makeCell(day, 'future', count))
    ++count
  })
  return calendar
}

export const getDate = (
  locale: string | undefined,
  year: number,
  month: number
) => {
  if (locale === 'zh-CN') {
    return `${year}年${month + 1}月`
  } else {
    return `${monthNames[month]} ${year}`
  }
}

export const backToToday = (
  year: number,
  month: number,
  setYear: Function,
  setMonth: Function
) => {
  setYear(year)
  setMonth(month)
}
export const handleMonthChange = (
  method: 'sub' | 'add',
  year: number,
  month: number,
  setYear: Function,
  setMonth: Function
) => {
  switch (method) {
    case 'add':
      if (month >= 11) {
        setYear(year + 1)
        setMonth(0)
      } else {
        setMonth(month + 1)
      }
      break
    case 'sub':
      if (month <= 0) {
        setYear(year - 1)
        setMonth(11)
      } else {
        setMonth(month - 1)
      }
      break
    default:
      break
  }
}

export const handleDaySelect = (
  type: 'past' | 'current' | 'future',
  year: number,
  month: number
) => {
  let selectedYear = year
  let selectedMonth = month
  switch (type) {
    case 'past':
      if (!month) {
        selectedYear = year - 1
        selectedMonth = 11
      } else {
        selectedMonth = month - 1
      }
      break
    case 'future':
      if (month === 11) {
        selectedYear = year + 1
        selectedMonth = 0
      } else {
        selectedMonth = month + 1
      }
      break
  }
  return [selectedYear, selectedMonth]
}

export const handleSelect = (
  selectedYear: number,
  selectedMonth: number,
  selectedDay: number,
  setYear: Function,
  setMonth: Function,
  setSelected: Function,
  deactivateDropdown: Function,
  onChange?: Function
) => {
  const realMonth = selectedMonth + 1
  const selectedDate = `${selectedYear}-${realMonth}-${selectedDay}`
  onChange?.(selectedYear, realMonth, selectedDay)
  setSelected(selectedDate)
  deactivateDropdown()
  setTimeout(() => {
    setYear(selectedYear)
    setMonth(selectedMonth)
  }, 500)
}
