function deepCopy(obj: object | []) {
  const target: any = obj.constructor === Array ? [] : {}
  Object.keys(obj).forEach((keys) => {
    if (obj[keys as keyof typeof obj] && typeof obj[keys as keyof typeof obj] === 'object') {
      target[keys] = deepCopy(obj[keys as keyof typeof obj])
    } else {
      target[keys] = obj[keys as keyof typeof obj]
    }
  })
  return target
}

export default deepCopy
