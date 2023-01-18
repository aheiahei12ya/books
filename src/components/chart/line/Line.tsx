import React, { forwardRef, useCallback, useRef } from 'react'

import { adjustSize } from '@/components/chart/lib/canvas'
import { drawCircle, drawHollowCircle } from '@/components/chart/lib/circle'
import { setCoordinate } from '@/components/chart/lib/coordinate'
import { drawLine } from '@/components/chart/lib/line'
import useResize from '@/hooks/useResize'

import styles from './Line.module.sass'
import { LineProps } from './Line.types'

const Line = forwardRef<unknown, LineProps>((props, ref) => {
  Line.displayName = 'Line'
  const canvasRef: any = useRef(null)
  const _paddingX = props.paddingX === undefined ? 30 : props.paddingX
  const _paddingY = props.paddingY === undefined ? 30 : props.paddingY
  const _lineWidth = props.lineWidth === undefined ? 3 : props.lineWidth
  const _lineColor = props.lineColor === undefined ? '#aeaeae' : props.lineColor
  const _shadowColor =
    props.shadowColor === undefined ? 'rgba(0, 0, 0, 0.45)' : props.shadowColor
  const _circleColor =
    props.circleColor === undefined ? '#fff' : props.circleColor
  const _coordinateColor =
    props.coordinateColor === undefined ? '#aeaeae' : props.coordinateColor

  const draw = useCallback(
    (
      canvasDom: HTMLCanvasElement,
      xs: number[],
      ys: number[],
      paddingX: number,
      paddingY: number
    ) => {
      const context = canvasRef.current.getContext('2d')
      const xTicks = setCoordinate(
        context,
        canvasDom.height,
        canvasDom.width,
        xs.length,
        props.hideAxes,
        paddingX,
        paddingY,
        _coordinateColor
      )
      const yRatio = (canvasDom.height - paddingY * 2) / Math.max(...ys)
      const yTicks = ys.map((y) => {
        return canvasDom.height - y * yRatio - paddingY
      })

      drawLine(context, xTicks, yTicks, _lineWidth, _lineColor)
      props.hidePoints ||
        drawCircle(context, xTicks, yTicks, _circleColor, _shadowColor)
      props.accentLast &&
        drawHollowCircle(
          context,
          xTicks[xTicks.length - 1],
          yTicks[yTicks.length - 1],
          _circleColor,
          _shadowColor
        )
    },

    [
      _circleColor,
      _lineColor,
      _lineWidth,
      _shadowColor,
      props.accentLast,
      props.hideAxes,
      props.hidePoints
    ]
  )

  const initialCanvas = useCallback(() => {
    const canvasDom = canvasRef?.current!
    adjustSize(canvasDom)
    draw(canvasDom, props.xs, props.ys, _paddingX, _paddingY)
  }, [_paddingX, _paddingY, draw, props.xs, props.ys])

  useResize(initialCanvas)

  return <canvas ref={canvasRef} className={styles.lineChart}></canvas>
})

export { Line }
