import { isArrayLike, zip } from '@/lib/pythonic'

export const drawHollowCircle = (
  ctx: CanvasRenderingContext2D,
  xs: number[] | number,
  ys: number[] | number,
  circleColor?: string | undefined,
  shadowColor?: string | undefined
) => {
  const dpr = window.devicePixelRatio
  const radius = 8 * dpr
  const ringWidth = 3 * dpr
  const shadowWith = 3.5 * dpr

  ctx.lineWidth = ringWidth
  ctx.strokeStyle = circleColor || '#fff'
  ctx.shadowBlur = shadowWith
  ctx.shadowColor = shadowColor || 'rgba(0, 0, 0, 0.45)'

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
  circleColor?: string | undefined,
  shadowColor?: string | undefined
) => {
  const dpr = window.devicePixelRatio
  const radius = 5 * dpr
  const shadowWith = 3.5 * dpr
  if (isArrayLike(xs) && isArrayLike(ys)) {
    ctx.fillStyle = circleColor || '#fff'
    ctx.shadowColor = shadowColor || 'rgba(0, 0, 0, 0.45)'
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
