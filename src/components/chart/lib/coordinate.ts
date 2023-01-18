import { getValue, zip } from '@/lib/pythonic'

export function setCoordinate(
  ctx: CanvasRenderingContext2D,
  canvasHeight: number,
  canvasWidth: number,
  xs: number[],
  ys: number[],
  paddingX?: number,
  paddingTop?: number,
  paddingBottom?: number,
  hideAxes?: boolean,
  type?: string | undefined,
  lineColor?: string | undefined
) {
  const dpr = window.devicePixelRatio
  const _paddingTop = getValue(paddingTop, 0) * dpr
  const _paddingBottom = getValue(paddingBottom, 0) * dpr

  let _paddingX = getValue(paddingX, 0) * dpr
  const _splitNumber = type === 'bar' ? xs.length : xs.length - 1
  const gap = (canvasWidth - _paddingX * 2) / _splitNumber
  const halfGap = gap / 2
  if (type === 'bar') {
    _paddingX += halfGap
  }

  const fontSize = 14
  const yRatio = (canvasHeight - _paddingBottom - _paddingTop) / Math.max(...ys)

  const xTicks: number[] = []
  const yTicks: number[] = []

  zip(xs, ys).forEach(([x, y], i) => {
    const xTick = i ? i * gap + _paddingX : _paddingX
    const yTick = canvasHeight - y * yRatio - _paddingBottom
    xTicks.push(xTick)
    yTicks.push(yTick)

    if (!hideAxes) {
      ctx.beginPath()
      ctx.moveTo(xTick, _paddingTop)
      ctx.lineTo(xTick, canvasHeight - _paddingBottom)
      ctx.strokeStyle = lineColor || '#aeaeae'
      ctx.stroke()
      ctx.closePath()
    }

    if (!(i % 3) || i === xs.length - 1) {
      ctx.font = `${fontSize}px PingFangSC-Regular`
      ctx.textBaseline = 'bottom'
      ctx.fillStyle = '#fff'
      ctx.fillText(x.toString(), xTick - fontSize / 2, canvasHeight)
    }
  })

  return [xTicks, yTicks]
}
