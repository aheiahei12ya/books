export interface TransactionYearListResponse {
  list: object[]
}

export interface TransactionExpenseRequest {
  year: string
  month: string
}

export interface TransactionExpenseResponse {
  expense: object[]
}
