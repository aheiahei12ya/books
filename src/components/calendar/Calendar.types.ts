export interface CalendarProps {
  expense?: number[]
  showToolbar?: boolean
  hideToolButton?: boolean
  onChange?: (year: number, month: number, date: number) => void
  locale?: 'en-US' | 'zh-CN' | string
}
