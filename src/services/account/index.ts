import { accountApi } from '@/constants/api'
import { createRequest } from '@/lib/request'
import { BaseResponse } from '@/lib/response/types'

import { AccountListRequest, AccountListResponse } from './types'

const account = {
  list: createRequest<AccountListRequest, BaseResponse<AccountListResponse>>(accountApi.list, 'POST')
}
export default account
