import { forwardRef, useCallback, useRef } from 'react'

import { drawRect } from '@/components/chart/lib/barRect'
import { adjustSize } from '@/components/chart/lib/canvas'
import { setCoordinate } from '@/components/chart/lib/coordinate'
import useResizeObserver from '@/hooks/useResizeObserver'
import { getValue } from '@/lib/pythonic'

import styles from './Bar.module.sass'
import { BarProps } from './Bar.types'

const Bar = forwardRef<unknown, BarProps>((props, ref) => {
  Bar.displayName = 'Bar'
  const canvasRef: any = useRef(null)
  const _gap = getValue(props.gap, 5)
  const _paddingLeft = getValue(props.paddingLeft, !!props.showYTicks ? 16 : 0)
  const _paddingRight = getValue(props.paddingRight, 0)
  const _paddingTop = getValue(props.paddingTop, 4)
  const _paddingBottom = getValue(props.paddingBottom, !!props.showXTicks ? 14 : 0)

  const draw = useCallback(
    (
      canvasDom: HTMLCanvasElement,
      xs: number[],
      ys: number[],
      gap: number,
      paddingLeft: number,
      paddingRight: number,
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
        paddingLeft,
        paddingRight,
        paddingTop,
        paddingBottom,
        !!props.showXAxes,
        !!props.showYAxes,
        !!props.showXTicks,
        !!props.showYTicks,
        'bar'
      )

      const barGap = xTicks[1] - xTicks[0] - gap * dpr
      drawRect(context, xTicks, yTicks, canvasDom.height, canvasDom.width, barGap, paddingBottom)
    },
    [props.showXAxes, props.showXTicks, props.showYAxes, props.showYTicks]
  )

  const initialCanvas = useCallback(() => {
    const canvasDom = canvasRef?.current!
    adjustSize(canvasDom)
    draw(canvasDom, props.xs, props.ys, _gap, _paddingLeft, _paddingRight, _paddingTop, _paddingBottom)
  }, [draw, props.xs, props.ys, _gap, _paddingLeft, _paddingRight, _paddingTop, _paddingBottom])

  useResizeObserver(initialCanvas, canvasRef)

  return <canvas ref={canvasRef} className={styles.bar}></canvas>
})

export { Bar }
