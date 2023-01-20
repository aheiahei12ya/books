import { createRequest } from '@/lib/request'
import { BaseResponse } from '@/lib/response/types'
import {
  balanceTrendRequest,
  balanceTrendResponse,
  expenditureRequest,
  expenditureResponse,
  expenditureTimesRequest,
  expenditureTimesResponse,
  expenditureTrendRequest,
  expenditureTrendResponse
} from '@/services/statistic/types'

const statistic = {
  expenditureTrend: createRequest<
    expenditureTrendRequest,
    BaseResponse<expenditureTrendResponse>
  >('/api/statistics/expenditure-trend', 'POST'),
  balanceTrend: createRequest<
    balanceTrendRequest,
    BaseResponse<balanceTrendResponse>
  >('/api/statistics/balance-trend', 'POST'),
  expenditure: createRequest<
    expenditureRequest,
    BaseResponse<expenditureResponse>
  >('/api/statistics/expenditure', 'POST'),
  expenditureTimes: createRequest<
    expenditureTimesRequest,
    BaseResponse<expenditureTimesResponse>
  >('/api/statistics/expenditure/times', 'POST')
}

export default statistic;
