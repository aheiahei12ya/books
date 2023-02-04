import { categoryApi } from '@/constants/api'
import { createRequest } from '@/lib/request'
import { BaseResponse } from '@/lib/response/types'

import { CategoryListRequest, CategoryListResponse } from './types'

const category = {
  list: createRequest<CategoryListRequest, BaseResponse<CategoryListResponse>>(
    categoryApi.list,
    'POST'
  )
}
export default category
