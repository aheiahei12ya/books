import { createRequest } from '@/lib/request'
import { BaseResponse } from '@/lib/response/types'

import { platformListRequest, platformListResponse } from './types'

const platform = {
  list: createRequest<platformListRequest, BaseResponse<platformListResponse>>(
    'api/platform/list',
    'POST'
  )
}
export default platform
