import { statisticsApi } from '@/constants/api'
import { createRequest } from '@/lib/request'
import { BaseResponse } from '@/lib/response/types'
import {
  BalanceTrendRequest,
  BalanceTrendResponse,
  classificationResponse,
  ExpenseRequest,
  ExpenseResponse,
  ExpenseTimesRequest,
  ExpenseTimesResponse,
  ExpenseTrendRequest,
  ExpenseTrendResponse,
  HistoryTodayRequest,
  HistoryTodayResponse,
  MethodReminderResponse
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
  ),
  methodReminder: createRequest<unknown, BaseResponse<MethodReminderResponse>>(statisticsApi.methodReminder, 'POST'),
  classification: createRequest<unknown, BaseResponse<classificationResponse>>(statisticsApi.classification, 'POST')
}

export default statistic
