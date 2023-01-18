import { ChartProps } from '@/components/chart/chart.types'

export interface CurveProps extends ChartProps {
  lineWidth?: number
  lineColor?: string
  circleColor?: string
  shadowColor?: string
}
