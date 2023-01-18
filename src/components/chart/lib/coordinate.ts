import { getValue, zip } from '@/lib/pythonic'

export function setCoordinate(
  ctx: CanvasRenderingContext2D,
  canvasHeight: number,
  canvasWidth: number,
  xs: number[],
  ys: number[],
  paddingLeft?: number,
  paddingRight?: number,
  paddingTop?: number,
  paddingBottom?: number,
  showXAxes?: boolean,
  showYAxes?: boolean,
  showXTicks?: boolean,
  showYTicks?: boolean,
  type?: string | undefined,
  lineColor?: string | undefined
) {
  const dpr = window.devicePixelRatio
  const _paddingTop = getValue(paddingTop, 0) * dpr
  const _paddingBottom = getValue(paddingBottom, 0) * dpr

  let _paddingLeft = getValue(paddingLeft, 0) * dpr
  const _paddingRight = getValue(paddingRight, 0) * dpr
  const _splitNumber = type === 'bar' ? xs.length : xs.length - 1
  const gapX = (canvasWidth - _paddingLeft - _paddingRight) / _splitNumber
  const gapY = (canvasHeight - _paddingTop - _paddingBottom) / ys.length

  const ySkip = ys.length > 20 ? 6 : 3

  const halfGap = gapX / 2
  if (type === 'bar') {
    _paddingLeft += halfGap
  }

  const fontSize = 20
  const yRatio = (canvasHeight - _paddingBottom - _paddingTop) / Math.max(...ys)

  const xTicks: number[] = []
  const yTicks: number[] = []

  ctx.setLineDash([10, 10])
  ctx.strokeStyle = lineColor || '#aeaeae'

  const ySorted = [...ys].sort((a, b) => a - b)
  zip(xs, ys, ySorted).forEach(([x, y, yss], i) => {
    const xTick = i ? i * gapX + _paddingLeft : _paddingLeft
    const yTick = canvasHeight - y * yRatio - _paddingBottom
    xTicks.push(xTick)
    yTicks.push(yTick)

    if (showXAxes && !(i % 3)) {
      ctx.beginPath()
      ctx.moveTo(xTick, _paddingTop)
      ctx.lineTo(xTick, canvasHeight - _paddingBottom)
      ctx.stroke()
      ctx.closePath()
    }

    if (showXTicks && !(i % 3)) {
      ctx.font = `${ fontSize }px PingFangSC-Regular`
      ctx.textBaseline = 'bottom'
      ctx.textAlign = 'center'
      ctx.fillStyle = '#757575'
      ctx.fillText(x.toString(), xTick, canvasHeight)
    }

    const yTickPosition = canvasHeight - gapY * i - _paddingBottom
    if (showYAxes && !((i + 1) % ySkip)) {
      ctx.beginPath()
      ctx.moveTo(_paddingLeft, yTickPosition)
      ctx.lineTo(canvasWidth - _paddingRight, yTickPosition)
      ctx.stroke()
      ctx.closePath()
    }

    if (showYTicks && !((i + 1) % ySkip)) {
      ctx.font = `${ fontSize }px PingFangSC-Regular`
      ctx.textBaseline = 'middle'
      ctx.textAlign = 'start'
      ctx.fillStyle = '#757575'
      ctx.fillText(yss.toString(), 0, yTickPosition)
    }
  })

  ctx.setLineDash([])

  return [xTicks, yTicks]
}
