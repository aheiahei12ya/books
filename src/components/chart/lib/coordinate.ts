import { range } from '@/lib/pythonic'

export function setCoordinate(
  ctx: CanvasRenderingContext2D,
  canvasHeight: number,
  canvasWidth: number,
  splitNumber: number,
  hideAxes: boolean | undefined,
  paddingX: number,
  paddingY: number,
  lineColor: string
) {
  const gap = (canvasWidth - paddingX * 2) / (splitNumber - 1)
  return range(splitNumber).map((i) => {
    const x = i ? i * gap + paddingX : paddingX
    if (!hideAxes) {
      ctx.beginPath()
      ctx.moveTo(x, paddingY)
      ctx.lineTo(x, canvasHeight - paddingY)
      ctx.strokeStyle = lineColor
      ctx.stroke()
      ctx.closePath()
    }
    return x
  })
}
