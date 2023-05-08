export type RecordExpenses = {
  year: string
  month: string
  day: string
  expense: string
  items: RecordExpenseItems[]
}

export type RecordExpenseItems = {
  id: string
  time: string
  form: string
  account: string
  paymentMethod: string
  category: string
  subCategory: string
  amount: string
  note: string
}

export interface RecordListProps {
  className?: string
  expenses: RecordExpenses[]
}
