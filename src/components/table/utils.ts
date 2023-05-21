import React from 'react'
import { IntlShape } from 'react-intl/src/types'

import { ColumnType } from '@/components/table/Table.types'

export type tableColumn = {
  key: string
  i18n: string
  dataIndex?: string
  ellipsis?: boolean
  width?: number
  render?: (text: string) => React.ReactNode
}

const makeColumns = <T>(i18n: IntlShape, configs: tableColumn[]) => {
  const columns: ColumnType[] = []
  for (const item of configs) {
    columns.push({
      key: item.key,
      dataIndex: item.dataIndex || item.key,
      title: i18n.formatMessage({ id: item.i18n }),
      ellipsis: item.ellipsis,
      width: item.width,
      render: item.render
    })
  }
  return columns
}

export { makeColumns }
