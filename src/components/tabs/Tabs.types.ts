import React from 'react'

export interface TabsProps {
  title?: string | number
  items: ItemType[]
  selected?: number
  onChange?: (index: number) => void
  defaultSelect?: number
  size?: 'small' | 'medium' | 'large'
  className?: string
  bodyStyle?: string
}

export interface TabsRef {}

export interface ItemType {
  key: string
  label: string
  children?: React.ReactNode
}
