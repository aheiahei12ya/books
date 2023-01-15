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
    ctx.closePath()
    if (index === points.length - 1) return
    previousX = x
    previousY = y
  })
}

export const drawCurve = (
  ctx: CanvasRenderingContext2D,
  xs: number[],
  ys: number[],
  lineColor?: string
) => {
  const points = zip(xs, ys)
  const factor = 0.15

  ctx.beginPath()
  ctx.strokeStyle = lineColor || '#aeaeae'
  ctx.lineWidth = 1

  // 公式推导
  // https://wenku.baidu.com/view/c790f8d46bec0975f565e211.html?_wkts_=1673767798427
  for (let i = 0; i < points.length - 1; ++i) {
    const nextPoints = i + 1 < points.length ? points[i + 1] : points[i]
    const [previousX, previousY] = i - 1 > 0 ? points[i - 1] : points[i]
    const [x, y] = points[i]
    const [next1X, next1Y] = nextPoints
    const [next2X, next2Y] = i + 2 < points.length ? points[i + 2] : nextPoints

    const cp1x = x + (next1X - previousX) * factor
    const cp1y = y + (next1Y - previousY) * factor
    const cp2x = next1X - (next2X - x) * factor
    const cp2y = next1Y - (next2Y - y) * factor

    ctx.moveTo(x, y)
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, next1X, next1Y)
    ctx.stroke()
  }
  ctx.closePath()
}
