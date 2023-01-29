// Is a given variable an object?
export default function isObject(obj: any) {
  const type = typeof obj
  return type === 'function' || (type === 'object' && !!obj)
}
