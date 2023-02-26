import React from 'react'

export interface TableProps {
  data: object[]
  title?: string | number
  columns: ColumnType[]
  className?: string
  fixHeader?: boolean
  showHeader?: boolean
  textAlign?: 'left' | 'center' | 'right'
  size?: 'small' | 'medium' | 'large'
  children?: React.ReactNode
}

export interface TableRef {}

export interface ColumnType {
  title: string
  dataIndex: string
  key: string
  render?: (text: string) => React.ReactNode
  width?: number
  ellipsis?: boolean
}
