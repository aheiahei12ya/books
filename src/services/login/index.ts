import { createRequest } from '@/lib/request'
import { BaseResponse } from '@/lib/response/types'
import { LoginRequest, LoginResponse } from '@/services/login/types'

const login = {
  login: createRequest<LoginRequest, BaseResponse<LoginResponse>>(
    '/api/userLogin',
    'POST'
  ),
  userInfo: createRequest<LoginRequest, BaseResponse<LoginResponse>>(
    '/api/userInfo',
    'POST'
  )
}
export default login
