import { useCallback, useEffect, useState } from 'react'

import { Device, SizeProps } from './types'

const useResize = () => {
  const [size, setSize] = useState<SizeProps>({ width: 0, height: 0 })
  const getSize = useCallback(() => {
    const width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight
    const device = width <= 960 ? Device.mobile : Device.PC
    setSize({
      width,
      height,
      isPC: device === Device.PC,
      isMobile: device === Device.mobile
    })
  }, [])
  useEffect(() => {
    getSize()
    window.addEventListener('resize', getSize)
    return () => window.removeEventListener('resize', getSize)
  }, [getSize])

  return size
}

export default useResize
