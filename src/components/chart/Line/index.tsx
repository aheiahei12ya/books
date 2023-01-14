import React, { forwardRef, useCallback, useEffect, useRef } from 'react'

import { range, zip } from '@/lib/pythonic'

import styles from './index.module.sass'
import { lineProps } from './index.types'

const Line = forwardRef<unknown, lineProps>((props, ref) => {
  Line.displayName = 'Line'
  const canvasRef: any = useRef(null)

  const setCoordinate = (
    ctx: CanvasRenderingContext2D,
    canvasHeight: number,
    canvasWidth: number,
    splitNumber: number,
    padding: number = 20
  ) => {
    const gap = (canvasWidth - padding * 2) / (splitNumber - 1)
    return range(splitNumber).map((i) => {
      const x = i ? i * gap + padding : padding
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvasHeight)
      ctx.strokeStyle = '#aeaeae'
      ctx.stroke()
      ctx.closePath()
      return x
    })
  }

  const drawHollowCircles = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, Math.PI * 2)
      ctx.lineWidth = 3
      ctx.strokeStyle = '#fff'
      ctx.shadowBlur = 3
      ctx.stroke()
      ctx.closePath()
    },
    []
  )

  const drawCircle = useCallback(
    (ctx: CanvasRenderingContext2D, xs: number[], ys: number[]) => {
      zip(xs, ys).forEach(([x, y]) => {
        ctx.beginPath()
        ctx.arc(x, y, 5, 0, Math.PI * 2)
        ctx.fillStyle = '#fff'
        ctx.shadowColor = 'rgba(0, 0, 0, 0.45)'
        ctx.shadowBlur = 4
        ctx.fill()
        ctx.closePath()
      })
    },
    []
  )

  const draw = useCallback(
    (
      canvasDom: HTMLCanvasElement,
      xs: number[],
      ys: number[],
      padding: number = 20
    ) => {
      const context = canvasRef.current.getContext('2d')
      const xTicks = setCoordinate(
        context,
        canvasDom.height,
        canvasDom.width,
        xs.length
      )
      const yRatio = (canvasDom.height - padding) / Math.max(...ys)
      const yTicks = ys.map((y) => {
        return canvasDom.height - y * yRatio - padding / 2
      })
      drawCircle(context, xTicks, yTicks)
      props.accentLast &&
        drawHollowCircles(
          context,
          xTicks[xTicks.length - 1],
          yTicks[yTicks.length - 1]
        )
    },
    [drawCircle, drawHollowCircles, props.accentLast]
  )

  const initialCanvas = useCallback(() => {
    const canvasDom = canvasRef?.current!
    canvasDom.height = 0
    canvasDom.width = 0

    const boxDom = canvasDom.closest('div')!
    canvasDom.height = boxDom.clientHeight
    canvasDom.width = boxDom.clientWidth

    draw(canvasDom, props.xs, props.ys)
  }, [draw, props.xs, props.ys])

  useEffect(() => {
    initialCanvas()
    window.addEventListener('resize', initialCanvas)
    return () => {
      window.removeEventListener('resize', initialCanvas)
    }
  }, [initialCanvas, canvasRef])

  return <canvas ref={canvasRef} className={styles.lineChart}></canvas>
})

export default Line
