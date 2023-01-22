import { RefObject, useCallback, useEffect, useRef, useState } from 'react'

const useHover = (): [RefObject<any>, boolean] => {
  const [hover, setHover] = useState<boolean>(false)
  const ref = useRef<HTMLElement>(null)

  const handleMouseOver = useCallback(() => setHover(true), [])
  const handleMouseOut = useCallback(() => setHover(false), [])

  useEffect(() => {
    const node = ref.current
    if (node) {
      node.addEventListener('mouseover', handleMouseOver)
      node.addEventListener('mouseout', handleMouseOut)

      return () => {
        node.removeEventListener('mouseover', handleMouseOver)
        node.removeEventListener('mouseout', handleMouseOut)
      }
    }
  }, [ref, handleMouseOver, handleMouseOut])

  return [ref, hover]
}

export default useHover
