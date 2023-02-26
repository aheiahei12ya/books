import Button from '@/components/button'
import { ColumnType } from '@/components/table/Table.types'

export const installmentColumns: ColumnType[] = [
  {
    title: '备注',
    dataIndex: 'note',
    key: 'note',
    ellipsis: true,
    width: 100
  },
  {
    title: '剩余期数',
    dataIndex: 'remain',
    key: 'remain',
    ellipsis: true
  },
  {
    title: '已还期数',
    dataIndex: 'finish',
    key: 'finish',
    ellipsis: true
  },
  {
    title: '每期金额',
    dataIndex: 'amount',
    key: 'amount',
    width: 80
  }
]

export const autoRecordColumns: ColumnType[] = [
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
    width: 80
  },
  {
    title: '备注',
    dataIndex: 'note',
    key: 'note',
    ellipsis: true
  },
  {
    title: '剩余',
    dataIndex: 'remain',
    key: 'remain',
    ellipsis: true,
    width: 40
  },
  {
    title: '金额',
    dataIndex: 'amount',
    key: 'amount',
    width: 50
  },
  {
    title: '操作',
    dataIndex: 'id',
    key: 'operate',
    render: (text) => (
      <div style={{display: 'flex', gap: '6px'}}>
        <Button size={'mini'} type={'text'} onClick={() => console.log(text)}>
          延长
        </Button>
        <Button size={'mini'} type={'text'} color={'danger'} onClick={() => console.log(text)}>
          停止
        </Button>
      </div>
    )
  }
]

export const reimbursementColumns: ColumnType[] = [
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
    ellipsis: true
  },
  {
    title: '备注',
    dataIndex: 'note',
    key: 'note',
    ellipsis: true
  },
  {
    title: '状态',
    dataIndex: 'state',
    key: 'state'
  },
  {
    title: '操作',
    dataIndex: 'id',
    key: 'operate',
    render: (text) => (
      <Button size={'mini'} type={'text'} onClick={() => console.log(text)}>
        完成
      </Button>
    )
  }
]
