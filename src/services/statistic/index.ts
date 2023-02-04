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
  >('api/statistics/expense-trend', 'POST'),
  balanceTrend: createRequest<
    balanceTrendRequest,
    BaseResponse<balanceTrendResponse>
  >('api/statistics/balance-trend', 'POST'),
  expense: createRequest<
    expenseRequest,
    BaseResponse<expenseResponse>
  >('api/statistics/expense', 'POST'),
  expenseTimes: createRequest<
    expenseTimesRequest,
    BaseResponse<expenseTimesResponse>
  >('api/statistics/expense/times', 'POST')
}

export default statistic;
