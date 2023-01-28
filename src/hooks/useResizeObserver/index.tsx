import { RefObject, useLayoutEffect } from 'react'

const useResizeObserver = (
  callback: ResizeObserverCallback,
  ref: RefObject<HTMLElement>
) => {
  useLayoutEffect(() => {
    let resizeObserver: ResizeObserver
    if (typeof window.ResizeObserver === 'undefined' || !ref.current) return
    resizeObserver = new window.ResizeObserver(callback)
    resizeObserver.observe(ref.current)
    return () => {
      resizeObserver.disconnect?.()
    }
  }, [ref, callback])
}

export default useResizeObserver
