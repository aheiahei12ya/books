export interface accountListRequest {
  user: number
}

export type account = {
  id: number
  name: string
}

export interface accountListResponse {
  accountList: account[]
}
