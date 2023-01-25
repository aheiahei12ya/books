export interface platformListRequest {
  user: number
}

export type platform = {
  id: number
  name: string
}

export interface platformListResponse {
  platformList: platform[]
}
