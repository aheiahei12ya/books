import { statisticsApi } from '@/constants/api'
import { createRequest } from '@/lib/request'
import { BaseResponse } from '@/lib/response/types'
import {
  BalanceTrendRequest,
  BalanceTrendResponse,
  ExpenseRequest,
  ExpenseResponse,
  ExpenseTimesRequest,
  ExpenseTimesResponse,
  ExpenseTrendRequest,
  ExpenseTrendResponse,
  HistoryTodayRequest,
  HistoryTodayResponse
} from '@/services/statistic/types'

const statistic = {
  expenseTrend: createRequest<ExpenseTrendRequest, BaseResponse<ExpenseTrendResponse>>(
    statisticsApi.expenseTrend,
    'POST'
  ),
  balanceTrend: createRequest<BalanceTrendRequest, BaseResponse<BalanceTrendResponse>>(
    statisticsApi.balanceTrend,
    'POST'
  ),
  expense: createRequest<ExpenseRequest, BaseResponse<ExpenseResponse>>(statisticsApi.expense, 'POST'),
  expenseTimes: createRequest<ExpenseTimesRequest, BaseResponse<ExpenseTimesResponse>>(
    statisticsApi.expenseTimes,
    'POST'
  ),
  historyToday: createRequest<HistoryTodayRequest, BaseResponse<HistoryTodayResponse>>(
    statisticsApi.historyToday,
    'POST'
  )
}

export default statistic
