import { rest } from 'msw'

import { BaseResponse } from '@/utils/response/types'

const mockGet = (
  path: string,
  data?: object,
  resultCode: string = '1000',
  resultMessage: string = '',
  success: boolean = true
) =>
  rest.get(path, (_req, res, ctx) => {
    const response: BaseResponse = {
      success: success,
      data: data,
      resultCode: resultCode,
      resultMessage: resultMessage
    }
    return res(ctx.json(response))
  })

const mockPost = (
  path: string,
  data?: object,
  resultCode: string = '1000',
  resultMessage: string = 'success',
  success: boolean = true
) =>
  rest.post(path, (_req, res, ctx) => {
    const response: BaseResponse = {
      success: success,
      data: data,
      resultCode: resultCode,
      resultMessage: resultMessage
    }
    return res(ctx.json(response))
  })

export { mockGet, mockPost }
