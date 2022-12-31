export interface BaseResponse<T = any> {
  success: boolean
  data?: T
  errorCode?: string
  errorMessage?: string
}
