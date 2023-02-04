export interface CategoryListRequest {
  user: number
  root: number
}

export type Category = {
  id: number
  key: string
  name: string
  root: number
}

export interface CategoryListResponse {
  categoryList: Category[]
}
