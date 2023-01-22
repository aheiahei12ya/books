import { createRequest } from '@/lib/request'
import { BaseResponse } from '@/lib/response/types'

import { accountListRequest, accountListResponse } from './types'

const account = {
  list: createRequest<accountListRequest, BaseResponse<accountListResponse>>(
    '/api/account/list',
    'POST'
  )
}
export default account
