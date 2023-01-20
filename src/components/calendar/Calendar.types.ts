export interface CalendarProps {
  expense?: number[]
  showToolbar?: boolean
  hideToolButton?: boolean
  onSelect?: (year: number, month: number, date: number) => void
  locale?: 'en-US' | 'zh-CN' | string
}
