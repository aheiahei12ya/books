import { ReactNode } from 'react'

export type ItemType = {
  id?: number
  key: string
  name: string
}

export type ReceiptType = {
  type: 'input' | 'select' | 'checkbox' | 'date-picker' | 'time-picker' | 'button'
  name: string
  icon: ReactNode
  items?: ItemType[]
}
