export interface accountListRequest {
  user: number
}

type account = {
  id: number
  name: string
}

export interface accountListResponse {
  accountList: account[]
}
