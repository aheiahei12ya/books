import { isArrayLike, zip } from '@/lib/pythonic'

export const drawHollowCircle = (
  ctx: CanvasRenderingContext2D,
  xs: number[] | number,
  ys: number[] | number,
  circleColor: string,
  shadowColor: string
) => {
  const dpr = window.devicePixelRatio
  const radius = 8 * dpr
  const ringWidth = 3 * dpr
  const shadowWith = 3.5 * dpr

  ctx.lineWidth = ringWidth
  ctx.strokeStyle = circleColor
  ctx.shadowBlur = shadowWith
  ctx.shadowColor = shadowColor

  if (isArrayLike(xs) && isArrayLike(ys)) {
    zip(xs, ys).forEach(([x, y]) => {
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.stroke()
      ctx.closePath()
    })
  } else {
    ctx.beginPath()
    ctx.arc(xs as number, ys as number, radius, 0, Math.PI * 2)
    ctx.stroke()
    ctx.closePath()
  }
}

export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  xs: number[] | number,
  ys: number[] | number,
  circleColor: string,
  shadowColor: string
) => {
  const dpr = window.devicePixelRatio
  const radius = 5 * dpr
  const shadowWith = 3.5 * dpr
  if (isArrayLike(xs) && isArrayLike(ys)) {
    ctx.fillStyle = circleColor
    ctx.shadowColor = shadowColor
    ctx.shadowBlur = shadowWith

    zip(xs, ys).forEach(([x, y]) => {
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
      ctx.closePath()
    })
  } else {
    ctx.beginPath()
    ctx.arc(xs as number, ys as number, radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
  }
}
