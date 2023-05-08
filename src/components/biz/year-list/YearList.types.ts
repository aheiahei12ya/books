export interface YearListProps {
  className?: string
  yearList: {
    year: string
    items: {
      month: string
      income: string
      expense: string
    }[]
  }[]
  defaultExpandName?: string
}
