export const adjustSize = (canvasDom: HTMLCanvasElement) => {
  canvasDom.height = 0
  canvasDom.width = 0

  const boxDom = canvasDom.closest('div')!
  canvasDom.height = boxDom.clientHeight
  canvasDom.width = boxDom.clientWidth
}
