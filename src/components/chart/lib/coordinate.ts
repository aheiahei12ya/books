import { range } from '@/lib/pythonic'

export function setCoordinate(
  ctx: CanvasRenderingContext2D,
  canvasHeight: number,
  canvasWidth: number,
  xs: number[],
  ys: number[],
  hideAxes: boolean | undefined,
  paddingX: number,
  paddingY: number,
  lineColor: string,
  type?: string
) {
  const dpr = window.devicePixelRatio
  const _paddingX = paddingX * dpr
  const _paddingY = paddingY * dpr
  const _splitNumber = type === 'bar' ? xs.length : xs.length
  const gap = (canvasWidth - paddingX * 2 * dpr) / _splitNumber
  const halfGap = gap / 2
  const fontSize = 14

  const xTicks = range(_splitNumber).map((i) => {
    let x = i ? i * gap + _paddingX : _paddingX
    if (type === 'bar') {
      x += halfGap
    }

    // if (!hideAxes) {
    ctx.beginPath()
    ctx.moveTo(x, _paddingY / 2)
    ctx.lineTo(x, canvasHeight - _paddingY / 2)
    ctx.strokeStyle = lineColor
    ctx.stroke()
    ctx.closePath()
    // }

    if (!(i % 3)) {
      ctx.font = `${fontSize}px PingFangSC-Regular`
      ctx.textBaseline = 'bottom'
      ctx.fillStyle = '#fff'
      ctx.fillText(i + 1, x - fontSize / 2, canvasHeight)
    }
    return x
  })

  const yRatio = (canvasHeight - _paddingY) / Math.max(...ys)
  const yTicks = ys.map((y) => {
    return canvasHeight - y * yRatio - _paddingY / 2
  })

  return [xTicks, yTicks]
}

