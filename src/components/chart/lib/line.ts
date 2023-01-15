import { zip } from '@/lib/pythonic'

export const drawLine = (
  ctx: CanvasRenderingContext2D,
  xs: number[],
  ys: number[],
  lineColor?: string
) => {
  const points = zip(xs, ys)
  let previousX = 0
  let previousY = 0
  points.forEach(([x, y], index) => {
    ctx.beginPath()
    if (index) {
      ctx.moveTo(previousX, previousY)
      ctx.lineTo(x, y)
      ctx.strokeStyle = lineColor || '#aeaeae'
      ctx.stroke()
    }
    if (index === points.length - 1) return
    previousX = x
    previousY = y
  })
}
