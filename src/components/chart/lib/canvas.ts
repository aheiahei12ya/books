export const adjustSize = (canvasDom: HTMLCanvasElement) => {
  canvasDom.height = 0
  canvasDom.width = 0

  const boxDom = canvasDom.closest('div')!
  const dpr = window.devicePixelRatio
  canvasDom.height = Math.round(boxDom.clientHeight * dpr)
  canvasDom.width = Math.round(boxDom.clientWidth * dpr)
}
