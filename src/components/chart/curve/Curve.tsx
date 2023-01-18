import React, { forwardRef, useCallback, useRef } from 'react'

import { adjustSize } from '@/components/chart/lib/canvas'
import { drawCircle, drawHollowCircle } from '@/components/chart/lib/circle'
import { setCoordinate } from '@/components/chart/lib/coordinate'
import { drawCurve } from '@/components/chart/lib/line'
import useResize from '@/hooks/useResize'

import styles from './Curve.module.sass'
import { CurveProps } from './Curve.types'

const Curve = forwardRef<unknown, CurveProps>((props, ref) => {
  Curve.displayName = 'Curve'
  const canvasRef: any = useRef(null)

  const draw = useCallback(
    (
      canvasDom: HTMLCanvasElement,
      xs: number[],
      ys: number[],
      padding: number = 15
    ) => {
      const context = canvasRef.current.getContext('2d')
      const xTicks = setCoordinate(
        context,
        canvasDom.height,
        canvasDom.width,
        xs.length,
        props.hideAxes
      )
      const yRatio = (canvasDom.height - padding * 2) / Math.max(...ys)
      const yTicks = ys.map((y) => {
        return canvasDom.height - y * yRatio - padding
      })

      drawCurve(context, xTicks, yTicks)
      props.hidePoints || drawCircle(context, xTicks, yTicks)
      props.accentLast &&
        drawHollowCircle(
          context,
          xTicks[xTicks.length - 1],
          yTicks[yTicks.length - 1]
        )
    },
    [props.accentLast, props.hideAxes, props.hidePoints]
  )

  const initialCanvas = useCallback(() => {
    const canvasDom = canvasRef?.current!
    adjustSize(canvasDom)
    draw(canvasDom, props.xs, props.ys)
  }, [draw, props.xs, props.ys])

  useResize(initialCanvas)

  return <canvas ref={canvasRef} className={styles.curveChart}></canvas>
})

export { Curve }
