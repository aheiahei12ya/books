import { accountApi } from '@/constants/api'
import { createRequest } from '@/lib/request'
import { BaseResponse } from '@/lib/response/types'

import { accountListRequest, accountListResponse } from './types'

const account = {
  list: createRequest<accountListRequest, BaseResponse<accountListResponse>>(
    accountApi.list,
    'POST'
  )
}
export default account
