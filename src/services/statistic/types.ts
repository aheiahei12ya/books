export interface ExpenseTrendRequest {
  year: number
  month: number
}

export interface ExpenseTrendResponse {
  trend: number[]
}

export interface BalanceTrendRequest {
  year: number
  month: number
}

export interface BalanceTrendResponse {
  trend: number[]
}

export interface ExpenseRequest {
  year: number
  month: number
}

export interface ExpenseResponse {
  expense: number[]
}

export interface ExpenseTimesRequest {
  year: number
  month: number
}

export interface ExpenseTimesResponse {
  expense: number[]
}

export interface HistoryTodayRequest {
  year: number
  month: number
  date: number
}

export interface HistoryTodayResponse {
  records: object[]
}

export interface MethodReminderResponse {

}
