import { shortcutApi } from '@/constants/api'
import { createRequest } from '@/lib/request'
import { BaseResponse } from '@/lib/response/types'
import { ShortcutListRequest, ShortcutListResponse } from '@/services/shortcut/types'

const shortcut = {
  list: createRequest<ShortcutListRequest, BaseResponse<ShortcutListResponse>>(shortcutApi.list, 'POST')
}

export default shortcut
