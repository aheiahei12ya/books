import { createRequest } from '@/lib/request'
import { BaseResponse } from '@/lib/response/types'
import {
  balanceTrendRequest,
  balanceTrendResponse,
  outcomeTrendRequest,
  outcomeTrendResponse
} from '@/services/statistic/types'

const statistic = {
  outcomeTrend: createRequest<
    outcomeTrendRequest,
    BaseResponse<outcomeTrendResponse>
  >('/api/statistics/outcome-trend', 'POST'),
  balanceTrend: createRequest<
    balanceTrendRequest,
    BaseResponse<balanceTrendResponse>
  >('/api/statistics/balance-trend', 'POST')
}

export default statistic
