import { categoryApi } from '@/constants/api'
import { createRequest } from '@/lib/request'
import { BaseResponse } from '@/lib/response/types'

import { categoryListRequest, categoryListResponse } from './types'

const category = {
  list: createRequest<categoryListRequest, BaseResponse<categoryListResponse>>(
    categoryApi.list,
    'POST'
  )
}
export default category
