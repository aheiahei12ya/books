import { rest } from 'msw'

import { invokeSuccess } from '@/constants/resultCode'
import { BaseResponse } from '@/lib/response/types'

const mockGet = (
  path: string,
  data?: object,
  resultCode: string = invokeSuccess,
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
  resultCode: string = invokeSuccess,
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

const mockLogin = (
  path: string,
  data?: object,
  resultCode: string = invokeSuccess,
  resultMessage: string = 'success',
  success: boolean = true
) =>
  rest.post(path, (_req, res, ctx) => {
    const maxAge = 60 * 60 * 8

    const expires = new Date()
    expires.setSeconds(expires.getSeconds() + maxAge)

    const cookieOptions = {
      maxAge,
      expires
    }
    const response: BaseResponse = {
      success: success,
      data: data,
      resultCode: resultCode,
      resultMessage: resultMessage
    }
    return res(
      ctx.json(response),
      ctx.cookie('session_token', 'abc', cookieOptions)
    )
  })

export { mockGet, mockLogin, mockPost }
