export interface expenseTrendRequest {
  year: number
  month: number
}

export interface expenseTrendResponse {
  trend: number[]
}

export interface balanceTrendRequest {
  year: number
  month: number
}

export interface balanceTrendResponse {
  trend: number[]
}

export interface expenseRequest {
  year: number
  month: number
}

export interface expenseResponse {
  expense: number[]
}

export interface expenseTimesRequest {
  year: number
  month: number
}

export interface expenseTimesResponse {
  expense: number[]
}
