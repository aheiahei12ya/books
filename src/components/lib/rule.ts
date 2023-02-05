import isObject from '@/lib/pythonic/isObject'

export interface RuleType {
  required?: boolean
  message?: JSX.Element | string
  rule?: RegExp
}

export const checkRules = (rules: RuleType[], setRule: Function, value: any, newVal?: any) => {
  let error = false
  let errorMessage: string | JSX.Element | undefined = ''
  const checkValue = newVal === undefined ? value : newVal
  rules?.some((rule, index) => {
    if (rule.required) {
      error = handleRequired(checkValue, rule)
      if (error) {
        errorMessage = rule.message
        return error
      }
    }
    if (rule.rule instanceof RegExp) {
      error = handleRegExp(checkValue, rule)
      if (error) errorMessage = rule.message
    }
  })
  setRule({
    error: error,
    message: errorMessage
  })
  return error
}

const handleRequired = (checkValue: any, rule: RuleType) => {
  if (isObject(checkValue)) {
    if (checkValue === undefined) return true
  } else if (!checkValue?.length) return true
  return false
}

const handleRegExp = (checkValue: any, rule: RuleType) => {
  if (!checkValue) return false
  return !rule.rule?.test(checkValue)
}
