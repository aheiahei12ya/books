import { createRequest } from '@/lib/request'
import { BaseResponse } from '@/lib/response/types'

import { presetExpenseFormRequest, presetExpenseFormResponse } from './types'

const setting = {
  preset: createRequest<
    presetExpenseFormRequest,
    BaseResponse<presetExpenseFormResponse>
  >('/api/setting/preset', 'POST')
}
export default setting
