export interface CalendarProps {
  selectDate?: boolean
  onSelect?: (date: number) => void
  locale?: 'en-US' | 'zh-CN' | string
  expenditure?: number[]
  hideTools?: boolean
  showToolbar?: boolean
}
