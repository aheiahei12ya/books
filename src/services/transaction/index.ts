import { transactionApi } from '@/constants/api'
import { createRequest } from '@/lib/request'
import { BaseResponse } from '@/lib/response/types'
import {
  TransactionExpenseRequest,
  TransactionExpenseResponse,
  TransactionYearListResponse
} from '@/services/transaction/types'

const transaction = {
  yearList: createRequest<unknown, BaseResponse<TransactionYearListResponse>>(transactionApi.yearList, 'POST'),
  expense: createRequest<TransactionExpenseRequest, TransactionExpenseResponse>(transactionApi.expense, 'POST')
}

export default transaction
