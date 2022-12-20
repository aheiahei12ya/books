import { LoginRequest, LoginResponse } from '@/services/login/types'
import { createRequest } from '@/utils/request'
import { BaseResponse } from '@/utils/response/types'

const login = {
  submit: createRequest<LoginRequest, BaseResponse<LoginResponse>>(
    '/submit',
    'POST'
  )
}
export default login
