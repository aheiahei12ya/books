export interface AccountListRequest {
  user: number
}

export type Account = {
  id: number
  name: string
}

export interface AccountListResponse {
  accountList: Account[]
}
