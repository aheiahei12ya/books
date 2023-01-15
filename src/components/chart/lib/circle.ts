import { isArrayLike, zip } from '@/lib/pythonic'

export const drawHollowCircle = (
  ctx: CanvasRenderingContext2D,
  xs: number[] | number,
  ys: number[] | number
) => {
  if (isArrayLike(xs) && isArrayLike(ys)) {
    zip(xs, ys).forEach(([x, y]) => {
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, Math.PI * 2)
      ctx.fillStyle = '#fff'
      ctx.shadowColor = 'rgba(0, 0, 0, 0.45)'
      ctx.shadowBlur = 4
      ctx.fill()
      ctx.closePath()
    })
  } else {
    ctx.beginPath()
    ctx.arc(xs as number, ys as number, 8, 0, Math.PI * 2)
    ctx.lineWidth = 3
    ctx.strokeStyle = '#fff'
    ctx.shadowBlur = 3
    ctx.stroke()
    ctx.closePath()
  }
}

export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  xs: number[] | number,
  ys: number[] | number
) => {
  if (isArrayLike(xs) && isArrayLike(ys)) {
    zip(xs, ys).forEach(([x, y]) => {
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fillStyle = '#fff'
      ctx.shadowColor = 'rgba(0, 0, 0, 0.45)'
      ctx.shadowBlur = 4
      ctx.fill()
      ctx.closePath()
    })
  } else {
    ctx.beginPath()
    ctx.arc(xs as number, ys as number, 5, 0, Math.PI * 2)
    ctx.fillStyle = '#fff'
    ctx.shadowColor = 'rgba(0, 0, 0, 0.45)'
    ctx.shadowBlur = 4
    ctx.fill()
    ctx.closePath()
  }
}
