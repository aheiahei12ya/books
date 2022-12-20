export interface BaseResponse<T = any> {
  success: boolean
  data?: T
  resultCode: string
  resultMessage: string
}
