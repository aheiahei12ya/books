import { statisticsApi } from '@/constants/api'
import { createRequest } from '@/lib/request'
import { BaseResponse } from '@/lib/response/types'
import {
  balanceTrendRequest,
  balanceTrendResponse,
  expenseRequest,
  expenseResponse,
  expenseTimesRequest,
  expenseTimesResponse,
  expenseTrendRequest,
  expenseTrendResponse
} from '@/services/statistic/types'

const statistic = {
  expenseTrend: createRequest<
    expenseTrendRequest,
    BaseResponse<expenseTrendResponse>
  >(statisticsApi.expenseTrend, 'POST'),
  balanceTrend: createRequest<
    balanceTrendRequest,
    BaseResponse<balanceTrendResponse>
  >(statisticsApi.balanceTrend, 'POST'),
  expense: createRequest<expenseRequest, BaseResponse<expenseResponse>>(
    statisticsApi.expense,
    'POST'
  ),
  expenseTimes: createRequest<
    expenseTimesRequest,
    BaseResponse<expenseTimesResponse>
  >(statisticsApi.expenseTimes, 'POST')
}

export default statistic
