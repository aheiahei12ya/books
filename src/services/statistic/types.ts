export interface outcomeTrendRequest {
  year: number
  month: number
}

export interface outcomeTrendResponse {
  trend: number[]
}

export interface balanceTrendRequest {
  year: number
  month: number
}

export interface balanceTrendResponse {
  trend: number[]
}
