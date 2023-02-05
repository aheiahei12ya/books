import { zip } from '@/lib/pythonic'

export const drawRect = (
  ctx: CanvasRenderingContext2D,
  xs: number[],
  ys: number[],
  domHeight: number,
  domWidth: number,
  barWidth: number,
  paddingBottom: number
) => {
  const dpr = window.devicePixelRatio
  const radius = Math.abs(Math.ceil(barWidth / 3.5))
  const _paddingBottom = paddingBottom * dpr

  zip(xs, ys).forEach(([x, y]) => {
    ctx.roundRect
      ? ctx.roundRect(x - barWidth / 2, y, barWidth, domHeight - y - _paddingBottom, [radius, radius, 0, 0])
      : ctx.rect(x - barWidth / 2, y, barWidth, domHeight - y - _paddingBottom)
    const lineGradient = ctx.createLinearGradient(0, 0, 0, domHeight)
    lineGradient.addColorStop(0.3, '#003399')
    lineGradient.addColorStop(1, '#4066b3')

    ctx.fillStyle = lineGradient
    ctx.fill()
  })
}
