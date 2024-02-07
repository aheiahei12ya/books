import React from 'react'

export interface RecordFormProps {
  defaultValue?: Record<string, any>
  value?: Record<string, any>
  orientation?: 'portrait' | 'landscape'
  'income-button'?: React.ReactNode
  'outcome-button'?: React.ReactNode
  'transfer-button'?: React.ReactNode
}
