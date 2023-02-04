import { createRequest } from '@/lib/request'
import { BaseResponse } from '@/lib/response/types'

import { expenseInitialRequest, expenseInitialResponse } from './types'

const expense = {
  initial: createRequest<
    expenseInitialRequest,
    BaseResponse<expenseInitialResponse>
  >('api/expense/initial', 'POST')
}
export default expense
