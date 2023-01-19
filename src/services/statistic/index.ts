import { createRequest } from '@/lib/request'
import { BaseResponse } from '@/lib/response/types'
import {
  balanceTrendRequest,
  balanceTrendResponse,
  expenditureRequest,
  expenditureResponse,
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
  >('/api/statistics/expenditure', 'POST')
}

export default statistic
