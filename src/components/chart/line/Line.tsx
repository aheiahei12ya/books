import React, { forwardRef, useCallback, useRef } from 'react'

import { adjustSize } from '@/components/chart/lib/canvas'
import { drawCircle, drawHollowCircle } from '@/components/chart/lib/circle'
import { setCoordinate } from '@/components/chart/lib/coordinate'
import { drawLine } from '@/components/chart/lib/line'
import useResize from '@/hooks/useResize'
import { getValue } from '@/lib/pythonic'

import styles from './Line.module.sass'
import { LineProps } from './Line.types'

const Line = forwardRef<unknown, LineProps>((props, ref) => {
  Line.displayName = 'Line'
  const canvasRef: any = useRef(null)
  const _paddingX = getValue(props.paddingX, 15)
  const _paddingTop = getValue(props.paddingTop, 15)
  const _paddingBottom = getValue(props.paddingBottom, 15)

  const draw = useCallback(
    (
      canvasDom: HTMLCanvasElement,
      xs: number[],
      ys: number[],
      paddingX: number,
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
        paddingX,
        paddingTop,
        paddingBottom,
        !!props.hideAxes
      )

      drawLine(context, xTicks, yTicks, props.lineWidth, props.lineColor)
      props.hidePoints ||
        drawCircle(
          context,
          xTicks,
          yTicks,
          props.circleColor,
          props.shadowColor
        )
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
      props.hideAxes,
      props.hidePoints,
      props.lineColor,
      props.lineWidth,
      props.shadowColor
    ]
  )

  const initialCanvas = useCallback(() => {
    const canvasDom = canvasRef?.current!
    adjustSize(canvasDom)
    draw(canvasDom, props.xs, props.ys, _paddingX, _paddingTop, _paddingBottom)
  }, [_paddingBottom, _paddingTop, _paddingX, draw, props.xs, props.ys])

  useResize(initialCanvas)

  return <canvas ref={canvasRef} className={styles.lineChart}></canvas>
})

export { Line }
