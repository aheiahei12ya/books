import { useState } from 'react'

const voidFunction = () => {}

const useControlled = (value: any, onChange: Function | undefined) => {
  const controlled = value !== undefined
  const [innerValue, setInnerValue] = useState()

  if (controlled) return [value, onChange || voidFunction]
  return [
    innerValue,
    (newValue: any, ...args: any) => {
      setInnerValue(newValue)
      onChange?.(newValue, ...args)
    }
  ]
}

export default useControlled
