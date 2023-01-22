export interface categoryListRequest {
  user: number
  root: number
}

type category = {
  id: number
  name: string
}

export interface categoryListResponse {
  categoryList: category[]
}
