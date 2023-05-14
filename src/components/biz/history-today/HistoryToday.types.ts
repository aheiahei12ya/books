export interface HistoryTodayProps {}

export interface HistoryTodayRef {}

export type HistoryTodayRecord = {
  items: {
    type: string
    note: string
    category: string
    subcategory: string
    amount: string
    time: string
  }[]
  year: number
  month: number
  note: string
}
