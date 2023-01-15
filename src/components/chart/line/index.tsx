import React, { forwardRef, useCallback, useEffect, useRef } from 'react'

import { adjustSize } from '@/components/chart/lib/canvas'
import { drawCircle, drawHollowCircles } from '@/components/chart/lib/circle'
import { setCoordinate } from '@/components/chart/lib/coordinate'
import { drawLine } from '@/components/chart/lib/line'

import styles from './index.module.sass'
import { LineProps } from './index.types'

const Line = forwardRef<unknown, LineProps>((props, ref) => {
  Line.displayName = 'Line'
  const canvasRef: any = useRef(null)

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
        xs.length,
        true
      )
      const yRatio = (canvasDom.height - padding) / Math.max(...ys)
      const yTicks = ys.map((y) => {
        return canvasDom.height - y * yRatio - padding / 2
      })

      drawLine(context, xTicks, yTicks)
      props.hidePoints || drawCircle(context, xTicks, yTicks)
      props.accentLast &&
        drawHollowCircles(
          context,
          xTicks[xTicks.length - 1],
          yTicks[yTicks.length - 1]
        )
    },
    [props.accentLast, props.hidePoints]
  )

  const initialCanvas = useCallback(() => {
    const canvasDom = canvasRef?.current!
    adjustSize(canvasDom)
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
