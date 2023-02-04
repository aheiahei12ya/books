import { expenseApi } from '@/constants/api'
import { createRequest } from '@/lib/request'
import { BaseResponse } from '@/lib/response/types'

import { expenseInitialRequest, expenseInitialResponse } from './types'

const expense = {
  initial: createRequest<
    expenseInitialRequest,
    BaseResponse<expenseInitialResponse>
  >(expenseApi.initial, 'POST')
}
export default expense
