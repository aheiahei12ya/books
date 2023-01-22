export interface platformListRequest {
  user: number
}

type platform = {
  id: number
  name: string
}

export interface platformListResponse {
  platforms: platform[]
}
