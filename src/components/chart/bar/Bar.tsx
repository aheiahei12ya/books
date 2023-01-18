import { forwardRef, useCallback, useRef } from 'react'

import { drawRect } from '@/components/chart/lib/barRect'
import { adjustSize } from '@/components/chart/lib/canvas'
import { setCoordinate } from '@/components/chart/lib/coordinate'
import useResize from '@/hooks/useResize'
import { getValue } from '@/lib/pythonic'

import styles from './Bar.module.sass'
import { BarProps } from './Bar.types'

const Bar = forwardRef<unknown, BarProps>((props, ref) => {
  Bar.displayName = 'Bar'
  const canvasRef: any = useRef(null)
  const _gap = getValue(props.gap, 5)
  const _paddingX = getValue(props.paddingX, 15)
  const _paddingTop = getValue(props.paddingTop, 0)
  const _paddingBottom = getValue(props.paddingBottom, 10)

  const draw = useCallback(
    (
      canvasDom: HTMLCanvasElement,
      xs: number[],
      ys: number[],
      gap: number,
      paddingX: number,
      paddingTop: number,
      paddingBottom: number
    ) => {
      const context = canvasRef.current.getContext('2d')
      const dpr = window.devicePixelRatio

      const [xTicks, yTicks] = setCoordinate(
        context,
        canvasDom.height,
        canvasDom.width,
        xs,
        ys,
        paddingX,
        paddingTop,
        paddingBottom,
        !!props.hideAxes,
        'bar'
      )
      const barGap = xTicks[1] - xTicks[0] - gap * dpr
      drawRect(
        context,
        xTicks,
        yTicks,
        canvasDom.height,
        canvasDom.width,
        barGap,
        paddingTop,
        paddingBottom
      )
    },
    [props.coordinateColor, props.hideAxes]
  )

  const initialCanvas = useCallback(() => {
    const canvasDom = canvasRef?.current!
    adjustSize(canvasDom)
    draw(
      canvasDom,
      props.xs,
      props.ys,
      _gap,
      _paddingX,
      _paddingTop,
      _paddingBottom
    )
  }, [draw, props.xs, props.ys, _gap, _paddingX, _paddingTop, _paddingBottom])

  useResize(initialCanvas)
  return <canvas ref={ canvasRef } className={ styles.bar }></canvas>
})

export { Bar }
