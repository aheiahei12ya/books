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

  const xSkip = xs.length > 12 ? 3 : 2
  const ySkip = ys.length > 20 ? 6 : 3
  const averageY = (Math.max(...ys) - Math.min(...ys)) / (ys.length / ySkip)

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

  zip(xs, ys).forEach(([x, y], i) => {
    const xTick = i ? i * gapX + _paddingLeft : _paddingLeft
    const yTick = canvasHeight - y * yRatio - _paddingBottom
    xTicks.push(xTick)
    yTicks.push(yTick)

    if (showXAxes && !(i % xSkip)) {
      ctx.beginPath()
      ctx.moveTo(xTick, _paddingTop)
      ctx.lineTo(xTick, canvasHeight - _paddingBottom)
      ctx.stroke()
      ctx.closePath()
    }

    if (showXTicks && !(i % xSkip)) {
      ctx.font = `${fontSize}px PingFangSC-Regular`
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
      ctx.font = `${fontSize}px PingFangSC-Regular`
      ctx.textBaseline = 'middle'
      ctx.textAlign = 'start'
      ctx.fillStyle = '#757575'
      let yLabel = ((averageY * i) / ySkip).toFixed(0).toString()
      switch (yLabel.length) {
        case 5:
          yLabel = ((averageY * i) / ySkip / 1000).toFixed(1) + 'K'
          break
        case 6:
          yLabel = ((averageY * i) / ySkip / 10000).toFixed(1) + 'W'
          break
        case 7:
          yLabel = ((averageY * i) / ySkip / 10000).toFixed(0) + 'W'
          break
        case 8:
          yLabel = ((averageY * i) / ySkip / 100000).toFixed(0) + 'KW'
          break
        case 9:
          yLabel = ((averageY * i) / ySkip / 100000).toFixed(0) + 'KW'
          break
        default:
          yLabel = ((averageY * i) / ySkip).toFixed(0)
      }
      ctx.fillText(yLabel, 0, yTickPosition)
    }
  })

  ctx.setLineDash([])

  return [xTicks, yTicks]
}
