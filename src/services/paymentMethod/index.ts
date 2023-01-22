import { createRequest } from '@/lib/request'
import { BaseResponse } from '@/lib/response/types'

import { paymentMethodListRequest, paymentMethodListResponse } from './types'

const paymentMethod = {
  list: createRequest<
    paymentMethodListRequest,
    BaseResponse<paymentMethodListResponse>
  >('/api/payment-method/list', 'POST')
}
export default paymentMethod
