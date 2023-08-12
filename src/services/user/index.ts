import { userApi } from '@/constants/api'
import { createRequest } from '@/lib/request'
import { BaseResponse } from '@/lib/response/types'

import { LoginRequest, LoginResponse } from './types'

const user = {
  login: createRequest<LoginRequest, BaseResponse<LoginResponse>>(userApi.userLogin, 'POST'),
  userInfo: createRequest<LoginRequest, BaseResponse<LoginResponse>>(userApi.userInfo, 'POST')
}
export default user
