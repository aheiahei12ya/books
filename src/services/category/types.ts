export interface categoryListRequest {
  user: number
  root: number
}

export type category = {
  id: number
  key: string
  name: string
  root: number
}

export interface categoryListResponse {
  categoryList: category[]
}
