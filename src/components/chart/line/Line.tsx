import React, { forwardRef, useCallback, useRef } from 'react'

import { adjustSize } from '@/components/chart/lib/canvas'
import { drawCircle, drawHollowCircle } from '@/components/chart/lib/circle'
import { setCoordinate } from '@/components/chart/lib/coordinate'
import { drawLine } from '@/components/chart/lib/line'
import useResizeObserver from '@/hooks/useResizeObserver'
import { getValue } from '@/lib/pythonic'

import styles from './Line.module.sass'
import { LineProps } from './Line.types'

const Line = forwardRef<unknown, LineProps>((props, ref) => {
  Line.displayName = 'Line'
  const canvasRef: any = useRef(null)
  const _paddingLeft = getValue(props.paddingLeft, !!props.showYTicks ? 20 : 8)
  const _paddingRight = getValue(props.paddingRight, 14)
  const _paddingTop = getValue(props.paddingTop, 15)
  const _paddingBottom = getValue(props.paddingBottom, 15)

  const draw = useCallback(
    (
      canvasDom: HTMLCanvasElement,
      xs: number[],
      ys: number[],
      paddingLeft: number,
      paddingRight: number,
      paddingTop: number,
      paddingBottom: number
    ) => {
      const context = canvasRef.current.getContext('2d')
      const [xTicks, yTicks] = setCoordinate(
        context,
        canvasDom.height,
        canvasDom.width,
        xs,
        ys,
        paddingLeft,
        paddingRight,
        paddingTop,
        paddingBottom,
        !!props.showXAxes,
        !!props.showYAxes,
        !!props.showXTicks,
        !!props.showYTicks
      )

      drawLine(context, xTicks, yTicks, props.lineWidth, props.lineColor)
      props.hidePoints || drawCircle(context, xTicks, yTicks, props.circleColor, props.shadowColor)
      props.accentLast &&
        drawHollowCircle(
          context,
          xTicks[xTicks.length - 1],
          yTicks[yTicks.length - 1],
          props.circleColor,
          props.shadowColor
        )
    },

    [
      props.accentLast,
      props.circleColor,
      props.hidePoints,
      props.lineColor,
      props.lineWidth,
      props.shadowColor,
      props.showXAxes,
      props.showXTicks,
      props.showYAxes,
      props.showYTicks
    ]
  )

  const initialCanvas = useCallback(() => {
    const canvasDom = canvasRef?.current!
    adjustSize(canvasDom)
    draw(canvasDom, props.xs, props.ys, _paddingLeft, _paddingRight, _paddingTop, _paddingBottom)
  }, [_paddingBottom, _paddingLeft, _paddingRight, _paddingTop, draw, props.xs, props.ys])

  useResizeObserver(initialCanvas, canvasRef)

  return <canvas ref={canvasRef} className={styles.lineChart}></canvas>
})

export { Line }
