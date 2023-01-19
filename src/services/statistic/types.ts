export interface expenditureTrendRequest {
  year: number
  month: number
}

export interface expenditureTrendResponse {
  trend: number[]
}

export interface balanceTrendRequest {
  year: number
  month: number
}

export interface balanceTrendResponse {
  trend: number[]
}

export interface expenditureRequest {
  year: number
  month: number
}

export interface expenditureResponse {
  expenditure: number[]
}
