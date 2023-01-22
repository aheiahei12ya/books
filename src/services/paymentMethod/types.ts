export interface paymentMethodListRequest {
  user: number
}

type paymentMethod = {
  id: number
  name: string
}

export interface paymentMethodListResponse {
  paymentMethodList: paymentMethod[]
}
