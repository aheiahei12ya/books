import { RefObject, useLayoutEffect } from 'react'

const useResizeObserver = (callback: Function, ref: RefObject<HTMLElement>) => {
  useLayoutEffect(() => {
    const element = ref.current!
    let resizeObserver: ResizeObserver
    if (typeof window.ResizeObserver === 'undefined' || !ref.current) return
    resizeObserver = new window.ResizeObserver((entries) => {
      entries.forEach((entry) => {
        requestAnimationFrame(() => {
          if (element.offsetParent !== null) {
            callback()
          }
        })
      })
    })
    resizeObserver.observe(element)
    return () => {
      resizeObserver.unobserve(element)
      resizeObserver.disconnect?.()
    }
  }, [ref, callback])
}

export default useResizeObserver
