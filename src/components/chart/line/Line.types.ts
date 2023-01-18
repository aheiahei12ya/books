import { ChartProps } from '@/components/chart/chart.types'

export interface LineProps extends ChartProps {
  lineWidth?: number
  lineColor?: string
  shadowColor?: string
  circleColor?: string
}
