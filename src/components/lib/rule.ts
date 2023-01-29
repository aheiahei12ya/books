import isObject from '@/lib/pythonic/isObject'

export interface RuleType {
  required: boolean
  message: JSX.Element
  rule?: string
}

export const checkRules = (
  rules: RuleType[],
  setRule: Function,
  value: any,
  newVal?: any
) => {
  let error = false
  const checkValue = newVal === undefined ? value : newVal
  rules?.forEach((rule) => {
    if (!rule.required) {
      setRule({
        error: false,
        message: rule.message
      })
      return
    }
    if (isObject(checkValue)) {
      if (checkValue === undefined) {
        setRule({
          error: true,
          message: rule.message
        })
        error = true
        return
      }
    } else if (!checkValue?.length) {
      setRule({
        error: true,
        message: rule.message
      })
      error = true
      return
    }
    setRule({
      error: false,
      message: rule.message
    })
  })
  return error
}
