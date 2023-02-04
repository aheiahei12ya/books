import { loginApi } from '@/constants/api'
import { createRequest } from '@/lib/request'
import { BaseResponse } from '@/lib/response/types'

import { LoginRequest, LoginResponse } from './types'

const login = {
  login: createRequest<LoginRequest, BaseResponse<LoginResponse>>(
    loginApi.userLogin,
    'POST'
  ),
  userInfo: createRequest<LoginRequest, BaseResponse<LoginResponse>>(
    loginApi.userInfo,
    'POST'
  )
}
export default login
