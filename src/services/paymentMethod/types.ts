export interface paymentMethodListRequest {
  user: number
}

export type paymentMethod = {
  id: number
  name: string
}

export interface paymentMethodListResponse {
  paymentMethodList: paymentMethod[]
}
