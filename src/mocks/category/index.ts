import { mockPost } from '@/mocks/utils'

const category = [
  mockPost('/api/category/list', {
    categoryList: [
      {
        "id": 3,
        "name": "日常开销",
        "upper_id": 1
      },
      {
        "id": 4,
        "name": "生活开销",
        "upper_id": 1
      },
      {
        "id": 5,
        "name": "人物培养",
        "upper_id": 1
      },
      {
        "id": 6,
        "name": "败家消费",
        "upper_id": 1
      },
      {
        "id": 7,
        "name": "虚拟商品",
        "upper_id": 1
      },
      {
        "id": 8,
        "name": "出行开销",
        "upper_id": 1
      },
      {
        "id": 9,
        "name": "住房开销",
        "upper_id": 1
      },
      {
        "id": 10,
        "name": "设备引进",
        "upper_id": 1
      },
      {
        "id": 11,
        "name": "意外开销",
        "upper_id": 1
      },
      {
        "id": 65,
        "name": "借贷开销",
        "upper_id": 1
      }
    ]
  })
]

export default category
