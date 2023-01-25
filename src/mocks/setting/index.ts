import { mockPost } from '@/mocks/utils'
import { presetType } from '@/services/setting/types'

const presetData: { presetData: presetType } = {
  presetData: {
    realAmount: undefined,
    amount: undefined,
    coupon: undefined,
    date: 'today',
    time: 'now',
    note: undefined,
    account: {
      id: 1,
      key: 'balance',
      name: '余额'
    },
    paymentMethod: {
      id: 2,
      key: 'normal',
      name: '正常支付'
    },
    platform: {
      id: 3,
      key: 'taobao',
      name: '淘宝天猫'
    },
    category: {
      id: 4,
      key: 'daily',
      name: '日常开销',
      root: 0
    },
    subcategory: {
      id: 5,
      key: 'dinner',
      name: '吃饭',
      root: 1
    },
    reimbursementState: {
      name: '待报销',
      key: 'waiting'
    }
  }
}

const setting = [mockPost('/api/setting/preset', presetData)]

export default setting
