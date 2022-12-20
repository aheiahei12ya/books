export interface useRequestReturn<P = any, V = any> {
  loading: boolean
  data: V | undefined
  error: Error | undefined
  params?: P
  run: (data?: P) => void
}

export interface useRequestOptions<P = any> {
  manual?: boolean
  defaultLoading?: boolean
  defaultParams?: P
}
