import { range } from '@/lib/pythonic'

export function setCoordinate(
  ctx: CanvasRenderingContext2D,
  canvasHeight: number,
  canvasWidth: number,
  splitNumber: number,
  hideAxes?: boolean,
  paddingX?: number,
  paddingY?: number,
  lineColor?: string
) {
  const _paddingX = paddingX || 15
  const _paddingY = paddingY || 10
  const gap = (canvasWidth - _paddingX * 2) / (splitNumber - 1)
  return range(splitNumber).map((i) => {
    const x = i ? i * gap + _paddingX : _paddingX
    if (!hideAxes) {
      ctx.beginPath()
      ctx.moveTo(x, _paddingY)
      ctx.lineTo(x, canvasHeight - _paddingY)
      ctx.strokeStyle = lineColor || '#aeaeae'
      ctx.stroke()
      ctx.closePath()
    }
    return x
  })
}
