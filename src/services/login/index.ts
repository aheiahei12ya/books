import { createRequest } from '@/lib/request'
import { BaseResponse } from '@/lib/response/types'

import { LoginRequest, LoginResponse } from './types'

const login = {
  login: createRequest<LoginRequest, BaseResponse<LoginResponse>>(
    '/api/user-login',
    'POST'
  ),
  userInfo: createRequest<LoginRequest, BaseResponse<LoginResponse>>(
    '/api/user-info',
    'POST'
  )
}
export default login
