import { incomeApi } from '@/constants/api'
import { createRequest } from '@/lib/request'
import { BaseResponse } from '@/lib/response/types'

import { incomeInitialRequest, incomeInitialResponse } from './types'

const income = {
  initial: createRequest<
    incomeInitialRequest,
    BaseResponse<incomeInitialResponse>
  >(incomeApi.initial, 'POST')
}
export default income
