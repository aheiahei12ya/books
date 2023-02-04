import { createRequest } from '@/lib/request'
import { BaseResponse } from '@/lib/response/types'

import { categoryListRequest, categoryListResponse } from './types'

const account = {
  list: createRequest<categoryListRequest, BaseResponse<categoryListResponse>>(
    'api/category/list',
    'POST'
  )
}
export default account
