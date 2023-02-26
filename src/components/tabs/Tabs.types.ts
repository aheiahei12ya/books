import React from 'react'

export interface TabsProps {
  title?: string | number
  className?: string
  items: ItemType[]
  size?: 'small' | 'medium' | 'large'
}

export interface TabsRef {}

export interface ItemType {
  key: string
  label: string
  children?: React.ReactNode
}
