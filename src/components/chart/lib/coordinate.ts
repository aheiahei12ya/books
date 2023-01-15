import { range } from '@/lib/pythonic'

export function setCoordinate(
  ctx: CanvasRenderingContext2D,
  canvasHeight: number,
  canvasWidth: number,
  splitNumber: number,
  hideAxes?: boolean,
  padding?: number,
  lineColor?: string
) {
  const _padding = padding || 10
  const gap = (canvasWidth - _padding * 2) / (splitNumber - 1)
  return range(splitNumber).map((i) => {
    const x = i ? i * gap + _padding : _padding
    if (!hideAxes) {
      ctx.beginPath()
      ctx.moveTo(x, _padding)
      ctx.lineTo(x, canvasHeight - _padding)
      ctx.strokeStyle = lineColor || '#aeaeae'
      ctx.stroke()
      ctx.closePath()
    }
    return x
  })
}
